import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { otpTemplate } from "./emailTemplate.js";
dotenv.config();

const sendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "mail.jobiffi.com", // Your custom server
      port: process.env.EMAIL_PORT || 465, // Port from your screenshot
      secure: true, // Must be true for Port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // This helps with self-signed certificates common on cPanel hosts
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: `"Jobiffi Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for logging in Jobiffi account",
      text: `Dear Jobseeker, Your OTP is: ${otp}. Valid for 15 minutes.`,
      html: otpTemplate(otp),
    });

    console.log(`✅ Email sent successfully to ${email}`);

  } catch (error) {
    console.log("⚠️ EMAIL FAILED - USING DEV MODE ⚠️");
    console.log("Error details:", error.message);
    // Fallback: Print OTP to console so you can still work if email fails
    console.log("========================================");
    console.log(`🔐 OTP FOR ${email}: ${otp}`);
    console.log("========================================");
  }
};

export default sendEmail;