import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


// test route
app.get("/", (req, res) => {
  res.send("JOBIFFI backend running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
