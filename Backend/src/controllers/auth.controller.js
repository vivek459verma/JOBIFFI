import bcrypt from "bcrypt";
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
