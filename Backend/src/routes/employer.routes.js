import express from "express";
import {
  registerEmployer,
  getEmployerById,
  verifyEmailOTP,
  resendOTP,
} from "../controllers/employer.controller.js";
import { validateEmployerRegister } from "../middlewares/validateEmployerRegister.js";

const router = express.Router();

// Employer registration
router.post("/register", validateEmployerRegister, registerEmployer);

// Verify email with OTP
router.post("/verify-email", verifyEmailOTP);

// Resend OTP
router.post("/resend-otp", resendOTP);

// Get employer by ID
router.get("/:id", getEmployerById);

export default router;
