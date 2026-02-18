import React, { useState, ChangeEvent, FormEvent } from 'react';

// --- TYPESCRIPT INTERFACES ---
export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export interface WorkExp {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  link: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
}

export interface ResumeData {
  name: string;
  contactInfo: { email: string; phone: string; linkedin: string; };
  shortIntro: string;
  photo: File | null;
  education: Education[];
  workExp: WorkExp[];
  projects: Project[];
  certifications: Certification[];
  skills: string;
}

// --- MAIN COMPONENT ---
const ResumeMakerForm: React.FC = () => {
  // 1. Initial State
  const [formData, setFormData] = useState<ResumeData>({
    name: '',
    contactInfo: { email: '', phone: '', linkedin: '' },
    shortIntro: '',
    photo: null,
    education: [],
    workExp: [],
    projects: [],
    certifications: [],
    skills: '',
  });

  // AI & History States
  const [generatingAI, setGeneratingAI] = useState<string | null>(null);
  const [aiCredits, setAiCredits] = useState<number>(12);
  
  // ✅ NEW: History Tracking for Undo/Regenerate
  const [textHistory, setTextHistory] = useState<Record<string, string[]>>({});
  const [originalPrompts, setOriginalPrompts] = useState<Record<string, string>>({});

  // 2. Basic Field Handlers
  const handleBasicChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [name]: value },
    }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  // 3. Dynamic Array Handlers
  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  const addEducation = () => setFormData(prev => ({ ...prev, education: [...prev.education, { id: generateId(), institution: '', degree: '', year: '' }] }));
  const updateEducation = (id: string, field: keyof Education, value: string) => setFormData(prev => ({ ...prev, education: prev.education.map(item => item.id === id ? { ...item, [field]: value } : item) }));
  const removeEducation = (id: string) => setFormData(prev => ({ ...prev, education: prev.education.filter(item => item.id !== id) }));

  const addWorkExp = () => setFormData(prev => ({ ...prev, workExp: [...prev.workExp, { id: generateId(), company: '', role: '', duration: '', description: '' }] }));
  const updateWorkExp = (id: string, field: keyof WorkExp, value: string) => setFormData(prev => ({ ...prev, workExp: prev.workExp.map(item => item.id === id ? { ...item, [field]: value } : item) }));
  const removeWorkExp = (id: string) => setFormData(prev => ({ ...prev, workExp: prev.workExp.filter(item => item.id !== id) }));

  const addProject = () => setFormData(prev => ({ ...prev, projects: [...prev.projects, { id: generateId(), title: '', link: '', description: '' }] }));
  const updateProject = (id: string, field: keyof Project, value: string) => setFormData(prev => ({ ...prev, projects: prev.projects.map(item => item.id === id ? { ...item, [field]: value } : item) }));
  const removeProject = (id: string) => setFormData(prev => ({ ...prev, projects: prev.projects.filter(item => item.id !== id) }));

  const addCertification = () => setFormData(prev => ({ ...prev, certifications: [...prev.certifications, { id: generateId(), name: '', issuer: '' }] }));
  const updateCertification = (id: string, field: keyof Certification, value: string) => setFormData(prev => ({ ...prev, certifications: prev.certifications.map(item => item.id === id ? { ...item, [field]: value } : item) }));
  const removeCertification = (id: string) => setFormData(prev => ({ ...prev, certifications: prev.certifications.filter(item => item.id !== id) }));

  // 4. AI Handlers: Generate, Regenerate, and Undo
  const handleGenerateAI = async (id: string, type: 'work' | 'project', title: string, context: string, currentText: string, isRegenerate: boolean = false) => {
    if (aiCredits <= 0) {
      alert("You have used all 12 AI credits for this resume.");
      return;
    }
    
    if (!title) {
      alert(`Please enter a ${type === 'work' ? 'Job Title' : 'Project Title'} first!`);
      return;
    }

    // If regenerating, use the original prompt they typed. Otherwise, use what's currently in the box.
    const promptToUse = isRegenerate ? originalPrompts[id] : currentText;

    if (!promptToUse || promptToUse.trim().length < 10) {
      alert("Please write a rough explanation (at least 10 characters) of what you did first. The AI needs something to rewrite!");
      return;
    }

    setGeneratingAI(id);
    try {
      const response = await fetch("http://localhost:3000/api/resumeMaker/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: title, company: context, rawText: promptToUse }) 
      });

      const data = await response.json();
      
      if (data.success) {
        // Save the original prompt if this is the first generation
        if (!isRegenerate && !originalPrompts[id]) {
          setOriginalPrompts(prev => ({ ...prev, [id]: currentText }));
        }

        // Push the PREVIOUS text onto the history stack so we can undo it
        setTextHistory(prev => ({ ...prev, [id]: [...(prev[id] || []), currentText] }));

        // Update with the new AI text
        if (type === 'work') updateWorkExp(id, 'description', data.description);
        else updateProject(id, 'description', data.description);
        
        setAiCredits(prev => prev - 1);
      } else {
        alert(`❌ Failed to generate: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Server error. Is your backend running?");
    } finally {
      setGeneratingAI(null);
    }
  };

  // ✅ NEW: Undo Handler
  const handleUndo = (id: string, type: 'work' | 'project') => {
    const historyStack = textHistory[id] || [];
    if (historyStack.length === 0) return;

    // Get the last saved state
    const previousText = historyStack[historyStack.length - 1];

    // Remove it from the history stack
    const newHistory = historyStack.slice(0, -1);
    setTextHistory(prev => ({ ...prev, [id]: newHistory }));

    // Revert the text in the form
    if (type === 'work') updateWorkExp(id, 'description', previousText);
    else updateProject(id, 'description', previousText);

    // If we undo all the way back to the start, clear the original prompt memory
    if (newHistory.length === 0) {
      setOriginalPrompts(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  // 5. Submit Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const submitBtn = document.getElementById('save-btn') as HTMLButtonElement;
    if (submitBtn) submitBtn.innerText = "🚚 Saving to Database...";

    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch("http://localhost:3000/api/resumeMaker/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          resumeData: formData,
          userId: "test-user-123" 
        })
      });

      const data = await response.json();

      if (data.success) {
        alert("🎉 Success! Your resume is securely saved in the filing cabinet!");
      } else {
        alert(`❌ Could not save: ${data.message}`);
      }
    } catch (error) {
      console.error("Save Error:", error);
      alert("⚠️ Could not reach the back office. Is your Node.js server running?");
    } finally {
      if (submitBtn) submitBtn.innerText = "Save & Generate Resume";
    }
  };

  // --- UI RENDER ---
  return (
    <div className="max-w-[1600px] mx-auto p-4 lg:p-8 mt-4 mb-10">
      
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-blue-900">Build Your Professional Resume</h2>
        <p className="text-gray-600 mt-2">Fill in your details on the left and see the real-time preview on the right.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative">
        
        {/* ==================== LEFT COLUMN: THE FORM ==================== */}
        <div className="w-full lg:w-1/2 xl:w-5/12">
          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 shadow-xl rounded-xl border border-gray-100">
            
            {/* --- PERSONAL INFO --- */}
            <section>
              <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-100 pb-2 mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Full Name *" required onChange={handleBasicChange} className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
                <div className="border p-2 rounded-lg flex items-center bg-gray-50">
                  <span className="text-sm text-gray-500 mr-2">Photo:</span>
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="text-sm w-full" />
                </div>
                <input type="email" name="email" placeholder="Email Address *" required onChange={handleContactChange} className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="tel" name="phone" placeholder="Phone Number *" required onChange={handleContactChange} className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="url" name="linkedin" placeholder="LinkedIn Profile URL" onChange={handleContactChange} className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2" />
              </div>
              <textarea name="shortIntro" placeholder="Professional Summary / Short Intro *" required rows={3} onChange={handleBasicChange} className="border p-3 rounded-lg w-full mt-4 focus:ring-2 focus:ring-blue-500 outline-none" />
            </section>

            {/* --- SKILLS --- */}
            <section>
              <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-100 pb-2 mb-4">Core Skills</h3>
              <input type="text" name="skills" placeholder="e.g. JavaScript, React, Project Management (Comma separated)" onChange={handleBasicChange} className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
            </section>

            {/* --- EXPERIENCE --- */}
            <section>
              <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-100 pb-2 mb-4">Work Experience</h3>
              {formData.workExp.map((exp, index) => (
                <div key={exp.id} className="p-5 mb-5 border border-gray-200 bg-gray-50 rounded-xl shadow-sm relative group hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-blue-900">Experience #{index + 1}</h4>
                    <button type="button" onClick={() => removeWorkExp(exp.id)} className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-red-100">&times; Remove</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Job Title</label>
                      <input type="text" placeholder="e.g. Software Engineer" value={exp.role} onChange={(e) => updateWorkExp(exp.id, 'role', e.target.value)} className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Company Name</label>
                      <input type="text" placeholder="e.g. Google" value={exp.company} onChange={(e) => updateWorkExp(exp.id, 'company', e.target.value)} className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white" required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-600 mb-1">Duration</label>
                      <input type="text" placeholder="e.g. Jan 2021 - Present" value={exp.duration} onChange={(e) => updateWorkExp(exp.id, 'duration', e.target.value)} className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white" required />
                    </div>
                  </div>
                  
                  {/* ✅ REDESIGNED AI TEXTBOX (Inspired by screenshot) */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Responsibilities (Write rough notes, AI will rewrite)</label>
                    <div className="border border-gray-300 rounded-lg bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
                      <textarea 
                        placeholder="e.g. built a dashboard, fixed bugs, helped team..." 
                        rows={4} 
                        value={exp.description} 
                        onChange={(e) => updateWorkExp(exp.id, 'description', e.target.value)} 
                        className="w-full p-3 outline-none resize-y text-sm text-gray-800" 
                        required 
                      />
                      
                      {/* AI Bottom Toolbar */}
                      <div className="bg-blue-50/50 border-t border-gray-200 px-3 py-2 flex justify-between items-center">
                        <span className="text-xs text-gray-400">{exp.description.length}/1000</span>
                        
                        <div className="flex items-center gap-3">
                          {/* UNDO BUTTON */}
                          {textHistory[exp.id]?.length > 0 && (
                            <button 
                              type="button" 
                              onClick={() => handleUndo(exp.id, 'work')} 
                              className="text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              ↺ Undo
                            </button>
                          )}

                          {/* REGENERATE OR GENERATE BUTTON */}
                          {originalPrompts[exp.id] ? (
                            <button 
                              type="button" 
                              onClick={() => handleGenerateAI(exp.id, 'work', exp.role, exp.company, exp.description, true)} 
                              disabled={generatingAI === exp.id || aiCredits <= 0} 
                              className="text-xs font-semibold text-purple-700 hover:text-purple-900 transition-colors flex items-center gap-1"
                            >
                              {generatingAI === exp.id ? "⏳ Regenerating..." : `↻ Regenerate (${aiCredits} left)`}
                            </button>
                          ) : (
                            <button 
                              type="button" 
                              onClick={() => handleGenerateAI(exp.id, 'work', exp.role, exp.company, exp.description, false)} 
                              disabled={generatingAI === exp.id || aiCredits <= 0} 
                              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                            >
                              {generatingAI === exp.id ? "⏳ Writing..." : `✨ Write with AI (${aiCredits} left)`}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
              <button type="button" onClick={addWorkExp} className="mt-2 text-blue-600 font-bold hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 border-dashed w-full">+ Add Experience</button>
            </section>

            {/* --- EDUCATION --- */}
            <section>
              <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-100 pb-2 mb-4">Education</h3>
              {formData.education.map((edu, index) => (
                <div key={edu.id} className="p-5 mb-5 border border-gray-200 bg-gray-50 rounded-xl shadow-sm relative group hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-blue-900">Education #{index + 1}</h4>
                    <button type="button" onClick={() => removeEducation(edu.id)} className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-red-100">&times; Remove</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Institution</label>
                      <input type="text" placeholder="e.g. MIT" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Degree</label>
                      <input type="text" placeholder="e.g. B.Tech" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Timeline</label>
                      <input type="text" placeholder="e.g. 2020 - 2024" value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white" required />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addEducation} className="mt-2 text-blue-600 font-bold hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 border-dashed w-full">+ Add Education</button>
            </section>

            {/* --- PROJECTS --- */}
            <section>
              <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-100 pb-2 mb-4">Projects</h3>
              {formData.projects.map((proj, index) => (
                <div key={proj.id} className="p-5 mb-5 border border-gray-200 bg-gray-50 rounded-xl shadow-sm relative group hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-blue-900">Project #{index + 1}</h4>
                    <button type="button" onClick={() => removeProject(proj.id)} className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-red-100">&times; Remove</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Project Title</label>
                      <input type="text" placeholder="e.g. E-Commerce App" value={proj.title} onChange={(e) => updateProject(proj.id, 'title', e.target.value)} className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Link</label>
                      <input type="url" placeholder="e.g. https://github.com/..." value={proj.link} onChange={(e) => updateProject(proj.id, 'link', e.target.value)} className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white" />
                    </div>
                  </div>

                  {/* ✅ REDESIGNED AI TEXTBOX FOR PROJECTS */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Description (Write rough notes, AI will rewrite)</label>
                    <div className="border border-gray-300 rounded-lg bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
                      <textarea 
                        placeholder="e.g. made an app using react and node..." 
                        rows={3} 
                        value={proj.description} 
                        onChange={(e) => updateProject(proj.id, 'description', e.target.value)} 
                        className="w-full p-3 outline-none resize-y text-sm text-gray-800" 
                        required 
                      />
                      
                      {/* AI Bottom Toolbar */}
                      <div className="bg-blue-50/50 border-t border-gray-200 px-3 py-2 flex justify-between items-center">
                        <span className="text-xs text-gray-400">{proj.description.length}/1000</span>
                        
                        <div className="flex items-center gap-3">
                          {/* UNDO BUTTON */}
                          {textHistory[proj.id]?.length > 0 && (
                            <button 
                              type="button" 
                              onClick={() => handleUndo(proj.id, 'project')} 
                              className="text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              ↺ Undo
                            </button>
                          )}

                          {/* REGENERATE OR GENERATE BUTTON */}
                          {originalPrompts[proj.id] ? (
                            <button 
                              type="button" 
                              onClick={() => handleGenerateAI(proj.id, 'project', proj.title, 'personal project', proj.description, true)} 
                              disabled={generatingAI === proj.id || aiCredits <= 0} 
                              className="text-xs font-semibold text-purple-700 hover:text-purple-900 transition-colors flex items-center gap-1"
                            >
                              {generatingAI === proj.id ? "⏳ Regenerating..." : `↻ Regenerate (${aiCredits} left)`}
                            </button>
                          ) : (
                            <button 
                              type="button" 
                              onClick={() => handleGenerateAI(proj.id, 'project', proj.title, 'personal project', proj.description, false)} 
                              disabled={generatingAI === proj.id || aiCredits <= 0} 
                              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                            >
                              {generatingAI === proj.id ? "⏳ Writing..." : `✨ Write with AI (${aiCredits} left)`}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
              <button type="button" onClick={addProject} className="mt-2 text-blue-600 font-bold hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 border-dashed w-full">+ Add Project</button>
            </section>

            {/* --- CERTIFICATIONS --- */}
            <section>
              <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-100 pb-2 mb-4">Certifications</h3>
              {formData.certifications.map((cert, index) => (
                <div key={cert.id} className="p-5 mb-5 border border-gray-200 bg-gray-50 rounded-xl shadow-sm relative group hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-blue-900">Certification #{index + 1}</h4>
                    <button type="button" onClick={() => removeCertification(cert.id)} className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-red-100">&times; Remove</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Name</label>
                      <input type="text" placeholder="e.g. AWS Certified" value={cert.name} onChange={(e) => updateCertification(cert.id, 'name', e.target.value)} className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Issuer</label>
                      <input type="text" placeholder="e.g. Amazon" value={cert.issuer} onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)} className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white" required />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addCertification} className="mt-2 text-blue-600 font-bold hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 border-dashed w-full">+ Add Certification</button>
            </section>

            {/* --- SUBMIT --- */}
            <div className="pt-6 border-t-2 border-gray-100 sticky bottom-4 bg-white z-10 p-2 shadow-2xl rounded-xl">
              <button id="save-btn" type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl transition-colors shadow-lg">
                Save & Generate Resume
              </button>
            </div>

          </form>
        </div>

        {/* ==================== RIGHT COLUMN: LIVE PREVIEW ==================== */}
        <div className="hidden lg:block lg:w-1/2 xl:w-7/12">
          <div className="sticky top-24 h-[calc(100vh-8rem)]">
            <div className="w-full h-full bg-white shadow-2xl overflow-y-auto transform origin-top border border-gray-200 p-10 font-sans text-gray-800 rounded-sm">
              
              <div className="border-b-2 border-gray-800 pb-4 mb-6 text-center">
                <h1 className="text-4xl font-extrabold uppercase tracking-wider text-gray-900">
                  {formData.name || "Your Name"}
                </h1>
                <div className="text-sm mt-2 flex justify-center gap-4 text-gray-600">
                  <span>{formData.contactInfo.email || "email@example.com"}</span>
                  {formData.contactInfo.phone && <span>• {formData.contactInfo.phone}</span>}
                  {formData.contactInfo.linkedin && <span>• {formData.contactInfo.linkedin}</span>}
                </div>
              </div>

              {formData.shortIntro && (
                <div className="mb-6">
                  <p className="text-sm leading-relaxed">{formData.shortIntro}</p>
                </div>
              )}

              {formData.skills && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-2 text-gray-900">Skills</h2>
                  <p className="text-sm">{formData.skills}</p>
                </div>
              )}

              {formData.workExp.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 text-gray-900">Experience</h2>
                  {formData.workExp.map(exp => (
                    <div key={exp.id} className="mb-4">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>{exp.role || "Job Title"}</span>
                        <span>{exp.duration || "Dates"}</span>
                      </div>
                      <div className="text-gray-700 italic text-sm mb-1">{exp.company || "Company Name"}</div>
                      <div className="text-sm whitespace-pre-wrap leading-relaxed text-gray-700">
                        {exp.description || "Description will appear here."}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {formData.projects.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 text-gray-900">Projects</h2>
                  {formData.projects.map(proj => (
                    <div key={proj.id} className="mb-4">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>{proj.title || "Project Title"}</span>
                        {proj.link && <span className="text-sm font-normal text-blue-600">{proj.link}</span>}
                      </div>
                      <div className="text-sm whitespace-pre-wrap leading-relaxed text-gray-700 mt-1">
                        {proj.description || "Description will appear here."}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {formData.education.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 text-gray-900">Education</h2>
                  {formData.education.map(edu => (
                    <div key={edu.id} className="mb-3 flex justify-between">
                      <div>
                        <div className="font-bold text-gray-900">{edu.institution || "Institution"}</div>
                        <div className="text-sm text-gray-700">{edu.degree || "Degree"}</div>
                      </div>
                      <div className="font-bold text-gray-900 text-sm">{edu.year || "Year"}</div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResumeMakerForm;