// import express from "express";
// import { registerUser, verifyEmail, resendVerificationEmail } from "../controllers/auth.controller.js";
// import { validateRegister } from "../middlewares/validateRegister.js";
// import { registerLimiter } from "../middlewares/rateLimit.js";

// const router = express.Router();

// router.post("/register", registerLimiter, validateRegister, registerUser);
// router.get("/verify-email", verifyEmail);

// // Added rate limiting to resend to prevent email spam/abuse
// router.post("/resend-verification", registerLimiter, resendVerificationEmail);

// export default router;

import express from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import { registerUser, verifyEmail, resendVerificationEmail } from "../controllers/auth.controller.js";
import { validateRegister } from "../middlewares/validateRegister.js";
import { registerLimiter } from "../middlewares/rateLimit.js";

const router = express.Router();

// Existing routes
router.post("/register", registerLimiter, validateRegister, registerUser);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", registerLimiter, resendVerificationEmail);

// 🆕 GOOGLE OAUTH ROUTES
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed` }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign(
      { userId: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&provider=google`);
  }
);

// 🆕 LINKEDIN OAUTH ROUTES
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