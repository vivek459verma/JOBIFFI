import express from "express";
import { registerUser, loginUser, sendOtp, loginWithOtp } from "../controllers/auth.controller.js";
import { validateRegister } from "../middlewares/validateRegister.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", loginUser);       // Option A: Password Login
router.post("/send-otp", sendOtp);      // Option B: Step 1 (Get Code)
router.post("/login-otp", loginWithOtp);// Option B: Step 2 (Submit Code)

export default router;
