"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jwt = require("jsonwebtoken");
var JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // Ensure this is set
var authMiddleware = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            console.log("[WARN] No token provided.");
            res.status(401).json({ message: "Unauthorized: No token provided" });
            return;
        }
        var decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user data to request
        console.log("[INFO] User authenticated:", req.user);
        next(); // Proceed to next middleware/controller
    }
    catch (error) {
        console.error("[ERROR] Authentication failed:", error);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
