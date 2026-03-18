import { useNavigate } from "react-router-dom";

import template1 from "../assets/media/resumeTemplates/template1.png";
import template2 from "../assets/media/resumeTemplates/template2.png";
import template3 from "../assets/media/resumeTemplates/template3.png";
import template4 from "../assets/media/resumeTemplates/template4.png";
import template5 from "../assets/media/resumeTemplates/template5.png";
import template6 from "../assets/media/resumeTemplates/template6.png";
import template7 from "../assets/media/resumeTemplates/template7.png";
import template8 from "../assets/media/resumeTemplates/template8.png";
import heroIllustration from "../assets/media/hero-illustration.png";

const ResumeLandingPage = () => {
  const navigate = useNavigate();

  const templates = [
    { id: 1, name: "Classic Professional", img: template1, isPro: false },
    { id: 2, name: "Modern Analyst", img: template2, isPro: false },
    { id: 3, name: "Elegant Two Column", img: template3, isPro: true },
    { id: 4, name: "Corporate Clean", img: template4, isPro: true },
    { id: 5, name: "Minimal Academic", img: template5, isPro: true },
    { id: 6, name: "Tech Focused", img: template6, isPro: true },
    { id: 7, name: "Executive Style", img: template7, isPro: true },
    { id: 8, name: "Creative Edge", img: template8, isPro: true },
  ];

  return (
    <div className="bg-[#f7f8fb]">

      {/* OFFER BANNER */}
      <div className="bg-[#f4e6cf] text-center py-3 text-[14px] font-medium">
        Holi offer
        <span className="ml-3 bg-[#f58a1f] text-white px-4 py-1 rounded-full text-xs font-semibold">
          30% off on PRO
        </span>
      </div>

      {/* HERO SECTION */}
      <div className="bg-[#eef1f6] pt-[90px] pb-[110px] text-center">
        <div className="w-[1180px] mx-auto">

          <h1 className="text-[40px] font-semibold text-[#1c1c1c]">
            Online Resume Maker
          </h1>

          <p className="text-[18px] text-[#5c5c5c] mt-3">
            Fast-track your job search with resume builder
          </p>

          {/* FEATURE CARDS */}
          <div className="flex justify-between mt-[60px]">

            {/* AI CARD */}
            <div className="bg-white w-[360px] p-[30px] rounded-[20px] shadow-[0_6px_20px_rgba(0,0,0,0.05)] text-left">
              <h3 className="text-[18px] font-semibold mb-5">
                AI resume maker
              </h3>

              <ul className="space-y-3 text-[14px] text-[#555] mb-6">
                <li>✔ 3 AI-powered attempts to refine content</li>
                <li>✔ 3 well-designed resume templates</li>
              </ul>

              <button className="bg-[#2b6df6] text-white px-6 py-2 rounded-full text-sm font-medium">
                Try for free
              </button>
            </div>

            {/* PREMIUM CARD */}
            <div className="bg-[#f7ead8] w-[360px] p-[30px] rounded-[20px] shadow-[0_6px_20px_rgba(0,0,0,0.05)] border border-[#f1d8b7] text-left">
              <h3 className="text-[16px] text-[#1c1c1c]">
                Experience our
              </h3>
              <h4 className="text-[18px] font-semibold text-[#f58a1f] mb-5">
                Premium resume builder
              </h4>

              <ul className="space-y-3 text-[14px] text-[#555] mb-6">
                <li>✔ Unlimited AI-powered attempts</li>
                <li>✔ 12 well-designed resume templates</li>
              </ul>

              <button className="bg-[#2b6df6] text-white px-6 py-2 rounded-full text-sm font-medium">
                Upgrade to Jobiffi Pro
              </button>
            </div>

            {/* ILLUSTRATION */}
            <div className="w-[320px] flex items-end justify-center">
              <img
                src={heroIllustration}
                alt="Resume Illustration"
                className="w-full max-w-[280px] object-contain"
              />
            </div>

          </div>
        </div>
      </div>

      {/* TEMPLATE SECTION */}
      <div className="w-[1180px] mx-auto pt-[40px] pb-[110px]">

        {/* Heading */}
        <div className="text-center mb-[35px]">
          <h2 className="text-[26px] font-semibold text-[#1c1c1c]">
            Explore impactful resume templates
          </h2>
          <p className="text-[15px] text-[#6a6a6a] mt-2">
            Win over recruiters by choosing one of our well-designed templates
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-x-[30px] gap-y-[50px]">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() =>
                navigate(`/resume-builder?template=${template.id}`)
              }
              className="bg-white rounded-[16px] border border-[#e6e6e6] shadow-sm cursor-pointer overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-[380px] bg-white flex items-center justify-center p-4">

                <img
                  src={template.img}
                  alt={template.name}
                  className="max-h-full object-contain"
                />

                {template.isPro ? (
                  <span className="absolute top-3 right-3 bg-[#f58a1f] text-white text-xs px-3 py-1 rounded-full font-medium">
                    Pro
                  </span>
                ) : (
                  <span className="absolute top-3 right-3 bg-[#2bb673] text-white text-xs px-3 py-1 rounded-full font-medium">
                    Free
                  </span>
                )}
              </div>

              {/* Hidden Name */}
              <div className="hidden">
                {template.name}
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default ResumeLandingPage;