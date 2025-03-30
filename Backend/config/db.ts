import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

// Ensure the database URL is available
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined in the environment variables.");
}

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: process.env.DB_LOGGING === "true" ? console.log : false,
});

sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected successfully."))
  .catch((error: any) => console.error("❌ Database connection error:", error));

export default sequelize;
