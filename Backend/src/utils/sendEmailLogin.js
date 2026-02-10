import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { otpTemplate } from "./emailTemplate.js";
dotenv.config();

const sendEmail = async (email, otp, name) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false }
    });

    await transporter.sendMail({
      from: `"Jobiffi Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for logging in Jobiffi account",
      text: `Dear ${name || "Jobseeker"}, Your OTP is: ${otp}.`,
      html: otpTemplate(otp, name),
    });

    console.log(`✅ Email sent successfully to ${name} (${email})`);

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