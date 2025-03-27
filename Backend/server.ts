import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/dbConfig";
import productRoutes from "./routes/productRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established ✅");
    await sequelize.sync({ alter: true }); // Alter tables if needed (dev only)
    console.log("Database synced ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
  } catch (error) {
    console.error("Failed to start server due to database error:", error);
    process.exit(1);
  }
};

startServer();