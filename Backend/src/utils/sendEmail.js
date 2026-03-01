import juice from "juice";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { verificationTemplate } from "./emailTemplate.js";

dotenv.config();

// ✅ DEFINE THE TRANSPORTER
const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true only if using port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: { rejectUnauthorized: false }
  });
};

export const sendVerificationEmail = async (to, token) => {
  console.log("📧 sendVerificationEmail called for:", to);

  const verificationLink =
    `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/auth/verify-email?token=${token}`;

  // 1️⃣ Raw HTML from template
  const rawHtml = verificationTemplate(verificationLink);

  // 2️⃣ Inline CSS using juice
  const inlinedHtml = juice(rawHtml);

  const mailer = getTransporter();

  try {
    const info = await mailer.sendMail({
      from: `"Jobiffi" <${process.env.SMTP_USER}>`,
      to,
      subject: "Verify your Jobiffi account",
      html: inlinedHtml
    });

    console.log("✅ Verification email sent:", info.messageId);
    return info;

  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw error;
  }
};
