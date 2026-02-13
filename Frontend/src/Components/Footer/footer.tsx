import { AiOutlineCopyright } from "react-icons/ai";

import logo from "../../assets/media/New_Brand_logo_-_16060-removebg.png";


const Footer = () => {
  return (
    <footer className="bg-white mt-10 ">
      <div className="max-w-7xl  py-10 mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {/* Column 1 */}
        <div>
          <a href="/">
            <img src={logo} alt="logo" className="h-12 w-auto mt-3" />
          </a>
          <h6 className="mt-6 font-semibold">Connected with us</h6>
          <div className="flex items-center gap-2 mt-3">
            <a href="http://facebook.com/Jobiffi">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-ddIzltfqrD7r7l7bEUKu1ekFwv5C7c7ow&s"
                alt="facebook"
                className="h-7 w-7 object-contain"
              />

            </a>
            <a href="https://www.instagram.com/jobiffi?igsh=dnMwNWozYnBuODc2">
              <img
                src="https://img.freepik.com/premium-psd/instagram-logo-social-media-icon_705838-13489.jpg?semt=ais_hybrid&w=740&q=80"
                alt="instagram"
                className="h-7 w-7 object-contain"
              />
            </a>

            <a href="https://www.linkedin.com/company/jobiffi/">
              <img
                src="https://e7.pngegg.com/pngimages/524/809/png-clipart-computer-icons-resume-linkedin-logo-job-hunting-others-blue-angle-thumbnail.png"
                alt="linkedin"
                className="h-7 w-7 object-contain"
              />

            </a>
            <a href="">
              <img
                src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?semt=ais_hybrid&w=740&q=80"
                alt="twitter"
                className="h-5 w-5 ml-1 object-contain"
              />
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <ul className="mt-3 space-y-2 text-gray-600">
            <a
              href="/"
              className="hover:text-blue-900 cursor-pointer block"
            >
              Home
            </a>
            <a
              href="/about-us"
              rel="noopener noreferrer"
              className="hover:text-blue-900 cursor-pointer block"
            >
              About us
            </a>
            {/* <li className="hover:text-blue-900 cursor-pointer">About us</li> */}
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
        {/* Column 4 */}
        {/* Column 4 */}
        <div>
          <ul className="mt-3 space-y-2 text-gray-600">

            <li className="hover:text-blue-900 cursor-pointer">
              Help Center
            </li>

            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-900 cursor-pointer block"
            >
              Privacy Policy
            </a>

            <a
              href="/terms-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-900 cursor-pointer block"
            >
              Terms & conditions
            </a>

           <a
  href="/fraud-alert"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-blue-900 cursor-pointer block"
>
  Fraud Alert
</a>


            <li className="hover:text-blue-900 cursor-pointer">
              Trust & Safety
            </li>

          </ul>
        </div>


        {/* Column 5 */}
        <div>
          <h6 className="text-black font-semibold mt-3">Get the App today</h6>
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
      <div className="border border-r border-gray-200"></div>
      <div className="text-center mt-4 mb-4 text-gray-700">
        <h6 className="flex justify-center gap-2">All right reserved <AiOutlineCopyright className="text-center  mt-1" /> 2026 Jobiffi (P) Ltd.</h6>
      </div>
    </footer>
  );
};

export default Footer;
