import React, { useState, useEffect, useMemo, useRef, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import skillsData from './skills.json';
import Footer from "../Footer/footer";


// --- TEMPLATE ENGINE ---
import TemplateRenderer from "./resume/components/TemplateRenderer";

// --- TEMPLATE PREVIEW IMAGES ---
import t1 from "../../assets/media/resumeTemplates/template1.png";
import t2 from "../../assets/media/resumeTemplates/template2.png";
import t3 from "../../assets/media/resumeTemplates/template3.png";
import t4 from "../../assets/media/resumeTemplates/template4.png";
import t5 from "../../assets/media/resumeTemplates/template5.png";
import t6 from "../../assets/media/resumeTemplates/template6.png";
import t7 from "../../assets/media/resumeTemplates/template7.png";
import t8 from "../../assets/media/resumeTemplates/template8.png";

// --- TYPESCRIPT INTERFACES ---
export interface Education { id: string; institution: string; degree: string; year: string; description?: string; gpa?: string; }
export interface WorkExp { id: string; company: string; role: string; startMonth: string; startYear: string; endMonth: string; endYear: string; isCurrent: boolean; duration: string; description: string; achievements?: string[]; }
export interface Project { id: string; title: string; link: string; description: string; }
export interface Certification { id: string; name: string; issuer: string; date?: string; }
export interface SocialLink { id: string; platform: string; customPlatform?: string; url: string; }
export interface Language { id: string; name: string; proficiency: string; }

// ✅ UPGRADED STYLE INTERFACE FOR CANVA DRAG
export interface ResumeStyle { 
  font: string; 
  fontSize: string; 
  photoPosition: { x: number; y: number }; 
  photoZoom: number; 
}

export interface ResumeData {
  id: string;               
  resumeTitle: string;      
  templateId: number;       
  name: string;
  contactInfo: { email: string; phone: string; city: string; country: string; };
  experienceLevel: string;
  shortIntro: string;
  photo: File | string | null;
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
  id: '', resumeTitle: 'Untitled Resume', templateId: 1, name: '', contactInfo: { email: '', phone: '', city: '', country: '' },
  experienceLevel: 'Entry Level', shortIntro: '', photo: null, socialLinks: [], languages: [], education: [], 
  workExp: [], projects: [], certifications: [], skills: '', 
  // ✅ INITIALIZE CANVAS STATE
  style: { font: 'Arial, sans-serif', fontSize: '14.5px', photoPosition: { x: 0, y: 0 }, photoZoom: 1 }
};

const TEMPLATE_PREVIEWS = [
  { id: 1, name: "Classic", img: t1 },
  { id: 2, name: "Modern", img: t2 },
  { id: 3, name: "Executive", img: t3 },
  { id: 4, name: "Minimal", img: t4 },
  { id: 5, name: "Sidebar", img: t5 },
  { id: 6, name: "Corporate", img: t6 },
  { id: 7, name: "Creative", img: t7 },
  { id: 8, name: "Elegant", img: t8 },
];

// --- MAIN COMPONENT ---
const ResumeMakerForm: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'editor'>('dashboard');
  const [savedResumes, setSavedResumes] = useState<ResumeData[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const fetchMyResumes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; 

        const API_URL = import.meta.env.VITE_API_URL || "https://jobiffi.com";
        const response = await fetch(`${API_URL}/api/resumeMaker/my-resumes`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        const data = await response.json();
        if (data.success) {
          setSavedResumes(data.resumes); 
        }
      } catch (error) {
        console.error("Failed to load resumes:", error);
      }
    };
    

    if (currentView === 'dashboard') {
      fetchMyResumes();
    }
  }, [currentView]);

  const [formData, setFormData] = useState<ResumeData>(INITIAL_RESUME_STATE);
  const [activeTab, setActiveTab] = useState<'builder' | 'templates' | 'customisation'>('builder');
  const [generatingAI, setGeneratingAI] = useState<string | null>(null);
  const [aiCredits, setAiCredits] = useState<number>(12);
  const [textHistory, setTextHistory] = useState<Record<string, string[]>>({});
  const [historyIndex, setHistoryIndex] = useState<Record<string, number>>({});
  const [originalPrompts, setOriginalPrompts] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

  // ✅ CANVA DRAG STATE
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const skillsArray = (formData.skills || '').split(',').map(s => s.trim()).filter(Boolean);  
  const [skillInput, setSkillInput] = useState("");
  const [visibleSuggestions, setVisibleSuggestions] = useState<string[]>([]);
  const [showBrowse, setShowBrowse] = useState(false);
  const [browseTab, setBrowseTab] = useState<'hard' | 'soft'>('hard');

  const flatSkillsDB = useMemo(() => [ ...(skillsData?.soft || []), ...Object.values(skillsData?.hard || {}).flat() ], []);

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

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ NEW: Listen for instructions from the Landing Page!
  useEffect(() => {
    if (location.state?.autoSelectTemplate) {
      // User clicked a specific template on the landing page
      setFormData({ ...INITIAL_RESUME_STATE, id: generateId(), templateId: location.state.autoSelectTemplate });
      setCurrentView('editor');
      // Clear the routing state so refreshing the page doesn't reset their work
      navigate(location.pathname, { replace: true, state: {} });
      
    } else if (location.state?.createNew) {
      // User clicked "Try for Free" on the landing page
      setFormData({ ...INITIAL_RESUME_STATE, id: generateId() });
      setCurrentView('editor');
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const hiddenPreviewRef = useRef<HTMLDivElement>(null);
  const [backgroundDownloadResume, setBackgroundDownloadResume] = useState<ResumeData | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // ============================================================================
  // 💾 SILENT AUTO-SAVE (Debounced for Resume Title)
  // ============================================================================
  const isInitialMount = useRef(true);

  useEffect(() => {
    // 1. Don't auto-save the second the user opens the editor
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // 2. Wait 1000ms (1 second) after the user stops typing
    const autoSaveTimer = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        // Ensure we have a token and the resume actually exists before saving
        if (!token || !formData.id || formData.id === 'temp-draft') return; 

        const API_URL = import.meta.env.VITE_API_URL || "https://jobiffi.com";
        const response = await fetch(`${API_URL}/api/resumeMaker/save`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
          // Note: Wrapped in { resumeData: formData } to match your backend expectation!
          body: JSON.stringify({ resumeData: formData })
        });

        const data = await response.json();
        
        if (data.success) {
          // 3. Silently update the Dashboard array so the new title is there when they click "Back"
          setSavedResumes(prevResumes => {
            const existingIndex = prevResumes.findIndex(r => r.id === formData.id);
            if (existingIndex >= 0) {
              const updatedList = [...prevResumes];
              updatedList[existingIndex] = formData;
              return updatedList;
            }
            return [formData, ...prevResumes];
          });
          console.log("Title auto-saved successfully!");
        }
      } catch (error) {
        console.error("Auto-save error:", error);
      }
    }, 1000);

    // 4. CLEANUP: If the user types another letter before 1 second is up, cancel the timer
    return () => clearTimeout(autoSaveTimer);
  }, [formData.resumeTitle]); // Only watch the resumeTitle for changes

  // ============================================================================
  // 📥 PDF DOWNLOAD LOGIC
  // ============================================================================
  
  // 1. The core PDF generator (your exact code, just moved into a helper function)
  const executePDFGeneration = async (titleToSave: string) => {
    if (!previewRef.current) {
      alert("Preview not available");
      return;
    }

    try {
      const element = previewRef.current;

      // ✅ wait for images to load
      const images = element.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) return resolve(true);
              img.onload = () => resolve(true);
              img.onerror = () => resolve(true);
            })
        )
      );

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${titleToSave || "Resume"}.pdf`);
    } catch (error) {
      console.error("DOWNLOAD ERROR:", error);
      alert("Download failed — check console");
    }
  };

  // ============================================================================
  // 🔔 TOAST NOTIFICATION SYSTEM
  // ============================================================================
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Helper function to trigger the beautiful pop-up instead of a native alert
  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMsg({ text, type });
    // Auto-hide the toast after 3.5 seconds
    setTimeout(() => setToastMsg(null), 3500);
  };

// ============================================================================
  // 📥 1. STANDARD DOWNLOAD (Used inside the Editor View)
  // ============================================================================
  const handleDownload = async () => {
    if (!previewRef.current) {
      alert("Preview not available");
      return;
    }

    try {
      const element = previewRef.current;

      // Wait for images to load before taking the picture
      const images = element.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(img => new Promise(resolve => {
            if (img.complete) return resolve(true);
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true);
          })
        )
      );

      const canvas = await html2canvas(element, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${formData.resumeTitle || "Untitled_Resume"}.pdf`);
    } catch (error) {
      console.error("DOWNLOAD ERROR:", error);
      alert("Download failed — check console");
    }
  };

  // ============================================================================
  // 📥 2. DASHBOARD BACKGROUND DOWNLOAD LOGIC (Off-screen)
  // ============================================================================
  const handleDashboardDownload = (resume: ResumeData, e: React.MouseEvent) => {
    e.stopPropagation();
    setBackgroundDownloadResume(resume);
    setIsGeneratingPDF(true);
  };

  useEffect(() => {
    if (!backgroundDownloadResume) return;

    const generateBackgroundPDF = async () => {
      try {
        await new Promise(res => setTimeout(res, 800)); 
        if (!hiddenPreviewRef.current) throw new Error("Hidden container not ready");
        
        const element = hiddenPreviewRef.current;
        const images = element.querySelectorAll("img");
        await Promise.all(Array.from(images).map(img => new Promise(resolve => {
          if (img.complete) return resolve(true);
          img.onload = () => resolve(true);
          img.onerror = () => resolve(true);
        })));

        const canvas = await html2canvas(element, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: "#ffffff" });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`${backgroundDownloadResume.resumeTitle || "Resume"}.pdf`);
      } catch (error) {
        console.error("BACKGROUND DOWNLOAD ERROR:", error);
        alert("Failed to generate PDF in background. Please open the editor to download.");
      } finally {
        setBackgroundDownloadResume(null); 
        setIsGeneratingPDF(false);         
      }
    };

    generateBackgroundPDF();
  }, [backgroundDownloadResume]);

  const createHiddenAdapterData = (data: ResumeData) => {
    const skillsList = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
    const getSocialLink = (platform: string) => (data.socialLinks || []).find(s => (s.platform||'').toLowerCase() === platform.toLowerCase())?.url;
    const photoUrl = data.photo instanceof File ? URL.createObjectURL(data.photo) : (typeof data.photo === 'string' ? data.photo : undefined);

    return {
      personal: {
        fullName: data.name || 'Your Name', title: data.experienceLevel || 'Professional Title', email: data.contactInfo?.email || 'email@example.com',
        phone: data.contactInfo?.phone || '123-456-7890', location: [data.contactInfo?.city, data.contactInfo?.country].filter(Boolean).join(', ') || 'City, Country',
        summary: data.shortIntro || 'Your professional summary will appear here.', photo: photoUrl, photoPosition: data.style?.photoPosition || {x:0, y:0}, photoZoom: data.style?.photoZoom || 1,
        website: getSocialLink('website') || getSocialLink('portfolio'), linkedin: getSocialLink('linkedin'), github: getSocialLink('github'), portfolio: getSocialLink('portfolio') || getSocialLink('other')
      },
      education: (data.education || []).map(edu => ({ degree: edu.degree || 'Degree Name', institution: edu.institution || 'University Name', year: edu.year || 'Graduation Year', gpa: edu.gpa, description: edu.description })),
      experience: (data.workExp || []).map(exp => ({ role: exp.role || 'Job Title', company: exp.company || 'Company Name', startDate: exp.startMonth && exp.startYear ? `${exp.startMonth} ${exp.startYear}` : undefined, endDate: exp.isCurrent ? 'Present' : (exp.endMonth && exp.endYear ? `${exp.endMonth} ${exp.endYear}` : undefined), duration: exp.duration, description: exp.description || 'Describe your responsibilities and achievements here.', achievements: exp.achievements })),
      projects: (data.projects || []).map(proj => ({ name: proj.title || 'Project Name', link: proj.link, description: proj.description || 'Describe your project here.' })),
      skills: skillsList.map(skill => ({ name: skill })),
      certifications: (data.certifications || []).map(cert => ({ title: cert.name || 'Certification Name', issuer: cert.issuer || 'Issuing Organization', date: cert.date })),
      languages: (data.languages || []).map(lang => ({ name: lang.name || 'Language', proficiency: lang.proficiency || 'Native' })),
      publications: [], interests: []
    };
  };

