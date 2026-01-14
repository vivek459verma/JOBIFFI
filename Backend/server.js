import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Allow credentials
  })
);

app.get("/", (req, res) => {
  res.send("jobiffi backend is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
