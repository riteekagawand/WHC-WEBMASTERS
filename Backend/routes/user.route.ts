import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
const router = express.Router();
// import { deployPortfolio } from "../controllers/user.controller";

// router.post("/deployportfolio", authMiddleware, deployPortfolio);

export default router;
