"use strict";
// import * as express from "express";
// import { Request, Response } from "express";
// import * as dotenv from "dotenv";
// import User from "../models/user.model";
// dotenv.config();
// const router = express.Router();
// export const addUserDetails = async (req: Request, res: Response): Promise<Response> => {
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
//     } = req.body;
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     const user = await User.findByPk(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const formattedServicesProducts =
//       typeof servicesProducts === "string"
//         ? servicesProducts.split(",").map((item) => item.trim())
//         : servicesProducts;
//     await user.update({
//       businessName: businessName || user.businessName,
//       contactNumber: contactNumber || user.contactNumber,
//       industry: industry || user.industry,
//       businessDescription: businessDescription || user.businessDescription,
//       servicesProducts: formattedServicesProducts || user.servicesProducts,
//       socialMedia: socialMedia || user.socialMedia,
//       yearsInBusiness: yearsInBusiness || user.yearsInBusiness,
//       address: address || user.address,
//     });
//     const userDetails = {
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
//     return res.status(200).json({ message: "Your details added successfully", user: userDetails });
//   } catch (error) {
//     console.error("Error adding business details:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
// export default router;
