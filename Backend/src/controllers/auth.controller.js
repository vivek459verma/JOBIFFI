// import bcrypt from "bcrypt";
// import crypto from "crypto";
// import User from "../models/User.model.js";
// import Subscription from "../models/Subscription.model.js";
// import { sendVerificationEmail } from "../utils/sendEmail.js";

// /**
//  * REGISTER USER (JOB SEEKER)
//  */
// export const registerUser = async (req, res) => {
//   console.log("🔥 REGISTER API HIT");

//   try {
//     const {
//       fullName,
//       email,
//       password,
//       mobile,
//       workStatus,
//       currentCity,
//       communicationConsent
//     } = req.body;

//     if (!fullName || !email || !password || !mobile || !workStatus || !currentCity) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       fullName,
//       email,
//       passwordHash,
//       mobile,
//       workStatus,
//       currentCity,
//       communicationConsent,
//       role: "JOB_SEEKER",
//       profileCompletion: 20,
//       isEmailVerified: false
//     });

//     const verificationToken = crypto.randomBytes(32).toString("hex");
//     user.emailVerificationToken = verificationToken;
//     user.emailVerificationExpires = Date.now() + 48 * 60 * 60 * 1000; 

//     await user.save();

//     // 📧 Send professional email using juice-inlined template
//     await sendVerificationEmail(user.email, verificationToken);

//     await Subscription.create({
//       ownerId: user._id,
//       ownerType: "USER",
//       planName: "FREE",
//       isActive: true
//     });

//     return res.status(201).json({
//       userId: user._id,
//       message: "Registration successful. Please verify your email."
//     });

//   } catch (error) {
//     console.error("Register error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// /**
//  * VERIFY EMAIL
//  * Handles the click from the email button
//  */
// export const verifyEmail = async (req, res) => {
//   try {
//     const { token } = req.query;
//     const loginUrl = process.env.FRONTEND_LOGIN_URL;

//     if (!token) {
//       return res.redirect(`${loginUrl}?status=invalid`);
//     }

//     const user = await User.findOne({
//       emailVerificationToken: token,
//       emailVerificationExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.redirect(`${loginUrl}?status=expired`);
//     }

//     user.isEmailVerified = true;
//     user.emailVerificationToken = undefined;
//     user.emailVerificationExpires = undefined;
//     await user.save();

//     // ✅ Redirect to Login with Success Flag for the pop-up
//     return res.redirect(`${loginUrl}?status=verified`);

//   } catch (error) {
//     console.error("Verify email error:", error);
//     return res.redirect(`${process.env.FRONTEND_LOGIN_URL}?status=error`);
//   }
// };

// /**
//  * RESEND VERIFICATION EMAIL
//  */
// export const resendVerificationEmail = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.isEmailVerified) {
//       return res.status(400).json({ message: "Email already verified" });
//     }

//     const token = crypto.randomBytes(32).toString("hex");
//     user.emailVerificationToken = token;
//     user.emailVerificationExpires = Date.now() + 48 * 60 * 60 * 1000;
//     await user.save();

//     await sendVerificationEmail(user.email, token);

//     return res.json({ message: "Verification email resent successfully" });

//   } catch (error) {
//     console.error("Resend verification error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";
import User from "../models/User.model.js";
import Subscription from "../models/Subscription.model.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

/**
 * REGISTER USER (JOB SEEKER)
 */
export const registerUser = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const {
      fullName,
      email,
      password,
      mobile,
      workStatus, // FRESHER | EXPERIENCED | STUDENT
      currentCity,
      communicationConsent,

      // 👇 NEW (only for students)
      studentDetails // { collegeName, degree, graduationYear }
    } = req.body;

    // 🔍 Basic validation
    if (!fullName || !email || !password || !mobile || !workStatus || !currentCity) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔍 Validate workStatus
    const allowedWorkStatus = ["FRESHER", "EXPERIENCED", "STUDENT"];
    if (!allowedWorkStatus.includes(workStatus)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid work status" });
    }

    // 🎓 Student-specific validation (SAFE & OPTIONAL)
    if (workStatus === "STUDENT") {
      if (
        !studentDetails ||
        !studentDetails.collegeName ||
        !studentDetails.degree ||
        !studentDetails.graduationYear
      ) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          message: "Student details are required for student registration"
        });
      }
    }

    // 🔍 Check existing user
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // 👤 Create user
    const [user] = await User.create(
      [{
        fullName,
        email,
        passwordHash,
        mobile,
        workStatus,
        currentCity,
        communicationConsent,

        // 👇 Student block (stored only if STUDENT)
        studentDetails: workStatus === "STUDENT" ? studentDetails : undefined,

        role: "JOB_SEEKER",
        profileCompletion: workStatus === "STUDENT" ? 15 : 20,
        isEmailVerified: false,
        emailVerificationToken: verificationToken,
        emailVerificationExpires: Date.now() + 48 * 60 * 60 * 1000
      }],
      { session }
    );

    // 💳 Create subscription
    await Subscription.create(
      [{
        ownerId: user._id,
        ownerType: "USER",
        planName: "FREE",
        isActive: true
      }],
      { session }
    );

    // ✅ Commit DB changes
    await session.commitTransaction();
    session.endSession();

    // ✅ Respond first
    res.status(201).json({
      userId: user._id,
      message: "Registration successful. Please verify your email."
    });

    // 📧 Email outside transaction
    sendVerificationEmail(user.email, verificationToken)
      .catch(err => console.error("Email send failed:", err));

  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();

    console.error("Register error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * VERIFY EMAIL
 */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const loginUrl = process.env.FRONTEND_LOGIN_URL;

    if (!token) {
      return res.redirect(`${loginUrl}?status=invalid`);
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.redirect(`${loginUrl}?status=expired`);
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    return res.redirect(`${loginUrl}?status=verified`);
  } catch (error) {
    console.error("Verify email error:", error);
    return res.redirect(`${process.env.FRONTEND_LOGIN_URL}?status=error`);
  }
};

/**
 * RESEND VERIFICATION EMAIL
 */
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.emailVerificationToken = token;
    user.emailVerificationExpires = Date.now() + 48 * 60 * 60 * 1000;
    await user.save();

    sendVerificationEmail(user.email, token)
      .catch(err => console.error("Resend email failed:", err));

    return res.json({
      message: "Verification email resent successfully"
    });

  } catch (error) {
    console.error("Resend verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
