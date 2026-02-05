import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const setupEthereal = async () => {
    console.log("🪄 Creating Ethereal Test Account...");
    try {
        const testAccount = await nodemailer.createTestAccount();

        console.log("✅ Account Created!");
        console.log(`User: ${testAccount.user}`);
        console.log(`Pass: ${testAccount.pass}`);

        const envPath = path.resolve('.env');
        let envContent = fs.readFileSync(envPath, 'utf8');

        // Regex to replace existing email config
        envContent = envContent.replace(/EMAIL_HOST=.*/g, 'EMAIL_HOST=smtp.ethereal.email');
        envContent = envContent.replace(/EMAIL_PORT=.*/g, 'EMAIL_PORT=587');
        envContent = envContent.replace(/EMAIL_USER=.*/g, `EMAIL_USER=${testAccount.user}`);
        envContent = envContent.replace(/EMAIL_PASS=.*/g, `EMAIL_PASS=${testAccount.pass}`);
        envContent = envContent.replace(/EMAIL_PASSWORD=.*/g, `EMAIL_PASSWORD=${testAccount.pass}`);

        fs.writeFileSync(envPath, envContent);
        console.log("📝 Updated .env with Ethereal credentials.");
        console.log("\n🚀 NEXT STEP: Restart your server. When you send an OTP, the console will print a PREVIEW URL.");

    } catch (err) {
        console.error("❌ Failed to create account:", err.message);
    }
};

setupEthereal();
