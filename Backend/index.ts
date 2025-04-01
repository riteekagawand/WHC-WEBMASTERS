import express = require("express");
import cors = require("cors");
import * as dotenv from "dotenv";
import sequelize from "./config/db";
import userRoute from "./routes/user.route";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: '*',  // This allows all domains to access your server
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoute);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
  })
  .catch((error) => console.error("Database connection error:", error));