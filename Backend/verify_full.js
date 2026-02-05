import fs from "fs";
import path from "path";

const AUTH_URL = "http://localhost:5000/api/auth";
const EMPLOYER_URL = "http://localhost:5000/api/employer";

// Helper to log results
const logResult = (testName, success, data) => {
    if (success) {
        console.log(`✅ ${testName}: PASSED`);
    } else {
        console.log(`❌ ${testName}: FAILED`);
        if (data) console.error("   Error:", JSON.stringify(data, null, 2));
    }
};

// Helper: Create a dummy image file for upload testing
const createDummyImage = () => {
    const filePath = path.resolve("test_logo.png");
    try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        fs.writeFileSync(filePath, Buffer.from("fake_image_content"));
        return filePath;
    } catch (e) {
        console.error("Error creating dummy image:", e);
        return null;
    }
};

// Helper: Manual Multipart Upload
const uploadFile = async (url, filePath, fieldName) => {
    try {
        const boundary = "--------------------------" + Date.now().toString(16);
        const fileContent = fs.readFileSync(filePath);
        const fileName = path.basename(filePath);

        let body = Buffer.from(`--${boundary}\r\n` +
            `Content-Disposition: form-data; name="${fieldName}"; filename="${fileName}"\r\n` +
            `Content-Type: image/png\r\n\r\n`);

        body = Buffer.concat([body, fileContent]);
        body = Buffer.concat([body, Buffer.from(`\r\n--${boundary}--`)]);

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${boundary}`,
            },
            body: body
        });
        return res;
    } catch (error) {
        console.error("Error in uploadFile:", error);
        throw error;
    }
};

const runTests = async () => {
    console.log("🚀 Starting COMPREHENSIVE Verification (Auth + Employer)...\n");

    const timestamp = Date.now();
    const testUser = {
        name: "Test JobSeeker",
        email: `jobseeker_${timestamp}@example.com`,
        password: "password123",
        mobile: "9000000001",
        workStatus: "fresher",
    };

    const testEmployer = {
        companyName: "Test Corp",
        email: `employer_${timestamp}@example.com`,
        password: "securepass123",
        contactPerson: "Manager Mike",
        mobile: "9000000002",
        companySize: "11-50",
        industry: "IT",
        website: "https://example.com"
    };

    let userToken = "";
    let userId = "";
    let employerId = "";

    // --- 1. JOBSEEKER AUTH ---
    console.log("--- 1. JOBSEEKER AUTH ----------------");

    // 1.1 Register
    try {
        const res = await fetch(`${AUTH_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testUser),
        });
        const data = await res.json();
        logResult("Register JobSeeker", res.ok && data.success, data.message);
    } catch (err) {
        logResult("Register JobSeeker", false, err.message);
    }

    // 1.2 Login
    try {
        const res = await fetch(`${AUTH_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: testUser.email, password: testUser.password }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
            userToken = data.token;
            userId = data.user.id;
            logResult("Login JobSeeker", true, "Token received");
        } else {
            logResult("Login JobSeeker", false, data);
        }
    } catch (err) {
        logResult("Login JobSeeker", false, err.message);
    }

    // 1.3 Send OTP
    try {
        const res = await fetch(`${AUTH_URL}/send-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: testUser.email }),
        });
        const data = await res.json();
        logResult("Send OTP (JobSeeker)", res.ok && data.success, data.message);
    } catch (err) {
        logResult("Send OTP (JobSeeker)", false, err.message);
    }

    // 1.4 Change Password
    if (userToken && userId) {
        try {
            const res = await fetch(`${AUTH_URL}/change-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: userId,
                    oldPassword: testUser.password,
                    newPassword: "newpassword123",
                }),
            });
            const data = await res.json();
            logResult("Change Password", res.ok && data.success, data.message);
        } catch (err) {
            logResult("Change Password", false, err.message);
        }
    }

    // --- 2. EMPLOYER FEATURES ---
    console.log("\n--- 2. EMPLOYER FEATURES -------------");

    // 2.1 Register Employer
    try {
        const res = await fetch(`${EMPLOYER_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testEmployer),
        });
        const data = await res.json();
        if (res.ok && data.success) {
            employerId = data.data.id;
            logResult("Register Employer", true, `ID: ${employerId}`);
        } else {
            logResult("Register Employer", false, data);
        }
    } catch (err) {
        logResult("Register Employer", false, err.message);
    }

    // 2.2 Upload Logo
    if (employerId) {
        const imagePath = createDummyImage();
        if (imagePath) {
            try {
                const res = await uploadFile(`${EMPLOYER_URL}/${employerId}/upload-logo`, imagePath, "logo");
                const data = await res.json();

                logResult("Upload Logo", res.ok && data.success, data);
            } catch (err) {
                logResult("Upload Logo", false, err.message);
            } finally {
                if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
            }
        }
    } else {
        console.log("⚠️ Skipping Logo Upload (Employer Registration failed)");
    }

    console.log("\n🏁 Verification Complete.");
};

runTests();
