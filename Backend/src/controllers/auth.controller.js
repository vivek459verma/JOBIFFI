import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.model.js";
import Otp from "../models/OTP.model.js";
import Subscription from "../models/Subscription.model.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import sendEmail from "../utils/sendEmailLogin.js";
import sendResetEmail from "../utils/SendResetEmail.js";
import { resetPasswordTemplate } from "../utils/emailTemplate.js";
import { isPasswordSecure } from "../utils/passwordValidator.js";
import { cloudinary } from "../config/cloudinary.config.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * ✅ REGISTER USER (UNCHANGED - Your existing logic)
 */
export const registerUser = async (req, res) => {
  try {
    const body = req.body || {};
    const {
      fullName,
      email,
      password,
      mobile,
      workStatus,
      currentCity,
      communicationConsent,
      studentDetails
    } = body;

    // 1. Initial Parsing & Validation
    let parsedConsent = false;
    try {
      parsedConsent = typeof communicationConsent === 'string' ? JSON.parse(communicationConsent) : !!communicationConsent;
    } catch (e) {
      parsedConsent = !!communicationConsent;
    }

    let parsedStudent = undefined;
    if (workStatus === "STUDENT") {
      try {
        parsedStudent = typeof studentDetails === 'string' ? JSON.parse(studentDetails) : studentDetails;
      } catch (e) {
        console.error("Error parsing student details:", e);
      }
    }

    if (!fullName || !email || !password || !mobile || !workStatus || !currentCity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const allowedWorkStatus = ["FRESHER", "EXPERIENCED", "STUDENT"];
    if (!allowedWorkStatus.includes(workStatus)) {
      return res.status(400).json({ message: "Invalid work status" });
    }

    if (workStatus === "STUDENT" && (!parsedStudent || !parsedStudent.collegeName || !parsedStudent.degree || !parsedStudent.graduationYear)) {
      return res.status(400).json({ message: "Student details are required for student registration" });
    }

    // 2. Heavy Operations (Outside Transaction) - Parallelized
    const [existingUser, passwordHash] = await Promise.all([
      User.findOne({ email }),
      bcrypt.hash(password, 10)
    ]);

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    // 3. Database Write (Minimize Transaction Time)
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const consentObject = {
        sms: parsedConsent,
        email: parsedConsent,
        whatsapp: parsedConsent
      };

      const [user] = await User.create(
        [{
          fullName,
          email,
          passwordHash,
          mobile,
          workStatus,
          currentCity,
          communicationConsent: consentObject,
          studentDetails: workStatus === "STUDENT" ? parsedStudent : undefined,
          resume: null, // Set to null initially for speed
          role: "JOB_SEEKER",
          profileCompletion: workStatus === "STUDENT" ? 15 : 20,
          isEmailVerified: false,
          emailVerificationToken: verificationToken,
          emailVerificationExpires: Date.now() + 48 * 60 * 60 * 1000
        }],
        { session }
      );

      await Subscription.create(
        [{
          ownerId: user._id,
          ownerType: "USER",
          planName: "FREE",
          isActive: true
        }],
        { session }
      );

      await session.commitTransaction();

      // ✅ SUCCESS RESPONSE SENT IMMEDIATELY
      res.status(201).json({
        userId: user._id,
        message: "Registration successful. Please verify your email."
      });

      // 4. Background Tasks (Email & Resume Upload)
      // A. Send Verification Email
      sendVerificationEmail(user.email, verificationToken)
        .catch(err => console.error("Background task: Email failed:", err));

      // B. Background Resume Upload
      if (req.file && req.file.buffer) {
        (async () => {
          try {
            const b64 = req.file.buffer.toString("base64");
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;

            const uploadRes = await cloudinary.uploader.upload(dataURI, {
              folder: "resumes",
              resource_type: "raw",
              public_id: `${Date.now()}-${req.file.originalname.split(".")[0]}`
            });

            await User.findByIdAndUpdate(user._id, { resume: uploadRes.secure_url });
          } catch (uploadErr) {
            console.error("Background task: Resume upload failed:", uploadErr);
          }
        })();
      }

    } catch (innerError) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      throw innerError;
    } finally {
      session.endSession();
    }

  } catch (error) {
    console.error("Register error:", error);
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  }
};

