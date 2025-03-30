"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jwt = require("jsonwebtoken");
var JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
}
var authMiddleware = function (req, res, next) {
    var _a;
    var token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
    }
    try {
        var decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Now correctly typed
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
