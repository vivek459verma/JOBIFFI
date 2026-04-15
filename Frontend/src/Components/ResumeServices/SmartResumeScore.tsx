import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../Nav';// Ensure this path correctly points to your Nav component
const SmartResumeScore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State Management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobiffiResumes, setJobiffiResumes] = useState<any[]>([]);
  
  // Data to be scanned (Either imported JSON or an uploaded File)
  const [activeResumeData, setActiveResumeData] = useState<any>(null); 
  const [activeFile, setActiveFile] = useState<File | null>(null); 
  
  const [jobDescription, setJobDescription] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0); 
  const [results, setResults] = useState<any>(null);

  // Check login & catch imported resume on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchSavedResumes(token);
    }
    
    // Catch the silent data sent from the Resume Builder!
    if (location.state && location.state.importedResume) {
      setActiveResumeData(location.state.importedResume);
    }
  }, [location]);

  // Fetch their saved resumes from your existing backend
  const fetchSavedResumes = async (token: string) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/resumeMaker/my-resumes`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setJobiffiResumes(data.resumes);
    } catch (err) { 
      console.error("Could not fetch resumes", err); 
    }
  };

  // Handle external file upload (PDF/Word)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setActiveFile(file);
      setActiveResumeData(null); // Clear imported JSON if they upload a fresh file
    }
  };

  // The Master Scan Function
// The Master Scan Function
  const runScan = async () => {
    if (!activeResumeData && !activeFile) return alert("Please select or upload a resume!");
    if (!jobDescription) return alert("Please paste a Job Description for accurate scoring.");

    setIsScanning(true);
    setScanProgress(0); // Reset progress bar
    setResults(null); // Clear old results

    // Smart Progress Engine: Simulates AI thinking, holds at 90%
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        const increment = Math.floor(Math.random() * 12) + 5; // Jump by 5-17%
        if (prev + increment >= 90) return 90;
        return prev + increment;
      });
    }, 400); // Ticks every 400ms

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    
    try {
      let response;
      const headers: any = {};
      const token = localStorage.getItem('token');
      if (token) headers["Authorization"] = `Bearer ${token}`;

      // Route 1: Physical File
      if (activeFile) {
        const formData = new FormData();
        formData.append("resumeFile", activeFile);
        formData.append("jobDescription", jobDescription);
        
        response = await fetch(`${API_URL}/api/ats/scan-file`, {
          method: "POST",
          headers, 
          body: formData
        });
      } 
      // Route 2: JSON Data
      else {
        headers["Content-Type"] = "application/json";
        response = await fetch(`${API_URL}/api/ats/scan-json`, {
          method: "POST",
          headers,
          body: JSON.stringify({ resumeData: activeResumeData, jobDescription })
        });
      }

      const data = await response.json();
      
      // Stop the timer and fill the bar to 100%
      clearInterval(progressInterval);
      setScanProgress(100);

      // Wait 400ms so the user sees the satisfying 100% fill before revealing data
      setTimeout(() => {
        if (data.success) {
          setResults(data.scoreData); 
        } else {
          alert(data.message || "Scanning failed.");
        }
        setIsScanning(false);
        setScanProgress(0); // Reset the bar silently in the background
      }, 400);

    } catch (error) {
      clearInterval(progressInterval);
      setIsScanning(false);
      setScanProgress(0);
      alert("Error reaching the server. Ensure backend is running.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f0f4f9] text-gray-800">
      
      {/* ================= NAVBAR ================= */}
      <Nav /> 

      {/* ================= PAGE CONTENT ================= */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <div className="w-full md:w-1/3 lg:w-1/4 p-6 bg-white border-r border-gray-200 overflow-y-auto shadow-sm z-10">
          <h2 className="text-2xl font-extrabold text-blue-950 mb-6">Select Resume</h2>
          
          {/* Active Imported Resume Indicator */}
          {activeResumeData && !activeFile && !jobiffiResumes.some(r => r.id === activeResumeData.id) && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-sm font-bold shadow-sm flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full">✓</span>
              Active: Imported from Builder
            </div>
          )}

          {/* Jobiffi Resumes List */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Your Jobiffi Resumes</h3>
            {isLoggedIn ? (
              <div className="space-y-3">
                 {jobiffiResumes.length === 0 && <p className="text-sm text-gray-500 italic">No saved resumes found.</p>}
                 {jobiffiResumes.map((resume, idx) => (
                   <div 
                     key={resume.id || idx} 
                     onClick={() => { setActiveResumeData(resume); setActiveFile(null); }}
                     className={`p-4 border rounded-xl cursor-pointer transition-all ${activeResumeData?.id === resume.id ? 'border-blue-600 bg-blue-50 shadow-md ring-1 ring-blue-600' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'}`}
                   >
                      <div className="font-bold text-gray-900 truncate">{resume.resumeTitle || "Untitled Resume"}</div>
                      <div className="text-xs text-gray-500 mt-1">{resume.experienceLevel || "Experience Level"}</div>
                   </div>
                 ))}
              </div>
            ) : (
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
                 <p className="text-sm text-gray-600 mb-4 font-medium">Log in to test your saved resumes.</p>
                 <button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-bold px-6 py-2 rounded-lg w-full">
                   Log In
                 </button>
              </div>
            )}
          </div>

          {/* External Upload */}
          <div>
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Upload External</h3>
             <label className="cursor-pointer flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-colors">
                <span className="text-sm font-bold text-gray-600">Click to upload PDF / DOCX</span>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  onChange={handleFileUpload}
                  className="hidden"
                />
             </label>
             {activeFile && (
               <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-xs font-bold text-green-700 flex justify-between items-center">
                 <span className="truncate">{activeFile.name}</span>
                 <button onClick={() => setActiveFile(null)} className="text-green-900 hover:text-red-600 ml-2">✕</button>
               </div>
             )}
          </div>
        </div>

        {/* ================= MAIN PANEL ================= */}
        <div className="w-full md:w-2/3 lg:w-3/4 p-6 lg:p-12 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold text-blue-950 mb-3 tracking-tight">Smart ATS Scanner</h1>
            <p className="text-lg text-gray-600 mb-8">Paste the target Job Description to see how well you match the ATS filters.</p>
            
            <div className="bg-white p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
              <textarea 
                className="w-full h-48 p-4 bg-transparent outline-none resize-y text-gray-800"
                placeholder="Paste the Job Description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            
            {/* ================= SCAN BUTTON ================= */}
            <button 
              onClick={runScan}
              disabled={isScanning || (!activeResumeData && !activeFile)}
              className={`relative w-full overflow-hidden text-white font-extrabold text-lg py-4 rounded-xl shadow-lg flex items-center justify-center transition-all ${
                (!activeResumeData && !activeFile) || isScanning
                  ? 'bg-blue-300 cursor-not-allowed' // Faded shade when disabled or scanning
                  : 'bg-blue-600 hover:bg-blue-700'  // Normal shade when ready
              }`}
            >
              {/* --- THE FILLING BAR (Only renders while scanning) --- */}
              {isScanning && (
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-600 transition-all ease-out duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              )}

              {/* --- BUTTON TEXT (Z-10 keeps text on top of the filling bar) --- */}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isScanning ? `Scanning with AI... ${scanProgress}%` : 'Calculate ATS Score'}
              </span>
            </button>

            {/* ================= RESULTS AREA ================= */}
            {results && (
              <div className="mt-12 animate-fade-in-up">
                {/* Score Ring */}
                <div className="flex justify-center mb-10">
                   <div className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center border-[12px] shadow-inner ${results.score >= 80 ? 'border-green-500 text-green-600 bg-green-50' : results.score >= 60 ? 'border-yellow-500 text-yellow-600 bg-yellow-50' : 'border-red-500 text-red-600 bg-red-50'}`}>
                      <span className="text-6xl font-black">{results.score}</span>
                      <span className="text-sm font-bold mt-1 text-gray-500 uppercase tracking-widest">Score</span>
                   </div>
                </div>
                
                {/* Freemium Wall & Feedback Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Free Feature: What's Missing */}
                  <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <h4 className="font-extrabold text-lg text-red-600 mb-4 flex items-center gap-2">
                      <span className="bg-red-100 text-red-600 p-1 rounded">⚠️</span> Critical Fixes
                    </h4>
                    <ul className="space-y-3">
                      {results.fixes?.map((fix: string, i: number) => (
                        <li key={i} className="flex gap-3 text-gray-700 text-sm">
                          <span className="text-red-500 mt-0.5">•</span> {fix}
                        </li>
                      ))}
                      {(!results.fixes || results.fixes.length === 0) && (
                        <p className="text-sm text-green-600 font-medium">Looking good! No critical formatting errors found.</p>
                      )}
                    </ul>
                  </div>

                  {/* Locked Feature: AI Improvements */}
                  <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl relative overflow-hidden">
                    <h4 className="font-extrabold text-lg text-green-600 mb-4 flex items-center gap-2">
                      <span className="bg-green-100 text-green-600 p-1 rounded">💡</span> AI Suggestions
                    </h4>
                    
                    {isLoggedIn ? (
                      <ul className="space-y-3">
                        {results.improvements?.map((imp: string, i: number) => (
                          <li key={i} className="flex gap-3 text-gray-700 text-sm">
                            <span className="text-green-500 mt-0.5">✓</span> {imp}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <>
                        <div className="blur-sm select-none opacity-40">
                          <ul className="space-y-3">
                            <li className="flex gap-3 text-gray-700 text-sm"><span className="text-green-500">✓</span> Add quantifiable metrics to your recent role.</li>
                            <li className="flex gap-3 text-gray-700 text-sm"><span className="text-green-500">✓</span> The JD emphasizes 'Agile', but you only mentioned it once.</li>
                            <li className="flex gap-3 text-gray-700 text-sm"><span className="text-green-500">✓</span> Reorder your skills to put React and Node.js first.</li>
                          </ul>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
                          <p className="font-black text-gray-900 mb-3 text-center px-4">Log in to unlock specific AI improvements</p>
                          <button onClick={() => navigate('/login')} className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all">
                            Log In / Register Free
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SmartResumeScore;