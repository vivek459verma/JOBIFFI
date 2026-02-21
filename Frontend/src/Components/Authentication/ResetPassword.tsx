import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Navbar from "../Nav";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const hasRequestedOtp = useRef(false);

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1); // 1: Validating/Sending OTP, 2: Entering OTP & Password
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token) {
            setError("Invalid or missing reset token.");
            return;
        }

        // Prevent double-sending in development/strict mode
        if (hasRequestedOtp.current) return;
        hasRequestedOtp.current = true;

        sendOtp();
    }, [token]);

    const sendOtp = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.post(`${BACKEND_URL}/api/auth/send-reset-otp`, { token });
            if (response.data.success) {
                setStep(2);
                setMessage("A 6-digit OTP has been sent to your email.");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Link expired or invalid. Please request a new reset link.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            setError("Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.");
            return;
        }
        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const response = await axios.post(`${BACKEND_URL}/api/auth/reset-password-confirm`, {
                token,
                otp,
                newPassword
            });
            if (response.data.success) {
                setMessage("Password reset successful! Redirecting to login...");
                setTimeout(() => {
                    navigate("/?login=true");
                }, 3000);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Reset failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Reset Your Password</h2>

                    {loading && step === 1 && (
                        <div style={styles.loadingContainer}>
                            <div style={styles.spinner}></div>
                            <p>Validating your request and sending OTP...</p>
                        </div>
                    )}

                    {error && <div style={styles.errorBox}>{error}</div>}
                    {message && <div style={styles.successBox}>{message}</div>}

                    {step === 2 && (
                        <form onSubmit={handleReset} style={styles.form}>
                            <p style={styles.subtitle}>Enter the 6-digit code sent to your email and your new password.</p>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>OTP Code</label>
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    style={styles.input}
                                    maxLength={6}
                                    required
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>New Password</label>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    style={{
                                        ...styles.input,
                                        border: newPassword && !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(newPassword)) ? '1px solid #fc8181' : '1px solid #e2e8f0'
                                    }}
                                    required
                                />

                                {newPassword.length > 0 && (
                                    <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f7fafc', borderRadius: '8px', border: '1px solid #edf2f7' }}>
                                        <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#718096', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Security Checklist:</p>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            {[
                                                { label: "8+ Characters", met: newPassword.length >= 8 },
                                                { label: "One Uppercase (A-Z)", met: /[A-Z]/.test(newPassword) },
                                                { label: "One Number (0-9)", met: /\d/.test(newPassword) },
                                                { label: "One Special Case (@$!%*?&)", met: /[@$!%*?&]/.test(newPassword) }
                                            ].map((req, i) => (
                                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', marginBottom: '4px', color: req.met ? '#38a169' : '#a0aec0' }}>
                                                    <CheckCircleIcon style={{ height: '16px', width: '16px', color: req.met ? '#48bb78' : '#cbd5e0' }} />
                                                    {req.label}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Confirm New Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    style={styles.input}
                                    required
                                />
                            </div>

                            <button type="submit" style={styles.button} disabled={loading}>
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>

                            <p style={styles.resend} onClick={sendOtp}>
                                Didn't receive the code? <span style={styles.resendLink}>Resend OTP</span>
                            </p>
                        </form>
                    )}

                    {!token && !loading && (
                        <button onClick={() => navigate("/")} style={styles.button}>
                            Go to Homepage
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
        padding: "20px",
    },
    card: {
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        width: "100%",
        maxWidth: "450px",
        textAlign: "center",
    },
    title: {
        fontSize: "24px",
        fontWeight: "700",
        color: "#1a202c",
        marginBottom: "10px",
    },
    subtitle: {
        fontSize: "14px",
        color: "#718096",
        marginBottom: "25px",
    },
    form: {
        textAlign: "left",
    },
    inputGroup: {
        marginBottom: "20px",
    },
    label: {
        display: "block",
        fontSize: "14px",
        fontWeight: "600",
        color: "#4a5568",
        marginBottom: "8px",
    },
    input: {
        width: "100%",
        padding: "12px 16px",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        fontSize: "16px",
        outline: "none",
        boxSizing: "border-box",
    },
    button: {
        width: "100%",
        padding: "14px",
        backgroundColor: "#0033cc",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background-color 0.2s",
        marginTop: "10px",
    },
    errorBox: {
        backgroundColor: "#fff5f5",
        color: "#c53030",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "20px",
        fontSize: "14px",
    },
    successBox: {
        backgroundColor: "#f0fff4",
        color: "#2f855a",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "20px",
        fontSize: "14px",
    },
    loadingContainer: {
        padding: "20px 0",
    },
    spinner: {
        width: "40px",
        height: "40px",
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #0033cc",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "0 auto 15px",
    },
    resend: {
        marginTop: "20px",
        fontSize: "14px",
        color: "#718096",
        textAlign: "center",
    },
    resendLink: {
        color: "#0033cc",
        fontWeight: "600",
        cursor: "pointer",
    },
};

// Add keyframes for spinner
if (typeof document !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
    document.head.appendChild(styleSheet);
}

export default ResetPassword;
