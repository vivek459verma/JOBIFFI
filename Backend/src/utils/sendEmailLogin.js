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

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetLink = `${frontendUrl}/reset-password?email=${email}`;

    await transporter.sendMail({
      from: `"Jobiffi Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Jobiffi Login/Reset OTP",
      text: `Dear Jobseeker, Your OTP is: ${otp}. Valid for 15 minutes.`,
      html: `
        ${otpTemplate(otp)}
        <br/><br/>
        <p>If you requested a password reset, click here:</p>
        <a href="${resetLink}" style="background:#4CAF50;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Reset Password</a>
      `,
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