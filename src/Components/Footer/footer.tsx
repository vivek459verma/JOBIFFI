import { AiFillLinkedin, AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import logo from "../../assets/media/New_Brand_logo_-_16060-removebg.png";

const Footer = () => {
  return (
    <footer className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        
        {/* Column 1 */}
        <div>
          <img src={logo} alt="logo" className="h-12 w-auto" />
          <h6 className="mt-6 font-semibold">Connected with us</h6>
          <div className="flex gap-3 mt-3">
            <AiFillFacebook className="text-blue-500 text-xl  cursor-pointer" />
            <AiFillInstagram className="text-pink-500 text-xl  cursor-pointer" />
            <AiFillLinkedin className="text-blue-500 text-xl  cursor-pointer" />
            <img
              src="https://static.naukimg.com/s/0/0/i/new-homepage/twitter_v1.svg"
              alt="twitter"
              className="h-4 bg-black mt-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li className="hover:text-blue-900 cursor-pointer">About us</li>
            <li className="hover:text-blue-900 cursor-pointer">Careers</li>
            <li className="hover:text-blue-900 cursor-pointer">Hiring hub</li>
            <li className="hover:text-blue-900 cursor-pointer">Sitemap</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li className="hover:text-blue-900 cursor-pointer">Jobs</li>
            <li className="hover:text-blue-900 cursor-pointer">Compaines</li>
            <li className="hover:text-blue-900 cursor-pointer">Services</li>
            <li className="hover:text-blue-900 cursor-pointer">Resources</li>
            <li className="hover:text-blue-900 cursor-pointer">Blogs</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li className="hover:text-blue-900 cursor-pointer">Help Center</li>
            <li className="hover:text-blue-900 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-blue-900 cursor-pointer">Terms & conditions</li>
            <li className="hover:text-blue-900 cursor-pointer">Fraud alert</li>
            <li className="hover:text-blue-900 cursor-pointer">Trust & Safety</li>
          </ul>
        </div>

        {/* Column 5 */}
        <div>
          <h6 className="text-black font-semibold">Get the App today</h6>
          <p className="text-gray-600 text-sm mt-2">
            Trusted by 50,000 + Job seekers
          </p>
          <div className="flex gap-3 mt-4">
            <img
              src="https://static.naukimg.com/s/0/0/i/new-homepage/android-app_v1.png"
              alt="android"
              className="h-10"
            />
            <img
              src="https://static.naukimg.com/s/0/0/i/new-homepage/ios-app_v1.png"
              alt="ios"
              className="h-10"
            />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
