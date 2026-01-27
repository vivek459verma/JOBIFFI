import bcrypt from "bcrypt";
import Employer from "../models/Employer.model.js";
import {
  generateOTP,
  sendOTPEmail,
  sendVerificationSuccessEmail,
} from "../utils/EmployerEmailService.js";

export const registerEmployer = async (req, res) => {
  try {
    const {
      companyName,
      email,
      password,
      contactPerson,
      mobile,
      companySize,
      industry,
      website,
      address,
      description,
    } = req.body;

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists
    const existingEmail = await Employer.findOne({ email: normalizedEmail });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Create employer
    const employer = await Employer.create({
      companyName,
      email: normalizedEmail,
      password: hashedPassword,
      contactPerson,
      mobile,
      companySize,
      industry,
      website,
      address,
      description,
      emailVerificationOTP: otp,
      otpExpiry: otpExpiry,
    });

    // Send OTP email
    const emailResult = await sendOTPEmail(normalizedEmail, otp, companyName);

    if (!emailResult.success) {
      // If email fails, still return success but notify about email issue
      console.error("Failed to send OTP email:", emailResult.error);
    }

    // Return success response (excluding password and OTP)
    const employerResponse = {
      id: employer._id,
      companyName: employer.companyName,
      email: employer.email,
      contactPerson: employer.contactPerson,
      mobile: employer.mobile,
      companySize: employer.companySize,
      industry: employer.industry,
      website: employer.website,
      isVerified: employer.isVerified,
      createdAt: employer.createdAt,
    };

    return res.status(201).json({
      success: true,
      message:
        "Employer registered successfully. Please check your email for OTP verification.",
      data: employerResponse,
    });
  } catch (error) {
    console.error("Employer registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

export const getEmployerById = async (req, res) => {
  try {
    const { id } = req.params;

    const employer = await Employer.findById(id).select("-password");

    if (!employer) {
      return res.status(404).json({
        success: false,
        message: "Employer not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: employer,
    });
  } catch (error) {
    console.error("Get employer error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find employer by email
    const employer = await Employer.findOne({ email: normalizedEmail });

    if (!employer) {
      return res.status(404).json({
        success: false,
        message: "Employer not found",
      });
    }

    // Check if already verified
    if (employer.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    // Check if OTP exists
    if (!employer.emailVerificationOTP) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new OTP.",
      });
    }

    // Check if OTP has expired
    if (new Date() > employer.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    // Verify OTP
    if (employer.emailVerificationOTP !== otp.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Update employer as verified and clear OTP
    employer.isVerified = true;
    employer.emailVerificationOTP = null;
    employer.otpExpiry = null;
    await employer.save();

    // Send verification success email
    await sendVerificationSuccessEmail(normalizedEmail, employer.companyName);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {
        id: employer._id,
        email: employer.email,
        companyName: employer.companyName,
        isVerified: employer.isVerified,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during verification",
    });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find employer by email
    const employer = await Employer.findOne({ email: normalizedEmail });

    if (!employer) {
      return res.status(404).json({
        success: false,
        message: "Employer not found",
      });
    }

    // Check if already verified
    if (employer.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Update employer with new OTP
    employer.emailVerificationOTP = otp;
    employer.otpExpiry = otpExpiry;
    await employer.save();

    // Send OTP email
    const emailResult = await sendOTPEmail(
      normalizedEmail,
      otp,
      employer.companyName,
    );

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP has been resent to your email",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while resending OTP",
    });
  }
};
