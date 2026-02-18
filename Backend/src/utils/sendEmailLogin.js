import nodemailer from "nodemailer";
import dotenv from "dotenv";
import juice from "juice";
import { otpTemplate } from "./emailTemplate.js";

dotenv.config();

const sendEmail = async (email, otp, name) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false }
    });

    // 1️⃣ Raw HTML from template
    const rawHtml = otpTemplate(otp, name);

    // 2️⃣ Inline CSS using juice
    const inlinedHtml = juice(rawHtml);

    await transporter.sendMail({
      from: `"Jobiffi" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Jobiffi account",
      html: inlinedHtml,
    });

    console.log(`✅ Email sent successfully to ${name || email} (${email})`);

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