// import bcrypt from "bcrypt";
// import crypto from "crypto";
// import User from "../models/User.model.js";
// import Subscription from "../models/Subscription.model.js";
// import { sendVerificationEmail } from "../utils/sendEmail.js";

// /**
//  * REGISTER USER (JOB SEEKER)
//  */
// export const registerUser = async (req, res) => {
//   console.log("🔥 REGISTER API HIT");

//   try {
//     const {
//       fullName,
//       email,
//       password,
//       mobile,
//       workStatus,
//       currentCity,
//       communicationConsent
//     } = req.body;

//     if (!fullName || !email || !password || !mobile || !workStatus || !currentCity) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       fullName,
//       email,
//       passwordHash,
//       mobile,
//       workStatus,
//       currentCity,
//       communicationConsent,
//       role: "JOB_SEEKER",
//       profileCompletion: 20,
//       isEmailVerified: false
//     });

//     const verificationToken = crypto.randomBytes(32).toString("hex");
//     user.emailVerificationToken = verificationToken;
//     user.emailVerificationExpires = Date.now() + 48 * 60 * 60 * 1000; 

//     await user.save();

//     // 📧 Send professional email using juice-inlined template
//     await sendVerificationEmail(user.email, verificationToken);

//     await Subscription.create({
//       ownerId: user._id,
//       ownerType: "USER",
//       planName: "FREE",
//       isActive: true
//     });

//     return res.status(201).json({
//       userId: user._id,
//       message: "Registration successful. Please verify your email."
//     });

//   } catch (error) {
//     console.error("Register error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// /**
//  * VERIFY EMAIL
//  * Handles the click from the email button
//  */
// export const verifyEmail = async (req, res) => {
//   try {
//     const { token } = req.query;
//     const loginUrl = process.env.FRONTEND_LOGIN_URL;

//     if (!token) {
//       return res.redirect(`${loginUrl}?status=invalid`);
//     }

//     const user = await User.findOne({
//       emailVerificationToken: token,
//       emailVerificationExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.redirect(`${loginUrl}?status=expired`);
//     }

//     user.isEmailVerified = true;
//     user.emailVerificationToken = undefined;
//     user.emailVerificationExpires = undefined;
//     await user.save();

//     // ✅ Redirect to Login with Success Flag for the pop-up
//     return res.redirect(`${loginUrl}?status=verified`);

//   } catch (error) {
//     console.error("Verify email error:", error);
//     return res.redirect(`${process.env.FRONTEND_LOGIN_URL}?status=error`);
//   }
// };

// /**
//  * RESEND VERIFICATION EMAIL
//  */
// export const resendVerificationEmail = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.isEmailVerified) {
//       return res.status(400).json({ message: "Email already verified" });
//     }

//     const token = crypto.randomBytes(32).toString("hex");
//     user.emailVerificationToken = token;
//     user.emailVerificationExpires = Date.now() + 48 * 60 * 60 * 1000;
//     await user.save();

//     await sendVerificationEmail(user.email, token);

//     return res.json({ message: "Verification email resent successfully" });

//   } catch (error) {
//     console.error("Resend verification error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.model.js";
import Subscription from "../models/Subscription.model.js";
import Otp from "../models/OTP.model.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import sendEmail from "../utils/sendEmailLogin.js";
import sendResetEmail from "../utils/SendResetEmail.js";
import { resetPasswordTemplate } from "../utils/emailTemplate.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * REGISTER USER (JOB SEEKER) - Email Verification Version
 */
export const registerUser = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const {
      fullName,
      email,
      password,
      mobile,
      workStatus, // FRESHER | EXPERIENCED | STUDENT
      currentCity,
      communicationConsent,

      // NEW (only for students)
      studentDetails // { collegeName, degree, graduationYear }
    } = req.body;

    // Basic validation
    if (!fullName || !email || !password || !mobile || !workStatus || !currentCity) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate workStatus
    const allowedWorkStatus = ["FRESHER", "EXPERIENCED", "STUDENT"];
    if (!allowedWorkStatus.includes(workStatus)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid work status" });
    }

    // Student-specific validation
    if (workStatus === "STUDENT") {
      if (
        !studentDetails ||
        !studentDetails.collegeName ||
        !studentDetails.degree ||
        !studentDetails.graduationYear
      ) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          message: "Student details are required for student registration"
        });
      }
    }

    // Check existing user
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create user
    const [user] = await User.create(
      [{
        fullName,
        email,
        passwordHash,
        mobile,
        workStatus,
        currentCity,
        communicationConsent,

        // Student block (stored only if STUDENT)
        studentDetails: workStatus === "STUDENT" ? studentDetails : undefined,

        role: "JOB_SEEKER",
        profileCompletion: workStatus === "STUDENT" ? 15 : 20,
        isEmailVerified: false,
        emailVerificationToken: verificationToken,
        emailVerificationExpires: Date.now() + 48 * 60 * 60 * 1000
      }],
      { session }
    );

    // Create subscription
    await Subscription.create(
      [{
        ownerId: user._id,
        ownerType: "USER",
        planName: "FREE",
        isActive: true
      }],
      { session }
    );

    // Commit DB changes
    await session.commitTransaction();
    session.endSession();

    // Respond first
    res.status(201).json({
      userId: user._id,
      message: "Registration successful. Please verify your email."
    });

    // Email outside transaction
    sendVerificationEmail(user.email, verificationToken)
      .catch(err => console.error("Email send failed:", err));

  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();

    console.error("Register error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * VERIFY EMAIL
 */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const loginUrl = process.env.FRONTEND_LOGIN_URL;

    if (!token) {
      return res.redirect(`${loginUrl}?status=invalid`);
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.redirect(`${loginUrl}?status=expired`);
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    return res.redirect(`${loginUrl}?status=verified`);
  } catch (error) {
    console.error("Verify email error:", error);
    return res.redirect(`${process.env.FRONTEND_LOGIN_URL}?status=error`);
  }
};

