import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Footer from "../Footer/footer";

// --- TEMPLATE PREVIEW IMAGES ---
import t1 from "../../assets/media/resumeTemplates/template1.png";
import t2 from "../../assets/media/resumeTemplates/template2.png";
import t3 from "../../assets/media/resumeTemplates/template3.png";
import t4 from "../../assets/media/resumeTemplates/template4.png";
import t5 from "../../assets/media/resumeTemplates/template5.png";
import t6 from "../../assets/media/resumeTemplates/template6.png";
import t7 from "../../assets/media/resumeTemplates/template7.png";
import t8 from "../../assets/media/resumeTemplates/template8.png";

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

const FAQS = [
  { q: "What is Jobiffi's AI Resume Maker?", a: "Our AI Resume Maker is a powerful digital tool that allows you to create a professional, ATS-friendly resume in minutes. The built-in AI helps you write impactful descriptions, making your job search easier and more efficient." },
  { q: "How much does it cost?", a: "You can build, edit, and download your resume completely for free! We also offer a Jobiffi Pro tier that unlocks unlimited AI writing generations and premium designer templates." },
  { q: "Which format will I be able to download my resume in?", a: "Your resume will be downloaded as a high-quality, pixel-perfect PDF file, which is the industry standard format preferred by all recruiters and Applicant Tracking Systems (ATS)." },
  { q: "Is my data secure?", a: "Absolutely. We use enterprise-grade encryption to ensure your personal information, work history, and contact details are completely secure and private." },
];

const ResumeLandingPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [openFaq, setOpenFaq] = useState<number | null>(0); // First FAQ open by default
    const [showAuthModal, setShowAuthModal] = useState(false);



    React.useEffect(() => {
        if (localStorage.getItem("token") && searchParams.get("login") === "true") {
        searchParams.delete("login");
        searchParams.delete("redirect");
        setSearchParams(searchParams, { replace: true }); // replace: true prevents adding a new history entry
        }
    }, [searchParams, setSearchParams]);

  // --- SVGs ---
  const IconCheck = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>;
  const IconCrown = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V18H19V19Z"/></svg>;
  const IconChevronDown = ({ open }: { open: boolean }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${open ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}><polyline points="6 9 12 15 18 9"></polyline></svg>;
  const IconClock = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
  const IconLayout = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;
  const IconSend = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;

  // --- ACTIONS ---
  
  // 1. "Try for free" tells the form to skip the dashboard and create a blank resume
  const handleFreeTier = () => navigate('/resume-editor', { state: { createNew: true } });
  
  // 2. Pro Tier goes to the Dashboard (since currentView defaults to dashboard!)
  const handleProTier = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowAuthModal(true);
    } else {
      // User is logged in, send them to their dashboard
      navigate('/resume-editor'); 
    }
  };

  // 3. Template click tells the form exactly which template to load
  const handleTemplateClick = (templateId: number) => {
    navigate('/resume-editor', { state: { autoSelectTemplate: templateId } });
  };


  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-800 selection:bg-blue-100 selection:text-blue-900">
      
      {/* ================= HERO & PRICING TIERS ================= */}
      <section className="pt-20 pb-16 px-4 max-w-[1200px] mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-950 tracking-tight mb-4">
          Online Resume Maker
        </h1>
        <p className="text-lg text-gray-500 font-medium mb-10">
          Fast-track your job search with our AI-powered builder.
        </p>

        {/* Instantly jumps to dashboard if they are already logged in */}
        {localStorage.getItem("token") && (
          <div className="flex justify-center mb-12">
            <button 
              onClick={() => navigate('/resume-editor')} 
              className="bg-gray-900 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:bg-black transition-colors flex items-center gap-2"
            >
              Go to My Dashboard
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl mx-auto">
          
          {/* FREE TIER CARD */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm w-full md:w-1/2 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic Plan</h3>
            <p className="text-gray-500 text-sm mb-6 pb-6 border-b border-gray-100">Get a professional resume based on your profile, plus:</p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-sm font-medium text-gray-700"><IconCheck /> 12 AI-powered attempts to refine content</li>
              <li className="flex items-start gap-3 text-sm font-medium text-gray-700"><IconCheck /> High-quality standard resume templates</li>
              <li className="flex items-start gap-3 text-sm font-medium text-gray-700"><IconCheck /> Free PDF Downloads</li>
            </ul>
            
            <button onClick={handleFreeTier} className="w-full bg-blue-50 text-blue-700 font-bold py-3.5 rounded-xl hover:bg-blue-100 transition-colors">
              Try for free
            </button>
          </div>

          {/* PRO TIER CARD */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border-2 border-amber-200 shadow-lg w-full md:w-1/2 text-left relative transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 bg-amber-400 text-amber-950 text-xs font-black px-4 py-1.5 rounded-bl-xl rounded-tr-xl uppercase tracking-widest flex items-center gap-1">
              <IconCrown /> PRO
            </div>
            
            <h3 className="text-2xl font-bold text-amber-950 mb-2">Premium Builder</h3>
            <p className="text-amber-700/80 text-sm mb-6 pb-6 border-b border-amber-200/50">Experience the ultimate toolkit to stand out.</p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-sm font-bold text-amber-900"><IconCheck /> Unlimited AI-powered writing assistance</li>
              <li className="flex items-start gap-3 text-sm font-bold text-amber-900"><IconCheck /> Exclusive access to premium templates</li>
              <li className="flex items-start gap-3 text-sm font-bold text-amber-900"><IconCheck /> Advanced ATS formatting</li>
            </ul>
            
            <button onClick={handleProTier} className="w-full bg-amber-500 text-white font-extrabold py-3.5 rounded-xl hover:bg-amber-600 transition-colors shadow-[0_4px_14px_0_rgb(245,158,11,0.39)] flex justify-center items-center gap-2">
              <IconCrown /> Upgrade to Jobiffi Pro
            </button>
          </div>

        </div>
      </section>

      {/* ================= TEMPLATES SHOWCASE ================= */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-blue-950 mb-3">Explore impactful templates</h2>
            <p className="text-gray-500 font-medium">Win over recruiters by choosing one of our well-designed layouts.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {TEMPLATE_PREVIEWS.map(template => {
              const isPro = [2, 4, 7, 8].includes(template.id);
              
              return (
                <div 
                  key={template.id}
                  onClick={() => handleTemplateClick(template.id)}
                  className="group relative w-full aspect-[210/297] border-2 border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-400 hover:shadow-xl transition-all duration-300"
                >
                  <img src={template.img} alt={template.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                  
                  {/* Free / Pro Badges */}
                  <div className="absolute top-3 right-3 z-20">
                    {isPro ? (
                      <span className="flex items-center gap-1 bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest border border-amber-300 shadow-sm">
                        <IconCrown /> PRO
                      </span>
                    ) : (
                      <span className="bg-teal-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-sm border border-teal-400">
                        FREE
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay with "Try" Button */}
                  <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    {isPro ? (
                      <button className="bg-amber-500 text-white font-black px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <IconCrown /> Try
                      </button>
                    ) : (
                      <button className="bg-white text-blue-700 font-black px-8 py-3 rounded-xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Try
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-20 px-4 max-w-[1200px] mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-blue-950 mb-12">Why use our resume maker?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-8 text-center hover:bg-blue-50 transition-colors">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
              <IconClock />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Save time & effort</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Don't worry about layout & formatting anymore. Just add your information and our intelligent tool will handle the rest flawlessly.</p>
          </div>

          <div className="bg-gray-50/80 border border-gray-100 rounded-3xl p-8 text-center hover:bg-gray-100 transition-colors">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
              <IconLayout />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Keep organized</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Whether you're a seasoned professional or just starting out, effortlessly organize your work experience and achievements.</p>
          </div>

          <div className="bg-teal-50/30 border border-teal-100/50 rounded-3xl p-8 text-center hover:bg-teal-50/50 transition-colors">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
              <IconSend />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">More applications</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Create professional resumes faster, download pixel-perfect PDFs, and apply to multiple job openings with absolute confidence.</p>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-[800px] mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-blue-950 mb-10 text-center">Frequently asked questions</h2>
          
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-colors ${openFaq === index ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200 bg-white'}`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center outline-none"
                >
                  <span className={`font-bold pr-4 ${openFaq === index ? 'text-blue-900' : 'text-gray-700'}`}>
                    Q{index + 1}. {faq.q}
                  </span>
                  <IconChevronDown open={openFaq === index} />
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-[500px] pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AUTH MODAL ================= */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative transform transition-all scale-100">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="text-center mb-8 mt-2">
              <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-5 border-[6px] border-amber-50/50 shadow-sm">
                <IconCrown />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Login to Upgrade</h3>
              <p className="text-gray-600 text-sm leading-relaxed px-2">Please log in to your account to securely process your Pro subscription.</p>
            </div>
            <div className="flex flex-col gap-3">
                <button 
                    onClick={() => {
                        setShowAuthModal(false); // 1. Close the center pop-up
                        navigate('/resume-builder?login=true&redirect=resume-pro'); // 2. Trigger the slide-over without leaving the page!
                    }} 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base py-3.5 rounded-xl transition-all shadow-md"
                >
                    Log In
                </button>
                <button onClick={() => navigate('/register')} className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 font-bold text-base py-3.5 rounded-xl transition-all">Create Account</button>
                </div>
            </div>
            </div>
        )}

      {/* ================= FULL BLEED FOOTER ================= */}
      <div className="w-[100vw] ml-[calc(50%-50vw)] border-t border-gray-200 bg-white">
        <Footer />
      </div>

    </div>
  );
};

export default ResumeLandingPage;