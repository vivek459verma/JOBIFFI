import nodemailer from "nodemailer";
import dotenv from "dotenv";
import juice from "juice";

dotenv.config();

const sendResetEmail = async (email, htmlContent) => {
  try {
    // 1. Create Transporter
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

    // 2. Inline CSS using juice
    const inlinedHtml = juice(htmlContent);

    // 3. Send the Email
    await transporter.sendMail({
      from: `"Jobiffi" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Action Required: Reset Your Password",
      html: inlinedHtml,
    });

    console.log(`✅ Reset link sent successfully to ${email}`);

  } catch (error) {
    console.error("❌ EMAIL FAILED");
    console.error("Error details:", error.message);
    throw error;
  }
};

export default sendResetEmail;