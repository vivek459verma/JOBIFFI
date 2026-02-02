import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // State Management
  const [isOtpLogin, setIsOtpLogin] = useState(false); // Default is Password Login
  const [step, setStep] = useState(1); // For OTP flow
  const [formData, setFormData] = useState({ email: "", password: "", otp: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- API HANDLERS ---
  const handleLoginSuccess = (data) => {
    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert(`Welcome back, ${data.user.name || "User"}!`);
      onClose();
      navigate("/dashboard");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/google", {
        token: credentialResponse.credential,
      });
      handleLoginSuccess(res.data);
    } catch (err) {
      setError("Google Login Failed");
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email: formData.email, password: formData.password
      });
      handleLoginSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await axios.post("http://localhost:3000/api/auth/send-otp", { email: formData.email });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally { setLoading(false); }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login-otp", {
        email: formData.email, otp: formData.otp
      });
      handleLoginSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>&times;</button>

        <h2 style={styles.title}>
          {isOtpLogin ? "Login via OTP" : "Login to Jobiffi"}
        </h2>

        {/* Google Login (Only show on Password Screen) */}
        {!isOtpLogin && (
          <>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError("Failed")} width="100%" />
            </div>
            <div style={styles.divider}>OR</div>
          </>
        )}

        {error && <div style={styles.error}>{error}</div>}

        {/* --- FORM AREA --- */}
        <form onSubmit={!isOtpLogin ? handlePasswordLogin : (step === 1 ? sendOtp : verifyOtp)}>
          
          {/* EMAIL INPUT (Shared) */}
          <input 
            type="email" name="email" placeholder="Email Address" 
            value={formData.email} onChange={handleChange} 
            style={styles.input} required disabled={step === 2 && isOtpLogin}
          />
          
          {/* PASSWORD MODE */}
          {!isOtpLogin ? (
            <>
              <input 
                type="password" name="password" placeholder="Password" 
                value={formData.password} onChange={handleChange} 
                style={styles.input} required 
              />
              
              {/* SWITCH TO OTP LINK */}
              <div style={{ textAlign: "right", marginBottom: "15px" }}>
                <span 
                  style={styles.link} 
                  onClick={() => { setIsOtpLogin(true); setStep(1); setError(""); }}
                >
                  Login with OTP
                </span>
              </div>
            </>
          ) : (
            /* OTP MODE */
            <>
              {step === 2 && (
                <input 
                  type="text" name="otp" placeholder="Enter 6-digit OTP" 
                  value={formData.otp} onChange={handleChange} 
                  style={styles.input} required 
                />
              )}
            </>
          )}

          {/* SUBMIT BUTTON */}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Processing..." : (!isOtpLogin ? "Login" : (step === 1 ? "Send OTP" : "Verify & Login"))}
          </button>
        </form>

        {/* FOOTER LINKS */}
        <div style={{ marginTop: "20px" }}>
          {isOtpLogin ? (
            <p style={styles.backLink} onClick={() => setIsOtpLogin(false)}>
              &larr; Back to Password Login
            </p>
          ) : (
            <p style={{ fontSize: "14px", color: "#666" }}>
              Don't have an account? <span style={{color: "#0033cc", cursor: "pointer", fontWeight: "bold"}}>Register</span>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

// --- UPDATED STYLES ---
const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(4px)"
  },
  modal: {
    backgroundColor: "white", 
    padding: "40px", // Increased Padding
    borderRadius: "12px",
    width: "500px", // Increased Width (Bigger)
    maxWidth: "90%", 
    position: "relative",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)", 
    textAlign: "center",
    animation: "fadeIn 0.3s ease-in-out"
  },
  closeButton: {
    position: "absolute", top: "15px", right: "20px",
    background: "none", border: "none", fontSize: "32px", cursor: "pointer", color: "#999",
  },
  title: { marginBottom: "25px", color: "#333", fontSize: "26px", fontWeight: "bold" },
  divider: { margin: "20px 0", color: "#aaa", fontSize: "13px", fontWeight: "bold" },
  input: { 
    width: "100%", padding: "14px", marginBottom: "15px", 
    border: "1px solid #ccc", borderRadius: "8px", 
    boxSizing: "border-box", fontSize: "15px", outline: "none"
  },
  button: { 
    width: "100%", padding: "14px", 
    backgroundColor: "#0033cc", color: "white", 
    border: "none", borderRadius: "8px", 
    cursor: "pointer", fontWeight: "bold", fontSize: "16px",
    marginTop: "10px"
  },
  error: { color: "#d9534f", backgroundColor: "#fdeaed", padding: "10px", borderRadius: "5px", marginBottom: "15px", fontSize: "13px" },
  link: { color: "#0033cc", cursor: "pointer", fontSize: "14px", fontWeight: "600", textDecoration: "none" },
  backLink: { color: "#666", cursor: "pointer", fontSize: "14px", marginTop: "10px" }
};

export default Login;