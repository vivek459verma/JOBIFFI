import express from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { registerValidation } from "../middlewares/validateRegister.js";

const router = express.Router();

router.post("/register", registerValidation, registerUser);

export default router;
