import { Request, Response } from "express";
import * as bcrypt from "bcryptjs"; // Works with esModuleInterop
import * as jwt from "jsonwebtoken"; // Fix import
import * as nodemailer from "nodemailer"; // Fix import
import * as dotenv from "dotenv"; // Fix import
import User from "../models/user.model";
import OTP from "../models/otp.model";
import { Op } from "sequelize";

dotenv.config();


// Ensure required environment variables are set at startup
const { SENDER_EMAIL, APP_PASSWORD, JWT_SECRET } = process.env;
if (!SENDER_EMAIL || !APP_PASSWORD || !JWT_SECRET) {
  console.error("Missing required environment variables.");
  process.exit(1); // Stop execution if critical env variables are missing
}

const generateOTP = (): string => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (email: string, generatedOTP: string): Promise<boolean> => {
  try {
    console.log(`[INFO] Sending OTP to: ${email}`);
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: SENDER_EMAIL,
        pass: APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: email,
      subject: "OTP for Verification",
      text: `Your OTP for email verification is: ${generatedOTP}`,
    });

    console.log(`[SUCCESS] OTP sent to: ${email}`);
    return true;
  } catch (error) {
    console.error("[ERROR] Failed to send OTP:", error);
    return false;
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, fullName, password } = req.body;
    if (!email || !fullName || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const emailLower = email.toLowerCase();
    console.log(`[INFO] Registering user: ${emailLower}`);

    const existingUser = await User.findOne({ where: { email: emailLower } });
    if (existingUser) {
      console.log(`[WARN] User already exists: ${emailLower}`);
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const otp = generateOTP();
    console.log(`[INFO] Generated OTP for ${emailLower}: ${otp}`);

    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    const otpSent = await sendOTP(emailLower, otp);

    if (!otpSent) {
      console.error(`[ERROR] Failed to send OTP to: ${emailLower}`);
      res.status(500).json({ message: "Failed to send OTP" });
      return;
    }

    await OTP.upsert({
      email: emailLower,
      otp,
      otp_expires: otpExpiry,
    });

    console.log(`[SUCCESS] OTP stored for ${emailLower}, expires at: ${otpExpiry}`);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("[ERROR] Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, enteredOTP, password, fullName } = req.body;
    const emailLower = email.toLowerCase();

    console.log(`[INFO] Verifying OTP for: ${emailLower}`);

    const otpRecord = await OTP.findOne({
      where: {
        email: emailLower,
        otp_expires: { [Op.gte]: new Date() },
      },
      order: [['otp_expires', 'DESC']],
    });

    if (!otpRecord || otpRecord.otp !== enteredOTP) {
      console.log(`[WARN] Invalid or expired OTP for ${emailLower}`);
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    console.log(`[SUCCESS] OTP verified for ${emailLower}`);

    const hashedPassword = await bcrypt.hash(password, 10);
    const photo = `https://ui-avatars.com/api/?name=${fullName.charAt(0).toUpperCase()}&size=150`;

    const newUser = await User.create({
      email: emailLower,
      fullName,
      password: hashedPassword,
      photo,
      userType: "entrepreneur",
    });

    await OTP.destroy({
      where: { email: emailLower },
    });

    console.log(`[SUCCESS] User registered: ${emailLower}`);
    res.status(200).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("[ERROR] OTP verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase();

    console.log(`[INFO] Attempting login for: ${emailLower}`);

    const user = await User.findOne({ where: { email: emailLower } });
    if (!user) {
      console.log(`[WARN] Login failed: No user found with email ${emailLower}`);
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`[WARN] Login failed: Incorrect password for ${emailLower}`);
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    console.log(`[SUCCESS] Login successful for: ${emailLower}`);
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
    console.error("[ERROR] Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
