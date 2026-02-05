import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendResetEmail = async (email, htmlContent) => {
  try {
    // 1. Create Transporter
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

    // 2. Send the Email
    // FIX: Removed the "text" line that was trying to use 'name'
    await transporter.sendMail({
      from: `"Jobiffi Security" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Action Required: Reset Your Password",
      html: htmlContent, 
    });

    console.log(`✅ Reset link sent successfully to ${email}`);

  } catch (error) {
    console.error("❌ EMAIL FAILED");
    console.error("Error details:", error.message);
    throw error;
  }
};

export default sendResetEmail;