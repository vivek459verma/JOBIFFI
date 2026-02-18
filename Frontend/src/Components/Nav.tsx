import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/media/New_Brand_logo_-_16060-removebg.png";

/* ✅ ONLY ADDITION */
import Login from "./Login";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);
  const [jobCompany, setJobCompany] = useState(false);
  const [jobServices, setJobServices] = useState(false);
  const [jobResources, setJobResources] = useState(false);

  /* ✅ ONLY ADDITION */
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const navigate = useNavigate();

  const employerItems = [
    { key: "1", label: <a href="#">Buy Online</a> },
    {
      key: "2",
      label: (
        <a
          href="/employer-register"
          onClick={(e) => {
            e.preventDefault();
            navigate("/employer-register");
          }}
        >
          Employer Register
        </a>
      ),
    },
    { key: "3", label: <a href="#">Employer Login</a> },
  ];

  return (
    <>
      <nav className="w-full bg-white shadow-md px-4 sm:px-8 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* LEFT – Logo */}
          <div className="flex ml-12.5 items-center translate-x-[30%]">
            <a href="/">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </a>
          </div>

          {/* CENTER – Desktop Menu */}
          <div className="hidden sm:flex absolute left-1/2 -translate-x-[80%] items-center gap-10">
            {/* Jobs */}
            <div
              className="relative"
              onMouseEnter={() => setJobsOpen(true)}
              onMouseLeave={() => setJobsOpen(false)}
            >
              <h1 className="cursor-pointer font-medium text-gray-700 hover:text-black border-b-2 border-transparent hover:border-blue-800 pb-1">
                Jobs
              </h1>

              {jobsOpen && (
                <div className="absolute top-10 left-0 w-162.5 bg-white shadow-xl rounded-xl p-6 grid grid-cols-3 gap-6 z-50">
                  <div className="border-r border-gray-200 pr-4">
                    <h2 className="font-semibold text-blue-900 mb-3">
                      Job Categories
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>IT Jobs</li>
                      <li>Sales Jobs</li>
                      <li>Marketing Jobs</li>
                      <li>Finance Jobs</li>
                      <li>Data Science Jobs</li>
                      <li>HR Jobs</li>
                      <li>Engineering Jobs</li>
                    </ul>
                  </div>

                  <div className="border-r border-gray-200 pr-4">
                    <h2 className="font-semibold text-blue-900 mb-3">
                      Jobs in Demand
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Fresher Jobs</li>
                      <li>MNC Jobs</li>
                      <li>Remote Jobs</li>
                      <li>Work from home Jobs</li>
                      <li>Walk-in Jobs</li>
                      <li>Part-time Jobs</li>
                      <li>Freelancing Jobs</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-semibold text-blue-900 mb-3">
                      Jobs by Location
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Jobs in Delhi</li>
                      <li>Jobs in Noida</li>
                      <li>Jobs in Bangalore</li>
                      <li>Jobs in Mumbai</li>
                      <li>Jobs in Hyderabad</li>
                      <li>Jobs in Chennai</li>
                      <li>Jobs in Pune</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Companies */}
            <div
              className="relative"
              onMouseEnter={() => setJobCompany(true)}
              onMouseLeave={() => setJobCompany(false)}
            >
              <h1 className="cursor-pointer text-gray-700 hover:text-black font-medium border-b-2 border-transparent hover:border-blue-800 pb-1">
                Companies
              </h1>

              {jobCompany && (
                <div className="absolute top-10 left-0 w-162.5 bg-white shadow-xl rounded-xl p-6 grid grid-cols-3 gap-6 z-50">
                  <div className="border-r border-gray-200 pr-4">
                    <h2 className="font-semibold text-blue-900 mb-3">
                      Explore Categories
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Unicorn</li>
                      <li>MNC</li>
                      <li>Startup</li>
                      <li>Product based</li>
                      <li>Internet</li>
                    </ul>
                  </div>

                  <div className="border-r border-gray-200 pr-4">
                    <h2 className="font-semibold text-blue-900 mb-3">
                      Explore collections
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Top Companies</li>
                      <li>IT Companies</li>
                      <li>Fintech Companies</li>
                      <li>Sponsored Companies</li>
                      <li>Featured Companies</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-semibold text-blue-900 mb-3">
                      Workplace Insights
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Interview Question</li>
                      <li>Company Salaries</li>
                      <li>Company Reviews</li>
                      <li>Salary Calculator</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Services */}
            <div
              className="relative"
              onMouseEnter={() => setJobServices(true)}
              onMouseLeave={() => setJobServices(false)}
            >
              <h1 className="cursor-pointer text-gray-700 hover:text-black font-medium border-b-2 border-transparent hover:border-blue-800 pb-1">
                Services
              </h1>

              {jobServices && (
                <div className="absolute top-10 left-0 w-162.5 bg-white shadow-xl rounded-xl p-6 grid grid-cols-3 gap-6 z-50">
                  <div className="flex flex-col border-r border-gray-200 pr-4">
                    <h2 className="font-semibold text-blue-900 mb-3">
                      Smart Resume Builder
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-600 mb-5">
                      <li>Text-Based Resume</li>
                      <li>Visual Resume</li>
                      <li>One-Page Resume</li>
                      <li>Infographic Resume</li>
                      <li>AI Cover Letter</li>
                    </ul>

                    <h2 className="font-semibold text-blue-900 mb-3">
                      Job Search
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Early Access</li>
                      <li>Turbo Apply</li>
                      <li>Contact us</li>
                    </ul>
                  </div>

                  <div className="flex flex-col border-r border-gray-200 pr-4">
                    <h2 className="font-semibold text-blue-900 mb-3">
                      Fast-Track to Recruiters
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-600 mb-5">
                      <li>Resume Highlighting</li>
                      <li>Profile Spotlight</li>
                      <li>VIP Profile Access</li>
                    </ul>

                    <h2 className="font-semibold text-blue-900 mb-3">
                      Monthly Subscription
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Basic Monthly Aceess</li>
                      <li>Premium Monthly Aceess</li>
                      <li>VIP Monthly Aceess</li>
                      <li>Elite Monthly Aceess</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-semibold text-blue-900 mb-3">
                      Free Resume Toolkit
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Resume Builder</li>
                      <li>Smart Resume Score</li>
                      <li>Resume Samples</li>
                      <li>Cover Letter Samples</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Resources */}
            <div
              className="relative"
              onMouseEnter={() => setJobResources(true)}
              onMouseLeave={() => setJobResources(false)}
            >
              <h1 className="cursor-pointer text-gray-700 hover:text-black font-medium border-b-2 border-transparent hover:border-blue-800 pb-1">
                Resources
              </h1>

              {jobResources && (
                <div className="absolute top-10 left-0 w-55 bg-white shadow-xl rounded-xl p-6 grid gap-6 z-50">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Jobiffi Blogs</li>
                    <li>AI Interview Coach</li>
                    <li>News Alert and Events</li>
                    <li>Customer Reviews</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT – Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white transition font-semibold"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-linear-to-r from-blue-800 via-blue-900 to-blue-900 text-white font-semibold"
            >
              Register
            </button>

            <Dropdown menu={{ items: employerItems }} trigger={["hover"]}>
              <div className="hidden sm:flex items-center gap-1 cursor-pointer text-gray-700 hover:text-black">
                For Employers
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </div>
            </Dropdown>

            {/* Mobile Hamburger */}
            <div className="sm:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* ✅ FULL MOBILE MENU RESTORED */}
          {menuOpen && (
            <div className="sm:hidden absolute top-full left-0 w-full bg-white shadow-md p-4 z-50">
              {/* Jobs */}
              <div className="mb-2">
                <button
                  className="w-full text-left flex justify-between items-center py-2 px-2 font-medium"
                  onClick={() => setJobsOpen(!jobsOpen)}
                >
                  Jobs
                  <ChevronDownIcon
                    className={`w-4 h-4 ${jobsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {jobsOpen && (
                  <ul className="pl-4 space-y-1">
                    <li>IT Jobs</li>
                    <li>Sales Jobs</li>
                    <li>Marketing Jobs</li>
                    <li>Finance Jobs</li>
                  </ul>
                )}
              </div>

              {/* Companies */}
              <div className="mb-2">
                <button
                  className="w-full text-left flex justify-between items-center py-2 px-2 font-medium"
                  onClick={() => setJobCompany(!jobCompany)}
                >
                  Companies
                  <ChevronDownIcon
                    className={`w-4 h-4 ${jobCompany ? "rotate-180" : ""}`}
                  />
                </button>

                {jobCompany && (
                  <ul className="pl-4 space-y-1">
                    <li>Top MNCs</li>
                    <li>Unicorns</li>
                    <li>Product Companies</li>
                    <li>Internet Companies</li>
                  </ul>
                )}
              </div>

              {/* Resources */}
              <div className="mb-2">
                <button className="w-full text-left py-2 px-2 font-medium">
                  Resources
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* LOGIN */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

export default Navbar;
