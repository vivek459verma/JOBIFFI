import Footer from "./Components/Footer/footer";
import CategoryCompany from "./Components/Main/Category";
import MainHead from "./Components/Main/main";
import Navbar from "./Components/Nav";
import SponsorCompaines from "./Components/Sponsor/sponsorCompanies";
import JobCompanines from "./Components/Top/jobavailable";
import TopCompanies from "./Components/Top/TopCompanies";

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-blue-50">
        <MainHead />
      <CategoryCompany />
      <TopCompanies />
      <JobCompanines />
      <SponsorCompaines />
      <Footer />
      </div>
    </>
  )
}
export default App;