"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
const otp_model_1 = __importDefault(require("../models/otp.model"));
dotenv_1.default.config();
const router = express_1.default.Router();
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
const sendOTP = (email, generatedOTP) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.APP_PASSWORD,
            },
        });
        yield transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "OTP for Verification",
            text: `Your OTP for email verification is: ${generatedOTP}`,
        });
        return true;
    }
    catch (error) {
        console.error("Email sending error:", error);
        return false;
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, fullName, password } = req.body;
        if (!email || !fullName || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = yield user_model_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const otp = generateOTP();
        const otpSent = yield sendOTP(email, otp);
        if (!otpSent) {
            return res.status(500).json({ message: "Failed to send OTP" });
        }
        yield otp_model_1.default.update({ otp: otp.toString(), otp_expires: new Date(Date.now() + 300000) }, { where: { email } });
        return res.status(200).json({ message: "OTP sent to email" });
    }
    catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, enteredOTP, password, fullName } = req.body;
        const otpRecord = yield otp_model_1.default.findOne({ where: { email } });
        if (!otpRecord || otpRecord.otp_expires < new Date()) {
            return res.status(400).json({ message: "OTP expired or invalid" });
        }
        if (otpRecord.otp !== enteredOTP) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const initials = fullName.charAt(0).toUpperCase();
        const photo = `https://ui-avatars.com/api/?name=${initials}&size=150`;
        const newUser = yield user_model_1.default.create({
            email,
            fullName,
            password: hashedPassword,
            photo,
            userType: "entrepreneur",
        });
        yield otp_model_1.default.destroy({ where: { email } });
        return res.status(200).json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        console.error("OTP verification error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
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
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = router;
