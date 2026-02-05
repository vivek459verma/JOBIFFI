import express from "express";
import {
  registerEmployer,
  loginEmployer,
  changePassword,
  getEmployerById,
  verifyEmailOTP,
  resendOTP,
  uploadLogo,
  getCurrentEmployer,
  resetPassword,
} from "../controllers/employer.controller.js";
import { validateEmployerRegister } from "../middlewares/validateEmployerRegister.js";
import upload from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get Current Employer (Protected)
router.get("/me", verifyToken, getCurrentEmployer);

// Employer registration
router.post("/register", validateEmployerRegister, registerEmployer);

// Employer login
router.post("/login", loginEmployer);

// Change Password
router.post("/change-password", changePassword);

// Reset Password (Forgot Password)
router.post("/reset-password", resetPassword); // New Route

// Verify email with OTP
router.post("/verify-email", verifyEmailOTP);

// Resend OTP
router.post("/resend-otp", resendOTP);

// Upload Logo
router.post("/:id/upload-logo", upload.single("logo"), uploadLogo);

// Get employer by ID
router.get("/:id", getEmployerById);

export default router;
