import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { CheckCircleIcon, MapPinIcon, CloudArrowUpIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FaLinkedinIn, FaUserGraduate, FaWhatsapp } from "react-icons/fa";
import registerImg from "../../assets/media/register_page.svg";
import { MdSchool, MdWork } from "react-icons/md";
import Footer from "../Footer/footer";

const Register = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [workStatus, setWorkStatus] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [mobile, setMobile] = useState("");
    const [city, setCity] = useState("");
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <div className="flex-grow w-full flex justify-center py-10 px-4">
                <div className="max-w-6xl w-full flex flex-col md:flex-row gap-0 md:gap-32">

                    {/* Left Side - Form */}
                    <div className="flex-1 max-w-2xl border border-dashed border-gray-300 rounded-2xl p-6 ml-4 shadow-sm ">
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">Create your Jobiffi profile</h1>
                        <p className="text-gray-500 text-sm mb-6">Search & apply to jobs from India's No.1 Job Site</p>


                        <div className="w-full mb-6 flex flex-col items-center gap-4">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                                <div className="flex items-center gap-4 border border-gray-300 rounded-full p-1.5 pr-6 w-max hover:shadow-md transition-shadow cursor-pointer group bg-white">
                                    <span className="text-sm font-medium text-gray-500 ml-3 group-hover:transition-colors">Continue with</span>
                                    <button className="flex items-center gap-2 border border-blue-100 rounded-full px-5 py-2 bg-white hover:bg-blue-50 transition-colors">
                                        <FcGoogle className="text-xl" />
                                        <span className="font-bold text-gray-700">Google</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 border border-gray-300 rounded-full p-1.5 pr-6 w-max hover:shadow-md transition-shadow cursor-pointer group bg-white">
                                    <span className="text-sm font-medium text-gray-500 ml-3 group-hover:transition-colors">Continue with</span>
                                    <button className="flex items-center gap-2 border border-blue-100 rounded-full px-5 py-2 bg-white hover:bg-blue-50 transition-colors">
                                        <FaLinkedinIn className="text-blue-500 text-xl" />
                                        <span className="font-bold text-gray-700">LinkedIn</span>
                                    </button>
                                </div>
                            </div>
                            <div className="relative flex py-2 items-center w-full">
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or</span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>
                        </div>

                        <form className="space-y-6" onSubmit={(e) => {
                            e.preventDefault();
                            if (!isChecked || !workStatus) {
                                return;
                            }
                            // Proceed to verification
                            navigate('/verification', { state: { email: email } });
                        }}>
                            <div>
                                <label htmlFor="fullname" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Full name<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="fullname"
                                    required
                                    placeholder="What is your name?"
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-400"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Email ID<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Tell us your Email ID"
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-400"
                                />
                                <p className="mt-1 text-xs text-gray-400">Get relevant job matches and important updates delivered to this email.</p>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Password<span className="text-red-500">*</span>
                                </label>
                                <div className="relative rounded-lg shadow-sm">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="(Minimum 6 characters)"
                                        className={`block w-full rounded-lg border ${password.length > 0 && password.length < 6 ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} px-4 py-2.5 pr-12 text-gray-900 sm:text-sm placeholder-gray-400`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center justify-center p-3"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" aria-hidden="true" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" aria-hidden="true" />
                                        )}
                                    </button>
                                </div>
                                {password.length > 0 && password.length < 6 ? (
                                    <p className="mt-1 text-xs text-red-500 font-medium">Password must be at least 6 characters</p>
                                ) : password.length >= 6 ? (
                                    <p className="mt-1 text-xs text-green-600 flex items-center gap-1 font-medium">
                                        This helps your account stay protected <CheckCircleIcon className="w-4 h-4" />
                                    </p>
                                ) : (
                                    <p className="mt-1 text-xs text-gray-400">This helps keep your Jobiffi account safe.</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Mobile number<span className="text-red-500">*</span>
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 flex items-center">
                                        <label htmlFor="country-code" className="sr-only">Country</label>
                                        <select
                                            id="country-code"
                                            name="country-code"
                                            value={countryCode}
                                            onChange={(e) => setCountryCode(e.target.value)}
                                            className="h-full rounded-l-lg border-transparent bg-transparent py-0 pl-3 pr-2 text-gray-500 sm:text-sm focus:border-blue-500 focus:ring-blue-500 cursor-pointer outline-none"
                                        >
                                            <option>+91</option>
                                            <option>+1</option>
                                            <option>+44</option>
                                            <option>+61</option>
                                            <option>+971</option>
                                        </select>
                                    </div>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        required
                                        value={mobile}
                                        maxLength={10}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
                                            setMobile(value);
                                        }}
                                        className="block w-full rounded-lg border border-gray-300 pl-20 pr-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-400"
                                        placeholder="Enter your mobile number"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-400">Helps recruiters connect with you faster.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Work status<span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div
                                        onClick={() => setWorkStatus("experienced")}
                                        className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none transition
                                                ${workStatus === "experienced" ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'}`}
                                    >
                                        <div className="flex flex-col">
                                            <div className="flex justify-between w-full mb-2">
                                                <span className="block text-sm font-medium text-gray-900">I’m experienced</span>
                                                <MdWork className="h-6 w-6 text-orange-500" />
                                            </div>
                                            <span className="block text-xs text-gray-500">I have professional work experience (excluding internships)</span>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => setWorkStatus("fresher")}
                                        className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none transition
                                                ${workStatus === "fresher" ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'}`}
                                    >
                                        <div className="flex flex-col">
                                            <div className="flex justify-between w-full mb-2">
                                                <span className="block text-sm font-medium text-gray-900">I’m a fresher</span>
                                                <FaUserGraduate className="h-6 w-6 text-orange-500" />
                                            </div>
                                            <span className="block text-xs text-gray-500">I haven’t worked after graduation</span>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => setWorkStatus("student")}
                                        className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none transition
                                                ${workStatus === "student" ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'}`}
                                    >
                                        <div className="flex flex-col">
                                            <div className="flex justify-between w-full mb-2">
                                                <span className="block text-sm font-medium text-gray-900">I’m a student</span>
                                                <MdSchool className="h-6 w-6 text-orange-500" />
                                            </div>
                                            <span className="block text-xs text-gray-500">I’m currently studying or haven’t graduated yet</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {workStatus && (
                                <div className="space-y-6 animate-fade-in p-5 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="relative">
                                        <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1">
                                            Current city<span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative group">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors group-focus-within:text-blue-600">
                                                <MapPinIcon className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500" aria-hidden="true" />
                                            </div>
                                            <input
                                                type="text"
                                                id="city"
                                                required
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                className="block w-full rounded-lg border border-gray-300 pl-10 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm placeholder-gray-400 transition-all shadow-sm group-hover:border-gray-400"
                                                placeholder="Mention the city you live in"
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-gray-400">This helps recruiters know your location preferences</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Resume
                                        </label>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-dashed border-blue-200 rounded-xl p-4 bg-white hover:bg-blue-50 transition-colors group cursor-pointer">
                                            <button
                                                type="button"
                                                className="flex items-center gap-2 rounded-full bg-[#f05537] px-6 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition shadow-md hover:shadow-lg transform active:scale-95"
                                            >
                                                <CloudArrowUpIcon className="h-5 w-5" />
                                                Upload Resume
                                            </button>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">Supported formats: doc, docx, rtf, pdf</span>
                                                <span className="text-xs text-gray-400">Max file size: 2MB</span>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                            Recruiters prefer candidates who have a resume on their profile
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Updates Checkbox */}
                            <div className="flex items-center gap-2">
                                <input
                                    id="updates"
                                    name="updates"
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                                />
                                <label
                                    htmlFor="updates"
                                    className="text-sm cursor-pointer flex items-center flex-wrap gap-1 select-none"
                                    style={{ color: isChecked ? '#0a22cc' : '#4b5563' }}
                                >
                                    Send me important updates & promotions via SMS, email, and <FaWhatsapp className="text-green-500 inline mx-0.5" /> WhatsApp
                                </label>
                            </div>

                            {/* Terms Disclaimer */}
                            <p className="text-xs text-gray-500">
                                By clicking Register, you agree to the <a href="#" className="text-blue-600 hover:text-blue-500">Terms and Conditions</a> & <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a> of Jobiffi.com
                            </p>

                            <div className="pt-2 flex justify-between">
                                <button
                                    type="submit"
                                    disabled={!isChecked || !workStatus || (!!workStatus && !city)}
                                    className={`cursor-pointer flex w-fit justify-center rounded-3xl px-10 py-3 text-sm font-bold text-white shadow-sm transition
                                         ${isChecked && workStatus && city ? 'bg-blue-600 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600' : 'bg-gray-400 cursor-not-allowed opacity-70'}
                                     `}
                                >
                                    Register now
                                </button>
                                <button className="mt-2 text-sm text-blue-600 hover:text-blue-500 ml-15">Already have an account? Sign in</button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side - Info Card */}
                    <div className="hidden md:flex flex-col w-[320px] shrink-0">
                        <div className="sticky top-28 p-6 bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-blue-100 shadow-sm">
                            <div className="h-40 w-40 mx-auto -mt-12 mb-4 bg-white rounded-full p-4 shadow-md border border-gray-100 flex items-center justify-center relative z-10">
                                <img src={registerImg} alt="Illustration" className="w-full h-full mt-2 object-contain " />
                                <div className="absolute -bottom-2 bg-blue-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-wider shadow-sm">Free</div>
                            </div>

                            <div className="text-center mb-6">
                                <h3 className="font-bold text-gray-900 text-lg">Register Now and get access to jobiffi</h3>
                                <p className="text-xs text-gray-500 mt-1">Unlock your career potential today</p>
                            </div>

                            <ul className="space-y-3">
                                {[
                                    "Vast job opportunities",
                                    "Real time job alerts",
                                    "Personalized recommendations",
                                    "Enhance visibilty to employers",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-blue-50 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-default group">
                                        <div className="bg-green-50 p-1.5 rounded-full text-green-600 transition-colors">
                                            <CheckCircleIcon className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 transition-colors">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Register;
