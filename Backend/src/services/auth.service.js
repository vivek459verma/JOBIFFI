import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Otp from "../models/Otp.model.js";
import sendEmail from "../utils/sendEmailLogin.js";

export const getProfile = async (userId) => {
    const user = await User.findById(userId).select("-password");
    if (!user) throw new Error("User not found");
    return user;
};

export const registerUser = async (data) => {
    const { name, email, password, mobile, workStatus } = data;

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedWorkStatus = workStatus.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
        throw new Error("Email already registered");
    }

    const allowedStatus = ["fresher", "experienced"];
    if (!allowedStatus.includes(normalizedWorkStatus)) {
        throw new Error("Invalid work status");
    }

    // Password hashing is handled by pre('save') hook in User model
    const user = await User.create({
        name,
        email: normalizedEmail,
        password,
        mobile,
        workStatus: normalizedWorkStatus,
    });

    return user;
};

export const loginUser = async (identifier, password) => {
    const cleanIdentifier = identifier.trim().toLowerCase();

    const user = await User.findOne({ email: cleanIdentifier });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            workStatus: user.workStatus,
        },
        process.env.JWT_SECRET || "default_secret_key",
        { expiresIn: "15m" } // Access Token: 15 mins
    );

    const refreshToken = jwt.sign(
        {
            userId: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET || "default_secret_key",
        { expiresIn: "7d" } // Refresh Token: 7 days
    );

    return { token, refreshToken, user };
};

export const sendOtp = async (email) => {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
        throw new Error("User not found");
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.create({ email: normalizedEmail, otp: otpCode });
    await sendEmail(normalizedEmail, otpCode);

    return true;
};

export const loginWithOtp = async (email, otp) => {
    const normalizedEmail = email.trim().toLowerCase();

    const otpRecord = await Otp.findOne({ email: normalizedEmail, otp });
    if (!otpRecord) {
        throw new Error("Invalid or expired OTP");
    }

    const user = await User.findOne({ email: normalizedEmail });

    const token = jwt.sign(
        { userId: user._id, email: user.email, workStatus: user.workStatus },
        process.env.JWT_SECRET || "default_secret_key",
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || "default_secret_key",
        { expiresIn: "7d" }
    );

    await Otp.deleteOne({ _id: otpRecord._id });

    return { token, refreshToken, user };
};

export const changePassword = async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) {
        throw new Error("Invalid old password");
    }

    user.password = newPassword; // Hook handles hashing
    await user.save();

    return true;
};

export const resetPassword = async (email, otp, newPassword) => {
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Verify OTP
    const otpRecord = await Otp.findOne({ email: normalizedEmail, otp });
    if (!otpRecord) {
        throw new Error("Invalid or expired OTP");
    }

    // 2. Find User
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
        throw new Error("User not found");
    }

    // 3. Update Password
    user.password = newPassword;
    await user.save();

    // 4. Delete OTP
    await Otp.deleteOne({ _id: otpRecord._id });

    return true;
};

