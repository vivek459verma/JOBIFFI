import "./src/config/env.config.js";

import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import authRoutes from "./src/routes/auth.routes.js";
import passport from "./src/config/passport.js";
import employerRoutes from "./src/routes/employer.routes.js";
import atsRoutes from './src/routes/ATS.routes.js';

const app = express();
const port = process.env.PORT || 8000;

// CORS Configuration
const allowedOrigins = process.env.FRONTEND_URL.split(',');

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (process.env.NODE_ENV !== "production") return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
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

app.use('/api/ats', atsRoutes);

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
