import express from "express";
import { register, login, getUser } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = express.Router();

// Directly use the controller functions
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getUser); // Protected route

export default router;
