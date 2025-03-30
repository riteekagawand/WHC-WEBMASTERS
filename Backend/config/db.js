"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var dotenv = require("dotenv");
dotenv.config();
// Ensure the database URL is available
var DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    throw new Error("❌ DATABASE_URL is not defined in the environment variables.");
}
var sequelize = new sequelize_1.Sequelize(DATABASE_URL, {
    dialect: "postgres",
    logging: process.env.DB_LOGGING === "true" ? console.log : false,
});
sequelize
    .authenticate()
    .then(function () { return console.log("✅ Database connected successfully."); })
    .catch(function (error) { return console.error("❌ Database connection error:", error); });
exports.default = sequelize;
