import Employer from "../models/Employer.model.js";
import Otp from "../models/Otp.model.js";
import {
    generateOTP,
    sendOTPEmail,
    sendVerificationSuccessEmail,
} from "../utils/EmployerEmailService.js";

export const registerEmployer = async (data) => {
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
    } = data;

    const normalizedEmail = email.trim().toLowerCase();

    const existingEmail = await Employer.findOne({ email: normalizedEmail });
    if (existingEmail) {
        throw new Error("Email already registered");
    }

    // Password hashing handled by pre('save') hook
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const employer = await Employer.create({
        companyName,
        email: normalizedEmail,
        password,
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

    const emailResult = await sendOTPEmail(normalizedEmail, otp, companyName);
    if (!emailResult.success) {
        console.error("Failed to send OTP email:", emailResult.error);
    }

    return employer;
};

export const getEmployerById = async (id) => {
    const employer = await Employer.findById(id).select("-password");
    if (!employer) {
        throw new Error("Employer not found");
    }
    return employer;
};

export const getProfile = async (id) => {
    const employer = await Employer.findById(id).select("-password");
    if (!employer) throw new Error("Employer not found");
    return employer;
};

export const verifyEmailOTP = async (email, otp) => {
    if (!email || !otp) {
        throw new Error("Email and OTP are required");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const employer = await Employer.findOne({ email: normalizedEmail });

    if (!employer) {
        throw new Error("Employer not found");
    }

    if (employer.isVerified) {
        throw new Error("Email already verified");
    }

    if (!employer.emailVerificationOTP) {
        throw new Error("No OTP found. Please request a new OTP.");
    }

    if (new Date() > employer.otpExpiry) {
        throw new Error("OTP has expired. Please request a new OTP.");
    }

    if (employer.emailVerificationOTP !== otp.trim()) {
        throw new Error("Invalid OTP");
    }

    employer.isVerified = true;
    employer.emailVerificationOTP = null;
    employer.otpExpiry = null;
    await employer.save();

    await sendVerificationSuccessEmail(normalizedEmail, employer.companyName);

    return employer;
};

export const resendOTP = async (email) => {
    if (!email) {
        throw new Error("Email is required");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const employer = await Employer.findOne({ email: normalizedEmail });

    if (!employer) {
        throw new Error("Employer not found");
    }

    if (employer.isVerified) {
        throw new Error("Email already verified");
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    employer.emailVerificationOTP = otp;
    employer.otpExpiry = otpExpiry;
    await employer.save();

    const emailResult = await sendOTPEmail(normalizedEmail, otp, employer.companyName);

    if (!emailResult.success) {
        throw new Error("Failed to send OTP email. Please try again.");
    }

    return true;
};

export const loginEmployer = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const employer = await Employer.findOne({ email: normalizedEmail });

    if (!employer) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await employer.matchPassword(password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return employer;
};

export const changePassword = async (employerId, oldPassword, newPassword) => {
    const employer = await Employer.findById(employerId);
    if (!employer) {
        throw new Error("Employer not found");
    }

    const isMatch = await employer.matchPassword(oldPassword);
    if (!isMatch) {
        throw new Error("Invalid old password");
    }

    employer.password = newPassword; // Hook hashes it
    await employer.save();
    return true;
};

export const resetPassword = async (email, otp, newPassword) => {
    // 1. Verify OTP (reuses same OTP model/logic as auth service, assuming generic Otp model)
    // Actually, Otp model is shared.
    const normalizedEmail = email.trim().toLowerCase();

    // Note: We need to import Otp model here if not present.
    // Checking imports... yes, Otp is NOT imported in employer.service.js currently?
    // Wait, verifyEmailOTP uses it? No, verifyEmailOTP calls Otp.findOne...
    // Let me check imports first.

    const otpRecord = await Otp.findOne({ email: normalizedEmail, otp });
    if (!otpRecord) throw new Error("Invalid or expired OTP");

    const employer = await Employer.findOne({ email: normalizedEmail });
    if (!employer) throw new Error("Employer not found");

    employer.password = newPassword;
    await employer.save();

    await Otp.deleteOne({ _id: otpRecord._id });
    return true;
};

export const uploadLogo = async (employerId, filePath) => {
    const employer = await Employer.findById(employerId);
    if (!employer) {
        throw new Error("Employer not found");
    }

    employer.logo = filePath;
    await employer.save();

    return employer;
};
