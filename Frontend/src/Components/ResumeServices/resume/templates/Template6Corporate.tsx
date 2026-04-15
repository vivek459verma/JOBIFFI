import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template6Corporate: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white mx-auto shadow-lg px-10 py-10 font-sans text-gray-800 text-[13px] leading-relaxed flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="border-b-2 border-blue-700 pb-5 mb-6">

        <div className="grid grid-cols-3 items-end text-xs">

          {/* LEFT */}
          <div className="space-y-1 text-gray-600 font-medium">
            {data.personal.phone && <p>{data.personal.phone}</p>}
            {data.personal.location && <p>{data.personal.location}</p>}
            {data.personal.email && <p>{data.personal.email}</p>}
          </div>

          {/* CENTER */}
          <div className="text-center flex flex-col items-center justify-end">
            {/* ✅ ADDED: Canva-style photo mapping */}
            {data.personal.photo && (
              <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center">
                <img
                  src={data.personal.photo}
                  alt="Profile"
                  className="w-full h-full transition-all duration-75"
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transform: `translate(${data.personal.photoPosition?.x ?? 0}%, ${data.personal.photoPosition?.y ?? 0}%) scale(${data.personal.photoZoom ?? 1})`
                  }}
                />
              </div>
            )}
            <h1 className="text-2xl font-extrabold text-gray-900 uppercase tracking-tight leading-none">
              {data.personal.fullName}
            </h1>
            {data.personal.title && (
              <p className="text-blue-700 font-bold mt-1.5 uppercase tracking-wider text-[11px]">
                {data.personal.title}
              </p>
            )}
          </div>

          {/* RIGHT */}
          <div className="text-right text-gray-600 space-y-1 font-medium">
            {/* ✅ FIXED: Replaced hardcoded links with actual dynamic data */}
            {data.personal.linkedin && <p><a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">{data.personal.linkedin.replace(/^https?:\/\//, '')}</a></p>}
            {data.personal.github && <p><a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">{data.personal.github.replace(/^https?:\/\//, '')}</a></p>}
            {data.personal.portfolio && <p><a href={data.personal.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">{data.personal.portfolio.replace(/^https?:\/\//, '')}</a></p>}
            {data.personal.website && <p><a href={data.personal.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">{data.personal.website.replace(/^https?:\/\//, '')}</a></p>}
          </div>

        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      {data.personal.summary && (
        <section className="mb-6">
          <p className="text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">
            {data.personal.summary}
          </p>
        </section>
      )}

      {/* ================= SKILLS ================= */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-blue-700 font-bold border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider text-sm">
            Core Competencies
          </h2>

          {/* ✅ FIXED: Mapped array properly and removed hardcoded "Git, Python" text */}
          <div className="text-gray-800 font-medium">
            {data.skills.map(s => s.name).join(" • ")}
          </div>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-blue-700 font-bold border-b border-gray-300 pb-1 mb-4 uppercase tracking-wider text-sm">
            Professional Experience
          </h2>

          {data.experience.map((exp, i) => (
            <div key={i} className="mb-5">

              <div className="flex justify-between font-bold text-gray-900 text-[14px]">
                <span>{exp.role}</span>
                {/* ✅ ADDED: Proper duration support */}
                <span className="text-gray-600 text-[13px]">{exp.duration ? exp.duration : `${exp.startDate} - ${exp.endDate || "Present"}`}</span>
              </div>

              <div className="text-blue-700 font-semibold text-[13px] mb-2">
                <span>{exp.company}</span>
              </div>

              {/* ✅ ADDED: Support for bullet points vs standard description */}
              {exp.achievements && exp.achievements.length > 0 ? (
                <ul className="list-disc ml-5 space-y-1.5 text-gray-700 mt-1.5 font-medium">
                  {exp.achievements.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              ) : (
                exp.description && (
                  <ul className="list-disc ml-5 space-y-1.5 text-gray-700 mt-1.5 font-medium">
                    {exp.description.split("\n").map((point, index) => point.trim() ? (
                      <li key={index}>{point}</li>
                    ) : null)}
                  </ul>
                )
              )}

            </div>
          ))}
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {/* ✅ ADDED: Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-blue-700 font-bold border-b border-gray-300 pb-1 mb-4 uppercase tracking-wider text-sm">
            Key Projects
          </h2>

          {data.projects.map((proj, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline mb-0.5">
                <span className="font-bold text-gray-900">{proj.name}</span>
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline font-medium">
                    {proj.link.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>
              
              {proj.description && (
                <p className="text-gray-700 leading-relaxed font-medium mt-1 whitespace-pre-wrap">
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ================= EDUCATION ================= */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-blue-700 font-bold border-b border-gray-300 pb-1 mb-4 uppercase tracking-wider text-sm">
            Education
          </h2>

          {data.education.map((edu, i) => (
            <div key={i} className="mb-4 flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-900 text-[14px]">{edu.degree}</p>
                <p className="font-semibold text-blue-700 mt-0.5">
                  {edu.institution}
                </p>
                {/* ✅ ADDED: GPA and Description */}
                {edu.gpa && <p className="text-gray-600 font-medium text-xs mt-1">GPA: {edu.gpa}</p>}
                {edu.description && <p className="text-gray-700 font-medium mt-1.5 text-sm">{edu.description}</p>}
              </div>
              <span className="text-gray-600 font-semibold">{edu.year}</span>
            </div>
          ))}
        </section>
      )}

      {/* ================= CERTIFICATIONS & LANGUAGES ================= */}
      {/* ✅ REPLACED: Hardcoded "Activities" with dynamic Certifications & Languages side-by-side */}
      <div className="grid grid-cols-2 gap-8 mt-auto">
        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-blue-700 font-bold border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider text-sm">
              Certifications
            </h2>
            <ul className="space-y-2">
              {data.certifications.map((cert, i) => (
                <li key={i} className="text-gray-800 font-medium">
                  <span className="font-bold">{cert.title}</span>
                  {(cert.issuer || cert.date) && (
                    <span className="text-gray-500 text-xs block mt-0.5">
                      {cert.issuer} {cert.issuer && cert.date && '—'} {cert.date}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {data.languages && data.languages.length > 0 && (
          <section>
            <h2 className="text-blue-700 font-bold border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider text-sm">
              Languages
            </h2>
            <ul className="space-y-1.5">
              {data.languages.map((lang, i) => (
                <li key={i} className="flex justify-between text-gray-800 font-medium border-b border-gray-100 pb-1">
                  <span>{lang.name}</span>
                  <span className="text-gray-500 text-xs">{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

    </div>
  );
};

export default Template6Corporate;