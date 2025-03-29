"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres", // Change according to your database (mysql, sqlite, etc.)
    logging: false, // Set to true if you want query logs
});
sequelize
    .authenticate()
    .then(() => console.log("Database connected"))
    .catch((error) => console.error("Database connection error:", error));
exports.default = sequelize;
