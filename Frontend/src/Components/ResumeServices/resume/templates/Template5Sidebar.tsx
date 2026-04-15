import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template5Sidebar: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white mx-auto shadow-lg px-10 py-8 font-sans text-gray-800 flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-8">
        
        {/* ✅ ADDED: Canva-style photo mapping */}
        {data.personal.photo && (
          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-5 shadow-sm border border-gray-200 flex items-center justify-center bg-gray-50">
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

        <h1 className="text-4xl font-bold">
          {data.personal.fullName}
        </h1>
        
        {data.personal.title && (
          <p className="text-lg text-gray-600 mt-1 font-medium">
            {data.personal.title}
          </p>
        )}

        <div className="mt-3 text-sm text-gray-600 space-x-3 flex flex-wrap justify-center gap-y-1">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>• {data.personal.phone}</span>}
          {data.personal.location && <span>• {data.personal.location}</span>}
        </div>

        {/* ✅ ADDED: Social & Links */}
        <div className="mt-2 text-sm text-blue-600 space-x-3 flex flex-wrap justify-center gap-y-1 font-medium">
          {data.personal.linkedin && <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">{data.personal.linkedin.replace(/^https?:\/\//, '')}</a>}
          {data.personal.github && <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline before:content-['•'] before:text-gray-400 before:mr-3">{data.personal.github.replace(/^https?:\/\//, '')}</a>}
          {data.personal.portfolio && <a href={data.personal.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline before:content-['•'] before:text-gray-400 before:mr-3">{data.personal.portfolio.replace(/^https?:\/\//, '')}</a>}
          {data.personal.website && <a href={data.personal.website} target="_blank" rel="noopener noreferrer" className="hover:underline before:content-['•'] before:text-gray-400 before:mr-3">{data.personal.website.replace(/^https?:\/\//, '')}</a>}
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      {data.personal.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-3 uppercase tracking-wide text-gray-900">
            Summary
          </h2>
          <p className="text-sm leading-6 whitespace-pre-wrap text-gray-700">
            {data.personal.summary}
          </p>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-4 uppercase tracking-wide text-gray-900">
            Work Experience
          </h2>

          {data.experience.map((exp, i) => (
            <div key={i} className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-gray-900">
                  {exp.role}
                </h3>
                {/* ✅ ADDED: Support for proper duration logic */}
                <span className="text-sm text-gray-500 font-medium">
                  {exp.duration ? exp.duration : `${exp.startDate} - ${exp.endDate || "Present"}`}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2 font-medium">
                {exp.company}
              </p>

              {/* ✅ ADDED: Support for bullet points vs normal text */}
              {exp.achievements && exp.achievements.length > 0 ? (
                <ul className="list-disc ml-5 text-sm space-y-1 text-gray-700 mt-2">
                  {exp.achievements.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              ) : (
                exp.description && (
                  <p className="text-sm leading-6 text-gray-700 whitespace-pre-wrap">
                    {exp.description}
                  </p>
                )
              )}
            </div>
          ))}
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {/* ✅ ADDED: Fully mapped Projects section */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-4 uppercase tracking-wide text-gray-900">
            Projects
          </h2>

          {data.projects.map((proj, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                    View Project ↗
                  </a>
                )}
              </div>
              {proj.description && (
                <p className="text-sm leading-6 text-gray-700 whitespace-pre-wrap">
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
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-4 uppercase tracking-wide text-gray-900">
            Education
          </h2>

          {data.education.map((edu, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline">
                <p className="font-semibold text-gray-900">{edu.degree}</p>
                <span className="text-sm text-gray-500 font-medium">
                  {edu.year}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {edu.institution}
              </p>
              
              {/* ✅ ADDED: GPA and Description */}
              {edu.gpa && <p className="text-xs text-gray-500 mt-1 font-medium">GPA: {edu.gpa}</p>}
              {edu.description && <p className="text-sm text-gray-700 leading-6 mt-1.5">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* ================= SKILLS ================= */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-3 uppercase tracking-wide text-gray-900">
            Skills
          </h2>
          {/* ✅ FIXED: Correctly mapping the skill names out of the object array */}
          <p className="text-sm leading-6 text-gray-700 font-medium">
            {data.skills.map(s => s.name).join(" • ")}
          </p>
        </section>
      )}

      {/* ================= CERTIFICATIONS ================= */}
      {/* ✅ ADDED: Certifications section */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-3 uppercase tracking-wide text-gray-900">
            Certifications
          </h2>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            {data.certifications.map((cert, i) => (
              <div key={i} className="text-sm">
                <p className="font-semibold text-gray-900">{cert.title}</p>
                {(cert.issuer || cert.date) && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {cert.issuer} {cert.issuer && cert.date && '—'} {cert.date}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= LANGUAGES ================= */}
      {/* ✅ ADDED: Languages section */}
      {data.languages && data.languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-3 uppercase tracking-wide text-gray-900">
            Languages
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
            {data.languages.map((lang, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{lang.name}</span>
                {lang.proficiency && <span className="text-xs text-gray-500">({lang.proficiency})</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= FOOTER ================= */}
      <div className="text-center text-xs text-gray-400 mt-auto pt-8">
        {data.personal.fullName}
      </div>

    </div>
  );
};

export default Template5Sidebar;