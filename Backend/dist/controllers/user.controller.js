"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express = __importStar(require("express"));
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const nodemailer = __importStar(require("nodemailer"));
const dotenv = __importStar(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
const otp_model_1 = __importDefault(require("../models/otp.model"));
dotenv.config();
const router = express.Router();
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
const sendOTP = (email, generatedOTP) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer.createTransport({
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
        const hashedPassword = yield bcrypt.hash(password, 10);
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
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
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