// ============================================================================
  // ✅ THE ADAPTER: Bulletproofed for missing database fields
  // ============================================================================
  const adapterData = useMemo(() => {
    const getSocialLink = (platform: string) => {
      const link = (formData.socialLinks || []).find(s => (s.platform || '').toLowerCase() === platform.toLowerCase());
      return link ? link.url : undefined;
    };

    const photoUrl = formData.photo instanceof File 
      ? URL.createObjectURL(formData.photo) 
      : (typeof formData.photo === 'string' ? formData.photo : undefined);

    // 🛡️ SAFE FALLBACKS: Prevents "Cannot read properties of undefined" crashes
    const safeContact = formData.contactInfo || {};
    const safeStyle = formData.style || { photoPosition: { x: 0, y: 0 }, photoZoom: 1, font: 'Arial, sans-serif', fontSize: '14.5px' };

    return {
      personal: {
        fullName: formData.name || 'Your Name',
        title: formData.experienceLevel || 'Professional Title',
        email: safeContact.email || 'email@example.com',
        phone: safeContact.phone || '123-456-7890',
        location: [safeContact.city, safeContact.country].filter(Boolean).join(', ') || 'City, Country',
        summary: formData.shortIntro || 'Your professional summary will appear here.',
        
        photo: photoUrl,
        photoPosition: safeStyle.photoPosition || { x: 0, y: 0 },
        photoZoom: safeStyle.photoZoom || 1,
        
        website: getSocialLink('website') || getSocialLink('portfolio'),
        linkedin: getSocialLink('linkedin'),
        github: getSocialLink('github'),
        portfolio: getSocialLink('portfolio') || getSocialLink('other')
      },
      education: (formData.education || []).map(edu => ({
        degree: edu.degree || 'Degree Name',
        institution: edu.institution || 'University Name',
        year: edu.year || 'Graduation Year',
        gpa: edu.gpa,
        description: edu.description
      })),
      experience: (formData.workExp || []).map(exp => ({
        role: exp.role || 'Job Title',
        company: exp.company || 'Company Name',
        startDate: exp.startMonth && exp.startYear ? `${exp.startMonth} ${exp.startYear}` : undefined,
        endDate: exp.isCurrent ? 'Present' : (exp.endMonth && exp.endYear ? `${exp.endMonth} ${exp.endYear}` : undefined),
        duration: exp.duration, 
        description: exp.description || 'Describe your responsibilities and achievements here.',
        achievements: exp.achievements
      })),
      projects: (formData.projects || []).map(proj => ({
        name: proj.title || 'Project Name',
        link: proj.link,
        description: proj.description || 'Describe your project here.'
      })),
      skills: skillsArray.map(skill => ({
        name: skill
      })),
      certifications: (formData.certifications || []).map(cert => ({
        title: cert.name || 'Certification Name',
        issuer: cert.issuer || 'Issuing Organization',
        date: cert.date
      })),
      languages: (formData.languages || []).map(lang => ({
        name: lang.name || 'Language',
        proficiency: lang.proficiency || 'Native'
      })),
      publications: [], 
      interests: []
    };
  }, [formData, skillsArray]);

  const handleCheckATS = () => navigate('/smart-score', { state: { importedResume: formData } });

  const handleCreateNew = () => {
    setFormData({ ...INITIAL_RESUME_STATE, id: generateId() });
    setCurrentView('editor');
  };

  const handleEditResume = (resume: ResumeData) => {
    // ✅ FIXED: Bulletproof merge ensuring no array or object is ever left undefined
    setFormData({
      ...INITIAL_RESUME_STATE,
      ...resume,
      skills: resume.skills || '',
      socialLinks: resume.socialLinks || [],
      languages: resume.languages || [],
      education: resume.education || [],
      workExp: resume.workExp || [],
      projects: resume.projects || [],
      certifications: resume.certifications || [],
      style: {
        ...INITIAL_RESUME_STATE.style,
        ...(resume.style || {})
      },
      contactInfo: {
        ...INITIAL_RESUME_STATE.contactInfo,
        ...(resume.contactInfo || {})
      }
    });
    
    setCurrentView('editor');
  };

  // 1. Opens the custom modal
  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setResumeToDelete(id); 
  };

  // 2. Executes the delete when "Delete" is clicked inside the modal
  const executeDelete = async () => {
    if (!resumeToDelete) return;
    const id = resumeToDelete;

    if (id === 'temp-draft') {
      setSavedResumes(prev => prev.filter(r => r.id !== id));
      setResumeToDelete(null);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const API_URL = import.meta.env.VITE_API_URL || "https://jobiffi.com";
      const response = await fetch(`${API_URL}/api/resumeMaker/delete/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      const data = await response.json();
      
      if (data.success || response.status === 404) {
        setSavedResumes(prev => prev.filter(r => r.id !== id));
      } else {
        alert(`Failed to delete: ${data.message}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Server error while deleting. Please try again.");
    } finally {
      setResumeToDelete(null); // Close the modal
    }
  };

  const handleBackToDashboard = () => setCurrentView('dashboard');

  const handleBasicChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, contactInfo: { ...prev.contactInfo, [name]: value } }));
  };
  
  // ✅ Handles File Upload, Compresses to Base64, and Resets Canvas
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Compress the image to a max width of 250px to save database space
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 250;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Convert to tiny base64 string so it perfectly JSON.stringifies!
          const base64String = canvas.toDataURL("image/jpeg", 0.8);
          
          setFormData((prev) => ({ 
            ...prev, 
            photo: base64String,
            style: { ...prev.style, photoPosition: { x: 0, y: 0 }, photoZoom: 1 } 
          }));
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
      
      // Reset the file input
      e.target.value = '';
    }
  };;

  // ✅ NEW: Removes the photo entirely and resets canvas
  const handleRemovePhoto = () => {
    setFormData((prev) => ({ 
      ...prev, 
      photo: null,
      style: { ...prev.style, photoPosition: { x: 0, y: 0 }, photoZoom: 1 } 
    }));
  };

  // ✅ CANVA DRAGGING HANDLERS
  const startDrag = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
  };

  const onDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const dx = clientX - dragStart.x;
    const dy = clientY - dragStart.y;
    
    // 👇 Converts pixel movement directly to percentage movement for true 1:1 dragging
    const dxPercent = (dx / 160) * 100;
    const dyPercent = (dy / 160) * 100;
    
    setFormData(prev => ({
      ...prev,
      style: {
        ...prev.style,
        photoPosition: {
          // Clamps the movement so the user can't accidentally throw the photo off-screen
          x: Math.min(Math.max(prev.style.photoPosition.x + dxPercent, -100), 100),
          y: Math.min(Math.max(prev.style.photoPosition.y + dyPercent, -100), 100)
        }
      }
    }));
    setDragStart({ x: clientX, y: clientY });
  };

  const stopDrag = () => setIsDragging(false);

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
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null') {
      setShowAuthModal(true);
      return; 
    }

    if (aiCredits <= 0) return alert("You have used all 12 AI credits for this resume.");
    if (!title && type !== 'summary') return alert(`Please enter a Title first!`);

    const promptToUse = isRegenerate ? originalPrompts[id] : currentText;
    if (!promptToUse || promptToUse.trim().length < 10) return alert("Please write a rough explanation (at least 10 characters) first.");

    setGeneratingAI(id);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://jobiffi.com";
      const response = await fetch(`${API_URL}/api/resumeMaker/generate-description`, {
        method: "POST", 
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ resumeId: formData.id, role: title || 'Professional', company: context, rawText: promptToUse })
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Backend did not return valid JSON. It might have crashed.");
      }

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
      } else {
        if (response.status === 401 || response.status === 403) {
           alert("Your session has expired. Please log in again.");
           localStorage.removeItem('token');
           navigate('/?login=true');
        } else {
           alert(`Error: Failed to generate: ${data.message}`);
        }
      }
    } catch (error) { 
      console.error("AI Generation Network Error:", error);
      alert("Server error. Check the console for more details."); 
    } finally { 
      setGeneratingAI(null); 
    }
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
    
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null') {
      setShowAuthModal(true);
      setIsSaving(false);
      return;
    }

    try {
      setSavedResumes(prev => {
        const exists = prev.find(r => r.id === formData.id);
        if (exists) return prev.map(r => r.id === formData.id ? formData : r);
        return [...prev, formData];
      });

      const API_URL = import.meta.env.VITE_API_URL || "https://jobiffi.com";
      const response = await fetch(`${API_URL}/api/resumeMaker/save`, {
        method: "POST", 
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ resumeData: formData })
      });
      const data = await response.json();
      
      if (data.success) {
        // ✅ UPGRADED: Sleek success toast instead of native alert
        showToast("Success! Your resume is securely saved!", "success");
        setCurrentView('dashboard'); 
      } else {
        // ✅ UPGRADED: Sleek error toast
        showToast(`Could not save to backend: ${data.message} (But saved locally!)`, "error");
        setCurrentView('dashboard');
      }
    } catch (error) { 
      console.error("Save error:", error);
      // ✅ UPGRADED: Sleek error toast
      showToast("Could not reach the server. Resume saved locally in this session!", "error"); 
      setCurrentView('dashboard'); 
    } finally { setIsSaving(false); }
  };

  // --- REUSABLE ICONS ---
  const IconWand = () => ( <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg> );
  const IconRefresh = () => ( <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> );
  const IconSpinner = () => ( <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> );
  const IconChevronLeft = () => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg> );
  const IconChevronRight = () => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg> );
  const IconSettings = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg> );
  const IconTemplate = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg> );
  const IconList = () => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> );
  const IconPlus = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> );
  const IconDocument = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> );
  const IconTrash = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> );
  const IconArrowLeft = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> );
  const IconCheck = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> );
  const IconWarning = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> );


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
      <>
      <div className="max-w-[1200px] mx-auto p-4 lg:p-8 mt-4 mb-10 text-gray-800">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-blue-950 tracking-tight">My Resumes</h2>
          <p className="text-gray-500 mt-2 font-medium">Manage and tailor your resumes for different job applications.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          <button 
            onClick={handleCreateNew} 
            className="h-[280px] border-2 border-dashed border-blue-300 rounded-2xl bg-blue-50/50 hover:bg-blue-50 hover:border-blue-400 flex flex-col items-center justify-center text-blue-600 transition-all hover:shadow-md"
          >
            <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-blue-600">
              <IconPlus />
            </div>
            <span className="font-bold text-lg">Create New Resume</span>
          </button>

          {savedResumes.map((resume) => (
            <div key={resume.id} className="h-[280px] border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all flex flex-col overflow-hidden group">
              
              {/* ✅ UPGRADE: The entire image area is now clickable on mobile to trigger an edit */}
              <div 
                onClick={() => handleEditResume(resume)}
                className="flex-1 bg-gray-100 flex items-center justify-center border-b border-gray-200 relative overflow-hidden cursor-pointer"
              >
                <img 
                  src={TEMPLATE_PREVIEWS.find(t => t.id === (resume.templateId || 1))?.img} 
                  alt="Template Preview" 
                  className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                
                {/* ✅ UPGRADE: Overlay only appears on large screens (lg:flex) and has stopPropagation so it doesn't double-click */}
                <div className="hidden lg:flex absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 items-center justify-center gap-2 transition-all duration-300 z-10">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleEditResume(resume); }} 
                    className="bg-white text-blue-700 font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-blue-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDashboardDownload(resume, e); }}
                    className="bg-gray-900 text-white p-2 rounded-lg shadow-lg hover:bg-black transition-colors"
                    title="Download PDF"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </button>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-4 bg-white flex flex-col flex-1 shrink-0 h-[100px]">
                <div>
                  <h3 className="font-bold text-gray-900 truncate">{resume.resumeTitle || "Untitled Resume"}</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5 truncate">{resume.name || "No name provided"}</p>
                </div>
                
                <div className="flex justify-between items-center mt-auto">
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{resume.experienceLevel}</p>
                  
                  <div className="flex items-center gap-1">
                    {/* ✅ UPGRADE: Mobile-only download button that disappears on desktop! */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDashboardDownload(resume, e); }}
                      className="lg:hidden text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-all"
                      title="Download PDF"
                    >
                      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>

                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(resume.id, e); }}
                      className="text-black hover:text-red-600 hover:bg-red-50 p-1.5 -mr-1.5 rounded-lg transition-all"
                      title="Delete Resume"
                    >
                      <IconTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ==================== CUSTOM DELETE MODAL ==================== */}
        {resumeToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 relative transform transition-all scale-100">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                <IconTrash />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Delete Resume?</h3>
              <p className="text-gray-600 text-sm mb-6">Are you sure you want to delete this resume? This action cannot be undone.</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setResumeToDelete(null)} 
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={executeDelete} 
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors shadow-[0_4px_14px_0_rgb(220,38,38,0.39)]"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== BACKGROUND DOWNLOAD UI ==================== */}
        {isGeneratingPDF && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white px-8 py-6 rounded-2xl shadow-2xl flex items-center gap-4">
              <IconSpinner />
              <span className="font-bold text-gray-800 text-lg tracking-tight">Generating high-quality PDF...</span>
            </div>
          </div>
        )}

        {/* Hidden Container for off-screen rendering */}
        {backgroundDownloadResume && (
          <div style={{ position: 'absolute', top: '-10000px', left: '-10000px', opacity: 0, pointerEvents: 'none' }}>
            <div 
              className="bg-white p-4 transform origin-top" 
              style={{ fontFamily: backgroundDownloadResume.style?.font || 'Arial', fontSize: backgroundDownloadResume.style?.fontSize || '14.5px' }}
            >
              <div ref={hiddenPreviewRef} className="bg-white shadow-xl min-h-[1056px] w-[816px] mx-auto">
                <TemplateRenderer 
                  templateId={backgroundDownloadResume.templateId || 1} 
                  data={createHiddenAdapterData(backgroundDownloadResume) as any} 
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================== AUTHENTICATION MODAL ==================== */}
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative transform transition-all scale-100">
              <button onClick={() => setShowAuthModal(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <div className="text-center mb-8 mt-2">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5 border-[6px] border-blue-50/50 shadow-sm"><IconWand /></div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Unlock Premium Features</h3>
                <p className="text-gray-600 text-sm leading-relaxed px-2">Please log in or register a free account to unlock premium AI writing tools and securely save your resumes to the cloud.</p>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={() => navigate('/register')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base py-3.5 rounded-xl transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)]">Register for Free</button>
                <button onClick={() => navigate('/?login=true')} className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 font-bold text-base py-3.5 rounded-xl transition-all">Log In to Account</button>
                <button onClick={() => setShowAuthModal(false)} className="w-full text-gray-500 hover:text-gray-800 font-bold text-sm py-2 mt-1 transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        )}
        {toastMsg && (
          <div className={`fixed bottom-6 right-6 z-[999] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold animate-in slide-in-from-bottom-5 fade-in duration-300 ${toastMsg.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
            {toastMsg.type === 'success' ? <IconCheck /> : <IconWarning />}
            {toastMsg.text}
          </div>
        )}
        
      </div>
      <div className="w-[100vw] ml-[calc(50%-50vw)] bg-white border-t border-gray-200 mt-16">
          <Footer />
        </div>
    </>  
    );
  }

  // ============================================================================
  // ✅ EDITOR VIEW
  // ============================================================================
  return (
    <>    <div className="max-w-[1600px] mx-auto p-4 lg:p-8 mt-4 mb-10 text-gray-800">
      
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={handleBackToDashboard} className="text-sm font-bold text-gray-500 hover:text-blue-600 flex items-center gap-1.5 mb-2 transition-colors">
            <IconArrowLeft /> Back to Dashboard
          </button>
          <div className="flex items-center gap-3 group">
            <input 
              type="text" 
              name="resumeTitle"
              value={formData.resumeTitle}
              onChange={handleBasicChange}
              ref={titleInputRef}
              placeholder="Untitled Resume"
              className="text-3xl font-extrabold text-blue-950 tracking-tight bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-600 outline-none transition-colors w-full pb-1 max-w-sm"
            />
            <button type="button" onClick={() => titleInputRef.current?.focus()} className="w-5 h-5 text-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">

          {/* Top Row */}
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              onClick={handleCheckATS} 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              Check ATS Score
            </button>

            <div className="bg-white border border-gray-200 px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2">
              <IconWand />
              <span className="text-sm font-bold text-gray-600">Credits:</span>
              <span className="text-lg font-black text-blue-600">{aiCredits}</span>
            </div>
          </div>

          {/* Download Button BELOW */}
          <button 
            type="button" 
            onClick={handleDownload} 
            className="bg-gray-900 hover:bg-black text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            Download
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>

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
                  
                  {/* 👇 UPDATED PHOTO UPLOAD BLOCK 👇 */}
                  <div className="border-2 border-dashed border-gray-200 p-3 sm:p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50/50 gap-3 overflow-hidden">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest shrink-0">Photo:</span>
                    
                    <div className="flex items-center gap-3 w-full min-w-0 overflow-hidden">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoChange} 
                        onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                        className="w-full min-w-0 text-xs text-gray-500 font-medium cursor-pointer file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-all" 
                      />
                      
                      {formData.photo && (
                        <button type="button" onClick={handleRemovePhoto} className="text-[10px] text-red-500 hover:text-red-700 font-black uppercase tracking-widest bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl transition-colors shrink-0">
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  {/* 👆 ========================== 👆 */}

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
                                {(skillsList as string[]).map((skill, idx) => (
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
            <div className={`space-y-6 bg-white p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100 ${activeTab !== 'templates' && 'hidden'}`}>
              <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2">Choose a Template</h3>
              <p className="text-sm text-gray-500">Select a design. Your data will instantly update on the right.</p>
              
              {/* ✅ UPDATED: Changed to a 3-column grid (md:grid-cols-3) and increased gap */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {TEMPLATE_PREVIEWS.map(template => {
                  // ✅ ADDED: Logic to determine if the template is PRO or FREE
                  const isPro = [2, 4, 7, 8].includes(template.id);

                  return (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, templateId: template.id }))}
                      // ✅ UPDATED: Height increased significantly (h-72 to h-80) for larger previews
                      className={`group relative w-full aspect-[210/297] border-2 rounded-xl overflow-hidden flex flex-col items-center justify-center font-bold transition-all ${
                        formData.templateId === template.id 
                          ? 'border-blue-600 ring-2 ring-blue-600 ring-offset-2 shadow-lg' 
                          : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
                      }`}
                    >
                      <img src={template.img} alt={`${template.name} Template`} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent transition-opacity duration-300 ${formData.templateId === template.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                      
                      {/* ✅ ADDED: PRO / FREE Tags */}
                      <div className="absolute top-3 right-3 z-20">
                        {isPro ? (
                          <span 
                            className="flex items-center gap-1 bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest border border-amber-300 relative"
                            style={{ boxShadow: '0 0 15px 2px rgba(251, 191, 36, 0.6)' }} // Custom inline style for consistent all-around glow
                          >
                            <svg 
                              width="10" 
                              height="10" 
                              viewBox="0 0 24 24" 
                              fill="currentColor" 
                              className="shrink-0"
                            >
                              <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V18H19V19Z" />
                            </svg>
                              PRO
                          </span>
                        ) : (
                          <span className="bg-teal-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-sm border border-teal-400">
                            FREE
                          </span>
                        )}
                      </div>

                      <span className={`absolute bottom-4 text-base tracking-wide z-10 transition-colors duration-300 ${formData.templateId === template.id ? 'text-white' : 'text-transparent group-hover:text-white'}`}>{template.name}</span>
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 bg-gray-50 text-gray-400">
                        <IconTemplate />
                        <span className="mt-2 text-xs font-medium">Template {template.id}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>


            {/* TAB: CUSTOMISATION */}
            <div className={`space-y-8 bg-white p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100 ${activeTab !== 'customisation' && 'hidden'}`}>
              <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">Design & Styling</h3>
              
              <div className="space-y-10">
                {/* Font Selector */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Font Family</label>
                  <select value={formData.style.font} onChange={(e) => setFormData(prev => ({ ...prev, style: { ...prev.style, font: e.target.value } }))} className="border border-gray-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm font-bold">
                    {FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
                  </select>
                </div>
                
                {/* RESTORED: Font Size Selector */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Base Font Size</label>
                  <select value={formData.style.fontSize} onChange={(e) => setFormData(prev => ({ ...prev, style: { ...prev.style, fontSize: e.target.value } }))} className="w-full border border-gray-200 p-4 rounded-2xl font-bold bg-white outline-none focus:ring-4 focus:ring-blue-50 transition-all shadow-sm">
                    {FONT_SIZES.map(s => <option key={s.name} value={s.value}>{s.name}</option>)}
                  </select>
                </div>

                {/* ✅ CANVA-STYLE PHOTO CROPPER */}
                {adapterData.personal.photo && (
                  <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 shadow-inner">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 text-center">Interactive Photo Positioning</label>
                    
                    <div className="flex flex-col items-center gap-6">
                      
                      {/* The Draggable Canvas Viewport */}
                      <div 
                        className={`relative w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200 transition-colors ${isDragging ? 'cursor-grabbing ring-4 ring-blue-100' : 'cursor-grab hover:ring-4 hover:ring-blue-50'}`}
                        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
                        onMouseMove={(e) => onDragMove(e.clientX, e.clientY)}
                        onMouseUp={stopDrag}
                        onMouseLeave={stopDrag}
                        onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
                        onTouchMove={(e) => onDragMove(e.touches[0].clientX, e.touches[0].clientY)}
                        onTouchEnd={stopDrag}
                      >
                        <img 
                          src={adapterData.personal.photo} 
                          alt="Crop Preview" 
                          draggable={false}
                          className="w-full h-full pointer-events-none select-none"
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            // 👇 Replaced objectPosition with translate!
                            transform: `translate(${formData.style.photoPosition.x}%, ${formData.style.photoPosition.y}%) scale(${formData.style.photoZoom})`
                          }}
                        />
                        {/* Overlay Hint */}
                        <div className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-xs font-bold pointer-events-none transition-opacity ${isDragging ? 'opacity-0' : 'opacity-100 hover:opacity-0'}`}>
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><polyline points="5 9 2 12 5 15"></polyline><polyline points="9 5 12 2 15 5"></polyline><polyline points="19 9 22 12 19 15"></polyline><polyline points="9 19 12 22 15 19"></polyline><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line></svg>
                           Drag to Move
                        </div>
                      </div>
                      {/* Zoom Slider */}
                      <div className="w-full px-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Zoom</span>
                          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{Math.round(formData.style.photoZoom * 100)}%</span>
                        </div>
                        <input 
                          type="range" min="1" max="3" step="0.1" 
                          value={formData.style.photoZoom} 
                          onChange={(e) => setFormData(prev => ({ ...prev, style: { ...prev.style, photoZoom: parseFloat(e.target.value) } }))}
                          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                        />
                      </div>
                      
                      {/* 👇 REMOVE PHOTO BUTTON 👇 */}
                      <button 
                        type="button" 
                        onClick={handleRemovePhoto}
                        className="mt-2 w-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 font-black text-[10px] uppercase tracking-widest py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        Remove Photo
                      </button>

                    </div>
                  </div>
                )}
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

        {/* ==================== RIGHT COLUMN: LIVE TEMPLATE PREVIEW ==================== */}
        <div className="hidden lg:block lg:w-1/2 xl:w-7/12">
          <div className="sticky top-24">
            {/* Added overflow-y-auto to allow scrolling on smaller screens */}
            <div className="h-[calc(100vh-8rem)] bg-gray-100 rounded-xl overflow-y-auto shadow-inner border border-gray-200">
              
              {/* Removed the ref from the wrapper div */}
              <div className="p-4 transform origin-top" style={{ fontFamily: formData.style.font, fontSize: formData.style.fontSize }}>
                
                
                <div 
                  ref={previewRef} 
                  className="bg-white p-4 transform origin-top" 
                  style={{ 
                    fontFamily: formData.style?.font || 'Arial, sans-serif', 
                    fontSize: formData.style?.fontSize || '14.5px' 
                  }}
                >
                  <TemplateRenderer templateId={formData.templateId} data={adapterData as any} />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ==================== AUTHENTICATION MODAL (Editor Layer) ==================== */}
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative transform transition-all scale-100">
              <button onClick={() => setShowAuthModal(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <div className="text-center mb-8 mt-2">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5 border-[6px] border-blue-50/50 shadow-sm"><IconWand /></div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Unlock Premium Features</h3>
                <p className="text-gray-600 text-sm leading-relaxed px-2">Please log in or register a free account to unlock premium AI writing tools and securely save your resumes to the cloud.</p>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={() => navigate('/register')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base py-3.5 rounded-xl transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)]">Register for Free</button>
                <button onClick={() => navigate('/?login=true')} className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 font-bold text-base py-3.5 rounded-xl transition-all">Log In to Account</button>
                <button onClick={() => setShowAuthModal(false)} className="w-full text-gray-500 hover:text-gray-800 font-bold text-sm py-2 mt-1 transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
      {/* ==================== GLOBAL TOAST NOTIFICATION ==================== */}
      {/* This sits completely outside the dashboard/editor containers so it floats perfectly */}
      {toastMsg && (
          <div className={`fixed bottom-6 right-6 z-[999] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold animate-in slide-in-from-bottom-5 fade-in duration-300 ${toastMsg.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
            {toastMsg.type === 'success' ? <IconCheck /> : <IconWarning />}
            {toastMsg.text}
          </div>
        )}
             
    </div>
    <div className="w-[100vw] ml-[calc(50%-50vw)] bg-white border-t border-gray-200 mt-16">
          <Footer />
        </div>
    </>
  );
};




export default ResumeMakerForm;