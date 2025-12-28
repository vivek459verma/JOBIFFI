import { Dropdown } from "antd";
import logo from "../assets/media/website logo svg.svg";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

function Navbar() {

  // AntD v5 dropdown items
  const employerItems = [
    {
      key: "1",
      label: <a href="#">Buy Online</a>,
    },
    {
      key: "2",
      label: <a href="#">Naukri Talent Cloud</a>,
    },
    {
      key: "3",
      label: <a href="#">Employer Login</a>,
    },
  ];

  return (
    <nav className="flex justify-between items-center bg-white text-black p-4 shadow-md">

      {/* Left Section */}
      <div className="flex items-center gap-6 ml-25">
        <img src={logo} alt="Logo" className="h-10 w-20 ml-20" />

        <h1 className="cursor-pointer hover:text-purple-500">Jobs</h1>
        <h1 className="cursor-pointer hover:text-purple-500">Companies</h1>
        <h1 className="cursor-pointer hover:text-purple-500">Services</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 mr-25">

        <button className="px-4 py-2 rounded-2xl border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition">
          Login
        </button>

        <button className="px-4 py-2 rounded-2xl bg-purple-500 text-white font-semibold hover:bg-purple-600 transition">
          Register
        </button>

        {/* Employer Hover Dropdown */}
        <Dropdown
          menu={{ items: employerItems }}
          trigger={["hover"]}
          placement="bottom"
        >
          <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
            For Employers
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          </div>
        </Dropdown>

      </div>
    </nav>
  );
}

export default Navbar;
