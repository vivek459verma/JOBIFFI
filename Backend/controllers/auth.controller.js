import bcrypt from "bcrypt";
import { users } from "../data/user.mock.js";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile, workStatus } = req.body;

    // NORMALIZE email 
    const normalizedEmail = email.trim().toLowerCase();

    // DUPLICATE EMAIL CHECK 
    const existingUser = users.find(
      (user) => user.email === normalizedEmail
    );

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const newUser = {
      id: users.length + 1,
      name,
      email: normalizedEmail,
      password: hashedPassword,
      mobile,
      workStatus
    };

    // SAVE TO MEMORY
    users.push(newUser);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
        workStatus: newUser.workStatus
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

