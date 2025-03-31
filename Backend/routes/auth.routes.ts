import express = require("express");
import { register, login, verifyOTP } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

// Use async wrapper to handle errors
router.post("/register", async (req, res) => register(req, res));
router.post("/login", async (req, res) => login(req, res));
router.post("/verify-otp", async (req, res) => verifyOTP(req, res));

export default router;