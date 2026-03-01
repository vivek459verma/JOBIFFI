import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/footer";

const EmployerVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "your email address";
  const [otp, setOtp] = useState("");
  const [resendStatus, setResendStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/employer/verify-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        },
      );

      const data = await response.json();

      if (data.success) {
        // Show success message and redirect
        alert("Email verified successfully! You can now login.");
        navigate("/");
      } else {
        setError(data.message || "Verification failed");
      }
    } catch (err) {
      setError(`Server error. Please try again later. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendStatus("");
    setError("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/employer/resend-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setResendStatus("OTP has been resent to your email!");
        setTimeout(() => setResendStatus(""), 5000);
      } else {
        setError(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      setError(`Server error. Please try again later. ${err}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Verify Your Email
            </h1>
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
              A verification OTP has been sent to{" "}
              <span className="font-bold text-gray-900">{email}</span>.
            </p>
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
              Please enter the OTP below to verify your email and complete
              registration.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {resendStatus && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              {resendStatus}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                required
                className="block w-full max-w-md mx-auto rounded-lg border border-gray-300 px-4 py-3 text-center text-2xl tracking-widest text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className={`w-full max-w-md mx-auto justify-center rounded-3xl px-10 py-3 text-sm font-bold text-white shadow-sm transition ${!loading && otp.length === 6
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed opacity-70"
                }`}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          <div className="pt-6 space-y-3">
            <p className="text-gray-600">
              Didn't receive the OTP?{" "}
              <button
                onClick={handleResend}
                className="text-blue-600 font-semibold cursor-pointer transition-colors hover:text-blue-700 no-underline bg-transparent border-none"
              >
                Resend OTP
              </button>
            </p>
            <p className="text-gray-400 text-xs">
              Check your Spam or Junk folder if you don't see the email.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmployerVerification;
