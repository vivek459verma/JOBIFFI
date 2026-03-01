import React, { useState } from "react";
import type { ChangeEvent, CSSProperties } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

/* ✅ Props Type */
type LoginProps = {
  isOpen: boolean;
  onClose: () => void;
};

/* ✅ View Type */
type ViewType = "password" | "otp" | "forgot";

/* ✅ Form Data */
type FormDataType = {
  email: string;
  password: string;
  otp: string;
};

/* ✅ Backend Response */
type LoginResponse = {
  success: boolean;
  token: string;
  user: {
    name?: string;
  };
};

// 🔧 FIXED: Backend URL now points to port 8000
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [view, setView] = useState<ViewType>("password");
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    otp: "",
  });

  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitchTab = (newView: ViewType) => {
    setView(newView);
    setError("");
    setMessage("");
    setStep(1);
  };

  const handleLoginSuccess = (data: LoginResponse) => {
    console.log("🔓 LOGIN SUCCESS:", data);
    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // Notify other components (like Navbar) in the same tab
      window.dispatchEvent(new Event("auth-change"));

      // Reset form
      setFormData({ email: "", password: "", otp: "" });
      setError("");
      setMessage("");

      onClose();
      navigate("/");
    }
  };

  // 🔧 FIXED: Changed endpoint from /google to /google-login
  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post<LoginResponse>(
        `${BACKEND_URL}/api/auth/google`,
        {
          token: credentialResponse.credential,
        }
      );
      handleLoginSuccess(res.data);
    } catch (err: any) {
      console.error("Google login error:", err);
      setError(err.response?.data?.message || "Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post<LoginResponse>(
        `${BACKEND_URL}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );
      handleLoginSuccess(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(
        `${BACKEND_URL}/api/auth/send-otp`,
        { email: formData.email }
      );
      setStep(2);
      setMessage("OTP sent to your email!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post<LoginResponse>(
        `${BACKEND_URL}/api/auth/login-otp`,
        {
          email: formData.email,
          otp: formData.otp,
        }
      );
      handleLoginSuccess(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(`${BACKEND_URL}/api/auth/forgot-password`, {
        email: formData.email,
      });
      setMessage("Reset link sent! Check your email.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>
          &times;
        </button>

        <h2 style={styles.title}>Login to Jobiffi</h2>

        {/* 🔵 SOCIAL LOGIN SECTION */}
        <div style={styles.socialContainer}>
          {/* Google Login */}
          <div style={{ marginBottom: "12px" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google Login Failed")}
              width="100%"
              text="signin_with"
              shape="rectangular"
            />
          </div>

          {/* LinkedIn Login Button - Opens OAuth flow in current window */}
          <a
            href={`${BACKEND_URL}/api/auth/linkedin`}
            style={styles.linkedinButton}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="white"
              style={{ marginRight: "10px" }}
            >
              <path d="M18.5 0h-17C.67 0 0 .67 0 1.5v17c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5zM5.9 17H3V7.5h2.9V17zM4.45 6.3c-.93 0-1.68-.75-1.68-1.68s.75-1.68 1.68-1.68 1.68.75 1.68 1.68-.75 1.68-1.68 1.68zM17 17h-2.9v-4.6c0-1.1-.02-2.5-1.53-2.5-1.53 0-1.76 1.2-1.76 2.43V17h-2.9V7.5h2.78v1.27h.04c.39-.73 1.33-1.5 2.74-1.5 2.93 0 3.47 1.93 3.47 4.44V17z" />
            </svg>
            Continue with LinkedIn
          </a>
        </div>

        <div style={styles.divider}>OR</div>

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

        {error && <div style={styles.error}>{error}</div>}
        {message && <div style={styles.success}>{message}</div>}

        <div style={styles.formContent}>
          {view === "password" && (
            <form onSubmit={handlePasswordLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <div style={{ textAlign: "right", marginBottom: "20px" }}>
                <span style={styles.link} onClick={() => setView("forgot")}>
                  Forgot Password?
                </span>
              </div>

              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}

          {view === "otp" && (
            <form onSubmit={step === 1 ? sendOtp : verifyOtp}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
                disabled={step === 2}
              />

              {step === 2 && (
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  style={styles.input}
                  required
                  maxLength={6}
                />
              )}

              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? "Processing..." : step === 1 ? "Send OTP" : "Verify & Login"}
              </button>

              {step === 2 && (
                <p
                  style={{ marginTop: "10px", fontSize: "13px", color: "#666", cursor: "pointer" }}
                  onClick={() => {
                    setStep(1);
                    setFormData({ ...formData, otp: "" });
                    setMessage("");
                  }}
                >
                  Resend OTP?
                </p>
              )}
            </form>
          )}

          {view === "forgot" && (
            <form onSubmit={handleForgotPassword}>
              <p style={{ marginBottom: "15px", color: "#666", fontSize: "14px" }}>
                Enter your email to receive a reset link.
              </p>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
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

        <div style={{ marginTop: "25px", fontSize: "14px", color: "#666" }}>
          Don't have an account?{" "}
          <span style={{ color: "#0033cc", cursor: "pointer", fontWeight: "bold" }}>
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

/* ✅ Styles */
const styles: { [key: string]: CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "stretch",
    zIndex: 1000,
    backdropFilter: "blur(4px)",
  },

  modal: {
    backgroundColor: "white",
    padding: "40px",
    width: "480px",
    height: "100vh",
    borderRadius: "0",
    position: "relative",
    boxShadow: "-10px 0 30px rgba(0,0,0,0.2)",
    textAlign: "center",
    animation: "slideFromRight 0.35s ease-out",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflowY: "auto",
  },

  closeButton: {
    position: "absolute",
    top: "15px",
    right: "20px",
    background: "none",
    border: "none",
    fontSize: "28px",
    cursor: "pointer",
    color: "#999",
  },

  title: {
    marginBottom: "25px",
    color: "#333",
    fontSize: "24px",
    fontWeight: "600",
  },

  socialContainer: {
    marginBottom: "20px",
  },

  linkedinButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "12px 20px",
    backgroundColor: "#0077B5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    boxShadow: "0 2px 4px rgba(0, 119, 181, 0.2)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  divider: {
    margin: "20px 0",
    color: "#aaa",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
  },

  tabHeader: {
    display: "flex",
    borderBottom: "1px solid #ddd",
    marginBottom: "25px",
  },

  tab: {
    flex: 1,
    padding: "12px",
    cursor: "pointer",
    color: "#666",
    fontWeight: "600",
    borderBottom: "2px solid transparent",
    transition: "all 0.3s",
  },

  activeTab: {
    flex: 1,
    padding: "12px",
    cursor: "pointer",
    color: "#0033cc",
    fontWeight: "bold",
    borderBottom: "2px solid #0033cc",
  },

  formContent: {
    textAlign: "left" as const,
  },

  input: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxSizing: "border-box" as const,
    fontSize: "15px",
    outline: "none",
    transition: "border 0.2s",
  },

  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#0033cc",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 4px 6px rgba(0, 51, 204, 0.2)",
  },

  error: {
    color: "#d9534f",
    backgroundColor: "#fdeaed",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    fontSize: "13px",
    textAlign: "center" as const,
  },

  success: {
    color: "#155724",
    backgroundColor: "#d4edda",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    fontSize: "13px",
    textAlign: "center" as const,
  },

  link: {
    color: "#0033cc",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },

  backLink: {
    color: "#666",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "15px",
    textAlign: "center" as const,
    display: "block",
  },
};

export default Login;