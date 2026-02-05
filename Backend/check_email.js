import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const verifyEmail = async () => {
    console.log("Testing Email Connection...");
    console.log(`Host: ${process.env.EMAIL_HOST}`);
    console.log(`User: ${process.env.EMAIL_USER}`);

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_PORT == 465, // true for 465, false for others
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.verify();
        console.log("✅ Connection Successful! Your email credentials work.");
    } catch (error) {
        console.error("❌ Connection Failed:", error.message);
        if (error.code === 'EAUTH') console.log("--> Tip: Check your password or enable App Passwords.");
        if (error.code === 'ENOTFOUND') console.log("--> Tip: The HOST (mail.jobiffi.com) might be wrong.");
    }
};

verifyEmail();
