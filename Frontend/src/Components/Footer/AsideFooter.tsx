import img from "../../assets/media/img.jpeg";
import apple from "../../assets/media/apple store.svg";
import play from "../../assets/media/playstore.svg";
export default function AsideFooter() {
  return (
    <>
      <div className=" mt-3  flex flex-col md:flex-row items-center justify-between px-8 text-center md:text-left bg-pink-50 rounded-2xl max-w-7xl mx-auto">
        <div className="flex flex-col text-center md:text-left md:w-1/2 gap-4 ml-[5%] mb-3">
          <h1 className="text-black font-bold text-2xl mt-3">
            1M+ users on the <br />
            Jobiffi app
          </h1>
          <span className="text-gray-600">
            Get real time 5,000+ job in our app
          </span>
          <div className="relative mt-5 w-full max-w-sm">
            <input
              type="text"
              placeholder="Enter email......"
              className="w-full border border-gray-600 rounded-full py-2 pl-3 pr-20 outline-none"
            />

            <button
              className="absolute right-1 top-1/2 -translate-y-1/2 
               bg-blue-600 text-white text-sm px-3 py-1.5 
               rounded-full hover:bg-blue-700"
            >
              Get link
            </button>
          </div>
          <div className="flex mt-5 gap-2">
            <img src={apple} alt="apple" className="h-8" />
            <img src={play} alt="apple" className="h-8" />
            {/* <img src="https://static.naukimg.com/s/0/0/i/download-app-link/GplayOneThemeHd.png" alt="" className="h-8"/>
            <img src="https://static.naukimg.com/s/0/0/i/download-app-link/AppstoreOneThemeHd.png" alt="" className="h-8"/> */}
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center ">
          {/* <img src="https://static.naukimg.com/s/0/0/i/download-app-link/MaskGroupOneTheme.png" alt="" className="h-60"/> */}
          <img src={img} alt="" className="h-60" />
        </div>
      </div>
    </>
  );
}
