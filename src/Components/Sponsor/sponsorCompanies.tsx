import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function FeatureCompany() {
  const [page, setPage] = useState(0);

  const companies = [
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
       para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
       para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Facebook",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
       para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
       para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
       para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Adobe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Adobe_Corporate_Logo.png",
       para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Salesforce",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Salesforce_logo.svg",
       para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Uber",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
       para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Airbnb",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
      para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
       para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Twitter",
      logo: "https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg",
       para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Uber",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
       para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Airbnb",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
      para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
       para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
    {
      name: "Twitter",
      logo: "https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg",
       para: "B2B , Corporate",
      rating : "4.2 214 reviews"
    },
  ];

  // Split into pages of 8 companies
  const pageSize = 8;
  const totalPages = Math.ceil(companies.length / pageSize);
  const currentCompanies = companies.slice(page * pageSize, page * pageSize + pageSize);

  const scrollLeft = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    setPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <>
      <div className="w-full bg-gradient-to-r from-blue-50 via-cyan-50 to-green-50 py-16 rounded-[40px]">
        <h1 className="text-center font-bold text-3xl mb-10"> Sponsored Compaines</h1>
        <div className="relative mt-10">
          {/* LEFT BUTTON */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute left-15 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow-z-10 hover:bg-gray-100"
          >
            <AiOutlineLeft size={20} />
          </button>

          {/* GRID OF CURRENT PAGE */}
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentCompanies.map((company, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border-2 shadow-lg text-center"
                >
                  <div className="items-center gap-2">
                    <img src={company.logo} alt={company.name} className="h-10 mx-auto mb-4" />
                  </div>
                  <div className="border border-black px-4 py-2 rounded-2xl mt-2">
                    <h1 className="font-bold text-base text-center">{company.name}</h1>
                    <p className="text-sm text-black mt-1">{company.rating}</p>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-black text-sm mt-2">{company.para}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute right-15 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow z-10 hover:bg-gray-100"
          >
            <AiOutlineRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <button className="items-center mt-2 bg-white border-2 border-blue-400 text-sm font-bold text-blue-600 px-4 py-2 rounded-2xl">
          View All Companies
        </button>
      </div>
    </>
  );
}

export default FeatureCompany;
