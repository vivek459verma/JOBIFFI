import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Nav";

import MainHead from "./Components/Main/main";
import CategoryCompany from "./Components/Main/Category";

import UpcomingEvents from "./Components/Events/UpcomingEvents";

import TopCompanies from "./Components/Top/TopCompanies";
import JobCompanines from "./Components/Top/jobavailable";

import SponsorCompaines from "./Components/Sponsor/sponsorCompanies";

import AsideFooter from "./Components/Footer/AsideFooter";
import Footer from "./Components/Footer/footer";

import Register from "./Components/Authentication/register";
import Verification from "./Components/Authentication/verification";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
  path="/"
  element={
    <div className="bg-blue-50 relative z-0">
      <MainHead />

      <CategoryCompany />
      <TopCompanies />
      <JobCompanines />

      {/* ✅ Sponsored Companies FIRST */}
      <SponsorCompaines />

      {/* ✅ Upcoming Events BELOW Sponsored Companies */}
      <UpcomingEvents />

      <AsideFooter />
      <Footer />
    </div>
  }
/>


        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </>
  );
}

export default App;
