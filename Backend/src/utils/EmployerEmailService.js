import nodemailer from "nodemailer";
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

    const mailOptions = {
      from: `"Jobiffi" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification - Jobiffi",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 5px 5px;
            }
            .otp-box {
              background-color: #f0f0f0;
              border: 2px dashed #4CAF50;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
              border-radius: 5px;
            }
            .otp-code {
              font-size: 32px;
              font-weight: bold;
              color: #4CAF50;
              letter-spacing: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
            .warning {
              color: #ff6b6b;
              font-size: 14px;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Jobiffi!</h1>
            </div>
            <div class="content">
              <h2>Hello ${companyName},</h2>
              <p>Thank you for registering with Jobiffi. To complete your registration, please verify your email address.</p>
              
              <p>Your One-Time Password (OTP) is:</p>
              
              <div class="otp-box">
                <div class="otp-code">${otp}</div>
              </div>
              
              <p>This OTP is valid for <strong>10 minutes</strong>.</p>
              
              <p class="warning">⚠️ Please do not share this OTP with anyone. Jobiffi will never ask for your OTP via phone or email.</p>
              
              <p>If you didn't request this verification, please ignore this email.</p>
              
              <p>Best regards,<br>The Jobiffi Team</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Jobiffi. All rights reserved.</p>
              <p>This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
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
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 5px 5px;
            }
            .success-icon {
              text-align: center;
              font-size: 48px;
              color: #4CAF50;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Email Verified!</h1>
            </div>
            <div class="content">
              <div class="success-icon">✓</div>
              <h2>Hello ${companyName},</h2>
              <p>Your email has been successfully verified!</p>
              <p>You can now access all features of your Jobiffi employer account.</p>
              <p>Start posting jobs and finding the best talent for your company.</p>
              <p>Best regards,<br>The Jobiffi Team</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending verification success email:", error);
    return { success: false, error: error.message };
  }
};
