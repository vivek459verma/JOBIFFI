import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library"; // Required for Google Login
import User from "../models/User.model.js";
import Otp from "../models/Otp.model.js";
import sendEmail from "../utils/sendEmailLogin.js";
import { resetPasswordTemplate } from "../utils/emailTemplate.js";
import sendResetEmail from "../utils/SendResetEmail.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// --- 1. REGISTER USER ---
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile, workStatus } = req.body;

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedWorkStatus = workStatus.trim().toLowerCase();

    // Check if email already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Validate Work Status
    const allowedStatus = ["fresher", "experienced"];
    if (!allowedStatus.includes(normalizedWorkStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid work status",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      mobile, 
      workStatus: normalizedWorkStatus,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
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