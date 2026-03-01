import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (token) {
            // Store token
            localStorage.setItem("token", token);
            window.dispatchEvent(new Event("auth-change"));

            // Fetch user profile to ensure consistent "flow" with manual login
            const fetchProfile = async () => {
                try {
                    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/auth/me`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    const data = await res.json();
                    if (data.success) {
                        localStorage.setItem("user", JSON.stringify(data.user));
                    }
                } catch (err) {
                    console.error("AuthCallback: Failed to fetch profile:", err);
                } finally {
                    // Redirect to Home after profile is fetched (or failed)
                    // Preserve other status flags like verified=true
                    const params = new URLSearchParams(searchParams);
                    params.delete("token");
                    navigate(`/?${params.toString()}`, { replace: true });
                }
            };

            fetchProfile();
        } else if (error) {
            // Handle error (optional: show toast or redirect to login)
            console.error("OAuth Error:", error);
            navigate("/login", { replace: true });
        } else {
            // No token, no error -> redirect to home
            navigate("/", { replace: true });
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-700">Authenticating...</h2>
                <p className="text-gray-500">Please wait while we log you in.</p>
            </div>
        </div>
    );
};

export default AuthCallback;
