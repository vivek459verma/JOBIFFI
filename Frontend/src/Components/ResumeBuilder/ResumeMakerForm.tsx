import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import skillsData from './skills.json';

// --- TYPESCRIPT INTERFACES ---
export interface Education { id: string; institution: string; degree: string; year: string; }
export interface WorkExp { id: string; company: string; role: string; startMonth: string; startYear: string; endMonth: string; endYear: string; isCurrent: boolean; duration: string; description: string; }
export interface Project { id: string; title: string; link: string; description: string; }
export interface Certification { id: string; name: string; issuer: string; }
export interface SocialLink { id: string; platform: string; customPlatform?: string; url: string; }
export interface Language { id: string; name: string; proficiency: string; }
export interface ResumeStyle { font: string; fontSize: string; }

export interface ResumeData {
  id: string;               // ✅ NEW: Unique ID for each resume
  resumeTitle: string;      // ✅ NEW: Custom title for the user to organize their resumes
  name: string;
  contactInfo: { email: string; phone: string; city: string; country: string; };
  experienceLevel: string;
  shortIntro: string;
  photo: File | null;
  socialLinks: SocialLink[];
  languages: Language[];
  education: Education[];
  workExp: WorkExp[];
  projects: Project[];
  certifications: Certification[];
  skills: string;
  style: ResumeStyle;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FONTS = [ { name: 'Arial', value: 'Arial, sans-serif' }, { name: 'Calibri', value: 'Calibri, sans-serif' }, { name: 'Helvetica', value: 'Helvetica, sans-serif' }, { name: 'Times New Roman', value: '"Times New Roman", Times, serif' }, { name: 'Garamond', value: 'Garamond, serif' }, { name: 'Georgia', value: 'Georgia, serif' }, { name: 'Roboto', value: 'Roboto, sans-serif' }, { name: 'Open Sans', value: '"Open Sans", sans-serif' } ];
const FONT_SIZES = [ { name: 'Small (10pt)', value: '13px' }, { name: 'Standard (11pt)', value: '14.5px' }, { name: 'Medium (12pt)', value: '16px' }, { name: 'Large (14pt)', value: '18px' } ];

const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9);

const INITIAL_RESUME_STATE: ResumeData = {
  id: '', resumeTitle: 'Untitled Resume', name: '', contactInfo: { email: '', phone: '', city: '', country: '' },
  experienceLevel: 'Entry Level', shortIntro: '', photo: null, socialLinks: [], languages: [], education: [], 
  workExp: [], projects: [], certifications: [], skills: '', style: { font: 'Arial, sans-serif', fontSize: '14.5px' }
};

