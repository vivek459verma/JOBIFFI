import express from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import {
  registerUser,
  verifyEmail,
  resendVerificationEmail,
  loginUser,
  sendOtp,
  loginWithOtp,
  googleLogin,
  forgotPassword,
  sendResetOtp,
  resetPasswordConfirm
} from "../controllers/auth.controller.js";
import { validateRegister } from "../middlewares/validateRegister.js";
import { registerLimiter } from "../middlewares/rateLimit.js";

const router = express.Router();

// Email Verification Routes (from feature branch)
router.post("/register", registerLimiter, validateRegister, registerUser);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", registerLimiter, resendVerificationEmail);

// Password & OTP Login Routes (from main)
router.post("/login", loginUser);           // Password Login
router.post("/send-otp", sendOtp);          // OTP Login Step 1
router.post("/login-otp", loginWithOtp);    // OTP Login Step 2

// Google Login (direct API from main)
router.post("/google", googleLogin);

// Password Reset Routes (from main)
router.post("/forgot-password", forgotPassword);
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password-confirm", resetPasswordConfirm);

// OAuth Routes via Passport (from feature branch)
router.get(
  "/google/oauth",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed` }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&provider=google`);
  }
);

router.get(
  "/linkedin",
  passport.authenticate("linkedin", { state: "SOME_RANDOM_STRING" })
);

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=linkedin_failed` }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&provider=linkedin`);
  }
);

export default router;