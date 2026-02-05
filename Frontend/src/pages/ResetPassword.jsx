import React, { useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Get token from URL
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = Password, 2 = OTP
  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "", otp: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Submit Password -> Get OTP
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true); setError("");
    try {
      // Verify token and trigger OTP
      await axios.post("http://localhost:3000/api/auth/send-reset-otp", { token });
      setMessage("OTP sent to your email. Please enter it below.");
      setStep(2); // Move to OTP step
    } catch (err) {
      setError(err.response?.data?.message || "Link expired or invalid");
    } finally { setLoading(false); }
  };

  // Step 2: Submit OTP -> Reset Password
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await axios.post("http://localhost:3000/api/auth/reset-password-confirm", {
        token,
        otp: formData.otp,
        newPassword: formData.newPassword
      });
      alert("Password Reset Successfully! Redirecting to login...");
      navigate("/"); // Redirect to home (where login popup is)
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally { setLoading(false); }
  };

  if (!token) return <div style={styles.container}><h2>Invalid Link</h2></div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        {message && <div style={styles.success}>{message}</div>}

        {step === 1 ? (
          <form onSubmit={handlePasswordSubmit}>
            <input 
              type="password" name="newPassword" placeholder="New Password"
              value={formData.newPassword} onChange={handleChange} 
              style={styles.input} required 
            />
            <input 
              type="password" name="confirmPassword" placeholder="Confirm New Password"
              value={formData.confirmPassword} onChange={handleChange} 
              style={styles.input} required 
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Processing..." : "Confirm & Get OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <p style={{fontSize: "14px", color: "#666", marginBottom: "15px"}}>
              Please enter the OTP sent to your email to confirm this change.
            </p>
            <input 
              type="text" name="otp" placeholder="Enter 6-digit OTP"
              value={formData.otp} onChange={handleChange} 
              style={styles.input} required 
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Verifying..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f4f4" },
  card: { width: "400px", padding: "40px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", textAlign: "center" },
  title: { marginBottom: "20px", color: "#333" },
  input: { width: "100%", padding: "12px", marginBottom: "15px", border: "1px solid #ddd", borderRadius: "5px", boxSizing: "border-box" },
  button: { width: "100%", padding: "12px", backgroundColor: "#0033cc", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" },
  error: { color: "red", backgroundColor: "#ffe6e6", padding: "10px", borderRadius: "5px", marginBottom: "15px", fontSize: "13px" },
  success: { color: "green", backgroundColor: "#e6ffe6", padding: "10px", borderRadius: "5px", marginBottom: "15px", fontSize: "13px" },
};

export default ResetPassword;