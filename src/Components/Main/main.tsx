import { useEffect, useRef, useState } from "react";
import { CiLocationOn, CiSearch } from "react-icons/ci";

// 📍 Real Job Hubs (India)
const locations = [
  "New Delhi",
  "Delhi / NCR",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Noida",
  "Gurgaon",
  "Faridabad",
  "Ghaziabad",
  "Dehradun",
  "Durgapur",
  "Dhanbad",
  "Udaipur (Dharamjaigarh)",
  "Indore",
  "Bhubaneswar",
  "Coimbatore",
  "Kochi",
  "Trivandrum",
  "Vizag",
  "Vijayawada",
  "Remote",
  "Hybrid",
];

// 🎓 Experience options (FINAL FORMAT)
const experiences = [
  "Fresher",
  "0 - 3 Years",
  "3 - 5 Years",
  "5 - 8 Years",
  "8 - 12 Years",
  "12 - 18 Years",
  "18 - 25 Years",
  "25+ Years",
];

function MainHead() {
  /* ================= EXPERIENCE ================= */
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState("");
  const experienceRef = useRef<HTMLDivElement | null>(null);

  /* ================= LOCATION (UNCHANGED) ================= */
  const [locationSearch, setLocationSearch] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const locationRef = useRef<HTMLDivElement | null>(null);

  const filteredLocations =
    locationSearch.trim().length > 0
      ? locations.filter((loc) =>
          loc.toLowerCase().includes(locationSearch.toLowerCase())
        )
      : [];

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;

      // ✅ EXPERIENCE: close + RESET to "Select experience"
      if (
        experienceRef.current &&
        !experienceRef.current.contains(target)
      ) {
        setExperienceOpen(false);
        setSelectedExperience("");
      }

      // ❌ LOCATION: untouched
      if (
        locationRef.current &&
        !locationRef.current.contains(target)
      ) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="container mx-auto px-3 flex flex-col items-center">
      <h1 className="mt-14 rounded-2xl border-2 border-blue-700 bg-blue-100 text-blue-600 font-bold px-4">
        1+ jobs available
      </h1>

      <h1 className="text-black font-bold text-2xl sm:text-4xl mt-2 text-center">
        Your ideal job is{" "}
        <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-900 bg-clip-text text-transparent">
          just click away
        </span>
      </h1>

      <p className="mt-2 text-sm text-center">
        Discover opportunities from top companies and kickstart your career
      </p>

      {/* ================= SEARCH BAR ================= */}
      <div className="mt-6 w-full max-w-4xl rounded-full shadow-lg bg-white flex items-center px-2">

        {/* Skills */}
        <div className="flex items-center flex-1 px-3">
          <CiSearch className="text-gray-400 text-lg mr-2" />
          <input
            type="text"
            placeholder="Skills / Designation / Companies"
            className="w-full h-11 outline-none text-sm"
          />
        </div>

        <div className="h-6 w-px bg-gray-200" />

        {/* ================= EXPERIENCE ================= */}
        <div
          ref={experienceRef}
          className="relative flex-1 px-3"
        >
          <div
            onClick={() => setExperienceOpen((prev) => !prev)}
            className="h-11 flex items-center justify-between text-sm text-gray-500 cursor-pointer select-none"
          >
            <span>{selectedExperience || "Select experience"}</span>
            <span className="text-xs ml-2">▼</span>
          </div>

          {experienceOpen && (
            <div className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-xl z-30">
              {experiences.map((exp) => (
                <div
                  key={exp}
                  onClick={() => {
                    setSelectedExperience(exp);
                    setExperienceOpen(false);
                  }}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                >
                  {exp}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-gray-200" />

        {/* ================= LOCATION (UNCHANGED) ================= */}
        <div ref={locationRef} className="relative flex-1 px-3">
          <div className="flex items-center">
            <CiLocationOn className="text-gray-400 text-lg mr-2" />
            <input
              type="text"
              placeholder="Enter location"
              value={locationSearch}
              onChange={(e) => {
                setLocationSearch(e.target.value);
                setShowLocationDropdown(true);
              }}
              className="w-full h-11 outline-none text-sm"
            />
          </div>

          {showLocationDropdown && filteredLocations.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-xl z-30 max-h-60 overflow-y-auto">
              {filteredLocations.map((loc) => (
                <div
                  key={loc}
                  onClick={() => {
                    setLocationSearch(loc);
                    setShowLocationDropdown(false);
                  }}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button className="ml-2 px-6 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold flex items-center">
          <CiSearch className="mr-1" /> Search
        </button>
      </div>
    </div>
  );
}

export default MainHead;
