import express from "express";
import { registerUser, loginUser, sendOtp, loginWithOtp , forgotPassword, sendResetOtp, resetPasswordConfirm } from "../controllers/auth.controller.js";
import { validateRegister } from "../middlewares/validateRegister.js";
import { googleLogin } from "../controllers/auth.controller.js";


const router = express.Router();
router.post("/google", googleLogin);
router.post("/register", validateRegister, registerUser);
router.post("/login", loginUser);       // Option A: Password Login
router.post("/send-otp", sendOtp);      // Option B: Step 1 (Get Code)
router.post("/login-otp", loginWithOtp);// Option B: Step 2 (Submit Code)
router.post("/forgot-password", forgotPassword);
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password-confirm", resetPasswordConfirm);

export default router;
