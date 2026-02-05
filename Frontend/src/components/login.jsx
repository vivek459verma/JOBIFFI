import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // State: 'password' | 'otp' | 'forgot'
  const [view, setView] = useState("password");
  const [step, setStep] = useState(1); // 1=Send OTP, 2=Verify OTP
  
  const [formData, setFormData] = useState({ email: "", password: "", otp: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitchTab = (newView) => {
    setView(newView);
    setError("");
    setMessage("");
    setStep(1);
  };

  // --- API HANDLERS (Same as before) ---
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

  // Dummy Forgot Password Handler (Until backend is ready)
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setMessage("Reset link sent! Check your email.");
        setLoading(false);
    }, 1000);
  };


  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Close Button */}
        <button onClick={onClose} style={styles.closeButton}>&times;</button>

        <h2 style={styles.title}>Login to Jobiffi</h2>

        {/* 1. GOOGLE LOGIN AT TOP */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <GoogleLogin 
                onSuccess={handleGoogleSuccess} 
                onError={() => setError("Google Login Failed")}
                width="100%"
                text="signin_with"
                shape="rectangular"
            />
        </div>

        <div style={styles.divider}>OR</div>

        {/* 2. TABS (Password | OTP) */}
        <div style={styles.tabHeader}>
            <div 
                style={view === "password" || view === "forgot" ? styles.activeTab : styles.tab}
                onClick={() => handleSwitchTab("password")}
            >
                Password
            </div>
            <div 
                style={view === "otp" ? styles.activeTab : styles.tab}
                onClick={() => handleSwitchTab("otp")}
            >
                OTP
            </div>
        </div>

        {/* Error / Success Messages */}
        {error && <div style={styles.error}>{error}</div>}
        {message && <div style={styles.success}>{message}</div>}

        {/* --- FORM CONTENT --- */}
        <div style={styles.formContent}>
            
            {/* VIEW: PASSWORD */}
            {(view === "password") && (
                <form onSubmit={handlePasswordLogin}>
                    <input 
                        type="email" name="email" placeholder="Email Address" 
                        value={formData.email} onChange={handleChange} 
                        style={styles.input} required 
                    />
                    <input 
                        type="password" name="password" placeholder="Password" 
                        value={formData.password} onChange={handleChange} 
                        style={styles.input} required 
                    />
                    
                    {/* Forgot Password Link - RIGHT ALIGNED */}
                    <div style={{textAlign: "right", marginBottom: "20px"}}>
                         <span style={styles.link} onClick={() => setView("forgot")}>
                            Forgot Password?
                         </span>
                    </div>

                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            )}

            {/* VIEW: OTP */}
            {view === "otp" && (
                <form onSubmit={step === 1 ? sendOtp : verifyOtp}>
                    <input 
                        type="email" name="email" placeholder="Email Address" 
                        value={formData.email} onChange={handleChange} 
                        style={styles.input} required disabled={step === 2}
                    />
                    
                    {step === 2 && (
                         <input 
                            type="text" name="otp" placeholder="Enter 6-digit OTP" 
                            value={formData.otp} onChange={handleChange} 
                            style={styles.input} required 
                        />
                    )}

                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? "Processing..." : (step === 1 ? "Send OTP" : "Verify & Login")}
                    </button>
                    
                    {step === 2 && (
                        <p style={{marginTop: "10px", fontSize: "13px", color: "#666", cursor: "pointer"}} onClick={() => setStep(1)}>
                            Resend OTP?
                        </p>
                    )}
                </form>
            )}

            {/* VIEW: FORGOT PASSWORD */}
            {view === "forgot" && (
                <form onSubmit={handleForgotPassword}>
                    <p style={{marginBottom: "15px", color: "#666", fontSize: "14px"}}>
                        Enter your email to receive a reset link.
                    </p>
                    <input 
                        type="email" name="email" placeholder="Enter your email" 
                        value={formData.email} onChange={handleChange} 
                        style={styles.input} required 
                    />
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                    
                    <p style={styles.backLink} onClick={() => setView("password")}>
                        Back to Login
                    </p>
                </form>
            )}

        </div>

        {/* Footer */}
        <div style={{ marginTop: "25px", fontSize: "14px", color: "#666" }}>
            Don't have an account? <span style={{color: "#0033cc", cursor: "pointer", fontWeight: "bold"}}>Register</span>
        </div>

      </div>
    </div>
  );
};

// --- STYLES ---
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
    padding: "40px", 
    borderRadius: "16px",
    width: "450px", 
    maxWidth: "90%", 
    position: "relative",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)", 
    textAlign: "center",
    animation: "fadeIn 0.3s ease-in-out",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  closeButton: {
    position: "absolute", top: "15px", right: "20px",
    background: "none", border: "none", fontSize: "28px", cursor: "pointer", color: "#999",
  },
  title: { marginBottom: "25px", color: "#333", fontSize: "24px", fontWeight: "600" },
  divider: { margin: "20px 0", color: "#aaa", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" },
  
  // TABS STYLING
  tabHeader: {
    display: "flex",
    borderBottom: "1px solid #ddd",
    marginBottom: "25px"
  },
  tab: {
    flex: 1,
    padding: "12px",
    cursor: "pointer",
    color: "#666",
    fontWeight: "600",
    borderBottom: "2px solid transparent",
    transition: "all 0.3s"
  },
  activeTab: {
    flex: 1,
    padding: "12px",
    cursor: "pointer",
    color: "#0033cc",
    fontWeight: "bold",
    borderBottom: "2px solid #0033cc" // Blue underline
  },

  formContent: {
    textAlign: "left"
  },
  input: { 
    width: "100%", padding: "12px 15px", marginBottom: "15px", 
    border: "1px solid #ddd", borderRadius: "8px", 
    boxSizing: "border-box", fontSize: "15px", outline: "none",
    transition: "border 0.2s"
  },
  button: { 
    width: "100%", padding: "14px", 
    backgroundColor: "#0033cc", color: "white", 
    border: "none", borderRadius: "8px", 
    cursor: "pointer", fontWeight: "bold", fontSize: "16px",
    boxShadow: "0 4px 6px rgba(0, 51, 204, 0.2)"
  },
  error: { color: "#d9534f", backgroundColor: "#fdeaed", padding: "10px", borderRadius: "5px", marginBottom: "15px", fontSize: "13px", textAlign: "center" },
  success: { color: "#155724", backgroundColor: "#d4edda", padding: "10px", borderRadius: "5px", marginBottom: "15px", fontSize: "13px", textAlign: "center" },
  link: { color: "#0033cc", cursor: "pointer", fontSize: "13px", fontWeight: "600" },
  backLink: { color: "#666", cursor: "pointer", fontSize: "14px", marginTop: "15px", textAlign: "center", display: "block" }
};

export default Login;