/**
 * ✅ VERIFY EMAIL - FIXED TO REDIRECT TO LANDING PAGE
 */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    if (!token) {
      return res.redirect(`${frontendUrl}/?verified=false&reason=missing_token`);
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.redirect(`${frontendUrl}/?verified=false&reason=expired`);
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    // ✅ GENERATE TOKEN FOR AUTO-LOGIN
    const loginToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ REDIRECT TO AUTH CALLBACK TO LOG IN AUTOMATICALLY
    return res.redirect(`${frontendUrl}/auth/callback?token=${loginToken}&verified=true&status=verified`);

  } catch (error) {
    console.error("Verify email error:", error);
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    return res.redirect(`${frontendUrl}/?verified=false&reason=error`);
  }
};

/**
 * ✅ RESEND VERIFICATION EMAIL (UNCHANGED)
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
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    // Generate Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        workStatus: user.workStatus,
        mobile: user.mobile,
        currentCity: user.currentCity,
        profilePicture: user.profilePicture
      }
    });

  } catch (error) {
    console.error("❌ MANUAL LOGIN ERROR:", {
      message: error.message,
      stack: error.stack,
      body: req.body
    });
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

    // Send Email (Pass user.fullName for greeting)
    await sendEmail(normalizedEmail, otpCode, user.fullName);

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
      { userId: user._id, email: user.email },
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
        fullName: user.fullName,
        email: user.email,
        workStatus: user.workStatus,
        mobile: user.mobile,
        currentCity: user.currentCity,
        profilePicture: user.profilePicture
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
        fullName: name,
        email: normalizedEmail,
        passwordHash: hashedPassword,
        authProvider: "GOOGLE",
        isEmailVerified: true,
        // mobile: "", // Leave out to trigger onboarding
        // workStatus: "FRESHER", // Leave out to trigger onboarding
        profilePicture: picture
      });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Google Login successful",
      token: jwtToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        workStatus: user.workStatus,
        mobile: user.mobile,
        currentCity: user.currentCity,
        profilePicture: user.profilePicture
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
    const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const emailHtml = resetPasswordTemplate(link, user.fullName || "User");

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
    await sendEmail(user.email, otp, user.fullName || "User"); // Reuse existing OTP email function

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

    if (!isPasswordSecure(newPassword)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character."
      });
    }

    // Hash New Password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update User
    user.passwordHash = hashedPassword;
    await user.save();

    // Clean up OTP
    await Otp.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ success: true, message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Reset failed" });
  }
};

// --- 9. GET USER PROFILE (For OAuth Completion Check) ---
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-passwordHash -password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        workStatus: user.workStatus,
        mobile: user.mobile,
        currentCity: user.currentCity,
        profilePicture: user.profilePicture,
        resume: user.resume
      }
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// --- 10. UPDATE USER PROFILE (For OAuth Completion) ---
export const updateProfile = async (req, res) => {
  try {
    const { mobile, workStatus, currentCity, fullName, resume } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update fields
    if (mobile) user.mobile = mobile;
    if (workStatus) user.workStatus = workStatus;
    if (currentCity) user.currentCity = currentCity;
    if (fullName) user.fullName = fullName;
    if (resume) user.resume = resume;

    // Update profile completion score if needed
    if (user.mobile && user.workStatus && user.currentCity && user.profileCompletion < 50) {
      user.profileCompletion = 50;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        fullName: user.fullName || user.name,
        email: user.email,
        workStatus: user.workStatus,
        mobile: user.mobile,
        currentCity: user.currentCity,
        profilePicture: user.profilePicture,
        resume: user.resume
      }
    });

  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};