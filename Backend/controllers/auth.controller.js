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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.verifyOTP = exports.register = void 0;
var bcrypt = require("bcryptjs"); // Works with esModuleInterop
var jwt = require("jsonwebtoken"); // Fix import
var nodemailer = require("nodemailer"); // Fix import
var dotenv = require("dotenv"); // Fix import
var user_model_1 = require("../models/user.model");
var otp_model_1 = require("../models/otp.model");
var sequelize_1 = require("sequelize");
dotenv.config();
// Ensure required environment variables are set at startup
var _a = process.env, SENDER_EMAIL = _a.SENDER_EMAIL, APP_PASSWORD = _a.APP_PASSWORD, JWT_SECRET = _a.JWT_SECRET;
if (!SENDER_EMAIL || !APP_PASSWORD || !JWT_SECRET) {
    console.error("Missing required environment variables.");
    process.exit(1); // Stop execution if critical env variables are missing
}
var generateOTP = function () { return Math.floor(100000 + Math.random() * 900000).toString(); };
var sendOTP = function (email, generatedOTP) { return __awaiter(void 0, void 0, void 0, function () {
    var transporter, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("[INFO] Sending OTP to: ".concat(email));
                transporter = nodemailer.createTransport({
                    host: process.env.EMAIL_HOST || "smtp.gmail.com",
                    port: Number(process.env.EMAIL_PORT) || 587,
                    secure: false,
                    auth: {
                        user: SENDER_EMAIL,
                        pass: APP_PASSWORD,
                    },
                });
                return [4 /*yield*/, transporter.sendMail({
                        from: SENDER_EMAIL,
                        to: email,
                        subject: "OTP for Verification",
                        text: "Your OTP for email verification is: ".concat(generatedOTP),
                    })];
            case 1:
                _a.sent();
                console.log("[SUCCESS] OTP sent to: ".concat(email));
                return [2 /*return*/, true];
            case 2:
                error_1 = _a.sent();
                console.error("[ERROR] Failed to send OTP:", error_1);
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, fullName, password, emailLower, existingUser, otp, otpExpiry, otpSent, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, fullName = _a.fullName, password = _a.password;
                if (!email || !fullName || !password) {
                    res.status(400).json({ message: "All fields are required" });
                    return [2 /*return*/];
                }
                emailLower = email.toLowerCase();
                console.log("[INFO] Registering user: ".concat(emailLower));
                return [4 /*yield*/, user_model_1.default.findOne({ where: { email: emailLower } })];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    console.log("[WARN] User already exists: ".concat(emailLower));
                    res.status(400).json({ message: "User already exists" });
                    return [2 /*return*/];
                }
                otp = generateOTP();
                console.log("[INFO] Generated OTP for ".concat(emailLower, ": ").concat(otp));
                otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
                return [4 /*yield*/, sendOTP(emailLower, otp)];
            case 2:
                otpSent = _b.sent();
                if (!otpSent) {
                    console.error("[ERROR] Failed to send OTP to: ".concat(emailLower));
                    res.status(500).json({ message: "Failed to send OTP" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, otp_model_1.default.upsert({
                        email: emailLower,
                        otp: otp,
                        otp_expires: otpExpiry,
                    })];
            case 3:
                _b.sent();
                console.log("[SUCCESS] OTP stored for ".concat(emailLower, ", expires at: ").concat(otpExpiry));
                res.status(200).json({ message: "OTP sent to email" });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.error("[ERROR] Registration error:", error_2);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var verifyOTP = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, enteredOTP, password, fullName, emailLower, otpRecord, hashedPassword, photo, newUser, error_3;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                _a = req.body, email = _a.email, enteredOTP = _a.enteredOTP, password = _a.password, fullName = _a.fullName;
                emailLower = email.toLowerCase();
                console.log("[INFO] Verifying OTP for: ".concat(emailLower));
                return [4 /*yield*/, otp_model_1.default.findOne({
                        where: {
                            email: emailLower,
                            otp_expires: (_b = {}, _b[sequelize_1.Op.gte] = new Date(), _b),
                        },
                        order: [['otp_expires', 'DESC']],
                    })];
            case 1:
                otpRecord = _c.sent();
                if (!otpRecord || otpRecord.otp !== enteredOTP) {
                    console.log("[WARN] Invalid or expired OTP for ".concat(emailLower));
                    res.status(400).json({ message: "Invalid or expired OTP" });
                    return [2 /*return*/];
                }
                console.log("[SUCCESS] OTP verified for ".concat(emailLower));
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 2:
                hashedPassword = _c.sent();
                photo = "https://ui-avatars.com/api/?name=".concat(fullName.charAt(0).toUpperCase(), "&size=150");
                return [4 /*yield*/, user_model_1.default.create({
                        email: emailLower,
                        fullName: fullName,
                        password: hashedPassword,
                        photo: photo,
                        userType: "entrepreneur",
                    })];
            case 3:
                newUser = _c.sent();
                return [4 /*yield*/, otp_model_1.default.destroy({
                        where: { email: emailLower },
                    })];
            case 4:
                _c.sent();
                console.log("[SUCCESS] User registered: ".concat(emailLower));
                res.status(200).json({ message: "User registered successfully", user: newUser });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _c.sent();
                console.error("[ERROR] OTP verification error:", error_3);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.verifyOTP = verifyOTP;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, emailLower, user, isMatch, token, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                emailLower = email.toLowerCase();
                console.log("[INFO] Attempting login for: ".concat(emailLower));
                return [4 /*yield*/, user_model_1.default.findOne({ where: { email: emailLower } })];
            case 1:
                user = _b.sent();
                if (!user) {
                    console.log("[WARN] Login failed: No user found with email ".concat(emailLower));
                    res.status(400).json({ message: "Invalid credentials" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch) {
                    console.log("[WARN] Login failed: Incorrect password for ".concat(emailLower));
                    res.status(400).json({ message: "Invalid credentials" });
                    return [2 /*return*/];
                }
                token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
                console.log("[SUCCESS] Login successful for: ".concat(emailLower));
                res.status(200).json({
                    message: "Login successful",
                    token: token,
                    user: {
                        id: user.id,
                        email: user.email,
                        fullName: user.fullName,
                        photo: user.photo || "https://ui-avatars.com/api/?name=".concat(user.fullName.charAt(0).toUpperCase(), "&size=150"),
                    },
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                console.error("[ERROR] Login error:", error_4);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
