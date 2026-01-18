import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import authRoutes from "./src/routes/auth.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, // Allow credentials
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("jobiffi backend is running!");
});
app.use("/api/auth", authRoutes);

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
