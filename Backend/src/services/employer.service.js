import Employer from "../models/Employer.model.js";
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

export const uploadLogo = async (employerId, filePath) => {
    const employer = await Employer.findById(employerId);
    if (!employer) {
        throw new Error("Employer not found");
    }

    employer.logo = filePath;
    await employer.save();

    return employer;
};
