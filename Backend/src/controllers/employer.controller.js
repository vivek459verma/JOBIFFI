import * as EmployerService from "../services/employer.service.js";

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
