import {
    BriefcaseIcon,
    UserGroupIcon,
    GlobeAltIcon,
    SparklesIcon,
    ShieldCheckIcon,
    LightBulbIcon,
    RocketLaunchIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    BuildingOfficeIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/footer";

const AboutUs = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-white min-h-screen font-sans text-gray-900">
            {/* 1. Hero Section */}
            <section className="relative w-full py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
                        Helping People Find the <span className="text-blue-600">Right Job.</span> <br className="hidden md:block" />
                        Helping Companies Find the <span className="text-blue-600">Right Talent.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Jobiffi (Job I Find) is a modern job discovery platform built to make hiring and job searching simple, transparent, and effective.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => {
                                navigate('/');
                                window.scrollTo(0, 0);
                            }}
                            className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 hover:shadow-xl w-full sm:w-auto cursor-pointer"
                        >
                            Find Jobs
                        </button>
                        <button className="px-8 py-4 rounded-full bg-white text-blue-600 border-2 border-blue-600 font-bold text-lg shadow-sm hover:bg-blue-50 transition-all transform hover:-translate-y-1 w-full sm:w-auto cursor-pointer">
                            Post a Job
                        </button>
                    </div>
                </div>

                {/* Abstract decorative shapes */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2 animate-blob animation-delay-4000"></div>
            </section>

            {/* 2. Who We Are */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About Jobiffi.com</h2>
                        <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            <span className="font-bold text-gray-900">Jobiffi.com (Job I Find)</span> is a next-generation job board platform built to simplify how people discover jobs and how employers find the right talent. Established in <span className="font-bold text-blue-600">2025</span> and headquartered in <span className="font-bold text-gray-900">Noida, India</span>, Jobiffi is designed to bridge the gap between opportunity and potential in an increasingly competitive job market.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We believe that job searching shouldn’t be confusing, time-consuming, or frustrating. At Jobiffi, we focus on creating a transparent, user-friendly, and technology-driven hiring ecosystem where job seekers can confidently find relevant opportunities and employers can connect with skilled, job-ready candidates.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            From fresh graduates to experienced professionals, and from startups to growing enterprises, Jobiffi empowers every stakeholder with smart tools, meaningful insights, and a seamless hiring experience.
                        </p>
                    </div>
                    <div className="flex-1 relative">
                        <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 transform rotate-2 hover:rotate-0 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <BuildingOfficeIcon className="w-8 h-8 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-xl">Headquartered</h3>
                                    <p className="text-gray-500">Noida, India</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-gray-700 font-medium">Established in 2025</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span className="text-gray-700 font-medium">Next-Gen Technology</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                    <span className="text-gray-700 font-medium">User-Centric Design</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-4 -right-4 w-full h-full bg-blue-600 rounded-3xl -z-10 opacity-10"></div>
                    </div>
                </div>
            </section>

            {/* 3. What We Do */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Do at Jobiffi</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Connecting ambitions with opportunities through smart, seamless solutions.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Card 1 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MagnifyingGlassIcon className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Find Jobs That Truly Match You</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Discover relevant opportunities based on skills, experience, and career goals—without endless searching.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <UserGroupIcon className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Hire Smarter, Faster</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Connect with job-ready candidates and streamline your hiring process with quality listings and tools.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <BriefcaseIcon className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Build Careers, Not Just Resumes</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We focus on long-term career growth and meaningful employment outcomes for everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Mission & Vision */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
                    <div className="group bg-blue-600 text-white rounded-3xl p-10 md:p-14 relative overflow-hidden flex flex-col justify-center cursor-default transition-all duration-500 hover:shadow-2xl">
                        <div className="relative z-10 transition-all duration-500 md:group-hover:-translate-y-2">
                            <div className="flex items-center gap-3 mb-6">
                                <RocketLaunchIcon className="w-8 h-8" />
                                <h2 className="text-3xl font-bold">Our Mission</h2>
                            </div>
                            <p className="text-blue-100 text-lg leading-relaxed font-semibold">
                                To make job discovery and hiring simple, fast, and fair for everyone.
                            </p>
                            <div className="max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden">
                                <p className="text-blue-50 text-lg leading-relaxed mt-4">
                                    We aim to help job seekers find opportunities that truly match their skills and aspirations, while enabling employers to hire efficiently with confidence and clarity. Jobiffi is committed to removing friction from the hiring process through innovation, accessibility, and trust.
                                </p>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    </div>

                    <div className="group bg-gray-900 text-white rounded-3xl p-10 md:p-14 relative overflow-hidden flex flex-col justify-center cursor-default transition-all duration-500 hover:shadow-2xl">
                        <div className="relative z-10 transition-all duration-500 md:group-hover:-translate-y-2">
                            <div className="flex items-center gap-3 mb-6">
                                <GlobeAltIcon className="w-8 h-8 text-blue-400" />
                                <h2 className="text-3xl font-bold">Our Vision</h2>
                            </div>
                            <p className="text-gray-200 text-lg leading-relaxed font-semibold">
                                To become a trusted global job discovery platform that connects talent with opportunity—anytime, anywhere.
                            </p>
                            <div className="max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden">
                                <p className="text-gray-400 text-lg leading-relaxed mt-4">
                                    We envision a future where technology enables meaningful careers, reduces unemployment gaps, and helps organizations build strong teams effortlessly. Jobiffi strives to be a platform where careers grow, businesses scale, and opportunities are accessible to all.
                                </p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                </div>
            </section>

            {/* 5. Our Values */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Stand For</h2>
                        <div className="w-20 h-1.5 bg-blue-600 rounded-full mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: SparklesIcon, title: "Simplicity First", desc: "Easy-to-use experiences for faster decisions.", color: "text-amber-500", bg: "bg-amber-50" },
                            { icon: ShieldCheckIcon, title: "Trust & Transparency", desc: "Clear listings. Honest hiring. Real opportunities.", color: "text-blue-500", bg: "bg-blue-50" },
                            { icon: MagnetIcon, title: "Purpose-Driven Matching", desc: "Quality matches over quantity.", color: "text-red-500", bg: "bg-red-50" }, // Using a generic icon approach below since Magnet isn't in generic heroicons list sometimes, I'll use standard ones
                            { icon: UserGroupIcon, title: "Inclusivity & Opportunity", desc: "Equal access for talent at every stage.", color: "text-green-500", bg: "bg-green-50" },
                            { icon: LightBulbIcon, title: "Innovation with Impact", desc: "Smart technology with a human touch.", color: "text-purple-500", bg: "bg-purple-50" },
                            { icon: RocketLaunchIcon, title: "Growth for All", desc: "Careers grow. Companies scale.", color: "text-indigo-500", bg: "bg-indigo-50" },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all cursor-default group bg-white">
                                <div className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <item.icon className={`w-8 h-8 ${item.color}`} />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Why Jobiffi Exists */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <HeartIcon className="w-16 h-16 text-red-500 mx-auto mb-8 animate-pulse" />
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">Why Jobiffi Exists</h2>
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12">
                        We created Jobiffi because finding a job shouldn’t feel overwhelming—and hiring shouldn’t feel uncertain. Our goal is to bring <span className="text-blue-600 font-bold">clarity</span>, <span className="text-blue-600 font-bold">confidence</span>, and <span className="text-blue-600 font-bold">connection</span> into the hiring journey.
                    </p>
                    <button
                        onClick={() => {
                            navigate('/');
                            window.scrollTo(0, 0);
                        }}
                        className="px-10 py-4 rounded-full bg-gray-900 text-white font-bold text-lg shadow-lg hover:bg-gray-800 transition-all hover:-translate-y-1 cursor-pointer"
                    >
                        Explore Opportunities
                    </button>
                </div>
            </section>

            {/* 7. CTA (End Section) */}
            <section className="py-20 px-6 bg-blue-600 text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your Journey with Jobiffi</h2>
                    <p className="text-xl text-blue-100 mb-10">Whether you’re searching for your next opportunity or your next great hire, Jobiffi is here to help.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button
                            onClick={() => {
                                navigate('/');
                                window.scrollTo(0, 0);
                            }}
                            className="px-10 py-4 rounded-full bg-white text-blue-600 font-bold text-lg shadow-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 w-full sm:w-auto cursor-pointer"
                        >
                            Get Started
                        </button>
                        <button className="px-10 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all transform hover:-translate-y-1 w-full sm:w-auto cursor-pointer">
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

// Helper for magnet icon needed above
const MagnetIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
    </svg>
);

export default AboutUs;