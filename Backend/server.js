import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import authRoutes from "./src/routes/auth.routes.js";
import employerRoutes from "./src/routes/employer.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

// fix _dirname issue in ES modules ==> new
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Allow credentials
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api test
app.get("/", (req, res) => {
  res.send("jobiffi backend is running!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employer", employerRoutes);

// server fronted build n ====> new
app.use(express.static(path.join(_dirname, "Frontend/dist")));

// fallback to index.html for SPA routing ===> new
app.get("*",(req, res) => {
  res.sendFile(path.join(_dirname, "Frontend/dist/index.html"));
})

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
});

// start server
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
