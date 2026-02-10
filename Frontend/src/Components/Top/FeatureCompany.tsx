import { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function FeatureCompany(){

    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({
        left:300,
        behavior:"smooth",
    });
  };
  const companies = [
    {
        name :"Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        para: "Leading Global Telecom company",
    },
    {
        name : "Microsoft",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        para: "Innovative Software Solutions",
    },
    {
        name : "Amazon",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",    
        para: "E-commerce Giant",
    },
    {
        name : "Facebook",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",   
        para: "Social Media Platform",
    },
    {
        name : "Apple",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",    
        para: "Innovative Tech Products",
    },
    {
        name : "Netflix",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",  
        para: "Leading Streaming Service",  
    },
    {
        name:"Adobe",
        logo:"https://upload.wikimedia.org/wikipedia/commons/d/d7/Adobe_Corporate_Logo.png",
        para: "Creative Software Solutions",
    },
    {
        name:"Salesforce",
        logo:"https://upload.wikimedia.org/wikipedia/commons/e/e3/Salesforce_logo.svg",
        para: "CRM Software Solutions",
    },
    {
        name:"Uber",
        logo:"https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
        para: "Ride-Sharing Platform",
    },
    {
        name:"Airbnb",
        logo:"https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
        para: "Vacation Rental Marketplace",
    },
    {
        name:"Spotify",
        logo:"https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
        para: "Music Streaming Service",
    },
    {
        name:"Twitter",
        logo:"https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg",
        para: "Social Media Platform",
    },
  ]

    return(
        <>
            <div className="w-full bg-gradient-to-r from-blue-50 via-cyan-50 to-green-50 py-16 rounded-[40px]">
                <h1 className="text-center font-bold text-3xl mb-10"> Companies with Open Positions</h1>
                <div className="relative mt-10">
                    <button onClick={scrollLeft} 
                        className="hidden md:flex absolute left-15 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow-z-10 hover:bg-gray-100"
                    >
                        <AiOutlineLeft size={20} />
                    </button>
                    {/* scroll container */}
                   <div className="relative max-w-7xl mx-auto px-6">
                     <div ref={scrollRef} className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide  ">
                    {companies.map((company, idx) => (
                        <div key={idx} className="flex-shrink-0 bg-white rounded-2xl p-6 min-w-[280px] lg:min-w-[300px] border-2 shadow-lg text-center ">
                            <div className=" items-center gap-2">
                                <img src={company.logo} alt={company.name} className="h-10 mx-auto mb-4" />
                            </div>
                             <div className="border border-black px-4 py-2 rounded-2xl mt-2">
                                <h1 className="font-bold  text-base text-center">{company.name}</h1>
                                <p className="text-sm text-black mt-1">2.2K+ are actively hiring</p>
                             </div>
                             <div className="text-center mt-2 ">
                                <p className="text-black text-sm mt-2">{company.para}</p>
                                <button className="mt-2 bg-blue-200 text-sm font-bold mt-2 hover:text-white text-blue-600 px-4 py-2 items-center rounded-2xl hover:bg-blue-400">Join Now</button>
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
            </div>
            <div className="flex justify-center mt-2">
                    <button className="items-center mt-2 bg-white border-2 border-blue-400 text-sm font-bold mt-2  text-blue-600 px-4 py-2 items-center rounded-2xl ">View All Compaines</button>
            </div>                 
        </>
    )
}
export default FeatureCompany;