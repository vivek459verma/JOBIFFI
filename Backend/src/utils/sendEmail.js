import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.office365.com",
      port: process.env.EMAIL_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3' // Helps with Microsoft server compatibility
      }
    });

    await transporter.sendMail({
      from: `"Jobiffi Support" <${process.env.EMAIL_USER}>`, 
      to: email,
      subject: "Your Jobiffi Login OTP",
      text: `Your One-Time Password is: ${otp}`,
      html: `<b>Your One-Time Password is: ${otp}</b>` 
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email error details:", error); 
    throw error;
  }
};

export default sendEmail;