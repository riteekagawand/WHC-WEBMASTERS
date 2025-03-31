import express, { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getCart, addToCart, removeFromCart } from "../controllers/cart.controller";

const router: Router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.delete("/remove/:id", authMiddleware, removeFromCart);

export default router;