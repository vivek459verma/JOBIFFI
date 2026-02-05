import fetch from "node-fetch";

const BASE_URL = "http://localhost:5000/api/auth";

// Helper to log results
const logResult = (testName, success, data) => {
    if (success) {
        console.log(`✅ ${testName}: PASSED`);
    } else {
        console.log(`❌ ${testName}: FAILED`);
        console.error("   Error:", data);
    }
};

const runTests = async () => {
    console.log("🚀 Starting Authentication Verification...\n");

    const testUser = {
        name: "Test Check",
        email: `test_${Date.now()}@example.com`,
        password: "password123",
        mobile: "9876543210",
        workStatus: "fresher",
    };

    let authToken = "";
    let userId = "";

    // 1. Register User
    try {
        const res = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testUser),
        });
        const data = await res.json();
        logResult("Register User", res.ok && data.success, data);
    } catch (err) {
        logResult("Register User", false, err.message);
    }

    // 2. Login User (Email Only)
    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: testUser.email,
                password: testUser.password,
            }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
            authToken = data.token;
            userId = data.user.id;
            logResult("Login User (Email)", true, data);
        } else {
            logResult("Login User (Email)", false, data);
        }
    } catch (err) {
        logResult("Login User (Email)", false, err.message);
    }

    // 3. Send OTP
    try {
        const res = await fetch(`${BASE_URL}/send-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: testUser.email }),
        });
        const data = await res.json();
        logResult("Send OTP", res.ok && data.success, data);
        if (res.ok) console.log("   (Check console/logs for simulated OTP if credentials invalid)");
    } catch (err) {
        logResult("Send OTP", false, err.message);
    }

    // 4. Change Password
    if (authToken && userId) {
        try {
            const res = await fetch(`${BASE_URL}/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}` // Assuming middleware might need it, though auth.controller doesn't check it explicitly in the snippet
                },
                body: JSON.stringify({
                    userId: userId,
                    oldPassword: testUser.password,
                    newPassword: "newpassword123",
                }),
            });
            const data = await res.json();
            logResult("Change Password", res.ok && data.success, data);
        } catch (err) {
            logResult("Change Password", false, err.message);
        }
    } else {
        console.log("⚠️ Skipping Change Password test (Login failed)");
    }

    console.log("\n🏁 Verification Complete.");
};

runTests();
