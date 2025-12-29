import { CiLocationOn, CiSearch } from "react-icons/ci";

function MainHead() {
  return (
    <div className="container mx-auto px-3 flex flex-col items-center">
      <h1 className="text-black font-bold text-2xl sm:text-4xl mt-14 text-center">
        Find your dream job now
      </h1>
      <p className="mt-2 text-base sm:text-xl text-center">
        5 lakh+ jobs for you to explore
      </p>

      {/* 🔍 Search Bar – always row */}
      <div className="mt-6 w-full max-w-4xl  rounded-2xl shadow-sm
        flex items-center overflow-x-auto">

        {/* Skills */}
        <div className="relative flex items-center min-w-[220px] flex-1">
          <CiSearch className="absolute left-3 text-gray-400 text-lg sm:text-xl" />
          <input
            type="text"
            placeholder="Skills / Designation / Companies"
            className="w-full h-10 sm:h-12 pl-9 sm:pl-10 pr-3 outline-none text-sm sm:text-base"
          />
        </div>

        <div className="h-6 w-px bg-gray-300 mx-1"></div>

        {/* Experience */}
        <div className="min-w-[160px] flex-1">
          <select className="w-full h-10 sm:h-12 px-2 sm:px-3 outline-none text-sm sm:text-base text-gray-500">
            <option value="">Experience</option>
            <option>Fresher</option>
            <option>1 Year</option>
            <option>2 Years</option>
            <option>3 Years</option>
            <option>4+ Years</option>
          </select>
        </div>

        <div className="h-6 w-px bg-gray-300 "></div>

        {/* Location */}
        <div className="relative flex items-center min-w-[160px] flex-1">
          <CiLocationOn className="absolute left-3 text-gray-400 text-lg sm:text-xl" />
          <input
            type="text"
            placeholder="Location"
            className="w-full h-10 sm:h-12 pl-9 sm:pl-10 pr-3 outline-none text-sm sm:text-base"
          />
        </div>

        {/* Search Button */}
        <button className="min-w-[110px] h-10 sm:h-12 px-4
          bg-gradient-to-r from-blue-900 to-blue-800
          text-white font-semibold text-sm sm:text-base rounded-r-2xl">
          Search
        </button>

      </div>
    </div>
  );
}

export default MainHead;
