import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const JobCompanies = () => {
  const jobs = [
    "DevOps Engineering",
    "Fullstack Developer",
    "Cyber Security",
    "Technical lead",
    "Business analyst",
    "Frontend Developer",

    "Backend Developer",
    "Cloud Engineer",
    "Data Scientist",
    "UI/UX Designer",
    "QA Engineer",
    "Product Manager",

    "Engineering Manager",
    "Mobile App Developer",
    "Technical Architect",
    "Branch Manager",
    "Research Analyst",
    "Chartered Accountant",
  ];

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const [page, setPage] = useState(0);

  const startIndex = page * ITEMS_PER_PAGE;
  const visibleJobs = jobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="relative px-6 py-12">
      {/* Pink Background */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="bg-pink-50 rounded-3xl w-[90%] max-w-300 h-100" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-100 items-center justify-center">
        <div className="flex w-full max-w-6xl flex-col md:flex-row items-center md:items-start justify-between gap-10 px-6">

          {/* LEFT SIDE */}
          <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <img
              src="https://static.naukimg.com/s/0/0/i/role-collection-ot.png"
              alt="Jobs Illustration"
              className="h-40 md:h-52 w-auto"
            />

            <h1 className="font-bold text-2xl md:text-3xl">
              Discover Jobs across <br /> Popular roles
            </h1>

            <p className="text-gray-700 max-w-sm">
              Select a role and we'll show you relevant jobs for it!
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative w-full md:w-100 max-w-95 md:max-w-none z-10">
            <div className="bg-linear-to-br from-indigo-900 to-purple-900 h-75 min-h-90 rounded-2xl p-6 py-10 shadow-xl flex flex-col justify-between">

              {/* GRID WRAPPER */}
              <div className="flex-1 flex items-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                  {visibleJobs.map((job, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 flex flex-col items-start justify-center shadow-sm hover:shadow-md transition"
                    >
                      <h4 className="font-semibold text-sm truncate w-full">
                        {job}
                      </h4>
                      <p className="text-gray-400 text-xs">2.8k jobs</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* DOTS */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full transition ${
                      i === page ? "bg-purple-500" : "bg-purple-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* LEFT ARROW */}
            <button
              onClick={handlePrev}
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white p-4 md:p-3 rounded-full shadow-lg z-20"
            >
              <AiOutlineLeft size={22} />
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={handleNext}
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-4 md:p-3 rounded-full shadow-lg z-20"
            >
              <AiOutlineRight size={22} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobCompanies;
