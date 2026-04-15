import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template7Creative: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white mx-auto shadow-lg px-12 py-10 font-serif text-gray-900 flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-8">

        {/* ✅ ADDED: Canva-style photo mapping */}
        {data.personal.photo && (
          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-5 border-2 border-[#00367B] shadow-sm flex items-center justify-center bg-gray-50">
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

        <h1 className="text-4xl font-bold italic text-[#00367B]">
          {data.personal.fullName}
        </h1>
        
        {/* ✅ ADDED: Professional Title */}
        {data.personal.title && (
          <p className="text-xl mt-2 text-gray-700 italic">
            {data.personal.title}
          </p>
        )}
      </div>

      {/* ================= CONTACT INFO ================= */}
      <div className="text-center text-sm text-gray-700 space-y-1 mb-8">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>• {data.personal.phone}</span>}
          {data.personal.location && <span>• {data.personal.location}</span>}
        </div>
        
        {/* ✅ ADDED: Social Links */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1 text-[#00367B]">
          {data.personal.linkedin && <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">{data.personal.linkedin.replace(/^https?:\/\//, '')}</a>}
          {data.personal.github && <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline before:content-['•'] before:text-gray-400 before:mr-4">{data.personal.github.replace(/^https?:\/\//, '')}</a>}
          {data.personal.portfolio && <a href={data.personal.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline before:content-['•'] before:text-gray-400 before:mr-4">{data.personal.portfolio.replace(/^https?:\/\//, '')}</a>}
          {data.personal.website && <a href={data.personal.website} target="_blank" rel="noopener noreferrer" className="hover:underline before:content-['•'] before:text-gray-400 before:mr-4">{data.personal.website.replace(/^https?:\/\//, '')}</a>}
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      {data.personal.summary && (
        <Section title="Profile">
          <p className="leading-relaxed text-sm whitespace-pre-wrap">
            {data.personal.summary}
          </p>
        </Section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {data.experience && data.experience.length > 0 && (
        <Section title="Work Experience">
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-6">

              <div className="flex justify-between items-baseline mb-0.5">
                <span className="font-bold text-lg text-gray-900">
                  {exp.company}
                </span>
                {/* ✅ UPDATED: Proper duration support */}
                <span className="italic text-sm text-gray-600">
                  {exp.duration ? exp.duration : `${exp.startDate} - ${exp.endDate || "Present"}`}
                </span>
              </div>

              <div className="italic text-sm mb-2 text-[#00367B] font-medium">
                {exp.role}
              </div>

              {/* ✅ UPDATED: Support for achievements array with custom blue bullets */}
              {exp.achievements && exp.achievements.length > 0 ? (
                <ul className="ml-1 space-y-1.5 text-sm mt-2">
                  {exp.achievements.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#00367B] mr-2.5 text-lg leading-4 mt-0.5">•</span>
                      <span className="leading-relaxed text-gray-800">{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                exp.description && (
                  <ul className="ml-1 space-y-1.5 text-sm mt-2">
                    {exp.description.split("\n").map((point, index) => point.trim() ? (
                      <li key={index} className="flex items-start">
                        <span className="text-[#00367B] mr-2.5 text-lg leading-4 mt-0.5">•</span>
                        <span className="leading-relaxed text-gray-800">{point}</span>
                      </li>
                    ) : null)}
                  </ul>
                )
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ================= PROJECTS ================= */}
      {/* ✅ ADDED: Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <Section title="Projects">
          {data.projects.map((proj, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-gray-900">{proj.name}</span>
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="italic text-sm text-[#00367B] hover:underline">
                    {proj.link.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>
              {proj.description && (
                <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap mt-1">
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ================= EDUCATION ================= */}
      {data.education && data.education.length > 0 && (
        <Section title="Education">
          {data.education.map((edu, i) => (
            <div key={i} className="mb-4 flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-900">{edu.degree}</p>
                <p className="italic text-sm text-gray-700 mt-0.5">{edu.institution}</p>
                {/* ✅ ADDED: GPA and Description */}
                {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                {edu.description && <p className="text-sm text-gray-800 mt-1.5 leading-relaxed">{edu.description}</p>}
              </div>
              {/* ✅ UPDATED: Formatted to use year field */}
              <span className="italic text-sm text-gray-600">
                {edu.year}
              </span>
            </div>
          ))}
        </Section>
      )}

      {/* ================= SKILLS ================= */}
      {data.skills && data.skills.length > 0 && (
        <Section title="Technical Skills">
          {/* ✅ FIXED: Correctly mapping the object array */}
          <p className="text-sm leading-relaxed text-gray-800">
            {data.skills.map(s => s.name).join(", ")}
          </p>
        </Section>
      )}

      <div className="grid grid-cols-2 gap-8 mt-auto">
        {/* ================= CERTIFICATIONS ================= */}
        {/* ✅ ADDED: Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <Section title="Certifications">
            <ul className="space-y-3">
              {data.certifications.map((cert, i) => (
                <li key={i} className="text-sm text-gray-800">
                  <div className="font-bold">{cert.title}</div>
                  {(cert.issuer || cert.date) && (
                    <div className="italic text-gray-600 mt-0.5">
                      {cert.issuer} {cert.issuer && cert.date && '|'} {cert.date}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ================= LANGUAGES ================= */}
        {/* ✅ ADDED: Languages */}
        {data.languages && data.languages.length > 0 && (
          <Section title="Languages">
            <ul className="space-y-1.5">
              {data.languages.map((lang, i) => (
                <li key={i} className="flex justify-between items-end text-sm text-gray-800 border-b border-gray-100 pb-1">
                  <span className="font-bold">{lang.name}</span>
                  <span className="italic text-gray-600 text-xs">{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>

    </div>
  );
};

/* ================= SECTION COMPONENT ================= */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mb-8">
    <h2 className="text-[#00367B] font-bold italic mb-2 text-lg">
      {title}
    </h2>
    <div className="h-[2px] bg-[#00367B] mb-4 opacity-80"></div>
    {children}
  </div>
);

export default Template7Creative;