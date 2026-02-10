import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { TbMathGreater } from "react-icons/tb";
import { useRef } from "react";
import FeatureCompany from "./FeatureCompany";

function TopCompanies() {
  const scrollRef = useRef<HTMLDivElement>(null); 

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 via-cyan-50 to-green-50 py-16 rounded-[40px]">
      <h1 className="text-3xl font-bold text-center mt-10">
        Top Companies Hiring Now
      </h1>

      <div className="relative mt-8">

        {/* LEFT BUTTON */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-15 top-1/2 -translate-y-1/2 
                     bg-white border rounded-full p-2 shadow z-10 hover:bg-gray-100"
        >
          <AiOutlineLeft size={20} />
        </button>

        {/* SCROLL CONTAINER */}
       <div className="relative max-w-7xl mx-auto px-6">
         <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide "
        >
          {/* 5+ CARDS */}
          {[
            "MNCs",
            "Edtech",
            "Healthcare",
            "Unicorns",
            "Internet",
            "Finance",
            "Startup",
          ].map((name, idx) => (
            <div
              key={idx}
              className="flex-shrink-0  bg-white rounded-2xl p-6 min-w-[260px] lg:min-w-[300px] border-2 shadow-lg text-center"
            >
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-xl">{name}</h1>
                <TbMathGreater />
              </div>
              <p className="text-sm text-black mt-1">2.2K+ are actively hiring</p>
              <div className="flex gap-1 mt-2">
                <img
                  src="https://img.naukimg.com/logo_images/groups/v1/4583183.gif"
                  className="h-10"
                />
                <img
                  src="https://img.naukimg.com/logo_images/groups/v1/4617867.gif"
                  className="h-10"
                />
                <img
                  src="https://img.naukimg.com/logo_images/groups/v1/58058.gif"
                  className="h-10"
                />
              </div>
            </div>
          ))}
        </div>
       </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-15 top-1/2 -translate-y-1/2 
                     bg-white border rounded-full p-2 shadow z-10 hover:bg-gray-100"
        >
          <AiOutlineRight size={20} />
        </button>
      </div>
      <FeatureCompany />
    </div>
  );
}

export default TopCompanies;
