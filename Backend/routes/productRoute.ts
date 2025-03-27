// src/routes/productRoute.ts
import express from "express";
import { createProductWithImage } from "../controllers/productController"; // New controller function

const router = express.Router();

router.post("/", createProductWithImage); // Single endpoint for creating a product with image

export default router;