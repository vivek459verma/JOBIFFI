import * as AuthService from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
    await AuthService.registerUser(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    const status = error.message === "Email already registered" ? 409 : 500;
    return res.status(status).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const { token, refreshToken, user } =
      await AuthService.loginUser(identifier, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        workStatus: user.workStatus,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    const status = error.message === "Invalid credentials" ? 400 : 500;
    return res.status(status).json({
      success: false,
      message: error.message || "Server error during login",
    });
  }
};

export const sendOtp = async (req, res) => {
  try {
    await AuthService.sendOtp(req.body.email);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(error);
    const status = error.message === "User not found" ? 404 : 500;
    res.status(status).json({
      success: false,
      message: error.message || "Failed to send OTP",
    });
  }
};

export const loginWithOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const { token, refreshToken, user } =
      await AuthService.loginWithOtp(email, otp);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        workStatus: user.workStatus,
      },
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
    const { userId, oldPassword, newPassword } = req.body;

    await AuthService.changePassword(
      userId,
      oldPassword,
      newPassword
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change Password Error:", error);
    const status = error.message === "Invalid old password" ? 400 : 500;
    res.status(status).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
