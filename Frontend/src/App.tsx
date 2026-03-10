import { Routes, Route } from "react-router-dom";

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
import AboutUs from "./Components/pages/AboutUs";

import TermsConditions from "./Components/pages/TermsConditions";
import PrivacyPolicy from "./Components/pages/PrivacyPolicy";
import FraudAlert from "./Components/pages/FraudAlert";
import TrustSafety from "./Components/pages/TrustSafety";


import ResumeForm from "./Components/ResumeBuilder/ResumeMakerForm";

function App() {
  return (
    <Routes>
      {/* HOME PAGE — WITH NAVBAR */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
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
        }
      />

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

      {/* ABOUT US */}
      <Route
        path="/about-us"
        element={
          <>
            <Navbar />
            <AboutUs />
          </>
        }
      />
      
      {/* SERVICES — WITH NAVBAR */}
      <Route
        path="/resume-builder"
        element={
          <>
            <Navbar />
            {/* Added standard background to match your theme */}
            <div className="bg-blue-50 min-h-screen py-10">
              <ResumeForm />
            </div>
          </>
        }
      />


      {/* TERMS */}
      <Route
        path="/terms-conditions"
        element={
          <div className="bg-blue-50 min-h-screen">
            <TermsConditions />
          </div>
        }
      />

      {/* PRIVACY */}
      <Route
        path="/privacy-policy"
        element={
          <div className="bg-blue-50 min-h-screen">
            <PrivacyPolicy />
          </div>
        }
      />

      {/* FRAUD ALERT */}
      <Route
        path="/fraud-alert"
        element={
          <div className="bg-blue-50 min-h-screen">
            <FraudAlert />
          </div>
        }
      />

      {/* TRUST & SAFETY */}
      <Route
        path="/trust-safety"
        element={
          <div className="bg-blue-50 min-h-screen">
            <TrustSafety />
          </div>
        }
      />
    </Routes>
  );
}

export default App;