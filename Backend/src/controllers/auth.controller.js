import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";


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

    // 1. Normalize Email (Must match registration logic)
    const normalizedEmail = email.trim().toLowerCase();

    // 2. Check if user exists
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3. Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4. Generate Token (The "Access Pass")
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        workStatus: user.workStatus 
      },
      process.env.JWT_SECRET || "default_secret_key", 
      { expiresIn: "7d" } // Token expires in 7 days
    );

    // 5. Send Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token, // Frontend needs this to stay logged in
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
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
