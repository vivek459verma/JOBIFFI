import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template4Minimal: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white mx-auto shadow-lg font-sans text-gray-700 flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="bg-[#3E0097] text-white px-10 py-8 flex justify-between items-center">
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold">
            {data.personal.fullName}
          </h1>

          <p className="text-lg opacity-90 mt-1">
            {data.personal.title}
          </p>

          <div className="mt-4 text-sm space-y-1">
            {data.personal.email && <p>{data.personal.email}</p>}
            {data.personal.phone && <p>{data.personal.phone}</p>}
            {data.personal.location && <p>{data.personal.location}</p>}
          </div>
        </div>

        {/* ✅ ADDED: Canva-style photo mapping */}
        {data.personal.photo && (
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 shadow-lg shrink-0 ml-6 bg-[#2a0066] flex items-center justify-center">
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

      </div>

      {/* ================= BODY ================= */}
      <div className="grid grid-cols-3 gap-8 px-10 py-8 flex-1">

        {/* LEFT MAIN CONTENT */}
        <div className="col-span-2 space-y-8">

          {/* SUMMARY */}
          {data.personal.summary && (
            <section>

              <h2 className="text-lg font-semibold text-[#3E0097] border-b-2 border-[#3E0097] pb-1 mb-4 uppercase">
                Profile
              </h2>

              <p className="text-sm leading-6">
                {data.personal.summary}
              </p>

            </section>
          )}

          {/* EXPERIENCE */}
          {data.experience && data.experience.length > 0 && (
            <section>

              <h2 className="text-lg font-semibold text-[#3E0097] border-b-2 border-[#3E0097] pb-1 mb-4 uppercase">
                Experience
              </h2>

              {data.experience.map((exp, i) => (
                <div key={i} className="mb-6">

                  <h3 className="font-semibold text-gray-900">
                    {exp.role}
                  </h3>

                  {/* ✅ ADDED: Support for duration */}
                  <p className="text-sm text-[#3E0097] font-medium mt-0.5">
                    {exp.company} <span className="text-gray-400 font-normal">| {exp.duration ? exp.duration : `${exp.startDate} - ${exp.endDate || "Present"}`}</span>
                  </p>

                  {exp.achievements && exp.achievements.length > 0 ? (
                    <ul className="list-disc ml-5 text-sm mt-2 space-y-1 text-gray-600">
                      {exp.achievements.map((a, index) => (
                        <li key={index}>{a}</li>
                      ))}
                    </ul>
                  ) : (
                    exp.description && (
                      <p className="text-sm mt-2 leading-6 text-gray-600">
                        {exp.description}
                      </p>
                    )
                  )}

                </div>
              ))}

            </section>
          )}

          {/* ✅ ADDED: PROJECTS */}
          {data.projects && data.projects.length > 0 && (
            <section>

              <h2 className="text-lg font-semibold text-[#3E0097] border-b-2 border-[#3E0097] pb-1 mb-4 uppercase">
                Projects
              </h2>

              {data.projects.map((proj, i) => (
                <div key={i} className="mb-5">

                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900">
                      {proj.name}
                    </h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-[#3E0097] hover:underline font-medium">
                        {proj.link.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                  </div>

                  {proj.description && (
                    <p className="text-sm mt-1 leading-6 text-gray-600">
                      {proj.description}
                    </p>
                  )}

                </div>
              ))}

            </section>
          )}

          {/* EDUCATION */}
          {data.education && data.education.length > 0 && (
            <section>

              <h2 className="text-lg font-semibold text-[#3E0097] border-b-2 border-[#3E0097] pb-1 mb-4 uppercase">
                Education
              </h2>

              {data.education.map((edu, i) => (
                <div key={i} className="mb-5">

                  <h3 className="font-semibold text-gray-900">
                    {edu.degree}
                  </h3>

                  {/* ✅ UPDATED: Formatted to use year field */}
                  <p className="text-sm text-[#3E0097] font-medium mt-0.5">
                    {edu.institution} <span className="text-gray-400 font-normal">| {edu.year}</span>
                  </p>

                  {edu.gpa && (
                    <p className="text-xs text-gray-500 mt-1 font-medium">
                      GPA: {edu.gpa}
                    </p>
                  )}

                  {/* ✅ ADDED: Education Description */}
                  {edu.description && (
                    <p className="text-sm mt-1.5 leading-6 text-gray-600">
                      {edu.description}
                    </p>
                  )}

                </div>
              ))}

            </section>
          )}

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-8">

          {/* CONTACT & LINKS */}
          <section>

            <h2 className="text-md font-semibold text-[#3E0097] border-b border-[#3E0097] pb-1 mb-3 uppercase">
              Contact
            </h2>

            <div className="text-sm space-y-2 break-all text-gray-600">
              {data.personal.location && <p>{data.personal.location}</p>}
              {data.personal.phone && <p>{data.personal.phone}</p>}
              {data.personal.email && <p>{data.personal.email}</p>}
              
              {/* ✅ ADDED: Social Links */}
              {data.personal.linkedin && <p><a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#3E0097] transition-colors">{data.personal.linkedin.replace(/^https?:\/\//, '')}</a></p>}
              {data.personal.github && <p><a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#3E0097] transition-colors">{data.personal.github.replace(/^https?:\/\//, '')}</a></p>}
              {data.personal.portfolio && <p><a href={data.personal.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-[#3E0097] transition-colors">{data.personal.portfolio.replace(/^https?:\/\//, '')}</a></p>}
              {data.personal.website && <p><a href={data.personal.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#3E0097] transition-colors">{data.personal.website.replace(/^https?:\/\//, '')}</a></p>}
            </div>

          </section>

          {/* SKILLS */}
          {data.skills && data.skills.length > 0 && (
            <section>

              <h2 className="text-md font-semibold text-[#3E0097] border-b border-[#3E0097] pb-1 mb-3 uppercase">
                Skills
              </h2>

              <ul className="text-sm space-y-1.5 text-gray-600">
                {data.skills.map((skill, i) => (
                  <li key={i}>• {skill.name}</li>
                ))}
              </ul>

            </section>
          )}

          {/* ✅ ADDED: CERTIFICATIONS */}
          {data.certifications && data.certifications.length > 0 && (
            <section>

              <h2 className="text-md font-semibold text-[#3E0097] border-b border-[#3E0097] pb-1 mb-3 uppercase">
                Certifications
              </h2>

              <div className="space-y-3">
                {data.certifications.map((cert, i) => (
                  <div key={i} className="text-sm text-gray-600">
                    <div className="font-semibold text-gray-800">{cert.title}</div>
                    {(cert.issuer || cert.date) && (
                      <div className="text-xs mt-0.5">
                        {cert.issuer} {cert.issuer && cert.date && '|'} {cert.date}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </section>
          )}

          {/* ✅ ADDED: LANGUAGES */}
          {data.languages && data.languages.length > 0 && (
            <section>

              <h2 className="text-md font-semibold text-[#3E0097] border-b border-[#3E0097] pb-1 mb-3 uppercase">
                Languages
              </h2>

              <ul className="text-sm space-y-2 text-gray-600">
                {data.languages.map((lang, i) => (
                  <li key={i} className="flex justify-between items-baseline border-b border-gray-100 pb-1">
                    <span className="font-medium text-gray-800">{lang.name}</span>
                    <span className="text-xs italic">{lang.proficiency}</span>
                  </li>
                ))}
              </ul>

            </section>
          )}

        </div>

      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-gray-400 py-6 mt-auto">
        {data.personal.fullName}
      </div>

    </div>
  );
};

export default Template4Minimal;