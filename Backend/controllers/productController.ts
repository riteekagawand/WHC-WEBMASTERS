// src/controllers/productController.ts
import { Request, Response } from "express";
import { createProduct } from "../model/productModel";
import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary (already done in cloudinaryConfig.ts, but ensure consistency)
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Set up Multer for memory storage (to handle FormData)
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

export const createProductWithImage = async (req: Request, res: Response) => {
  // Use Multer middleware to process the FormData
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }

    // Check if all required fields are present
    const { name, description, price } = req.body;
    if (!name || !description || !price || !req.file) {
      return res.status(400).json({ error: "All fields (name, description, price, image) are required" });
    }

    try {
      // Upload image to Cloudinary
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: "products" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ error: "Cloudinary upload failed" });
          }

          const imageUrl = result?.secure_url;

          if (!imageUrl) {
            return res.status(500).json({ error: "Failed to retrieve image URL" });
          }

          // Save product to PostgreSQL
          try {
            const newProduct = await createProduct(
              name,
              description,
              parseFloat(price), // Convert price to number
              imageUrl
            );
            res.status(201).json(newProduct);
          } catch (dbError) {
            res.status(500).json({ error: "Database error" });
          }
        }
      );

      // Pipe the file buffer to Cloudinary
      uploadStream.end(req.file.buffer);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
};