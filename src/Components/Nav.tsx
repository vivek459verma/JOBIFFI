import { useState } from "react";
import { Dropdown } from "antd";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/media/Jobiffi.png.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const employerItems = [
    { key: "1", label: <a href="#">Buy Online</a> },
    { key: "2", label: <a href="#">Naukri Talent Cloud</a> },
    { key: "3", label: <a href="#">Employer Login</a> },
  ];

  return (
    <nav className="w-full bg-white shadow-md px-4 sm:px-8 py-3 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-10 w-auto" />

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4">
            <h1 className="cursor-pointer hover:text-purple-500 text-sm sm:text-base">Jobs</h1>
            <h1 className="cursor-pointer hover:text-purple-500 text-sm sm:text-base">Companies</h1>
            <h1 className="cursor-pointer hover:text-purple-500 text-sm sm:text-base">Services</h1>
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition text-sm sm:text-base">
            Login
          </button>

          <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-gradient-to-r from-blue-800 via-blue-900 to-blue-900 text-white font-semibold hover:from-blue-900 hover:via-blue-900 hover:to-blue-800 transition text-sm sm:text-base">
            Register
          </button>

          <Dropdown menu={{ items: employerItems }} trigger={["hover"]} placement="bottom">
            <div className="hidden sm:flex items-center gap-1 cursor-pointer hover:text-blue-500 text-sm sm:text-base">
              For Employers
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </div>
          </Dropdown>

          {/* Hamburger Icon (Mobile) */}
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
      </div>

      {/* Mobile Slide Menu */}
      {menuOpen && (
        <div className="sm:hidden mt-2 bg-white shadow-md rounded-lg p-4 flex flex-col gap-2">
          <h1 className="cursor-pointer hover:text-purple-500">Jobs</h1>
          <h1 className="cursor-pointer hover:text-purple-500">Companies</h1>
          <h1 className="cursor-pointer hover:text-purple-500">Services</h1>
          <Dropdown menu={{ items: employerItems }} trigger={["click"]} placement="bottom">
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
              For Employers
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </div>
          </Dropdown>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
