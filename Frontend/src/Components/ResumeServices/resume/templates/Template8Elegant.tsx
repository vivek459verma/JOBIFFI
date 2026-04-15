import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template8Elegant: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-[#ECECEC] mx-auto shadow-xl p-10 font-sans">

      <div className="bg-white relative shadow-md flex flex-col min-h-full">

        {/* Top Accent Bar */}
        <div className="h-8 bg-[#3B4D61] shrink-0" />

        <div className="flex flex-1">

          {/* ================= SIDEBAR ================= */}
          <div className="w-[32%] bg-[#E6E6E6] p-6 flex flex-col">

            {/* PROFILE IMAGE */}
            {/* ✅ ADDED: Canva-style dynamic mapping */}
            {data.personal.photo && (
              <div className="mb-5 flex justify-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-sm bg-gray-200 flex items-center justify-center">
                  <img
                    src={data.personal.photo}
                    alt="profile"
                    className="w-full h-full transition-all duration-75"
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transform: `translate(${data.personal.photoPosition?.x ?? 0}%, ${data.personal.photoPosition?.y ?? 0}%) scale(${data.personal.photoZoom ?? 1})`
                    }}
                  />
                </div>
              </div>
            )}

            {/* NAME */}
            <h1 className="text-base font-bold text-gray-800 uppercase tracking-wide">
              {data.personal.fullName}
            </h1>

            <p className="text-[11px] font-semibold text-[#3B4D61] mt-1 mb-4 uppercase tracking-widest">
              {data.personal.title}
            </p>

            {/* CONTACT */}
            <div className="text-xs text-gray-700 space-y-2.5 mb-6 break-all border-b border-gray-300 pb-5">
              {data.personal.location && <p className="flex items-start gap-2"><span className="text-[#3B4D61]">📍</span> {data.personal.location}</p>}
              {data.personal.phone && <p className="flex items-start gap-2"><span className="text-[#3B4D61]">📞</span> {data.personal.phone}</p>}
              {data.personal.email && <p className="flex items-start gap-2"><span className="text-[#3B4D61]">✉</span> {data.personal.email}</p>}
              
              {/* ✅ ADDED: Social Links */}
              {data.personal.linkedin && <p className="flex items-start gap-2"><span className="text-[#3B4D61] font-bold text-[10px] mt-0.5">IN</span> <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">{data.personal.linkedin.replace(/^https?:\/\//, '')}</a></p>}
              {data.personal.github && <p className="flex items-start gap-2"><span className="text-[#3B4D61] font-bold text-[10px] mt-0.5">GH</span> <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline">{data.personal.github.replace(/^https?:\/\//, '')}</a></p>}
              {data.personal.portfolio && <p className="flex items-start gap-2"><span className="text-[#3B4D61] font-bold text-[10px] mt-0.5">PF</span> <a href={data.personal.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline">{data.personal.portfolio.replace(/^https?:\/\//, '')}</a></p>}
              {data.personal.website && <p className="flex items-start gap-2"><span className="text-[#3B4D61] font-bold text-[10px] mt-0.5">WB</span> <a href={data.personal.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{data.personal.website.replace(/^https?:\/\//, '')}</a></p>}
            </div>

            {/* SKILLS */}
            {data.skills && data.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-4 flex items-center gap-2">
                  Skills <div className="h-px bg-gray-300 flex-1"></div>
                </h2>

                {data.skills.map((skill, i) => (
                  <div key={i} className="mb-3.5">
                    {/* ✅ FIXED: Removed hardcoded "years/level" that didn't exist in ResumeData, mapped simply */}
                    <div className="text-[11px] font-semibold text-gray-700 mb-1.5 uppercase tracking-tight">
                      <span>{skill.name}</span>
                    </div>

                    <div className="w-full h-1.5 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="h-1.5 bg-[#3B4D61] rounded-full"
                        style={{ width: '85%' }} // Placeholder since skill level isn't in ResumeData
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ✅ ADDED: LANGUAGES */}
            {data.languages && data.languages.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-4 flex items-center gap-2">
                  Languages <div className="h-px bg-gray-300 flex-1"></div>
                </h2>
                <div className="space-y-2">
                  {data.languages.map((lang, i) => (
                    <div key={i} className="text-xs flex justify-between">
                      <span className="font-semibold text-gray-700">{lang.name}</span>
                      <span className="text-gray-500 italic text-[10px]">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="w-[68%] p-8 flex flex-col">

            {/* BIOGRAPHY */}
            {data.personal.summary && (
              <Section title="Biography">
                <p className="text-sm text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
                  {data.personal.summary}
                </p>
              </Section>
            )}

            {/* WORK EXPERIENCE */}
            {data.experience && data.experience.length > 0 && (
              <Section title="Work Experience">

                {data.experience.map((exp, i) => (
                  <div key={i} className="mb-6">

                    <div className="flex justify-between items-center mb-1">

                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                        {exp.role}
                      </h3>

                      <span className="bg-[#3B4D61] text-white text-[10px] font-bold px-3 py-1 rounded shadow-sm">
                        {/* ✅ ADDED: Proper duration logic */}
                        {exp.duration ? exp.duration : `${exp.startDate} - ${exp.endDate || "Present"}`}
                      </span>

                    </div>

                    <p className="text-xs text-[#3B4D61] font-bold mt-1 mb-2 uppercase tracking-wide">
                      {exp.company}
                    </p>

                    {/* Achievements if available */}
                    {exp.achievements && exp.achievements.length > 0 ? (
                      <ul className="list-disc ml-4 text-xs space-y-1.5 text-gray-700 font-medium leading-relaxed">
                        {exp.achievements.map((a, idx) => (
                          <li key={idx}>{a}</li>
                        ))}
                      </ul>
                    ) : (
                      exp.description && (
                        <ul className="list-disc ml-4 text-xs space-y-1.5 text-gray-700 font-medium leading-relaxed">
                          {exp.description.split("\n").map((point, idx) => point.trim() ? (
                            <li key={idx}>{point}</li>
                          ) : null)}
                        </ul>
                      )
                    )}

                  </div>
                ))}

              </Section>
            )}

            {/* ✅ ADDED: PROJECTS */}
            {data.projects && data.projects.length > 0 && (
              <Section title="Projects">
                {data.projects.map((proj, i) => (
                  <div key={i} className="mb-5">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#3B4D61] font-bold hover:underline uppercase tracking-wider">
                          View Project ↗
                        </a>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-xs text-gray-700 leading-relaxed font-medium mt-1.5 whitespace-pre-wrap">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </Section>
            )}

            {/* EDUCATION */}
            {data.education && data.education.length > 0 && (
              <Section title="Education">

                {data.education.map((edu, i) => (
                  <div key={i} className="mb-5">

                    <div className="flex justify-between items-center mb-1">

                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                        {edu.degree}
                      </h3>

                      <span className="bg-[#E6E6E6] text-[#3B4D61] font-bold text-[10px] px-3 py-1 rounded shadow-sm border border-gray-300">
                        {/* ✅ UPDATED: Formatted to properly use year */}
                        {edu.year}
                      </span>

                    </div>

                    <p className="text-xs text-[#3B4D61] font-bold mt-1 uppercase tracking-wide">
                      {edu.institution}
                    </p>

                    {edu.gpa && (
                      <p className="text-xs text-gray-600 font-medium mt-1.5">
                        GPA: {edu.gpa}
                      </p>
                    )}
                    
                    {/* ✅ ADDED: Education description */}
                    {edu.description && (
                      <p className="text-xs text-gray-700 leading-relaxed font-medium mt-1.5">
                        {edu.description}
                      </p>
                    )}

                  </div>
                ))}

              </Section>
            )}

            {/* ✅ ADDED: CERTIFICATIONS */}
            {data.certifications && data.certifications.length > 0 && (
              <Section title="Certifications">
                <div className="grid grid-cols-2 gap-4">
                  {data.certifications.map((cert, i) => (
                    <div key={i}>
                      <h3 className="text-xs font-bold text-gray-900 leading-tight">{cert.title}</h3>
                      {(cert.issuer || cert.date) && (
                        <p className="text-[10px] text-[#3B4D61] font-bold mt-1 uppercase tracking-wider">
                          {cert.issuer} {cert.issuer && cert.date && '|'} {cert.date}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

/* ================= SECTION ================= */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mb-8">

    <h2 className="text-sm font-bold text-[#3B4D61] mb-1 uppercase tracking-widest">
      {title}
    </h2>

    <div className="flex items-center mb-5 gap-3">
      <div className="h-[3px] w-12 bg-[#3B4D61]"></div>
      <div className="h-px flex-1 bg-gray-200"></div>
    </div>

    {children}

  </div>
);

export default Template8Elegant;