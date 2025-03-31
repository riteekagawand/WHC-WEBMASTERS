import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

// Define the structure of the decoded JWT payload
interface JwtPayload {
  id: number;
}

// Extend the Request type to include the user property
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const JWT_SECRET: string = process.env.JWT_SECRET || "default_secret"; // Ensure this is set

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      console.log("[WARN] No token provided.");
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded; // Attach user data to request

    console.log("[INFO] User authenticated:", req.user);
    next(); // Proceed to next middleware/controller
  } catch (error) {
    console.error("[ERROR] Authentication failed:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};