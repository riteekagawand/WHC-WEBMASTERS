import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/user.model";
import OTP from "../models/otp.model";
import { Op } from "sequelize";

dotenv.config();

const generateOTP = (): string => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (email: string, generatedOTP: string): Promise<boolean> => {
  if (!process.env.SENDER_EMAIL || !process.env.APP_PASSWORD) {
    console.error("Missing email credentials.");
    return false;
  }
  try {
    console.log("Sending OTP to email:", email);
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "OTP for Verification",
      text: `Your OTP for email verification is: ${generatedOTP}`,
    });

    console.log("OTP sent successfully to:", email);
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, fullName, password } = req.body;
    console.log("Registering user with email:", email);
    if (!email || !fullName || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const emailLower = email.toLowerCase();
    const existingUser = await User.findOne({ where: { email: emailLower } });
    if (existingUser) {
      console.log("User already exists with email:", emailLower);
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const otp = generateOTP();
    console.log("Generated OTP:", otp);

    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);// OTP expires in 5 minutes
    console.log("OTP expiry time:", otpExpiry);

    const otpSent = await sendOTP(emailLower, otp);
    if (!otpSent) {
      console.error("Failed to send OTP to:", emailLower);
      res.status(500).json({ message: "Failed to send OTP" });
      return;
    }

    await OTP.upsert({
      email: emailLower,
      otp,  // New OTP
      otp_expires: otpExpiry,  // Set the expiration time
    });
    console.log("OTP upserted for email:", emailLower);

    console.log("OTP sent to email successfully:", emailLower);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, enteredOTP, password, fullName } = req.body;
    const emailLower = email.toLowerCase();
    console.log("Verifying OTP for email:", emailLower);

    // Fetch the most recent OTP for verification
    const otpRecord = await OTP.findOne({
      where: {
        email: emailLower,
        otp_expires: { [Op.gte]: new Date() },  // Ensure OTP has not expired
      },
      order: [['otp_expires', 'DESC']],  // Ensure the latest OTP is fetched
    });


    // Log OTP record for debugging purposes
    console.log("OTP Record found:", otpRecord);

    if (!otpRecord) {
      res.status(400).json({ message: "OTP expired or invalid" });
      return;
    }

    if (otpRecord.otp !== enteredOTP) {
      res.status(400).json({ message: "Invalid OTP" });
      return;
    }
    console.log("OTP verified successfully");
    // Proceed with user registration if OTP is valid
    const hashedPassword = await bcrypt.hash(password, 10);
    const photo = `https://ui-avatars.com/api/?name=${fullName.charAt(0).toUpperCase()}&size=150`;

    const newUser = await User.create({
      email: emailLower,
      fullName,
      password: hashedPassword,
      photo,
      userType: "entrepreneur",
    });

    // Delete OTP from the database after successful registration
    // Delete expired OTP records
    await OTP.destroy({
      where: {
        otp_expires: { [Op.lt]: new Date() },  // Expired OTPs
      },
    });

    res.status(200).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log("Logging in user with email:", email);
    const emailLower = email.toLowerCase();

    const user = await User.findOne({ where: { email: emailLower } });
    if (!user) {
      console.log("Invalid credentials: No user found with email:", emailLower);
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials: Password does not match for email:", emailLower);
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    if (!process.env.JWT_SECRET) throw new Error("JWT secret not found.");
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("Login successful for user:", user.email);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        photo: user.photo || `https://ui-avatars.com/api/?name=${user.fullName.charAt(0).toUpperCase()}&size=150`,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
