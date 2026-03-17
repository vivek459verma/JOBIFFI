import { useEffect, useRef, useState } from "react";
import { CiLocationOn, CiSearch } from "react-icons/ci";


// 📍 Real Job Hubs (India)
// const locations = [
//   "Remote",
//   "Hybrid",
//   "New Delhi",
//   "Bangalore",
//   "Delhi NCR",
//   "Mumbai",
//   "Hyderabad",
//   "Chennai",
//   "Pune",
//   "Gurgaon",
//   "Noida",
//   "Faridabad",
//   "Ghaziabad",
//   "Chandigarh",
//   "Ahmedabad",
//   "Vadodara",
//   "Surat",
//   "Coimbatore",
//   "Kochi",
//   "Trivandrum",
//   "Vizag",
//   "Vijayawada",
//   "Kolkata",
//   "Bhubaneswar",
//   "Indore",
//   "Jaipur",
//   "Mohali",
// ];

// 🎓 Experience options
const experienceOptions = [
  "Fresher",
  "0 - 3 Years",
  "3 - 5 Years",
  "5 - 8 Years",
  "8 - 12 Years",
  "12 - 18 Years",
  "18 - 25 Years",
  "25+ Years",
];

export default function MainHead() {
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [apiLocations, setApiLocations] = useState<any[]>([]);
  const locationRef = useRef<HTMLDivElement | null>(null);

  const [experienceOpen, setExperienceOpen] = useState(false);
  const experienceRef = useRef<HTMLDivElement | null>(null);

  // ✅ Selected experience state
  const [selectedExperience, setSelectedExperience] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      if(locationSearch.trim().length > 0){
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${locationSearch}&limit=5&addressdetails=1`);
        const data  = await res.json();
        setApiLocations(data);
        setLocationOpen(true);
      }else{
        setApiLocations([]);
      }
    };
    const delayDebounce = setTimeout(fetchLocations, 500); // debounce
    return () => clearTimeout(delayDebounce);
  }, [locationSearch]);
  // const filteredLocations =
  //   locationSearch.trim().length > 0
  //     ? locations.filter((loc) =>
  //       loc.toLowerCase().includes(locationSearch.toLowerCase())
  //     )
  //     : [];

  // // ✅ Outside click handling
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     const target = event.target as Node;

  //     if (locationRef.current && !locationRef.current.contains(target)) {
  //       setLocationOpen(false);
  //     }

  //     if (experienceRef.current && !experienceRef.current.contains(target)) {
  //       setExperienceOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () =>
  //     document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    // <div className="container mx-auto px-3 flex flex-col items-center">
    <div className="w-full">
      <div className="w-full px-3 md:px-6 lg:px-8 flex flex-col items-center">
      {/* Badge */}
      <h1 className="mt-14 rounded-2xl border-2 border-blue-700 bg-blue-100 text-blue-600 font-bold px-4">
        5,000+ jobs available
      </h1>

      {/* Heading */}
      <h1 className="text-black font-bold text-2xl sm:text-4xl mt-2 text-center">
        Your ideal job is{" "}
        <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-900 bg-clip-text text-transparent">
          just click away
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-2 text-base sm:text-sm text-center font-bold">
        Discover opportunities from top companies and <br />
        kickstart your career
      </p>

      {/* 🔍 Search Bar */}
      <div className="mt-6 w-full max-w-4xl rounded-2xl shadow-lg">
        <div className="w-full bg-white rounded-2xl border border-gray-200 flex flex-col md:flex-row md:items-center">

          {/* Skills */}
          <div className="relative flex items-center w-full  md:min-w-[220px] flex-1">
            <CiSearch className="absolute left-3 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Skills / Designation / Companies"
              className="w-full h-10 sm:h-12 pl-9 pr-3 outline-none text-sm"
            />
          </div>

          <div className="hidden md:block h-6 w-px bg-gray-200" />

          {/* Experience */}
          <div ref={experienceRef} className="relative w-full  md:min-w-[220px] flex-1">
            <div
              onClick={() => setExperienceOpen((prev) => !prev)}
              className="h-10 sm:h-12 px-3 flex items-center cursor-pointer text-sm text-gray-500"
            >
              {selectedExperience || "Select experience"}
            </div>

            {experienceOpen && (
              <div className="absolute z-30 mt-2 w-full bg-white rounded-lg shadow-lg">
                {experienceOptions.map((exp) => (
                  <div
                    key={exp}
                    onClick={() => {
                      setSelectedExperience(exp);
                      setExperienceOpen(false);
                    }}
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-blue-50"
                  >
                    {exp}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-gray-200" />

          {/* Location */}
          <div ref={locationRef} className="relative w-full  md:min-w-[220px] flex-1">
            <div className="flex items-center h-10 sm:h-12 pl-9 pr-3 relative">

              <CiLocationOn className="absolute left-3 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search location..."
                value={locationSearch}
                onChange={(e) => {
                  setLocationSearch(e.target.value);
                  setLocationOpen(true);
                }}
                className="w-full outline-none text-sm"
              />
            </div>

            {locationOpen && apiLocations.length > 0 && (
              <div className="absolute z-30 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {apiLocations.map((loc) => (
                  <div
                    key={loc.place_id}
                    onClick={() => {
                      setLocationSearch(loc.display_name);
                      setLocationOpen(false);
                    }}
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-blue-50"
                  >
                    {loc.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={() => {
              console.log("Experience:", selectedExperience);
              console.log("Location:", locationSearch);
            }}
            className=" min-w-[120px] h-10 sm:h-12 px-5 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-semibold text-sm rounded-r-2xl hover:from-blue-800 hover:to-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>

    </div>
    </div>
  );
}


