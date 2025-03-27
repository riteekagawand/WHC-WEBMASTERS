// src/cloudinaryConfig.ts
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,      // Updated to match .env
  api_key: process.env.CLOUD_API_KEY,      // Updated to match .env
  api_secret: process.env.CLOUD_API_SECRET, // Updated to match .env
});

export default cloudinary;