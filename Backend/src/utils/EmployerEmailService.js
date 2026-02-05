import nodemailer from "nodemailer";
import { otpTemplate } from "./emailTemplate.js";
import { verificationSuccessTemplate } from "./emailTemplate.js";
import dotenv from "dotenv";
dotenv.config();

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "mail.jobiffi.com", // Your custom server
    port: 465, // Port from your screenshot
    secure: true, // Must be true for Port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    // This helps with self-signed certificates common on cPanel hosts
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
export const sendOTPEmail = async (email, otp, companyName) => {
  try {
    const transporter = createTransporter();

    // Construct Reset Link (Assuming this OTP is for reset flows too? Or should we distinguish?)
    // User requested "link for changing password".
    // Let's assume generic Verify/Reset link for now.
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetLink = `${frontendUrl}/reset-password?email=${email}`;

    const mailOptions = {
      from: `"Jobiffi" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification / Password Reset - Jobiffi",
      html: `
        ${otpTemplate(otp)}
        <br/><br/>
        <p>Or click this link to reset your password directly:</p>
        <a href="${resetLink}" style="background:#4A90E2;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Reset Password</a>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

// Send verification success email
export const sendVerificationSuccessEmail = async (email, companyName) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Jobiffi" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verified Successfully - Jobiffi",
      html: verificationSuccessTemplate(companyName),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending verification success email:", error);
    return { success: false, error: error.message };
  }
};
