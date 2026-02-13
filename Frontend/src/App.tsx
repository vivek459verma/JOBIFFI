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

      {/* AUTH — WITH NAVBAR (optional) */}
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

      <Route
  path="/fraud-alert"
  element={
    <div className="bg-blue-50 min-h-screen">
      <FraudAlert />
    </div>
  }
/>

    </Routes>
  );
}


export default App;
