import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import dotenv from "dotenv";

dotenv.config(".env");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Allow credentials
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("jobiffi backend is running!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
