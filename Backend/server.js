import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import authRoutes from "./src/routes/auth.routes.js";
import employerRoutes from "./src/routes/employer.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Allow credentials
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import passport from "./src/config/passport.js";
app.use(passport.initialize());

app.use('/uploads', express.static('uploads'));
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Assuming uploads is in root (parent of src/backend?) Wait, verify cwd. 
// Standard structure: Backend/uploads. server.js is in Backend/. 
// So path.join(__dirname, 'uploads') if __dirname is Backend/
// But currently __filename is server.js (root of Backend). 
// ESM __dirname trick:
// If server.js is in e:\Jobifii\JOBIFFIK\Backend\server.js
// code: 
// const __dirname = path.resolve(); // Easier for root server.js
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send("jobiffi backend is running!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employer", employerRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
});

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
