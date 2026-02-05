import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const TestDashboard = () => {
    const [logs, setLogs] = useState([]);
    const addLog = (msg, type = 'info') => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${type.toUpperCase()}: ${msg}`, ...prev]);
    };

    const [activeTab, setActiveTab] = useState('jobseeker');

    // --- JOBSEEKER STATE ---
    const [jsRegister, setJsRegister] = useState({ name: '', email: '', password: '', mobile: '', workStatus: 'fresher' });
    const [jsLogin, setJsLogin] = useState({ email: '', password: '' });
    const [jsOtp, setJsOtp] = useState({ email: '', otp: '' });
    const [jsToken, setJsToken] = useState('');
    const [jsRefreshToken, setJsRefreshToken] = useState('');
    const [jsChangePass, setJsChangePass] = useState({ oldPassword: '', newPassword: '' });
    const [jsForgotPass, setJsForgotPass] = useState({ email: '', otp: '', newPassword: '' });
    const [jsUser, setJsUser] = useState(null);

    // --- EMPLOYER STATE ---
    const [empRegister, setEmpRegister] = useState({ companyName: '', email: '', password: '', contactPerson: '', mobile: '', companySize: '11-50', industry: '', website: '' });
    const [empLogin, setEmpLogin] = useState({ email: '', password: '' });
    const [empId, setEmpId] = useState('');
    const [empToken, setEmpToken] = useState('');
    const [empRefreshToken, setEmpRefreshToken] = useState('');
    const [empChangePass, setEmpChangePass] = useState({ oldPassword: '', newPassword: '' });
    const [empForgotPass, setEmpForgotPass] = useState({ email: '', otp: '', newPassword: '' });
    const [empUser, setEmpUser] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');
    const [uploadedLogoUrl, setUploadedLogoUrl] = useState('');

    // --- CHECK FOR GOOGLE AUTH TOKENS ---
    React.useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const accessToken = query.get('accessToken');
        const refreshToken = query.get('refreshToken');
        if (accessToken && refreshToken) {
            setJsToken(accessToken);
            setJsRefreshToken(refreshToken);
            // Decode token or fetch user to setJsUser
            // For now, let's just use /me to enable "Change Pass" etc.
            // But we need to wait for state update.
            window.history.replaceState({}, document.title, "/"); // Clean URL
            addLog("Google Login Successful! Tokens received.", "success");
        }
    }, []);

    // --- HANDLERS: JOBSEEKER ---
    const handleJsRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE}/auth/register`, jsRegister);
            if (res.data.success) addLog(`Registered: ${jsRegister.email}`, 'success');
        } catch (err) { addLog(`Register Failed: ${err.response?.data?.message || err.message}`, 'error'); }
    };

    const handleJsLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE}/auth/login`, jsLogin);
            if (res.data.success) {
                setJsToken(res.data.token || res.data.accessToken);
                setJsRefreshToken(res.data.refreshToken);
                setJsUser(res.data.user);
                addLog(`Logged In: ${res.data.user.email}`, 'success');
            }
        } catch (err) { addLog(`Login Failed: ${err.response?.data?.message || err.message}`, 'error'); }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault(); // Prevent form submission if in form
        if (!jsOtp.email) return addLog('Enter email for OTP', 'warning');
        try {
            const res = await axios.post(`${API_BASE}/auth/send-otp`, { email: jsOtp.email });
            if (res.data.success) addLog(`OTP Sent to ${jsOtp.email} (Check Backend Console)`, 'success');
        } catch (err) { addLog(`Send OTP Failed: ${err.response?.data?.message || err.message}`, 'error'); }
    };

    const handleOtpLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE}/auth/login-otp`, jsOtp);
            if (res.data.success) {
                setJsToken(res.data.token || res.data.accessToken);
                setJsRefreshToken(res.data.refreshToken);
                setJsUser(res.data.user);
                addLog(`OTP Login Success: ${res.data.user.email}`, 'success');
            }
        } catch (err) { addLog(`OTP Login Failed: ${err.response?.data?.message || err.message}`, 'error'); }
    };

    const handleLogout = () => {
        setJsUser(null); setJsToken(''); setJsRefreshToken('');
        setEmpUser(null); setEmpToken(''); setEmpRefreshToken('');
        setUploadedLogoUrl('');
        addLog('Logged Out Successfully', 'info');
    };

    const handleJsChangePass = async (e) => {
        e.preventDefault();
        if (!jsUser) return addLog('Must be logged in to change password', 'warning');
        try {
            const res = await axios.post(`${API_BASE}/auth/change-password`, {
                userId: jsUser.id,
                oldPassword: jsChangePass.oldPassword,
                newPassword: jsChangePass.newPassword
            });
            if (res.data.success) addLog(`Password Changed Successfully!`, 'success');
        } catch (err) { addLog(`Change Pass Failed: ${err.response?.data?.message || err.message}`, 'error'); }
    };

    const handleForgotOtpSend = async (e) => {
        e.preventDefault();
        if (!jsForgotPass.email) return addLog('Enter email for OTP', 'warning');
        try {
            const res = await axios.post(`${API_BASE}/auth/send-otp`, { email: jsForgotPass.email });
            if (res.data.success) addLog(`OTP Sent to ${jsForgotPass.email}`, 'success');
        } catch (err) { addLog(`Send OTP Failed: ${err.response?.data?.message || err.message}`, 'error'); }
    };

    const handleJsResetPass = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE}/auth/reset-password`, jsForgotPass);
            if (res.data.success) addLog(`Password Reset Successfully! Try Login.`, 'success');
        } catch (err) { addLog(`Reset Failed: ${err.response?.data?.message || err.message}`, 'error'); }
    };

    const handleGetMe = async () => {
        const isJobSeeker = activeTab === 'jobseeker';
        const token = isJobSeeker ? jsToken : empToken;
        // API Endpoint: JS -> /auth/me, Emp -> /employer/me
        const endpoint = isJobSeeker ? `${API_BASE}/auth/me` : `${API_BASE}/employer/me`;

        if (!token) return addLog("No token found. Login first.", "warning");
        try {
            const res = await axios.get(endpoint, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // JS returns {user: ...}, Emp returns {data: ...}
            const email = isJobSeeker ? res.data.user?.email : res.data.data?.email;
            addLog(`Fetched Profile: ${email}`, 'success');
        } catch (err) { addLog(`Fetch Me Failed: ${err.response?.data?.message || err.message}`, 'error'); }
    };

    // --- HANDLERS: EMPLOYER ---
    const handleEmpRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE}/employer/register`, empRegister);
            if (res.data.success) {
                setEmpId(res.data.data.id);
                addLog(`Employer Registered! ID: ${res.data.data.id}`, 'success');
            }
        } catch (err) { addLog(`Emp Register Failed: ${err.response?.data?.message || err.message}`, 'error'); }
    };

    const handleEmpLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE}/employer/login`, empLogin);
            if (res.data.success) {
                setEmpToken(res.data.accessToken);
                setEmpRefreshToken(res.data.refreshToken);
                setEmpUser(res.data.data); // backend sends user data in 'data' key for employer
                if (res.data.data.id) setEmpId(res.data.data.id); // Auto-fill ID for upload
                addLog(`Employer Logged In: ${res.data.data.email}`, 'success');
                if (res.data.data.logo) {
                    setUploadedLogoUrl(res.data.data.logo);
                }
            }
        } catch (err) { addLog(`Emp Login Failed: ${err.response?.data?.message || err.message}`, 'error'); }
    };

    const handleEmpChangePass = async (e) => {
        e.preventDefault();
        if (!empUser) return addLog('Must be logged in to change password', 'warning');
        try {
            const res = await axios.post(`${API_BASE}/employer/change-password`, {
                employerId: empUser.id,
                oldPassword: empChangePass.oldPassword,
                newPassword: empChangePass.newPassword
            });
            if (res.data.success) addLog(`Password Changed Successfully!`, 'success');
        } catch (err) { addLog(`Change Pass Failed: ${err.response?.data?.message || err.message}`, 'error'); }
    };

    const handleEmpResetPass = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE}/employer/reset-password`, empForgotPass); // Use correct endpoint
            if (res.data.success) addLog(`Password Reset Successfully! Try Login.`, 'success');
        } catch (err) { addLog(`Reset Failed: ${err.response?.data?.message || err.message}`, 'error'); }
    };

    const handleEmpForgotOtpSend = async (e) => {
        e.preventDefault();
        if (!empForgotPass.email) return addLog('Enter email for OTP', 'warning');
        // Note: Employer currently uses /resend-otp for generic OTP or we should implement send-otp like auth
        // Assuming /resend-otp works or we need a specific send-otp for forgot flow. 
        // Logic check: Employer resend-otp route calls resendOTP controller which generates valid OTP.
        // Let's use that.
        try {
            const res = await axios.post(`${API_BASE}/employer/resend-otp`, { email: empForgotPass.email });
            if (res.data.success || res.status === 200) addLog(`OTP Sent to ${empForgotPass.email}`, 'success');
        } catch (err) { addLog(`Send OTP Failed: ${err.response?.data?.message || err.message}`, 'error'); }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleUploadLogo = async (e) => {
        e.preventDefault();
        if (!empId) return addLog('Need Employer ID (Register first)', 'warning');
        if (!logoFile) return addLog('Select a file', 'warning');

        const formData = new FormData();
        formData.append('logo', logoFile);

        try {
            const res = await axios.post(`${API_BASE}/employer/${empId}/upload-logo`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.data.success) {
                setUploadedLogoUrl(res.data.data.logo);
                addLog('Logo Uploaded Successfully!', 'success');
            }
        } catch (err) { addLog(`Upload Failed: ${err.response?.data?.message || err.message}`, 'error'); }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans text-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700">JOBIFFI <span className="text-sm font-normal text-gray-500">Dev Console</span></h1>
                <div className="space-x-2">
                    <button onClick={handleGetMe} className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">Verify Profile Token</button>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
                </div>
            </div>

            {/* TABS */}
            <div className="flex justify-center mb-6">
                <button onClick={() => setActiveTab('jobseeker')} className={`px-6 py-2 rounded-l-lg font-bold ${activeTab === 'jobseeker' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>JobSeeker</button>
                <button onClick={() => setActiveTab('employer')} className={`px-6 py-2 rounded-r-lg font-bold ${activeTab === 'employer' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}>Employer</button>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT CONSOLE: FORMS */}
                <div className="lg:col-span-2 space-y-6">

                    {/* === JOBSEEKER PANEL === */}
                    {activeTab === 'jobseeker' && (
                        <>
                            {/* REGISTER FORM */}
                            <div className="bg-white p-5 rounded shadow">
                                <h3 className="text-lg font-bold mb-3 text-blue-600">1. Register</h3>
                                <form onSubmit={handleJsRegister} className="grid grid-cols-2 gap-3">
                                    <input type="text" placeholder="Name" className="border p-2 rounded" value={jsRegister.name} onChange={e => setJsRegister({ ...jsRegister, name: e.target.value })} required />
                                    <input type="email" placeholder="Email" className="border p-2 rounded" value={jsRegister.email} onChange={e => setJsRegister({ ...jsRegister, email: e.target.value })} required />
                                    <input type="password" placeholder="Password" className="border p-2 rounded" value={jsRegister.password} onChange={e => setJsRegister({ ...jsRegister, password: e.target.value })} required />
                                    <input type="tel" placeholder="Mobile" className="border p-2 rounded" value={jsRegister.mobile} onChange={e => setJsRegister({ ...jsRegister, mobile: e.target.value })} required />
                                    <select className="border p-2 rounded" value={jsRegister.workStatus} onChange={e => setJsRegister({ ...jsRegister, workStatus: e.target.value })}>
                                        <option value="fresher">Fresher</option>
                                        <option value="experienced">Experienced</option>
                                    </select>
                                    <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
                                </form>
                            </div>

                            {/* LOGIN FORM */}
                            <div className="bg-white p-5 rounded shadow">
                                <h3 className="text-lg font-bold mb-3 text-green-600">2. Login (Email + Pass)</h3>
                                <form onSubmit={handleJsLogin} className="grid grid-cols-1 gap-3">
                                    <input type="email" placeholder="Email" className="border p-2 rounded" value={jsLogin.email} onChange={e => setJsLogin({ ...jsLogin, email: e.target.value })} required />
                                    <input type="password" placeholder="Password" className="border p-2 rounded" value={jsLogin.password} onChange={e => setJsLogin({ ...jsLogin, password: e.target.value })} required />
                                    <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Login</button>
                                </form>
                                <div className="mt-2 pt-2 border-t text-center">
                                    <h4 className="text-xs font-bold text-gray-500 mb-2">OR</h4>
                                    <button onClick={() => window.location.href = `${API_BASE}/auth/google`} className="w-full bg-white border border-gray-300 text-gray-700 p-2 rounded hover:bg-gray-50 flex items-center justify-center gap-2">
                                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="G" className="w-5 h-5" />
                                        Login with Google
                                    </button>
                                </div>
                            </div>


                            {/* OTP FORM */}
                            <div className="bg-white p-5 rounded shadow">
                                <h3 className="text-lg font-bold mb-3 text-purple-600">3. OTP Flow</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex gap-2">
                                        <input type="email" placeholder="Email for OTP" className="border p-2 rounded flex-1" value={jsOtp.email} onChange={e => setJsOtp({ ...jsOtp, email: e.target.value })} />
                                        <button onClick={handleSendOtp} className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 w-1/3">Send OTP</button>
                                    </div>
                                    <div className="flex gap-2">
                                        <input type="text" placeholder="Enter OTP Code" className="border p-2 rounded flex-1" value={jsOtp.otp} onChange={e => setJsOtp({ ...jsOtp, otp: e.target.value })} />
                                        <button onClick={handleOtpLogin} className="bg-purple-700 text-white p-2 rounded hover:bg-purple-800 w-1/3">Login with OTP</button>
                                    </div>
                                </div>
                            </div>

                            {/* CHANGE PASSWORD */}
                            <div className="bg-white p-5 rounded shadow">
                                <h3 className="text-lg font-bold mb-3 text-red-600">4. Change Password</h3>
                                <form onSubmit={handleJsChangePass} className="grid grid-cols-1 gap-3">
                                    <input type="password" placeholder="Old Password" className="border p-2 rounded" value={jsChangePass.oldPassword} onChange={e => setJsChangePass({ ...jsChangePass, oldPassword: e.target.value })} required />
                                    <input type="password" placeholder="New Password" className="border p-2 rounded" value={jsChangePass.newPassword} onChange={e => setJsChangePass({ ...jsChangePass, newPassword: e.target.value })} required />
                                    <button type="submit" className="bg-red-500 text-white p-2 rounded hover:bg-red-600" disabled={!jsUser}>Change Password (Login First)</button>
                                </form>
                            </div>

                            {/* FORGOT PASSWORD */}
                            <div className="bg-white p-5 rounded shadow">
                                <h3 className="text-lg font-bold mb-3 text-orange-600">5. Forgot Password</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex gap-2">
                                        <input type="email" placeholder="Email" className="border p-2 rounded flex-1" value={jsForgotPass.email} onChange={e => setJsForgotPass({ ...jsForgotPass, email: e.target.value })} />
                                        <button onClick={handleForgotOtpSend} className="bg-orange-400 text-white p-2 rounded hover:bg-orange-500 w-1/3">Send OTP</button>
                                    </div>
                                    <input type="text" placeholder="OTP Code" className="border p-2 rounded" value={jsForgotPass.otp} onChange={e => setJsForgotPass({ ...jsForgotPass, otp: e.target.value })} />
                                    <input type="password" placeholder="New Password" className="border p-2 rounded" value={jsForgotPass.newPassword} onChange={e => setJsForgotPass({ ...jsForgotPass, newPassword: e.target.value })} />
                                    <button onClick={handleJsResetPass} className="bg-orange-600 text-white p-2 rounded hover:bg-orange-700">Reset Password</button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* === EMPLOYER PANEL === */}
                    {activeTab === 'employer' && (
                        <>
                            {/* REGISTER FORM */}
                            <div className="bg-white p-5 rounded shadow">
                                <h3 className="text-lg font-bold mb-3 text-indigo-600">1. Register Employer</h3>
                                <form onSubmit={handleEmpRegister} className="grid grid-cols-2 gap-3">
                                    <input type="text" placeholder="Company Name" className="border p-2 rounded" value={empRegister.companyName} onChange={e => setEmpRegister({ ...empRegister, companyName: e.target.value })} required />
                                    <input type="email" placeholder="Email" className="border p-2 rounded" value={empRegister.email} onChange={e => setEmpRegister({ ...empRegister, email: e.target.value })} required />
                                    <input type="password" placeholder="Password" className="border p-2 rounded" value={empRegister.password} onChange={e => setEmpRegister({ ...empRegister, password: e.target.value })} required />
                                    <input type="text" placeholder="Contact Person" className="border p-2 rounded" value={empRegister.contactPerson} onChange={e => setEmpRegister({ ...empRegister, contactPerson: e.target.value })} required />
                                    <input type="tel" placeholder="Mobile" className="border p-2 rounded" value={empRegister.mobile} onChange={e => setEmpRegister({ ...empRegister, mobile: e.target.value })} required />
                                    <input type="text" placeholder="Industry" className="border p-2 rounded" value={empRegister.industry} onChange={e => setEmpRegister({ ...empRegister, industry: e.target.value })} required />
                                    <button type="submit" className="col-span-2 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">Register Company</button>
                                </form>
                            </div>

                            {/* EMPLOYER LOGIN */}
                            <div className="bg-white p-5 rounded shadow">
                                <h3 className="text-lg font-bold mb-3 text-indigo-800">1.1 Login Employer</h3>
                                <form onSubmit={handleEmpLogin} className="grid grid-cols-1 gap-3">
                                    <input type="email" placeholder="Email" className="border p-2 rounded" value={empLogin.email} onChange={e => setEmpLogin({ ...empLogin, email: e.target.value })} required />
                                    <input type="password" placeholder="Password" className="border p-2 rounded" value={empLogin.password} onChange={e => setEmpLogin({ ...empLogin, password: e.target.value })} required />
                                    <button type="submit" className="bg-indigo-800 text-white p-2 rounded hover:bg-indigo-900">Login (Get Token)</button>
                                </form>
                            </div>

                            {/* LOGO UPLOAD */}
                            <div className="bg-white p-5 rounded shadow">
                                <h3 className="text-lg font-bold mb-3 text-pink-600">2. Upload Logo</h3>
                                <div className="space-y-4">
                                    <div className="flex gap-2 items-center">
                                        <label className="text-sm font-bold text-gray-700">Employer ID:</label>
                                        <input type="text" className="border p-2 rounded flex-1 bg-gray-50" value={empId} onChange={e => setEmpId(e.target.value)} placeholder="Auto-filled after register" />
                                    </div>

                                    <div className="border border-dashed border-gray-400 p-6 rounded text-center">
                                        <input type="file" onChange={handleFileChange} className="hidden" id="logoUpload" />
                                        <label htmlFor="logoUpload" className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-gray-700">Choose Image</label>

                                        {logoPreview && (
                                            <div className="mt-4">
                                                <p className="text-xs text-gray-500">Preview:</p>
                                                <img src={logoPreview} alt="Preview" className="h-32 mx-auto object-contain border rounded" />
                                            </div>
                                        )}
                                    </div>

                                    <button onClick={handleUploadLogo} className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600 disabled:opacity-50" disabled={!logoFile}>Upload Selected Logo</button>
                                </div>
                            </div>

                            {/* EMPLOYER CHANGE PASS */}
                            <div className="bg-white p-5 rounded shadow">
                                <h3 className="text-lg font-bold mb-3 text-red-600">3. Change Password</h3>
                                <form onSubmit={handleEmpChangePass} className="grid grid-cols-1 gap-3">
                                    <input type="password" placeholder="Old Password" className="border p-2 rounded" value={empChangePass.oldPassword} onChange={e => setEmpChangePass({ ...empChangePass, oldPassword: e.target.value })} required />
                                    <input type="password" placeholder="New Password" className="border p-2 rounded" value={empChangePass.newPassword} onChange={e => setEmpChangePass({ ...empChangePass, newPassword: e.target.value })} required />
                                    <button type="submit" className="bg-red-500 text-white p-2 rounded hover:bg-red-600" disabled={!empUser}>Change Password (Login First)</button>
                                </form>
                            </div>

                            {/* EMPLOYER FORGOT PASSWORD */}
                            <div className="bg-white p-5 rounded shadow">
                                <h3 className="text-lg font-bold mb-3 text-orange-600">4. Forgot Password</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex gap-2">
                                        <input type="email" placeholder="Email" className="border p-2 rounded flex-1" value={empForgotPass.email} onChange={e => setEmpForgotPass({ ...empForgotPass, email: e.target.value })} />
                                        <button onClick={handleEmpForgotOtpSend} className="bg-orange-400 text-white p-2 rounded hover:bg-orange-500 w-1/3">Send OTP</button>
                                    </div>
                                    <input type="text" placeholder="OTP Code" className="border p-2 rounded" value={empForgotPass.otp} onChange={e => setEmpForgotPass({ ...empForgotPass, otp: e.target.value })} />
                                    <input type="password" placeholder="New Password" className="border p-2 rounded" value={empForgotPass.newPassword} onChange={e => setEmpForgotPass({ ...empForgotPass, newPassword: e.target.value })} />
                                    <button onClick={handleEmpResetPass} className="bg-orange-600 text-white p-2 rounded hover:bg-orange-700">Reset Password</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* RIGHT CONSOLE: STATUS & LOGS */}
                <div className="lg:col-span-1 space-y-6">
                    {/* CURRENT USER CARD */}
                    <div className="bg-white p-5 rounded shadow border-t-4 border-green-500">
                        <h3 className="font-bold text-gray-700 mb-2">Current Session</h3>

                        {/* JOBSEEKER INFO */}
                        {activeTab === 'jobseeker' && (
                            jsUser ? (
                                <div className="text-sm space-y-1">
                                    <p><span className="font-bold">Type:</span> JobSeeker</p>
                                    <p><span className="font-bold">Status:</span> <span className="text-green-600">Logged In</span></p>
                                    <p><span className="font-bold">Email:</span> {jsUser.email}</p>
                                    <p><span className="font-bold text-xs text-purple-600">Access Token (15m):</span> <span className="font-mono text-xs bg-gray-100 p-1 block truncate" title={jsToken}>{jsToken?.substring(0, 20)}...</span></p>
                                    <p><span className="font-bold text-xs text-blue-600">Refresh Token (7d):</span> <span className="font-mono text-xs bg-gray-100 p-1 block truncate" title={jsRefreshToken}>{jsRefreshToken?.substring(0, 20)}...</span></p>
                                </div>
                            ) : <p className="text-sm text-gray-500">JobSeeker Not logged in.</p>
                        )}

                        {/* EMPLOYER INFO */}
                        {activeTab === 'employer' && (
                            empUser ? (
                                <div className="text-sm space-y-1">
                                    <p><span className="font-bold">Type:</span> Employer</p>
                                    <p><span className="font-bold">Status:</span> <span className="text-green-600">Logged In</span></p>
                                    <p><span className="font-bold">Company:</span> {empUser.companyName}</p>
                                    <p><span className="font-bold">Email:</span> {empUser.email}</p>
                                    <p><span className="font-bold text-xs text-purple-600">Access Token (15m):</span> <span className="font-mono text-xs bg-gray-100 p-1 block truncate" title={empToken}>{empToken?.substring(0, 20)}...</span></p>
                                    <p><span className="font-bold text-xs text-blue-600">Refresh Token (7d):</span> <span className="font-mono text-xs bg-gray-100 p-1 block truncate" title={empRefreshToken}>{empRefreshToken?.substring(0, 20)}...</span></p>
                                </div>
                            ) : <p className="text-sm text-gray-500">Employer Not logged in.</p>
                        )}

                        {uploadedLogoUrl && (
                            <div className="mt-4 pt-4 border-t">
                                <p className="font-bold text-sm mb-1">Server Logo URL:</p>
                                <p className="text-xs break-all text-blue-500">{uploadedLogoUrl}</p>
                                <img src={`http://localhost:5000/${uploadedLogoUrl.replace(/\\/g, '/')}`} alt="Server Logo" className="mt-2 h-20 border object-contain" onError={(e) => { e.target.style.display = 'none'; addLog('Image Load Failed: ' + e.target.src, 'error') }} />
                            </div>
                        )}
                    </div>

                    {/* LOGS */}
                    <div className="bg-black text-green-400 p-4 rounded shadow h-[500px] overflow-y-auto font-mono text-xs">
                        <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-2">
                            <h3 className="text-white font-bold">System Logs</h3>
                            <button onClick={() => setLogs([])} className="text-gray-500 hover:text-white">Clear</button>
                        </div>
                        {logs.length === 0 && <p className="text-gray-500 italic">Waiting for actions...</p>}
                        {logs.map((log, i) => (
                            <div key={i} className="mb-1 border-b border-gray-900 pb-1">{log}</div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TestDashboard;
