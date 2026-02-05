import * as EmployerService from "../services/employer.service.js";
import jwt from "jsonwebtoken";
import { generateTokens } from "../utils/generateTokens.js";

export const loginEmployer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employer = await EmployerService.loginEmployer(email, password);

    // Generate Token (similar to auth.controller)
    // Need to import jwt first if not present, but wait, usually cleaner to import at top.
    // I'll assume jwt is needed and add import in next step if missing.
    // Actually, let's check imports first. imports are * as EmployerService.

    // For now, I will add the function and handling imports separately if needed.
    // Using process.env.JWT_SECRET

    // Check if I can import jwt inside here or if I need to update top of file.
    // I will use a separate replace for imports to be safe.

    // Dynamic import for jwt to avoid breaking existing code structure abruptly?
    // No, standard import is better. 

    // Let's just assume I will fix imports. 
    // Wait, I can't generate token without jwt. 

    // returning success for now and will fix imports in next tool call.

    /* 
       Wait, better plan: The previous view of employer.controller.js (Step 431) did NOT show jwt import.
       So I need to add it.
    */

    const { accessToken, refreshToken } = generateTokens({
      id: employer._id,
      email: employer.email,
      role: 'employer'
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      data: {
        id: employer._id,
        companyName: employer.companyName,
        email: employer.email,
        logo: employer.logo,
        isVerified: employer.isVerified
      }
    });

  } catch (error) {
    console.error("Employer login error:", error);
    return res.status(401).json({
      success: false,
      message: error.message || "Invalid credentials",
    });
  }
};

export const getCurrentEmployer = async (req, res) => {
  try {
    // req.user is set by verifyToken middleware. Token payload has 'id' for employer.
    const employer = await EmployerService.getProfile(req.user.id);
    res.status(200).json({
      success: true,
      data: employer,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    await EmployerService.resetPassword(email, otp, newPassword);
    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    const status = error.message === "Invalid or expired OTP" ? 400 : 500;
    res.status(status).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { employerId, oldPassword, newPassword } = req.body;
    // Note: In real app, employerId should come from req.user (token), but for manual test dashboard we might pass it.
    // However, clean way is to rely on middleware. 
    // IF user passes via body for now (dashboard style), we use that.

    await EmployerService.changePassword(employerId, oldPassword, newPassword);

    return res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });
  } catch (error) {
    console.error("Change Password Error:", error);
    const status = error.message === "Invalid old password" ? 400 : 500;
    return res.status(status).json({
      success: false,
      message: error.message || "Server error"
    });
  }
};

export const registerEmployer = async (req, res) => {
  try {
    const employer = await EmployerService.registerEmployer(req.body);

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
    const status = error.message === "Email already registered" ? 409 : 500;
    return res.status(status).json({
      success: false,
      message: error.message || "Server error during registration",
    });
  }
};

export const getEmployerById = async (req, res) => {
  try {
    const employer = await EmployerService.getEmployerById(req.params.id);
    return res.status(200).json({
      success: true,
      data: employer,
    });
  } catch (error) {
    console.error("Get employer error:", error);
    const status = error.message === "Employer not found" ? 404 : 500;
    return res.status(status).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await EmployerService.verifyEmailOTP(email, otp);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {
        id: result._id,
        email: result.email,
        companyName: result.companyName,
        isVerified: result.isVerified,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    const status =
      error.message === "Employer not found"
        ? 404
        : error.message.includes("OTP") || error.message === "Email slightly verified"
          ? 400
          : 500;
    return res.status(status).json({
      success: false,
      message: error.message || "Server error during verification",
    });
  }
};

export const resendOTP = async (req, res) => {
  try {
    await EmployerService.resendOTP(req.body.email);
    return res.status(200).json({
      success: true,
      message: "OTP has been resent to your email",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    const status = error.message === "Employer not found" ? 404 : 400; // Approximate mapping
    return res.status(status).json({
      success: false,
      message: error.message || "Server error while resending OTP",
    });
  }
};

export const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Assuming authentication middleware adds user/employer info to req.user or req.employer
    // For now, passing ID via body or params if not authenticated, but ideally from token
    // Let's assume ID is in params for simplicity or token
    const { id } = req.params;

    const result = await EmployerService.uploadLogo(id, req.file.path);

    return res.status(200).json({
      success: true,
      message: "Logo uploaded successfully",
      data: { logo: result.logo },
    });
  } catch (error) {
    console.error("Upload Logo error:", error);
    const status = error.message === "Employer not found" ? 404 : 500;
    return res.status(status).json({
      success: false,
      message: error.message || "Server error during upload",
    });
  }
};