// --- MAIN COMPONENT ---
const ResumeMakerForm: React.FC = () => {
  // ✅ NEW: View Management (Dashboard vs Editor)
  const [currentView, setCurrentView] = useState<'dashboard' | 'editor'>('dashboard');
  
  // ✅ NEW: Mock Array of Saved Resumes (Simulating Database)
  const [savedResumes, setSavedResumes] = useState<ResumeData[]>([]);

  // Editor States
  const [formData, setFormData] = useState<ResumeData>(INITIAL_RESUME_STATE);
  const [activeTab, setActiveTab] = useState<'builder' | 'templates' | 'customisation'>('builder');
  const [generatingAI, setGeneratingAI] = useState<string | null>(null);
  const [aiCredits, setAiCredits] = useState<number>(12);
  const [textHistory, setTextHistory] = useState<Record<string, string[]>>({});
  const [historyIndex, setHistoryIndex] = useState<Record<string, number>>({});
  const [originalPrompts, setOriginalPrompts] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
  const [skillInput, setSkillInput] = useState("");
  const [visibleSuggestions, setVisibleSuggestions] = useState<string[]>([]);
  const [showBrowse, setShowBrowse] = useState(false);
  const [browseTab, setBrowseTab] = useState<'hard' | 'soft'>('hard');

  const flatSkillsDB = useMemo(() => [ ...(skillsData?.soft || []), ...Object.values(skillsData?.hard || {}).flat() ], []);

  // Ultimate Dynamic Prediction Engine
  useEffect(() => {
    if (skillInput.trim()) {
      const searchResults = flatSkillsDB.filter(s => s.toLowerCase().includes(skillInput.toLowerCase()) && !skillsArray.includes(s)).slice(0, 10);
      setVisibleSuggestions(searchResults);
      return;
    }
    const combinedText = `${formData.shortIntro} ${formData.experienceLevel} ${formData.workExp.map(w => `${w.role} ${w.description}`).join(' ')} ${formData.projects.map(p => `${p.title} ${p.description}`).join(' ')} ${skillsArray.join(' ')}`.toLowerCase();
    
    const scoredSkills = flatSkillsDB.filter(s => !skillsArray.includes(s)).map(skill => {
        let score = 0;
        const skillLower = skill.toLowerCase();
        if (combinedText.includes(skillLower)) score += 150;
        Object.values(skillsData?.hard || {}).forEach(categorySkills => {
           const categoryLower = categorySkills.map(c => c.toLowerCase());
           if (categoryLower.includes(skillLower) && categoryLower.some(c => combinedText.includes(c))) score += 60; 
        });
        skillsArray.forEach(addedSkill => {
            const addedWords = addedSkill.toLowerCase().split(/[\s.\/]+/);
            const skillWords = skillLower.split(/[\s.\/]+/);
            addedWords.forEach(aw => { if (aw.length > 3 && skillWords.includes(aw)) score += 20; });
        });
        score += Math.random() * 5;
        return { skill, score };
      });
    scoredSkills.sort((a, b) => b.score - a.score);
    setVisibleSuggestions(scoredSkills.slice(0, 10).map(s => s.skill));
  }, [formData.shortIntro, formData.workExp, formData.projects, skillsArray.length, skillInput, flatSkillsDB]);

  // View Navigation Handlers
  const handleCreateNew = () => {
    setFormData({ ...INITIAL_RESUME_STATE, id: generateId() });
    setCurrentView('editor');
  };

  const handleEditResume = (resume: ResumeData) => {
    setFormData(resume);
    setCurrentView('editor');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  // Form Handlers
  const handleBasicChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, contactInfo: { ...prev.contactInfo, [name]: value } }));
  };
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setFormData((prev) => ({ ...prev, photo: e.target.files![0] }));
  };

  const addSocialLink = () => setFormData(prev => ({ ...prev, socialLinks: [...prev.socialLinks, { id: generateId(), platform: 'LinkedIn', url: '', customPlatform: '' }] }));
  const updateSocialLink = (id: string, field: keyof SocialLink, value: string) => setFormData(prev => ({ ...prev, socialLinks: prev.socialLinks.map(item => item.id === id ? { ...item, [field]: value } : item) }));
  const removeSocialLink = (id: string) => setFormData(prev => ({ ...prev, socialLinks: prev.socialLinks.filter(item => item.id !== id) }));

  const addLanguage = () => setFormData(prev => ({ ...prev, languages: [...prev.languages, { id: generateId(), name: '', proficiency: 'Professional Working' }] }));
  const updateLanguage = (id: string, field: keyof Language, value: string) => setFormData(prev => ({ ...prev, languages: prev.languages.map(item => item.id === id ? { ...item, [field]: value } : item) }));
  const removeLanguage = (id: string) => setFormData(prev => ({ ...prev, languages: prev.languages.filter(item => item.id !== id) }));

  const addEducation = () => setFormData(prev => ({ ...prev, education: [...prev.education, { id: generateId(), institution: '', degree: '', year: '' }] }));
  const updateEducation = (id: string, field: keyof Education, value: string) => setFormData(prev => ({ ...prev, education: prev.education.map(item => item.id === id ? { ...item, [field]: value } : item) }));
  const removeEducation = (id: string) => setFormData(prev => ({ ...prev, education: prev.education.filter(item => item.id !== id) }));

  const addWorkExp = () => setFormData(prev => ({ ...prev, workExp: [...prev.workExp, { id: generateId(), company: '', role: '', startMonth: '', startYear: '', endMonth: '', endYear: '', isCurrent: false, duration: '', description: '' }] }));
  const updateWorkExp = (id: string, field: keyof WorkExp, value: any) => setFormData(prev => ({ ...prev, workExp: prev.workExp.map(item => item.id === id ? { ...item, [field]: value } : item) }));
  const removeWorkExp = (id: string) => setFormData(prev => ({ ...prev, workExp: prev.workExp.filter(item => item.id !== id) }));
  const updateWorkDate = (id: string, field: keyof WorkExp, value: any) => {
    setFormData(prev => {
      const updatedWork = prev.workExp.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          const start = updatedItem.startMonth && updatedItem.startYear ? `${updatedItem.startMonth} ${updatedItem.startYear}` : '';
          const end = updatedItem.isCurrent ? "Present" : (updatedItem.endMonth && updatedItem.endYear ? `${updatedItem.endMonth} ${updatedItem.endYear}` : '');
          if (start && end) updatedItem.duration = `${start} - ${end}`;
          else if (start) updatedItem.duration = `${start} - Present`;
          else updatedItem.duration = '';
          return updatedItem;
        }
        return item;
      });
      return { ...prev, workExp: updatedWork };
    });
  };

  const addProject = () => setFormData(prev => ({ ...prev, projects: [...prev.projects, { id: generateId(), title: '', link: '', description: '' }] }));
  const updateProject = (id: string, field: keyof Project, value: string) => setFormData(prev => ({ ...prev, projects: prev.projects.map(item => item.id === id ? { ...item, [field]: value } : item) }));
  const removeProject = (id: string) => setFormData(prev => ({ ...prev, projects: prev.projects.filter(item => item.id !== id) }));

  const addCertification = () => setFormData(prev => ({ ...prev, certifications: [...prev.certifications, { id: generateId(), name: '', issuer: '' }] }));
  const updateCertification = (id: string, field: keyof Certification, value: string) => setFormData(prev => ({ ...prev, certifications: prev.certifications.map(item => item.id === id ? { ...item, [field]: value } : item) }));
  const removeCertification = (id: string) => setFormData(prev => ({ ...prev, certifications: prev.certifications.filter(item => item.id !== id) }));

  const handleGenerateAI = async (id: string, type: 'work' | 'project' | 'summary', title: string, context: string, currentText: string, isRegenerate: boolean = false) => {
    if (aiCredits <= 0) return alert("You have used all 12 AI credits for this resume.");
    if (!title && type !== 'summary') return alert(`Please enter a Title first!`);

    const promptToUse = isRegenerate ? originalPrompts[id] : currentText;
    if (!promptToUse || promptToUse.trim().length < 10) return alert("Please write a rough explanation (at least 10 characters) first.");

    setGeneratingAI(id);
    try {
      const response = await fetch("http://localhost:8000/api/resumeMaker/generate-description", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: title || 'Professional', company: context, rawText: promptToUse }) 
      });

      const data = await response.json();
      if (data.success) {
        if (!isRegenerate && !originalPrompts[id]) setOriginalPrompts(prev => ({ ...prev, [id]: currentText }));
        const currentStack = textHistory[id] || [promptToUse];
        const newStack = [...currentStack, data.description];
        setTextHistory(prev => ({ ...prev, [id]: newStack }));
        setHistoryIndex(prev => ({ ...prev, [id]: newStack.length - 1 }));

        if (type === 'work') updateWorkExp(id, 'description', data.description);
        else if (type === 'project') updateProject(id, 'description', data.description);
        else setFormData(prev => ({ ...prev, shortIntro: data.description }));
        
        setAiCredits(prev => prev - 1);
      } else alert(`Error: Failed to generate: ${data.message}`);
    } catch (error) { alert("Server error. Is your backend running?"); } finally { setGeneratingAI(null); }
  };

  const handleNavigateHistory = (id: string, type: 'work' | 'project' | 'summary', direction: 'prev' | 'next') => {
    const stack = textHistory[id] || [];
    if (stack.length === 0) return;
    const currIdx = historyIndex[id] !== undefined ? historyIndex[id] : stack.length - 1;
    const newIdx = direction === 'prev' ? currIdx - 1 : currIdx + 1;

    if (newIdx >= 0 && newIdx < stack.length) {
      setHistoryIndex(prev => ({ ...prev, [id]: newIdx }));
      const textToDisplay = stack[newIdx];
      if (type === 'work') updateWorkExp(id, 'description', textToDisplay);
      else if (type === 'project') updateProject(id, 'description', textToDisplay);
      else setFormData(prev => ({ ...prev, shortIntro: textToDisplay }));
    }
  };

  const handleAddSkill = (skill: string) => {
    if (!skill || skillsArray.includes(skill)) return;
    const newSkillsString = formData.skills ? `${formData.skills}, ${skill}` : skill;
    setFormData(prev => ({ ...prev, skills: newSkillsString }));
    setSkillInput(""); 
  };
  const removeSkill = (skillToRemove: string) => {
    const newSkillsString = skillsArray.filter(s => s !== skillToRemove).join(', ');
    setFormData(prev => ({ ...prev, skills: newSkillsString }));
  };
  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSkill(skillInput.trim());
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // 1. Save to local state array (simulates Database)
      setSavedResumes(prev => {
        const exists = prev.find(r => r.id === formData.id);
        if (exists) return prev.map(r => r.id === formData.id ? formData : r);
        return [...prev, formData];
      });

      // 2. Actually try saving to Backend
      const response = await fetch("http://localhost:8000/api/resumeMaker/save", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: formData, userId: "test-user-123" })
      });
      const data = await response.json();
      if (data.success) {
        alert("Success! Your resume is securely saved!");
        setCurrentView('dashboard'); // Go back to dashboard on success!
      } else {
        alert(`Could not save to backend: ${data.message} (But saved locally!)`);
        setCurrentView('dashboard');
      }
    } catch (error) { 
      alert("Could not reach the server. Resume saved locally in this session!"); 
      setCurrentView('dashboard'); // Still let them go to dashboard to see the local save
    } finally { setIsSaving(false); }
  };

  // --- REUSABLE ICONS ---
  const IconWand = () => ( <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg> );
  const IconRefresh = () => ( <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> );
  const IconSpinner = () => ( <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> );
  const IconChevronLeft = () => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg> );
  const IconChevronRight = () => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg> );
  const IconSettings = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg> );
  const IconTemplate = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg> );
  const IconList = () => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> );
  const IconPlus = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> );
  const IconDocument = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> );
  const IconArrowLeft = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> );

  const renderAIToolbar = (id: string, type: 'work' | 'project' | 'summary', title: string, context: string, text: string) => {
    const stack = textHistory[id] || [];
    const currIdx = historyIndex[id] !== undefined ? historyIndex[id] : -1;
    return (
      <div className="bg-blue-50/50 border-t border-gray-200 px-3 py-2 flex justify-between items-center rounded-b-lg">
        <span className="text-xs font-medium text-gray-400">{text.length}/1000</span>
        <div className="flex items-center gap-1">
          {stack.length > 1 && (
            <div className="flex items-center gap-1 mr-3 bg-white px-1.5 py-1 rounded border border-gray-200 shadow-sm">
              <button type="button" disabled={currIdx <= 0} onClick={() => handleNavigateHistory(id, type, 'prev')} className="p-0.5 text-gray-400 disabled:opacity-30 hover:text-blue-600 transition"><IconChevronLeft /></button>
              <span className="text-xs font-semibold text-gray-500 min-w-[30px] text-center">{currIdx + 1} / {stack.length}</span>
              <button type="button" disabled={currIdx >= stack.length - 1} onClick={() => handleNavigateHistory(id, type, 'next')} className="p-0.5 text-gray-400 disabled:opacity-30 hover:text-blue-600 transition"><IconChevronRight /></button>
            </div>
          )}
          {originalPrompts[id] ? (
            <button type="button" onClick={() => handleGenerateAI(id, type, title, context, text, true)} disabled={generatingAI === id || aiCredits <= 0} className="text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors flex items-center gap-1.5 bg-purple-100 px-3 py-1.5 rounded-md shadow-sm">
              {generatingAI === id ? <><IconSpinner /> Regenerating...</> : <><IconRefresh /> Regenerate ({aiCredits})</>}
            </button>
          ) : (
            <button type="button" onClick={() => handleGenerateAI(id, type, title, context, text, false)} disabled={generatingAI === id || aiCredits <= 0} className="text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1.5 bg-blue-100 px-3 py-1.5 rounded-md shadow-sm">
              {generatingAI === id ? <><IconSpinner /> Writing...</> : <><IconWand /> Write with AI ({aiCredits})</>}
            </button>
          )}
        </div>
      </div>
    );
  };

  // ============================================================================
  // ✅ DASHBOARD VIEW
  // ============================================================================
  if (currentView === 'dashboard') {
    return (
      <div className="max-w-[1200px] mx-auto p-4 lg:p-8 mt-4 mb-10 text-gray-800">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-blue-950 tracking-tight">My Resumes</h2>
          <p className="text-gray-500 mt-2 font-medium">Manage and tailor your resumes for different job applications.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Create New Card */}
          <button 
            onClick={handleCreateNew} 
            className="h-[280px] border-2 border-dashed border-blue-300 rounded-2xl bg-blue-50/50 hover:bg-blue-50 hover:border-blue-400 flex flex-col items-center justify-center text-blue-600 transition-all hover:shadow-md"
          >
            <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-blue-600">
              <IconPlus />
            </div>
            <span className="font-bold text-lg">Create New Resume</span>
          </button>

          {/* Saved Resumes List */}
          {savedResumes.map((resume) => (
            <div key={resume.id} className="h-[280px] border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all flex flex-col overflow-hidden group">
              <div className="flex-1 bg-gray-50 flex items-center justify-center border-b border-gray-100 relative">
                <IconDocument />
                <div className="absolute inset-0 bg-blue-900/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                   <button onClick={() => handleEditResume(resume)} className="bg-white text-blue-700 font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-blue-50">Edit Resume</button>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-gray-900 truncate">{resume.resumeTitle || "Untitled Resume"}</h3>
                <p className="text-xs text-gray-500 mt-1">{resume.name || "No name provided"}</p>
                <p className="text-xs font-medium text-blue-600 mt-2">{resume.experienceLevel}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    );
  }

  // ============================================================================
  // ✅ EDITOR VIEW
  // ============================================================================
  return (
    <div className="max-w-[1600px] mx-auto p-4 lg:p-8 mt-4 mb-10 text-gray-800">
      
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={handleBackToDashboard} className="text-sm font-bold text-gray-500 hover:text-blue-600 flex items-center gap-1.5 mb-2 transition-colors">
            <IconArrowLeft /> Back to Dashboard
          </button>
          
          {/* ✅ NEW: Editable Resume Title Input */}
          <input 
            type="text" 
            name="resumeTitle"
            value={formData.resumeTitle}
            onChange={handleBasicChange}
            placeholder="Name this resume (e.g. Data Analyst Role)"
            className="text-3xl font-extrabold text-blue-950 tracking-tight bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-600 outline-none transition-colors w-full pb-1"
          />
        </div>
        
        <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
          <IconWand />
          <span className="text-sm font-bold text-gray-600">Credits:</span>
          <span className="text-lg font-black text-blue-600">{aiCredits}</span>
        </div>
      </div>

      <div className="flex gap-6 mb-8 border-b border-gray-200 overflow-x-auto">
        <button onClick={() => setActiveTab('builder')} className={`pb-3 px-2 font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'builder' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
          <IconWand /> AI Resume Builder
        </button>
        <button onClick={() => setActiveTab('templates')} className={`pb-3 px-2 font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'templates' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
          <IconTemplate /> Templates
        </button>
        <button onClick={() => setActiveTab('customisation')} className={`pb-3 px-2 font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'customisation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
          <IconSettings /> Customisation
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative">
        <div className="w-full lg:w-1/2 xl:w-5/12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 h-full">

            {/* TAB: BUILDER */}
            <div className={`space-y-8 bg-white p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100 ${activeTab !== 'builder' && 'hidden'}`}>
              
              <section>
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="name" placeholder="Full Name *" value={formData.name} required={activeTab === 'builder'} onChange={handleBasicChange} className="border border-gray-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
                  <div className="border border-gray-200 p-2 rounded-xl flex items-center bg-gray-50">
                    <span className="text-sm font-medium text-gray-500 mr-2">Photo:</span>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="text-sm w-full" />
                  </div>
                  <input type="email" name="email" placeholder="Email Address *" value={formData.contactInfo.email} required={activeTab === 'builder'} onChange={handleContactChange} className="border border-gray-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
                  <input type="tel" name="phone" placeholder="Phone Number *" value={formData.contactInfo.phone} required={activeTab === 'builder'} onChange={handleContactChange} className="border border-gray-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
                  <input type="text" name="city" placeholder="City" value={formData.contactInfo.city} onChange={handleContactChange} className="border border-gray-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
                  <input type="text" name="country" placeholder="Country" value={formData.contactInfo.country} onChange={handleContactChange} className="border border-gray-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                    <select name="experienceLevel" value={formData.experienceLevel} onChange={handleBasicChange} className="border border-gray-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-shadow">
                      <option value="Entry Level">Entry Level (0-2 years)</option>
                      <option value="Mid Level">Mid Level (3-5 years)</option>
                      <option value="Senior Level">Senior Level (5+ years)</option>
                      <option value="Executive">Executive</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                  <div className="border border-gray-200 rounded-xl bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
                    <textarea name="shortIntro" placeholder="Write a few rough notes here..." rows={4} value={formData.shortIntro} onChange={handleBasicChange} className="w-full p-3 outline-none resize-y text-sm text-gray-800" required={activeTab === 'builder'} />
                    {renderAIToolbar('summary-id', 'summary', formData.name || 'Candidate', formData.experienceLevel, formData.shortIntro)}
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">Social & Links</h3>
                {formData.socialLinks.map((link) => (
                  <div key={link.id} className="flex gap-2 mb-3 items-center">
                    <select value={link.platform} onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)} className="border border-gray-200 p-2.5 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 shadow-sm shrink-0 w-[120px]">
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="GitHub">GitHub</option>
                      <option value="Portfolio">Portfolio</option>
                      <option value="Twitter">Twitter</option>
                      <option value="Other">Other</option>
                    </select>
                    {link.platform === 'Other' && (
                      <input type="text" placeholder="e.g. Dribbble" value={link.customPlatform || ''} onChange={(e) => updateSocialLink(link.id, 'customPlatform', e.target.value)} className="border border-gray-200 p-2.5 rounded-xl w-[120px] shrink-0 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" required />
                    )}
                    <input type="url" placeholder="https://..." value={link.url} onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)} className="border border-gray-200 p-2.5 rounded-xl flex-1 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm min-w-[100px]" required />
                    <button type="button" onClick={() => removeSocialLink(link.id)} className="px-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0">✕</button>
                  </div>
                ))}
                <button type="button" onClick={addSocialLink} className="text-sm text-blue-600 font-bold hover:text-blue-800 bg-blue-50/50 hover:bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-100 border-dashed w-full transition-colors">+ Add Link</button>
              </section>

              {/* --- DYNAMIC CORE SKILLS SECTION --- */}
              <section>
                <div className="flex justify-between items-center border-b-2 border-gray-100 pb-2 mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Core Skills</h3>
                </div>
                
                <div className="flex gap-2 items-start">
                  <div className="border border-gray-200 p-2 rounded-xl w-full focus-within:ring-2 focus-within:ring-blue-500 bg-white flex flex-wrap gap-2 items-center min-h-[50px] transition-shadow shadow-inner flex-1">
                    {skillsArray.map((skill, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 shadow-sm">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="text-blue-400 hover:text-blue-800 ml-1 transition-colors">✕</button>
                      </span>
                    ))}
                    <input 
                      type="text" 
                      value={skillInput}
                      onChange={(e) => {
                        setSkillInput(e.target.value);
                        setShowBrowse(false);
                      }}
                      onKeyDown={handleSkillKeyDown} 
                      placeholder={skillsArray.length === 0 ? "Type to search..." : "Search..."} 
                      className="outline-none flex-1 min-w-[120px] bg-transparent text-sm p-1 text-gray-800 font-medium" 
                    />
                  </div>

                  <button 
                    type="button" 
                    onClick={() => setShowBrowse(!showBrowse)}
                    className={`shrink-0 px-4 h-[50px] rounded-xl flex items-center gap-2 font-bold transition-colors border shadow-sm ${showBrowse ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    <IconList /> Browse
                  </button>
                </div>

                {showBrowse && (
                  <div className="mt-3 border border-gray-200 rounded-xl bg-white shadow-lg p-1 overflow-hidden z-10 relative">
                    <div className="flex bg-gray-50 p-1 rounded-t-lg border-b border-gray-100">
                      <button type="button" onClick={() => setBrowseTab('hard')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${browseTab === 'hard' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-500 hover:text-gray-800'}`}>Hard Skills (By Industry)</button>
                      <button type="button" onClick={() => setBrowseTab('soft')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${browseTab === 'soft' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-500 hover:text-gray-800'}`}>Soft Skills</button>
                    </div>
                    
                    <div className="max-h-[300px] overflow-y-auto p-4 bg-white">
                      {browseTab === 'soft' && (
                        <div className="flex flex-wrap gap-2">
                          {(skillsData?.soft || []).map((skill, idx) => (
                            <button key={idx} type="button" onClick={() => handleAddSkill(skill)} disabled={skillsArray.includes(skill)} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm">
                              + {skill}
                            </button>
                          ))}
                        </div>
                      )}
                      {browseTab === 'hard' && (
                        <div className="space-y-6">
                          {Object.entries(skillsData?.hard || {}).map(([categoryName, skillsList], index) => (
                            <div key={index}>
                              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{categoryName}</h4>
                              <div className="flex flex-wrap gap-2">
                                {skillsList.map((skill, idx) => (
                                  <button key={idx} type="button" onClick={() => handleAddSkill(skill)} disabled={skillsArray.includes(skill)} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm">
                                    + {skill}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!showBrowse && (
                  <div className="mt-4">
                    <span className="text-xs font-bold text-gray-400 block mb-2 flex justify-between uppercase tracking-wider">
                      <span>{skillInput ? "Search Results:" : "Contextual Suggestions:"}</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {visibleSuggestions.map((skill, idx) => (
                        <button key={idx} type="button" onClick={() => handleAddSkill(skill)} className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all shadow-sm">
                          + {skill}
                        </button>
                      ))}
                      {visibleSuggestions.length === 0 && skillInput && (
                        <span className="text-sm text-gray-500 italic">Press Enter to add "{skillInput}" as a custom skill.</span>
                      )}
                    </div>
                  </div>
                )}
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">Languages</h3>
                {formData.languages.map((lang) => (
                  <div key={lang.id} className="flex gap-2 mb-3">
                    <input type="text" placeholder="e.g. English, Spanish" value={lang.name} onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)} className="border border-gray-200 p-2.5 rounded-xl w-1/2 outline-none focus:ring-2 focus:ring-blue-500" required />
                    <select value={lang.proficiency} onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)} className="border border-gray-200 p-2.5 rounded-xl bg-white w-1/2 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium">
                      <option value="Basic">Basic</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Professional Working">Professional Working</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Native/Bilingual">Native/Bilingual</option>
                    </select>
                    <button type="button" onClick={() => removeLanguage(lang.id)} className="px-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">✕</button>
                  </div>
                ))}
                <button type="button" onClick={addLanguage} className="text-sm text-blue-600 font-bold hover:text-blue-800 bg-blue-50/50 hover:bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-100 border-dashed w-full transition-colors">+ Add Language</button>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">Work Experience</h3>
                {formData.workExp.map((exp, index) => (
                  <div key={exp.id} className="p-5 mb-5 border border-gray-100 bg-gray-50/50 rounded-2xl relative group hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-blue-950 uppercase tracking-wider text-sm">Experience {index + 1}</h4>
                      <button type="button" onClick={() => removeWorkExp(exp.id)} className="text-gray-400 hover:text-red-500 font-medium text-xs flex items-center gap-1 bg-white px-2 py-1.5 rounded-lg border border-gray-200 shadow-sm transition-colors">✕ Remove</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input type="text" placeholder="e.g. Software Engineer" value={exp.role} onChange={(e) => updateWorkExp(exp.id, 'role', e.target.value)} className="border border-gray-200 p-2.5 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input type="text" placeholder="e.g. Google" value={exp.company} onChange={(e) => updateWorkExp(exp.id, 'company', e.target.value)} className="border border-gray-200 p-2.5 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <div className="flex gap-2">
                          <select value={exp.startMonth} onChange={(e) => updateWorkDate(exp.id, 'startMonth', e.target.value)} className="w-1/2 border border-gray-200 p-2.5 rounded-xl outline-none bg-white focus:ring-2 focus:ring-blue-500 shadow-sm" required>
                            <option value="">Month</option>
                            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                          <input type="number" placeholder="YYYY" min="1950" max="2050" value={exp.startYear} onChange={(e) => updateWorkDate(exp.id, 'startYear', e.target.value)} className="w-1/2 border border-gray-200 p-2.5 rounded-xl outline-none bg-white focus:ring-2 focus:ring-blue-500 shadow-sm" required />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-sm font-medium text-gray-700">End Date</label>
                          <label className="flex items-center text-xs font-bold text-blue-600 cursor-pointer hover:text-blue-800 transition-colors">
                            <input type="checkbox" checked={exp.isCurrent} onChange={(e) => updateWorkDate(exp.id, 'isCurrent', e.target.checked)} className="mr-1.5 w-3.5 h-3.5 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                            Currently working here
                          </label>
                        </div>
                        
                        {exp.isCurrent ? (
                          <div className="w-full p-2.5 border border-blue-100 rounded-xl bg-blue-50 text-blue-700 font-bold text-center h-[46px] flex items-center justify-center shadow-sm">Present</div>
                        ) : (
                          <div className="flex gap-2">
                            <select value={exp.endMonth} onChange={(e) => updateWorkDate(exp.id, 'endMonth', e.target.value)} className="w-1/2 border border-gray-200 p-2.5 rounded-xl outline-none bg-white focus:ring-2 focus:ring-blue-500 shadow-sm" required={!exp.isCurrent}>
                              <option value="">Month</option>
                              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <input type="number" placeholder="YYYY" min="1950" max="2050" value={exp.endYear} onChange={(e) => updateWorkDate(exp.id, 'endYear', e.target.value)} className="w-1/2 border border-gray-200 p-2.5 rounded-xl outline-none bg-white focus:ring-2 focus:ring-blue-500 shadow-sm" required={!exp.isCurrent} />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
                      <div className="border border-gray-200 rounded-xl bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-shadow shadow-sm">
                        <textarea placeholder="e.g. built a dashboard, fixed bugs, helped team..." rows={4} value={exp.description} onChange={(e) => updateWorkExp(exp.id, 'description', e.target.value)} className="w-full p-3 outline-none resize-y text-sm text-gray-800" required />
                        {renderAIToolbar(exp.id, 'work', exp.role, exp.company, exp.description)}
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addWorkExp} className="mt-2 text-sm text-blue-600 font-bold hover:text-blue-800 bg-blue-50/50 hover:bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-100 border-dashed w-full transition-colors">+ Add Experience</button>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">Education</h3>
                {formData.education.map((edu, index) => (
                  <div key={edu.id} className="p-5 mb-5 border border-gray-100 bg-gray-50/50 rounded-2xl relative group hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-blue-950 uppercase tracking-wider text-sm">Education {index + 1}</h4>
                      <button type="button" onClick={() => removeEducation(edu.id)} className="text-gray-400 hover:text-red-500 font-medium text-xs flex items-center gap-1 bg-white px-2 py-1.5 rounded-lg border border-gray-200 shadow-sm transition-colors">✕ Remove</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                        <input type="text" placeholder="e.g. MIT" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} className="border border-gray-200 p-2.5 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                        <input type="text" placeholder="e.g. B.Tech" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="border border-gray-200 p-2.5 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                        <input type="text" placeholder="e.g. 2024" value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} className="border border-gray-200 p-2.5 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm" required />
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addEducation} className="mt-2 text-sm text-blue-600 font-bold hover:text-blue-800 bg-blue-50/50 hover:bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-100 border-dashed w-full transition-colors">+ Add Education</button>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">Projects</h3>
                {formData.projects.map((proj, index) => (
                  <div key={proj.id} className="p-5 mb-5 border border-gray-100 bg-gray-50/50 rounded-2xl relative group hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-blue-950 uppercase tracking-wider text-sm">Project {index + 1}</h4>
                      <button type="button" onClick={() => removeProject(proj.id)} className="text-gray-400 hover:text-red-500 font-medium text-xs flex items-center gap-1 bg-white px-2 py-1.5 rounded-lg border border-gray-200 shadow-sm transition-colors">✕ Remove</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                        <input type="text" placeholder="e.g. E-Commerce App" value={proj.title} onChange={(e) => updateProject(proj.id, 'title', e.target.value)} className="border border-gray-200 p-2.5 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                        <input type="url" placeholder="e.g. https://github.com/..." value={proj.link} onChange={(e) => updateProject(proj.id, 'link', e.target.value)} className="border border-gray-200 p-2.5 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <div className="border border-gray-200 rounded-xl bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-shadow shadow-sm">
                        <textarea placeholder="e.g. made an app using react and node..." rows={3} value={proj.description} onChange={(e) => updateProject(proj.id, 'description', e.target.value)} className="w-full p-3 outline-none resize-y text-sm text-gray-800" required />
                        {renderAIToolbar(proj.id, 'project', proj.title, 'personal project', proj.description)}
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addProject} className="mt-2 text-sm text-blue-600 font-bold hover:text-blue-800 bg-blue-50/50 hover:bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-100 border-dashed w-full transition-colors">+ Add Project</button>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">Certifications</h3>
                {formData.certifications.map((cert, index) => (
                  <div key={cert.id} className="p-5 mb-5 border border-gray-100 bg-gray-50/50 rounded-2xl relative group hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-blue-950 uppercase tracking-wider text-sm">Certification {index + 1}</h4>
                      <button type="button" onClick={() => removeCertification(cert.id)} className="text-gray-400 hover:text-red-500 font-medium text-xs flex items-center gap-1 bg-white px-2 py-1.5 rounded-lg border border-gray-200 shadow-sm transition-colors">✕ Remove</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" placeholder="e.g. AWS Certified" value={cert.name} onChange={(e) => updateCertification(cert.id, 'name', e.target.value)} className="border border-gray-200 p-2.5 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
                        <input type="text" placeholder="e.g. Amazon" value={cert.issuer} onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)} className="border border-gray-200 p-2.5 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm" required />
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addCertification} className="mt-2 text-sm text-blue-600 font-bold hover:text-blue-800 bg-blue-50/50 hover:bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-100 border-dashed w-full transition-colors">+ Add Certification</button>
              </section>

            </div>

            {/* TAB: TEMPLATES */}
            <div className={`space-y-8 bg-white p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100 text-center ${activeTab !== 'templates' && 'hidden'}`}>
              <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4 text-left">Templates</h3>
              <div className="py-20 text-gray-500 flex flex-col items-center">
                <IconTemplate />
                <p className="text-xl font-bold text-gray-800 mt-4">Premium Templates Coming Soon!</p>
                <p className="text-sm mt-2 max-w-sm mx-auto">We are working on bringing you a library of beautiful, ATS-friendly resume templates. Stay tuned!</p>
              </div>
            </div>

            {/* TAB: CUSTOMISATION */}
            <div className={`space-y-8 bg-white p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100 ${activeTab !== 'customisation' && 'hidden'}`}>
              <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">Resume Styling</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Font Family</label>
                  <select value={formData.style.font} onChange={(e) => setFormData(prev => ({ ...prev, style: { ...prev.style, font: e.target.value } }))} className="border border-gray-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm">
                    {FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">Choose an ATS-friendly font for best results.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Base Font Size</label>
                  <select value={formData.style.fontSize} onChange={(e) => setFormData(prev => ({ ...prev, style: { ...prev.style, fontSize: e.target.value } }))} className="border border-gray-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm">
                    {FONT_SIZES.map(s => <option key={s.name} value={s.value}>{s.name}</option>)}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">All headings and text will scale relative to this size.</p>
                </div>
              </div>
            </div>

            {/* --- GLOBAL SUBMIT --- */}
            <div className="pt-6 border-t border-gray-100 sticky bottom-4 bg-white/95 backdrop-blur-sm z-10 p-2 shadow-[0_-10px_40px_rgb(0,0,0,0.05)] rounded-2xl mt-auto">
              <button id="save-btn" type="submit" disabled={isSaving} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2">
                {isSaving ? <><IconSpinner /> Saving to Dashboard...</> : "Save to Dashboard"}
              </button>
            </div>

          </form>
        </div>

        {/* ==================== RIGHT COLUMN: LIVE PREVIEW ==================== */}
        <div className="hidden lg:block lg:w-1/2 xl:w-7/12">
          <div className="sticky top-24 h-[calc(100vh-8rem)]">
            
            <div className="w-full h-full bg-white shadow-2xl overflow-y-auto transform origin-top border border-gray-200 p-10 text-gray-800 rounded-sm transition-all" style={{ fontFamily: formData.style.font, fontSize: formData.style.fontSize }}>
              
              <div className="border-b-2 border-gray-800 pb-[1em] mb-[1.5em] text-center">
                <h1 className="text-[2.25em] leading-tight font-extrabold uppercase tracking-wider text-gray-900">{formData.name || "Your Name"}</h1>
                <div className="text-[0.875em] mt-[0.5em] flex justify-center flex-wrap gap-[1em] text-gray-600">
                  <span>{formData.contactInfo.email || "email@example.com"}</span>
                  {formData.contactInfo.phone && <span>• {formData.contactInfo.phone}</span>}
                  {formData.contactInfo.city && <span>• {formData.contactInfo.city}{formData.contactInfo.country ? `, ${formData.contactInfo.country}` : ''}</span>}
                </div>
                
                {formData.socialLinks.length > 0 && (
                  <div className="flex gap-[1em] justify-center mt-[0.5em] text-[0.875em] text-blue-700">
                    {formData.socialLinks.map(link => (
                      <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">
                        {link.platform === 'Other' ? (link.customPlatform || 'Link') : link.platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {formData.shortIntro && (
                <div className="mb-[1.5em]">
                  <p className="text-[0.875em] leading-relaxed whitespace-pre-wrap">{formData.shortIntro}</p>
                </div>
              )}

              {skillsArray.length > 0 && (
                <div className="mb-[1.5em]">
                  <h2 className="text-[1.125em] font-bold uppercase tracking-widest border-b border-gray-300 mb-[0.5em] text-gray-900">Skills</h2>
                  <p className="text-[0.875em] leading-relaxed">{skillsArray.join(', ')}</p>
                </div>
              )}

              {formData.workExp.length > 0 && (
                <div className="mb-[1.5em]">
                  <h2 className="text-[1.125em] font-bold uppercase tracking-widest border-b border-gray-300 mb-[0.75em] text-gray-900">Experience</h2>
                  {formData.workExp.map(exp => (
                    <div key={exp.id} className="mb-[1em]">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>{exp.role || "Job Title"}</span>
                        <span>{exp.duration || "Dates"}</span>
                      </div>
                      <div className="text-gray-700 italic text-[0.875em] mb-[0.25em]">{exp.company || "Company Name"}</div>
                      <div className="text-[0.875em] whitespace-pre-wrap leading-relaxed text-gray-700">{exp.description || "Description will appear here."}</div>
                    </div>
                  ))}
                </div>
              )}

              {formData.projects.length > 0 && (
                <div className="mb-[1.5em]">
                  <h2 className="text-[1.125em] font-bold uppercase tracking-widest border-b border-gray-300 mb-[0.75em] text-gray-900">Projects</h2>
                  {formData.projects.map(proj => (
                    <div key={proj.id} className="mb-[1em]">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>{proj.title || "Project Title"}</span>
                        {proj.link && <span className="text-[0.875em] font-normal text-blue-600">{proj.link}</span>}
                      </div>
                      <div className="text-[0.875em] whitespace-pre-wrap leading-relaxed text-gray-700 mt-[0.25em]">{proj.description || "Description will appear here."}</div>
                    </div>
                  ))}
                </div>
              )}

              {formData.education.length > 0 && (
                <div className="mb-[1.5em]">
                  <h2 className="text-[1.125em] font-bold uppercase tracking-widest border-b border-gray-300 mb-[0.75em] text-gray-900">Education</h2>
                  {formData.education.map(edu => (
                    <div key={edu.id} className="mb-[0.75em] flex justify-between">
                      <div>
                        <div className="font-bold text-gray-900">{edu.institution || "Institution"}</div>
                        <div className="text-[0.875em] text-gray-700">{edu.degree || "Degree"}</div>
                      </div>
                      <div className="font-bold text-gray-900 text-[0.875em]">{edu.year || "Year"}</div>
                    </div>
                  ))}
                </div>
              )}

              {formData.languages.length > 0 && (
                <div className="mb-[1.5em]">
                  <h2 className="text-[1.125em] font-bold uppercase tracking-widest border-b border-gray-300 mb-[0.75em] text-gray-900">Languages</h2>
                  <div className="grid grid-cols-2 gap-y-[0.5em] gap-x-[1em]">
                    {formData.languages.map(lang => (
                      <div key={lang.id} className="text-[0.875em]">
                        <span className="font-bold text-gray-900">{lang.name || "Language"}</span>
                        {lang.proficiency && <span className="text-gray-600"> - {lang.proficiency}</span>}
                      </div>
                    ))}
                  </div>
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