import { useNavigate } from "react-router-dom";

// Template Images
import template1 from "../assets/media/resumeTemplates/template1.png";
import template2 from "../assets/media/resumeTemplates/template2.png";
import template3 from "../assets/media/resumeTemplates/template3.png";
import template4 from "../assets/media/resumeTemplates/template4.png";
import template5 from "../assets/media/resumeTemplates/template5.png";
import template6 from "../assets/media/resumeTemplates/template6.png";
import template7 from "../assets/media/resumeTemplates/template7.png";
import template8 from "../assets/media/resumeTemplates/template8.png";

// Hero Illustration
import heroIllustration from "../assets/media/hero-illustration.png";

const ResumeLandingPage = () => {
  const navigate = useNavigate();

  const templates = [
    { id: 1, image: template1, isPro: false },
    { id: 2, image: template2, isPro: false },
    { id: 3, image: template3, isPro: false },
    { id: 4, image: template4, isPro: true },
    { id: 5, image: template5, isPro: true },
    { id: 6, image: template6, isPro: true },
    { id: 7, image: template7, isPro: true },
    { id: 8, image: template8, isPro: true },
  ];

  const handleSelect = (id: number) => {
    navigate(`/resume-editor?template=${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8]">

      {/* Promotional Strip */}
      <div className="w-full bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 py-3 text-center text-sm font-medium text-orange-600">
        Holi offer
        <span className="ml-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs">
          30% off on PRO
        </span>
      </div>

      {/* Hero Section */}
      <div className="text-center pt-16 pb-8">
        <h1 className="text-4xl font-semibold text-gray-800 mb-3">
          Online Resume Maker
        </h1>
        <p className="text-lg text-gray-600">
          Fast-track your job search with resume builder
        </p>
      </div>

      {/* Feature Section */}
      <div className="max-w-6xl mx-auto px-6 pb-16 flex items-end justify-between gap-6">

        {/* AI Resume Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md w-1/3">
          <h3 className="font-semibold text-lg mb-4">
            AI resume maker
          </h3>

          <ul className="text-sm text-gray-600 space-y-2 mb-5">
            <li>✔ 3 AI-powered attempts to refine content</li>
            <li>✔ 3 well-designed resume templates</li>
          </ul>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm">
            Try for free
          </button>
        </div>

        {/* Premium Resume Card */}
        <div className="bg-[#f5e9d7] p-6 rounded-2xl shadow-md w-1/3 border border-orange-200">
          <p className="font-semibold text-lg mb-1">
            Experience our
          </p>
          <p className="font-semibold text-orange-600 mb-4">
            Premium resume builder
          </p>

          <ul className="text-sm text-gray-700 space-y-2 mb-5">
            <li>✔ Unlimited AI-powered attempts</li>
            <li>✔ 12 well-designed resume templates</li>
          </ul>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm">
            Upgrade to Jobiffi Pro
          </button>
        </div>

        {/* Hero Illustration */}
        <div className="w-1/3 flex justify-center">
          <img
            src={heroIllustration}
            alt="Resume Illustration"
            className="w-[280px] object-contain"
          />
        </div>

      </div>

      {/* Templates Section */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Explore impactful resume templates
        </h2>
        <p className="text-gray-500">
          Win over recruiters by choosing one of our well-designed templates
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-4 gap-8">

          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleSelect(template.id)}
              className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative">

                {/* Badge */}
                <span
                  className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${
                    template.isPro
                      ? "bg-orange-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {template.isPro ? "Pro" : "Free"}
                </span>

                {/* Template Image */}
                <img
                  src={template.image}
                  alt="Resume Template"
                  className="w-full h-[460px] object-cover"
                />
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default ResumeLandingPage;