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
exports.login = exports.verifyOTP = exports.register = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const nodemailer = __importStar(require("nodemailer"));
const dotenv = __importStar(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
const otp_model_1 = __importDefault(require("../models/otp.model"));
const sequelize_1 = require("sequelize");
// // Define the structure of the decoded JWT payload
// interface JwtPayload {
//   id: number;
// }
// // Extend the Request type to include the user property
// interface AuthenticatedRequest extends Request {
//   user: JwtPayload;
// }
// // Define the request body for addUserDetails
// interface AddUserDetailsRequestBody {
//   businessName: string;
//   contactNumber: string;
//   industry: string;
//   businessDescription: string;
//   servicesProducts: string[] | string;
//   socialMedia: string | { [key: string]: string };
//   yearsInBusiness: number;
//   address: string;
// }
// // Define the user details response
// interface UserDetailsResponse {
//   businessName?: string;
//   contactNumber?: string;
//   industry?: string;
//   businessDescription?: string;
//   servicesProducts?: string[];
//   socialMedia?: string | { [key: string]: string };
//   yearsInBusiness?: number;
//   address?: string;
//   email: string;
//   fullName: string;
//   photo?: string;
//   id: number;
// }
dotenv.config();
// Ensure required environment variables are set at startup
const { SENDER_EMAIL, APP_PASSWORD, JWT_SECRET } = process.env;
if (!SENDER_EMAIL || !APP_PASSWORD || !JWT_SECRET) {
    console.error("Missing required environment variables.");
    process.exit(1);
}
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const sendOTP = (email, generatedOTP) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield transporter.sendMail({
            from: SENDER_EMAIL,
            to: email,
            subject: "OTP for Verification",
            text: `Your OTP for email verification is: ${generatedOTP}`,
        });
        console.log(`[SUCCESS] OTP sent to: ${email}`);
        return true;
    }
    catch (error) {
        console.error("[ERROR] Failed to send OTP:", error);
        return false;
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, fullName, password } = req.body;
        if (!email || !fullName || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const emailLower = email.toLowerCase();
        console.log(`[INFO] Registering user: ${emailLower}`);
        const existingUser = yield user_model_1.default.findOne({ where: { email: emailLower } });
        if (existingUser) {
            console.log(`[WARN] User already exists: ${emailLower}`);
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const otp = generateOTP();
        console.log(`[INFO] Generated OTP for ${emailLower}: ${otp}`);
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        const otpSent = yield sendOTP(emailLower, otp);
        if (!otpSent) {
            console.error(`[ERROR] Failed to send OTP to: ${emailLower}`);
            res.status(500).json({ message: "Failed to send OTP" });
            return;
        }
        yield otp_model_1.default.upsert({
            email: emailLower,
            otp,
            otp_expires: otpExpiry,
        });
        console.log(`[SUCCESS] OTP stored for ${emailLower}, expires at: ${otpExpiry}`);
        res.status(200).json({ message: "OTP sent to email" });
    }
    catch (error) {
        console.error("[ERROR] Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.register = register;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, enteredOTP, password, fullName } = req.body;
        const emailLower = email.toLowerCase();
        console.log(`[INFO] Verifying OTP for: ${emailLower}`);
        const otpRecord = yield otp_model_1.default.findOne({
            where: {
                email: emailLower,
                otp_expires: { [sequelize_1.Op.gte]: new Date() },
            },
            order: [['otp_expires', 'DESC']],
        });
        if (!otpRecord || otpRecord.otp !== enteredOTP) {
            console.log(`[WARN] Invalid or expired OTP for ${emailLower}`);
            res.status(400).json({ message: "Invalid or expired OTP" });
            return;
        }
        console.log(`[SUCCESS] OTP verified for ${emailLower}`);
        const hashedPassword = yield bcrypt.hash(password, 10);
        const photo = `https://ui-avatars.com/api/?name=${fullName.charAt(0).toUpperCase()}&size=150`;
        const newUser = yield user_model_1.default.create({
            email: emailLower,
            fullName,
            password: hashedPassword,
            photo,
            userType: "entrepreneur",
        });
        yield otp_model_1.default.destroy({
            where: { email: emailLower },
        });
        console.log(`[SUCCESS] User registered: ${emailLower}`);
        res.status(200).json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        console.error("[ERROR] OTP verification error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.verifyOTP = verifyOTP;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const emailLower = email.toLowerCase();
        console.log(`[INFO] Attempting login for: ${emailLower}`);
        const user = yield user_model_1.default.findOne({ where: { email: emailLower } });
        if (!user) {
            console.log(`[WARN] Login failed: No user found with email ${emailLower}`);
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = yield bcrypt.compare(password, user.password);
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
    }
    catch (error) {
        console.error("[ERROR] Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
// export const addUserDetails = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const {
//       businessName,
//       contactNumber,
//       industry,
//       businessDescription,
//       servicesProducts,
//       socialMedia,
//       yearsInBusiness,
//       address,
//     }: AddUserDetailsRequestBody = req.body;
//     // Ensure user is authenticated
//     if (!req.user || !req.user.id) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }
//     // Find user by ID
//     const user = await User.findByPk(req.user.id);
//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }
//     // Ensure servicesProducts is an array
//     const formattedServicesProducts: string[] =
//       typeof servicesProducts === "string"
//         ? servicesProducts.split(",").map((item) => item.trim())
//         : servicesProducts;
//     // Convert socialMedia object to string if it's an object
//     const formattedSocialMedia: string =
//       typeof socialMedia === "object" ? JSON.stringify(socialMedia) : socialMedia;
//     // Update user details
//     await user.update({
//       businessName: businessName || user.businessName,
//       contactNumber: contactNumber || user.contactNumber,
//       industry: industry || user.industry,
//       businessDescription: businessDescription || user.businessDescription,
//       servicesProducts: formattedServicesProducts || user.servicesProducts,
//       socialMedia: formattedSocialMedia || user.socialMedia,
//       yearsInBusiness: yearsInBusiness || user.yearsInBusiness,
//       address: address || user.address,
//     });
//     // Construct response
//     const userDetails: UserDetailsResponse = {
//       businessName: user.businessName,
//       contactNumber: user.contactNumber,
//       industry: user.industry,
//       businessDescription: user.businessDescription,
//       servicesProducts: user.servicesProducts,
//       socialMedia: user.socialMedia,
//       yearsInBusiness: user.yearsInBusiness,
//       address: user.address,
//       email: user.email,
//       fullName: user.fullName,
//       photo: user.photo,
//       id: user.id,
//     };
//     res.status(200).json({ message: "Your details added successfully", user: userDetails });
//   } catch (error) {
//     console.error("Error adding business details:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
