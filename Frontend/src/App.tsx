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
import EmployerRegister from "./Components/Authentication/EmployerRegister";
import EmployerVerification from "./Components/Authentication/EmployerVerification";
import ResetPassword from "./Components/Authentication/ResetPassword";
import AuthCallback from "./Components/Authentication/AuthCallback";

import AboutUs from "./Components/pages/AboutUs";
import TermsConditions from "./Components/pages/TermsConditions";
import PrivacyPolicy from "./Components/pages/PrivacyPolicy";

import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import ResumePreviewPage from "./pages/ResumePreviewPage";
import ResumeTemplatesPage from "./pages/ResumeTemplatesPage";
import ResumeLandingPage from "./pages/ResumeLandingPage"; // ✅ NEW

import MainLayout from "./layouts/MainLayout";
import ResumeLayout from "./layouts/ResumeLayout";

/* ============================= */
/* ✅ SUCCESS MESSAGE COMPONENT */
/* ============================= */
function VerificationSuccessMessage({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
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
        boxShadow: "0 8px 24px rgba(16,185,129,0.3)",
        zIndex: 9999,
      }}
    >
      <strong>Email Verified!</strong>
      <div>Your account is now active. Welcome to Jobiffi!</div>
    </div>
  );
}

/* ============================= */
/* ❌ ERROR MESSAGE COMPONENT   */
/* ============================= */
function VerificationErrorMessage({
  reason,
  onClose,
}: {
  reason: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 7000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getMessage = () => {
    switch (reason) {
      case "expired":
        return {
          title: "Verification Link Expired",
          message:
            "Please request a new verification link from the login page.",
        };
      case "missing_token":
        return {
          title: "Invalid Verification Link",
          message: "The verification link is invalid. Please try again.",
        };
      default:
        return {
          title: "Verification Failed",
          message:
            "Something went wrong. Please contact support.",
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
        boxShadow: "0 8px 24px rgba(239,68,68,0.3)",
        zIndex: 9999,
      }}
    >
      <strong>{title}</strong>
      <div>{message}</div>
    </div>
  );
}

/* ============================= */
/* 🏠 HOME PAGE                 */
/* ============================= */
function HomePage() {
  const location = useLocation();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorReason, setErrorReason] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verified = params.get("verified");
    const reason = params.get("reason");

    if (verified === "true") {
      setShowSuccess(true);
      window.history.replaceState({}, "", "/");
    }

    if (verified === "false" && reason) {
      setErrorReason(reason);
      setShowError(true);
      window.history.replaceState({}, "", "/");
    }
  }, [location]);

  return (
    <>
      {showSuccess && (
        <VerificationSuccessMessage onClose={() => setShowSuccess(false)} />
      )}
      {showError && (
        <VerificationErrorMessage
          reason={errorReason}
          onClose={() => setShowError(false)}
        />
      )}

      <MainHead />
      <CategoryCompany />
      <TopCompanies />
      <JobCompanines />
      <SponsorCompaines />
      <UpcomingEvents />
    </>
  );
}

/* ============================= */
/* 🚀 MAIN APP                  */
/* ============================= */
function App() {
  return (
    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      <Route
        path="/login"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      {/* ============================= */}
      {/* 🚀 RESUME FLOW (FINAL FIX)   */}
      {/* ============================= */}

      {/* 1️⃣ Landing Page (NAUKRI STYLE) */}
      <Route
        path="/resume-builder"
        element={
          <ResumeLayout>
            <ResumeLandingPage />   {/* ✅ UPDATED */}
          </ResumeLayout>
        }
      />

      {/* 2️⃣ Resume Editor */}
      <Route
        path="/resume-editor"
        element={
          <ResumeLayout>
            <ResumeBuilderPage />
          </ResumeLayout>
        }
      />

      {/* 3️⃣ Resume Preview */}
      <Route
        path="/resume-preview/:id"
        element={
          <ResumeLayout>
            <ResumePreviewPage />
          </ResumeLayout>
        }
      />

      {/* AUTH */}
      <Route
        path="/register"
        element={
          <MainLayout>
            <Register />
          </MainLayout>
        }
      />

      <Route
        path="/verification"
        element={
          <MainLayout>
            <Verification />
          </MainLayout>
        }
      />

      <Route
        path="/employer-register"
        element={
          <MainLayout>
            <EmployerRegister />
          </MainLayout>
        }
      />

      <Route
        path="/employer-verification"
        element={
          <MainLayout>
            <EmployerVerification />
          </MainLayout>
        }
      />

      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* STATIC */}
      <Route
        path="/about-us"
        element={
          <MainLayout>
            <AboutUs />
          </MainLayout>
        }
      />

      <Route path="/terms-conditions" element={<TermsConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

    </Routes>
  );
}

export default App;