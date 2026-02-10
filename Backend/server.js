// ⚠️ IMPORTANT: This must be the very first import
// In ES modules, ALL imports are hoisted before any code runs
// So we use a separate env loader file to ensure dotenv loads first
import "./src/config/env.config.js";

import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import authRoutes from "./src/routes/auth.routes.js";
import passport from "./src/config/passport.js";
import employerRoutes from "./src/routes/employer.routes.js";

const app = express();
const port = process.env.PORT || 8000;

// CORS Configuration
app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL
      : process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport (for OAuth)
app.use(passport.initialize());

// Health Check Route
app.get("/", (req, res) => {
  res.send("jobiffi backend is running!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/employer", employerRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📧 Email verification enabled`);
    console.log(`🔐 OAuth (Google/LinkedIn) enabled`);
  });
};

startServer();