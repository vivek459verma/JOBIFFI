import "./src/config/env.config.js";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import authRoutes from "./src/routes/auth.routes.js";
import employerRoutes from "./src/routes/employer.routes.js";
import resumeMakerRoutes from './src/routes/ResumeMaker.routes.js';
import dotenv from "dotenv";
import passport from "passport";
import "./src/config/passport.js"; // Ensure Passport strategies are configured

// 1. Load environment variables first!
dotenv.config();

// 2. Initialize the Express App
const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000"
];

// 3. Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (process.env.NODE_ENV !== "production") return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error('Not allowed by CORS'), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());



// 4. Routes
app.get("/", (req, res) => {
  res.send("jobiffi backend is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/employer", employerRoutes);
// ✅ Here is your Resume Maker route, safely placed after app is initialized!
app.use('/api/resumeMaker', resumeMakerRoutes);

// 5. Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
});

// 6. Start Server
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📧 Email verification enabled`);
    console.log(`🔐 OAuth (Google/LinkedIn) enabled`);
  });
};

startServer();