import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircleIcon, PencilSquareIcon, XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import registerImg from "../../assets/media/register_page.svg";
import Footer from "../Footer/footer";

const Verification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [isEditing, setIsEditing] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);

    const [email, setEmail] = useState(location.state?.email || "");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Push initial state to trap back button
        window.history.pushState(null, "", window.location.href);

        const handlePopState = (_event: PopStateEvent) => {
            // Prevent default back navigation
            window.history.pushState(null, "", window.location.href);
            setShowExitModal(true);
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <div className="flex-grow w-full flex justify-center py-10 px-4">
                <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8">

                    {/* Left Side - Verification Form */}
                    <div className="flex-1 max-w-3xl p-8">
                        {!isEditing ? (
                            <>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Verify Email</h2>

                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 mb-6 flex items-center gap-2">
                                        Jobiffi just sent an email with verification code to <span className="font-semibold text-gray-900">{email}</span>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="text-blue-600 hover:text-blue-700 cursor-pointer"
                                        >
                                            <PencilSquareIcon className="w-4 h-4" />
                                        </button>
                                    </p>

                                    <div className="flex gap-4 mb-4">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => { inputRefs.current[index] = el }}
                                                type="text"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                className="w-14 h-14 rounded-xl border border-blue-600 text-center text-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        ))}
                                    </div>

                                    <div className="text-sm text-gray-500 mb-8 min-h-[24px]">
                                        {timer > 0 ? (
                                            <p>Your OTP should arrive in <span className="text-gray-900 font-medium">{timer} seconds</span></p>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <p>Didn't receive code?</p>
                                                <button
                                                    onClick={() => setTimer(30)}
                                                    className="cursor-pointer text-blue-600 font-semibold hover:text-blue-700 transition-all"
                                                >
                                                    Resend OTP
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        disabled={otp.some(d => !d)}
                                        className={`w-32 py-2.5 rounded-full text-sm font-bold text-white transition
                                            ${otp.some(d => !d) ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-lg'}
                                        `}
                                    >
                                        Verify
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="animate-fade-in">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">Edit email</h2>
                                <p className="text-sm text-gray-500 mb-8">Recruiters will contact you on this email</p>

                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-900 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-400 shadow-sm"
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-400">We will send the verification code to this email</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setTimer(30);
                                            setOtp(["", "", "", ""]);
                                        }}
                                        className="cursor-pointer rounded-full bg-blue-600 px-8 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition shadow-md"
                                    >
                                        Send OTP
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="cursor-pointer text-sm font-bold text-blue-600 hover:text-blue-700 px-4 py-2"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right  Side - Success/Info Card */}
                    <div className="w-full md:w-[320px] shrink-0">
                        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-xl text-center">
                            <div className="h-32 w-32 mx-auto mb-6 flex items-center justify-center overflow-hidden">
                                {/* Using placeholder or reusing existing img for now */}
                                <img src={registerImg} alt="Success Illustration" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-4">Great, now you can</h3>
                            <ul className="text-left space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600">Build your profile and let recruiters find you</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600">Get job postings delivered right to your email</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600">Find a job and grow your career</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {showExitModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative animate-fade-in">
                        <button
                            onClick={() => setShowExitModal(false)}
                            className="cursor-pointer absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        <div className="flex items-start gap-6">
                            <div className="shrink-0 bg-red-50 p-3 rounded-full">
                                <ExclamationCircleIcon className="w-8 h-8 text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Your profile is incomplete</h3>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Recruiters will not be able to view your profile until you complete it. Add details now to get noticed and receive calls from recruiters.
                                </p>

                                <div className="flex items-center justify-end gap-4">
                                    <button
                                        onClick={() => navigate('/register')}
                                        className="cursor-pointer text-base font-bold text-gray-900 hover:text-gray-700 px-4 py-2"
                                    >
                                        Be Ignored
                                    </button>
                                    <button
                                        onClick={() => setShowExitModal(false)}
                                        className="cursor-pointer bg-blue-600 text-white text-base font-bold px-8 py-3 rounded-full hover:bg-blue-700 transition"
                                    >
                                        Complete Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Verification;
