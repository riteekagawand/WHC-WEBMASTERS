import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
  })
  .catch((error) => console.error("Database connection error:", error));
