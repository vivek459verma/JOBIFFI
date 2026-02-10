import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import authRoutes from "./src/routes/auth.routes.js";
import passport from "./src/config/passport.js"; // OAuth passport config
import employerRoutes from "./src/routes/employer.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS Configuration
app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL
      : process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport (for OAuth)
app.use(passport.initialize());

// Routes
app.get("/", (req, res) => {
  res.send("jobiffi backend is running!");
});

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