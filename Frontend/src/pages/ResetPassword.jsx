import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5000/api';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [userType, setUserType] = useState('jobseeker'); // Default, user can toggle if needed or detect

    useEffect(() => {
        const emailParam = searchParams.get('email');
        if (emailParam) setEmail(emailParam);
    }, [searchParams]);

    const handleReset = async (e) => {
        e.preventDefault();
        setMessage({ text: 'Processing...', type: 'info' });

        const endpoint = userType === 'jobseeker'
            ? `${API_BASE}/auth/reset-password`
            : `${API_BASE}/employer/reset-password`;

        try {
            const res = await axios.post(endpoint, { email, otp, newPassword });
            if (res.data.success) {
                setMessage({ text: 'Password Reset Successfully! Redirecting...', type: 'success' });
                setTimeout(() => navigate('/'), 2000);
            }
        } catch (err) {
            setMessage({ text: err.response?.data?.message || err.message, type: 'error' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reset Password</h2>

                {message.text && (
                    <div className={`p-3 rounded mb-4 text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleReset} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">User Type</label>
                        <select className="w-full border p-2 rounded" value={userType} onChange={(e) => setUserType(e.target.value)}>
                            <option value="jobseeker">JobSeeker</option>
                            <option value="employer">Employer</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full border p-2 rounded bg-gray-50"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            readOnly={!!searchParams.get('email')}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">OTP Code</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Check your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                        <input
                            type="password"
                            className="w-full border p-2 rounded"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 transition">
                        Reset Password
                    </button>

                    <button type="button" onClick={() => navigate('/')} className="w-full text-gray-500 text-sm mt-4 hover:underline">
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
