import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template3Executive: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white mx-auto shadow-lg font-serif text-[#303030] p-10">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-10">

        {/* ✅ ADDED: Canva-style photo mapping and overflow wrapper */}
        {data.personal.photo && (
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 shadow-sm bg-gray-100 flex items-center justify-center">
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

        <h1 className="text-4xl font-bold tracking-wide uppercase">
          {data.personal.fullName}
        </h1>

        <p className="text-xl text-gray-600 mt-2">
          {data.personal.title}
        </p>
      </div>

      {/* ================= TWO COLUMN LAYOUT ================= */}
      <div className="grid grid-cols-2 gap-12">

        {/* LEFT COLUMN */}
        <div className="space-y-8">

          {/* WORK EXPERIENCE */}
          {data.experience && data.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-4 uppercase tracking-wide">
                Work Experience
              </h2>

              {data.experience.map((exp, i) => (
                <div key={i} className="mb-6">

                  {/* ✅ ADDED: Support for duration or exact dates */}
                  <p className="text-sm text-gray-500">
                    {exp.duration ? exp.duration : `${exp.startDate} - ${exp.endDate || "Present"}`}
                  </p>

                  <h3 className="text-lg font-semibold">
                    {exp.company}
                  </h3>

                  <p className="italic mb-2">
                    {exp.role}
                  </p>

                  {exp.achievements && exp.achievements.length > 0 ? (
                    <ul className="list-disc ml-5 text-sm leading-6">
                      {exp.achievements.map((a, index) => (
                        <li key={index}>{a}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-6">
                      {exp.description}
                    </p>
                  )}

                </div>
              ))}
            </section>
          )}

          {/* EDUCATION */}
          {data.education && data.education.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-4 uppercase tracking-wide">
                Education
              </h2>

              {data.education.map((edu, i) => (
                <div key={i} className="mb-5">

                  {/* ✅ UPDATED: Formatted to properly use the year field */}
                  <p className="text-sm text-gray-500">
                    {edu.year}
                  </p>

                  <h3 className="font-semibold">
                    {edu.degree}
                  </h3>

                  <p className="italic text-sm">
                    {edu.institution}
                  </p>

                  {edu.gpa && (
                    <p className="text-xs text-gray-500 mt-1 font-semibold">
                      GPA: {edu.gpa}
                    </p>
                  )}
                  
                  {/* ✅ ADDED: Support for Education description */}
                  {edu.description && (
                    <p className="text-sm mt-2 leading-6 text-gray-700">
                      {edu.description}
                    </p>
                  )}

                </div>
              ))}
            </section>
          )}

          {/* ✅ ADDED: PROJECTS SECTION */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-4 uppercase tracking-wide">
                Projects
              </h2>

              {data.projects.map((proj, i) => (
                <div key={i} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold">{proj.name}</h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline italic">
                        {proj.link.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-sm leading-6">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">

          {/* PERSONAL INFO BOX */}
          <section className="bg-[#F5DD9D] p-5 rounded">

            <h2 className="font-semibold mb-3 uppercase text-sm border-b border-[#dfc88e] pb-1">
              Contact
            </h2>

            <div className="text-sm space-y-1.5 break-all">
              {data.personal.location && <p>{data.personal.location}</p>}
              {data.personal.phone && <p>{data.personal.phone}</p>}
              {data.personal.email && <p>{data.personal.email}</p>}
              {data.personal.linkedin && <p><a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-900">{data.personal.linkedin.replace(/^https?:\/\//, '')}</a></p>}
              {data.personal.github && <p><a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-900">{data.personal.github.replace(/^https?:\/\//, '')}</a></p>}
              
              {/* ✅ ADDED: Portfolio and Website */}
              {data.personal.portfolio && <p><a href={data.personal.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-900">{data.personal.portfolio.replace(/^https?:\/\//, '')}</a></p>}
              {data.personal.website && <p><a href={data.personal.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-900">{data.personal.website.replace(/^https?:\/\//, '')}</a></p>}
            </div>

          </section>

          {/* SUMMARY */}
          {data.personal.summary && (
            <section>
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-3 uppercase tracking-wide">
                Profile
              </h2>

              <p className="text-sm leading-6">
                {data.personal.summary}
              </p>
            </section>
          )}

          {/* SKILLS */}
          {data.skills && data.skills.length > 0 && (
            <section>

              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-3 uppercase tracking-wide">
                Skills
              </h2>

              <ul className="text-sm space-y-2">
                {data.skills.map((skill, i) => (
                  <li key={i}>
                    • {skill.name}
                  </li>
                ))}
              </ul>

            </section>
          )}

          {/* ✅ ADDED: CERTIFICATIONS SECTION */}
          {data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-3 uppercase tracking-wide">
                Certifications
              </h2>

              <ul className="text-sm space-y-3">
                {data.certifications.map((cert, i) => (
                  <li key={i}>
                    <div className="font-semibold">{cert.title}</div>
                    {(cert.issuer || cert.date) && (
                      <div className="text-gray-500 text-xs mt-0.5">
                        {cert.issuer} {cert.issuer && cert.date && '|'} {cert.date}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ✅ ADDED: LANGUAGES SECTION */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-3 uppercase tracking-wide">
                Languages
              </h2>

              <ul className="text-sm space-y-2">
                {data.languages.map((lang, i) => (
                  <li key={i} className="flex justify-between items-end border-b border-gray-100 pb-1">
                    <span className="font-semibold">{lang.name}</span>
                    <span className="text-xs text-gray-500 italic">{lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

        </div>

      </div>

      {/* ================= FOOTER ================= */}
      <div className="mt-12 text-center text-xs text-gray-500 border-t border-gray-300 pt-5">
        {data.personal.fullName}
        {data.personal.email && <> • {data.personal.email}</>}
        {data.personal.phone && <> • {data.personal.phone}</>}
      </div>

    </div>
  );
};

export default Template3Executive;