/**
 * RESEND VERIFICATION EMAIL
 */
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.emailVerificationToken = token;
    user.emailVerificationExpires = Date.now() + 48 * 60 * 60 * 1000;
    await user.save();

    sendVerificationEmail(user.email, token)
      .catch(err => console.error("Resend email failed:", err));

    return res.json({
      message: "Verification email resent successfully"
    });

  } catch (error) {
    console.error("Resend verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// --- 2. LOGIN USER (EMAIL & PASSWORD) ---
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = email.trim().toLowerCase();

    // Strict Email Check
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    // Generate Token
    const token = jwt.sign(
      { userId: user._id, email: user.email, workStatus: user.workStatus },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        workStatus: user.workStatus
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// --- 3. SEND OTP (WITH NAME) ---
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate 6-digit Code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to DB
    await Otp.create({ email: normalizedEmail, otp: otpCode });

    // Send Email (Pass user.name for greeting)
    await sendEmail(normalizedEmail, otpCode, user.name);

    res.status(200).json({ success: true, message: "OTP sent successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// --- 4. VERIFY OTP & LOGIN ---
export const loginWithOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    // Find the OTP
    const otpRecord = await Otp.findOne({ email: normalizedEmail, otp });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    // Generate Token
    const token = jwt.sign(
      { userId: user._id, email: user.email, workStatus: user.workStatus },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "7d" }
    );

    // Delete used OTP
    await Otp.deleteOne({ _id: otpRecord._id });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        workStatus: user.workStatus
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// --- 5. GOOGLE LOGIN (NEW) ---
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();
    const normalizedEmail = email.toLowerCase();

    // Check if user exists
    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      // Create new user if not exists (Random password)
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        name: name,
        email: normalizedEmail,
        password: hashedPassword,
        mobile: "", // Optional
        workStatus: "fresher", // Default
        profilePicture: picture // If your model has this field
      });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email, workStatus: user.workStatus },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Google Login successful",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        workStatus: user.workStatus
      }
    });

  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(401).json({ success: false, message: "Invalid Google Token" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // Security: Don't reveal if user exists, just say sent
      return res.status(200).json({ success: true, message: "If email exists, link sent." });
    }

    // Create a temporary token (valid for 15 mins)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Create the Link (Points to your Frontend)
    const link = `http://localhost:5173/reset-password?token=${token}`;
    const emailHtml = resetPasswordTemplate(link, user.name);

    await sendResetEmail(email, emailHtml);

    res.status(200).json({ success: true, message: "Reset link sent to email" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// --- 7. SEND OTP FOR RESET (Step 1 on Page) ---
export const sendResetOtp = async (req, res) => {
  try {
    const { token } = req.body; // Token from the URL

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json({ success: false, message: "Invalid token" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.create({ email: user.email, otp });

    // Send OTP Email
    await sendEmail(user.email, otp, user.name); // Reuse existing OTP email function

    res.status(200).json({ success: true, message: "OTP sent to email" });

  } catch (error) {
    res.status(400).json({ success: false, message: "Link expired or invalid" });
  }
};

// --- 8. CONFIRM PASSWORD RESET (Step 2 on Page) ---
export const resetPasswordConfirm = async (req, res) => {
  try {
    const { token, otp, newPassword } = req.body;

    // Verify Token again
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ success: false, message: "Invalid User" });

    // Verify OTP
    const otpRecord = await Otp.findOne({ email: user.email, otp });
    if (!otpRecord) return res.status(400).json({ success: false, message: "Invalid OTP" });

    // Hash New Password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update User
    user.password = hashedPassword;
    await user.save();

    // Clean up OTP
    await Otp.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ success: true, message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Reset failed" });
  }
};