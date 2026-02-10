import { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer/footer";

const Verification = () => {
    const location = useLocation();
    const email = location.state?.email || "your email address";
    const [resendStatus, setResendStatus] = useState("");

    const handleResend = () => {
        setResendStatus("Verification email resent!");
        setTimeout(() => setResendStatus(""), 3000);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-between">
            <div className="flex-grow flex items-center justify-center px-4">
                <div className="max-w-2xl w-full text-center space-y-6">
                    <div className="space-y-4">
                        <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                            A verification email has been sent to <span className="font-bold text-gray-900">{email}</span>.
                        </p>
                        <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                            Please check your inbox and verify your email to continue.
                        </p>
                    </div>

                    <div className="pt-6 space-y-3">
                        <p className="text-gray-600">
                            Didn’t receive the email?{" "}
                            <button
                                onClick={handleResend}
                                className="text-blue-600 font-semibold cursor-pointer transition-colors hover:text-blue-700 no-underline"
                            >
                                Resend verification email
                            </button>
                        </p>
                        {resendStatus && (
                            <p className="text-green-600 text-sm font-medium animate-fade-in">
                                {resendStatus}
                            </p>
                        )}
                        <p className="text-gray-400 text-xs">
                            Check your Spam or Junk folder if you don’t see the email.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Verification;
