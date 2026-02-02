import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Otp from "../models/Otp.model.js";
import sendEmail from "../utils/sendEmailLogin.js";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile, workStatus } = req.body;

    console.log("RAW workStatus:", workStatus);

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedWorkStatus = workStatus.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    console.log("NORMALIZED workStatus:", normalizedWorkStatus);

    const allowedStatus = ["fresher", "experienced"];

    if (!allowedStatus.includes(normalizedWorkStatus)) {
        return res.status(400).json({
            success: false,
            message: "Invalid work status",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
   const { email, password } = req.body;

    const cleanEmail = email.trim().toLowerCase();

    // CHANGE: Only search by Email
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials", 
      });
    }

    // Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
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
        mobile: user.mobile, // We still send it back, but we don't login with it
        workStatus: user.workStatus
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// --- NEW FUNCTION: 1. Send OTP ---
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user exists first
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate 6-digit Code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save to DB
    await Otp.create({ email: normalizedEmail, otp: otpCode });

    // Send Email
    await sendEmail(normalizedEmail, otpCode ,user.name);

    res.status(200).json({ success: true, message: "OTP sent successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// --- NEW FUNCTION: 2. Verify OTP & Login ---
export const loginWithOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    // Find the OTP in database
    const otpRecord = await Otp.findOne({ email: normalizedEmail, otp });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // OTP is valid! Find user to get their details
    const user = await User.findOne({ email: normalizedEmail });

    // Generate Token (Same logic as password login)
    const token = jwt.sign(
      { userId: user._id, email: user.email, workStatus: user.workStatus },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "7d" }
    );

    // Delete used OTP so it can't be reused
    await Otp.deleteOne({ _id: otpRecord._id });

    // Send Success Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        workStatus: user.workStatus
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};