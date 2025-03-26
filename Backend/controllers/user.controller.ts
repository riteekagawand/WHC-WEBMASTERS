import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Op } from "sequelize";
import User from "../models/user.model";
import OTP from "../models/otp.model";

dotenv.config();

const router = express.Router();

const generateOTP = (): number => Math.floor(100000 + Math.random() * 900000);

const sendOTP = async (email: string, generatedOTP: number): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL!,
        pass: process.env.APP_PASSWORD!,
      },
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL!,
      to: email,
      subject: "OTP for Verification",
      text: `Your OTP for email verification is: ${generatedOTP}`,
    });

    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
};

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = generateOTP();
    const otpSent = await sendOTP(email, otp);

    if (!otpSent) {
      return res.status(500).json({ message: "Failed to send OTP" });
    }
        await OTP.update(
        { otp, otpExpires: new Date(Date.now() + 300000) },
        { where: { email } }
        );


    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const verifyOTP = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, enteredOTP, password, fullName } = req.body;

    const otpRecord = await OTP.findOne({ where: { email } });
    if (!otpRecord || otpRecord.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

    if (otpRecord.otp !== enteredOTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const initials = fullName.charAt(0).toUpperCase();
    const photo = `https://ui-avatars.com/api/?name=${initials}&size=150`;

    const newUser = await User.create({
        email,
        fullName,
        password: hashedPassword,
        photo,
        userType: "entrepreneur", // ✅ Assign a valid value from the defined types
      });
      

    await OTP.destroy({ where: { email } });

    return res.status(200).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        photo: user.photo,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

router.post("/register", async (req: Request, res: Response) => {
    await register(req, res);
  });
  
  router.post("/verify-otp", async (req: Request, res: Response) => {
    await verifyOTP(req, res);
  });
  
  router.post("/login", async (req: Request, res: Response) => {
    await login(req, res);
  });
  

export default router;
