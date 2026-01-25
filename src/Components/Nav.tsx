import { useState } from "react";
import { Dropdown } from "antd";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/media/New_Brand_logo_-_16060-removebg.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);
  const [jobCompany, setJobCompany] = useState(false);
  const [jobServices, setJobServices] = useState(false);
  const [jobResources, setJobResources] = useState(false);

  const employerItems = [
    { key: "1", label: <a href="#">Buy Online</a> },
    { key: "2", label: <a href="#">Employer Login</a> },
  ];

  return (
    <nav className="w-full bg-white shadow-md px-4 sm:px-8 py-3 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* LEFT – Logo */}
        <div className="flex ml-[50px] items-center translate-x-[30%]">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
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
              <div className="absolute top-10 left-0 w-[650px] bg-white shadow-xl rounded-xl p-6 grid grid-cols-3 gap-6 z-50">
                <div>
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
                <div>
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
                  </ul>
                </div>
                <div>
                  <h2 className="font-semibold text-blue-900 mb-3">
                    Jobs by Location
                  </h2>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Jobs in Delhi</li>
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
            <h1 className="cursor-pointer text-gray-700 hover:text-black font-medium hover:border-blue-800 pb-1 border-b-2 border-transparent">
              Companies
            </h1>
            {jobCompany && (
              <div className="absolute top-10 left-0 w-[650px] bg-white shadow-xl rounded-xl p-6 grid grid-cols-3 gap-6 z-50">
                <div>
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
                <div>
                  <h2 className="font-semibold text-blue-900 mb-3">
                    Explore collections
                  </h2>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Top compaines</li>
                    <li>IT compaines</li>
                    <li>Fintech compaines</li>
                    <li>Sponsored compaines</li>
                    <li>Featured compaines</li>
                  </ul>
                </div>
                <div>
                  <h2 className="font-semibold text-blue-900 mb-3">
                    Research compaines
                  </h2>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Interview question</li>
                    <li>Company salaries</li>
                    <li>Company reviews</li>
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
              <div className="absolute top-10 left-0 w-[650px] bg-white shadow-xl rounded-xl p-6 grid grid-cols-3 gap-6 z-50">
                <div className="flex flex-col">
                  {/* First Section */}
                  <h2 className="font-semibold text-blue-900 mb-3">
                    Resume Writing
                  </h2>
                  <ul className="space-y-2 text-sm text-gray-600 mb-5">
                    <li>Text Resume</li>
                    <li>Visual Resume</li>
                    <li>Resume Critique</li>
                  </ul>

                  {/* Second Section */}
                  <h2 className="font-semibold text-blue-900 mb-3">
                    Find Jobs
                  </h2>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Jobs4u</li>
                    <li>Priority applicant</li>
                    <li>Contact us</li>
                  </ul>
                </div>

                <div className="flex flex-col">
                  <h2 className="font-semibold text-blue-900 mb-3">
                    Get recruiter's attention
                  </h2>
                  <ul className="space-y-2 text-sm text-gray-600 mb-5">
                    <li>Resume display</li>
                  </ul>
                  <h2 className="font-semibold text-blue-900 mb-3"> Montly subscription</h2>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Basic & premium plans</li>
                  </ul>
                </div>
                <div>
                  <h2 className="font-semibold text-blue-900 mb-3">
                    Free resume resources
                  </h2>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Resume maker</li>
                    <li>Resume quality score</li>
                    <li>Resume samples</li>
                    <li>Job letter samples</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Resources */}
         <div className="relative" onMouseEnter={() => setJobResources(true)} onMouseLeave={() => setJobResources(false)}>
           <h1 className="cursor-pointer text-gray-700 hover:text-black font-medium border-b-2 border-transparent hover:border-blue-800 pb-1">
            Resources
          </h1>
          {jobResources && (
            <div className="absolute top-10 left-0 w-[350px] bg-white shadow-xl rounded-xl p-6 grid  gap-6 ">
              <div className="flex flex-col">
                <ul className="space-y-2 text-sm text-gray-600 mb-5">
                  <li>Jobiffi Blogs</li>
                  <li>AI interview coach</li>
                  <li>News alert</li>
                  <li>Events & Customer </li>
                </ul>
              </div>
            </div>
          )}
         </div>
        </div>

        {/* RIGHT – Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white transition font-semibold">
            Login
          </button>

          <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-gradient-to-r from-blue-800 via-blue-900 to-blue-900 text-white font-semibold">
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

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="sm:hidden absolute top-full left-0 w-full bg-white shadow-md p-4 z-50">
            {/* Jobs */}
            <div className="mb-2">
              <button
                className="w-full text-left flex justify-between items-center py-2 px-2 font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded"
                onClick={() => setJobsOpen(!jobsOpen)}
              >
                Jobs
                <ChevronDownIcon
                  className={`w-4 h-4 transform transition-transform ${jobsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {jobsOpen && (
                <ul className="pl-4 mt-2 space-y-1 text-gray-600">
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
                className="w-full text-left flex justify-between items-center py-2 px-2 font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded"
                onClick={() => setJobCompany(!jobCompany)}
              >
                Companies
                <ChevronDownIcon
                  className={`w-4 h-4 transform transition-transform ${jobCompany ? "rotate-180" : ""}`}
                />
              </button>
              {jobCompany && (
                <ul className="pl-4 mt-2 space-y-1 text-gray-600">
                  <li>Top MNCs</li>
                  <li>Unicorns</li>
                  <li>Product Companies</li>
                  <li>Internet Companies</li>
                </ul>
              )}
            </div>

            {/* Services */}
            <div className="mb-2">
              <button
                className="w-full text-left flex justify-between items-center py-2 px-2 font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded"
                onClick={() => setJobServices(!jobServices)}
              >
                Services
                <ChevronDownIcon
                  className={`w-4 h-4 transform transition-transform ${jobServices ? "rotate-180" : ""}`}
                />
              </button>
              {jobServices && (
                <ul className="pl-4 mt-2 space-y-1 text-gray-600">
                  <li>Resume Builder</li>
                  <li>Job Alerts</li>
                  <li>Monthly Subscription</li>
                </ul>
              )}
            </div>

            {/* Resources */}
            <div className="mb-2">
              <button className="w-full text-left py-2 px-2 font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded">
                Resources
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
