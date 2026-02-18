import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./Components/Nav";
import Footer from "./Components/Footer/footer";
import AsideFooter from "./Components/Footer/AsideFooter";

import MainHead from "./Components/Main/main";
import CategoryCompany from "./Components/Main/Category";
import TopCompanies from "./Components/Top/TopCompanies";
import JobCompanines from "./Components/Top/jobavailable";
import SponsorCompaines from "./Components/Sponsor/sponsorCompanies";
import UpcomingEvents from "./Components/Events/UpcomingEvents";

import Register from "./Components/Authentication/register";
import Verification from "./Components/Authentication/verification";
import ResetPassword from "./Components/Authentication/ResetPassword";
import AuthCallback from "./Components/Authentication/AuthCallback";
import AboutUs from "./Components/pages/AboutUs";

import TermsConditions from "./Components/pages/TermsConditions";
import PrivacyPolicy from "./Components/pages/PrivacyPolicy";

// ✅ SUCCESS MESSAGE COMPONENT
function VerificationSuccessMessage({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        right: "20px",
        backgroundColor: "#10b981",
        color: "white",
        padding: "16px 24px",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(16, 185, 129, 0.3)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        maxWidth: "400px",
        animation: "slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      }}
    >
      {/* Success Icon */}
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      {/* Message */}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "4px" }}>
          Email Verified!
        </div>
        <div style={{ fontSize: "14px", opacity: 0.95 }}>
          Your account is now active. Welcome to Jobiffi!
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          border: "none",
          color: "white",
          cursor: "pointer",
          padding: "8px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(450px) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// ✅ ERROR MESSAGE COMPONENT
function VerificationErrorMessage({
  reason,
  onClose,
}: {
  reason: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 7000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getMessage = () => {
    switch (reason) {
      case "expired":
        return {
          title: "Verification Link Expired",
          message: "Please request a new verification link from the login page.",
        };
      case "missing_token":
        return {
          title: "Invalid Verification Link",
          message: "The verification link is invalid. Please try again.",
        };
      default:
        return {
          title: "Verification Failed",
          message: "Something went wrong. Please contact support.",
        };
    }
  };

  const { title, message } = getMessage();

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        right: "20px",
        backgroundColor: "#ef4444",
        color: "white",
        padding: "16px 24px",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(239, 68, 68, 0.3)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        maxWidth: "400px",
        animation: "slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      }}
    >
      {/* Error Icon */}
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      {/* Message */}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "4px" }}>
          {title}
        </div>
        <div style={{ fontSize: "14px", opacity: 0.95 }}>{message}</div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          border: "none",
          color: "white",
          cursor: "pointer",
          padding: "8px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

// ✅ HOME PAGE WITH VERIFICATION HANDLER
function HomePage() {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorReason, setErrorReason] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verified = params.get("verified");
    const status = params.get("status");
    const reason = params.get("reason");

    if (verified === "true" || status === "verified") {
      setShowSuccess(true);
      // Clean URL after 500ms delay
      setTimeout(() => {
        window.history.replaceState({}, "", "/");
      }, 500);
    } else if ((verified === "false" || status === "error") && reason) {
      setErrorReason(reason || "Verification failed");
      setShowError(true);
      // Clean URL after 500ms delay
      setTimeout(() => {
        window.history.replaceState({}, "", "/");
      }, 500);
    }
  }, [location]);

  return (
    <>
      {/* VERIFICATION MESSAGES */}
      {showSuccess && <VerificationSuccessMessage onClose={() => setShowSuccess(false)} />}
      {showError && (
        <VerificationErrorMessage reason={errorReason} onClose={() => setShowError(false)} />
      )}

      {/* NAVBAR */}
      <Navbar />

      {/* HOME PAGE CONTENT */}
      <div className="bg-blue-50 relative z-0">
        <MainHead />
        <CategoryCompany />
        <TopCompanies />
        <JobCompanines />
        <SponsorCompaines />
        <UpcomingEvents />
        <AsideFooter />
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* HOME PAGE — WITH NAVBAR AND VERIFICATION HANDLER */}
      <Route path="/" element={<HomePage />} />

      {/* FALLBACK FOR OLD LINKS — ALSO RENDERS HOMEPAGE */}
      <Route path="/login" element={<HomePage />} />

      {/* AUTH — WITH NAVBAR */}
      <Route
        path="/register"
        element={
          <>
            <Navbar />
            <Register />
          </>
        }
      />

      <Route
        path="/verification"
        element={
          <>
            <Navbar />
            <Verification />
          </>
        }
      />

      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ABOUT US — WITH NAVBAR */}
      <Route
        path="/about-us"
        element={
          <>
            <Navbar />
            <AboutUs />
          </>
        }
      />

      {/* TERMS — NO NAVBAR */}
      <Route
        path="/terms-conditions"
        element={
          <div className="bg-blue-50 min-h-screen">
            <TermsConditions />
          </div>
        }
      />

      {/* PRIVACY — NO NAVBAR */}
      <Route
        path="/privacy-policy"
        element={
          <div className="bg-blue-50 min-h-screen">
            <PrivacyPolicy />
          </div>
        }
      />
    </Routes>
  );
}

export default App;