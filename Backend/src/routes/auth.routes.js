import express from "express";
import { registerUser , loginUser } from "../controllers/auth.controller.js";
import { validateRegister } from "../middlewares/validateRegister.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);

router.post("/login", loginUser);

export default router;
