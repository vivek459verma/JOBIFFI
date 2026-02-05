import express from "express";
import { registerUser, loginUser, sendOtp, loginWithOtp, changePassword, resetPassword, getMe } from "../controllers/auth.controller.js";
import { validateRegister } from "../middlewares/validateRegister.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", loginUser);       // Option A: Password Login
router.post("/send-otp", sendOtp);      // Option B: Step 1 (Get Code)
router.post("/login-otp", loginWithOtp);// Option B: Step 2 (Submit Code)
router.post("/change-password", changePassword);
router.post("/reset-password", resetPassword); // Forgot Password
router.get("/me", verifyToken, getMe); // Get Current User

import passport from "passport";

// Google Auth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=GoogleAuthFailed` }),
    (req, res) => {
        // Successful authentication, redirect home.
        // We need to generate tokens here and redirect to frontend with tokens
        // But we can't do logic here easily, better to call a controller or do it inline.
        // Inline is fine for now as it's a redirect.
        // Actually, we need to import generateTokens.
        res.redirect(`/api/auth/google/success?id=${req.user._id}`);
    }
);

import { googleAuthSuccess } from "../controllers/auth.controller.js";
router.get("/google/success", googleAuthSuccess);

export default router;
