import express, { Express, Router } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import sequelize from "./config/db";
import userRoute from "./routes/user.route";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Route setup
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoutes);

// Function to log all routes recursively
const logRoutes = (routerStack: any[], prefix: string = ""): void => {
  routerStack.forEach((layer) => {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods).join(", ").toUpperCase();
      console.log(`Route: ${prefix}${layer.route.path}, Methods: ${methods}`);
    } else if (layer.name === "router" && layer.handle.stack) {
      // Nested router (e.g., from cartRoutes)
      const routePrefix = layer.regexp.source
        .replace("^\\", "")
        .replace("\\/?(?=\\/|$)", "")
        .replace(/\\\//g, "/");
      logRoutes(layer.handle.stack, prefix + routePrefix);
    }
  });
};

// Handle unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.url} not found` });
});

// Database connection
sequelize
  .sync()
  .then(() => {
    console.log("✅ Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      // Log routes after server starts
      logRoutes(app._router.stack);
    });
  })
  .catch((error) => console.error("❌ Database connection error:", error));

export default app; // Optional: export for testing or modular use