import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template1Classic: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white mx-auto shadow-lg font-sans text-gray-800">

      {/* ================= HEADER ================= */}
      <div className="bg-gray-100 p-8 flex gap-6 items-center border-b border-gray-200">

        {/* ✅ CONDITIONAL RENDER: Profile Image container disappears if no photo */}
        {data.personal.photo && (
          <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center text-sm shrink-0 shadow-sm border-2 border-white">
            <img
              src={data.personal.photo}
              alt="Profile"
              className="w-full h-full"
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center',
                transform: `translate(${data.personal.photoPosition?.x ?? 0}%, ${data.personal.photoPosition?.y ?? 0}%) scale(${data.personal.photoZoom ?? 1})`
              }}
            />
          </div>
        )}

        {/* Personal Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {data.personal.fullName}
          </h1>

          <p className="text-blue-600 font-bold text-lg mt-1 mb-3">
            {data.personal.title}
          </p>

          {/* Contact Bar */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 font-medium">
            {data.personal.email && <span>{data.personal.email}</span>}
            {data.personal.phone && <span>• {data.personal.phone}</span>}
            {data.personal.location && <span>• {data.personal.location}</span>}
          </div>

          {/* Social Links Bar */}
          <div className="flex flex-wrap gap-3 mt-3 text-sm font-bold text-blue-700">
            {data.personal.linkedin && (
              <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
            )}
            {data.personal.github && (
              <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub
              </a>
            )}
            {data.personal.portfolio && (
              <a href={data.personal.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Portfolio
              </a>
            )}
            {data.personal.website && (
              <a href={data.personal.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="flex p-10 gap-10">

        {/* LEFT COLUMN */}
        <div className="w-1/2 space-y-8">

          {/* SUMMARY */}
          {data.personal.summary && (
            <section>
              <h2 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-3 uppercase tracking-wider text-gray-900">
                Professional Summary
              </h2>
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
                {data.personal.summary}
              </p>
            </section>
          )}

          {/* EXPERIENCE */}
          {data.experience && data.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-4 uppercase tracking-wider text-gray-900">
                Experience
              </h2>

              {data.experience.map((exp, index) => (
                <div key={index} className="mb-6">
                  <h3 className="font-bold text-gray-900">{exp.role}</h3>

                  <p className="text-xs font-bold text-blue-600 mb-2">
                    {exp.company}
                    {(exp.startDate || exp.endDate || exp.duration) && (
                      <span className="text-gray-500 font-medium">
                        {" "}| {exp.duration ? exp.duration : `${exp.startDate} - ${exp.endDate || "Present"}`}
                      </span>
                    )}
                  </p>

                  {/* Achievements / Description */}
                  {exp.achievements && exp.achievements.length > 0 ? (
                    <ul className="list-disc ml-5 text-sm space-y-1 text-gray-700">
                      {exp.achievements.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    exp.description && (
                      <p className="text-sm whitespace-pre-wrap text-gray-700 leading-relaxed">{exp.description}</p>
                    )
                  )}
                </div>
              ))}
            </section>
          )}

          {/* PROJECTS */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-4 uppercase tracking-wider text-gray-900">
                Projects
              </h2>

              {data.projects.map((proj, index) => (
                <div key={index} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900">{proj.name}</h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:underline truncate ml-2 max-w-[150px]">
                        View Project ↗
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-sm whitespace-pre-wrap text-gray-700 leading-relaxed">{proj.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

        </div>

        {/* RIGHT COLUMN */}
        <div className="w-1/2 space-y-8">

          {/* EDUCATION */}
          {data.education && data.education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-4 uppercase tracking-wider text-gray-900">
                Education
              </h2>

              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>

                  <p className="text-sm font-medium text-gray-700 mt-0.5">
                    {edu.institution}
                  </p>
                  
                  {edu.year && (
                    <p className="text-xs text-gray-500 font-bold mt-1">
                      Class of {edu.year}
                    </p>
                  )}

                  {edu.gpa && (
                    <p className="text-xs text-gray-600 mt-1">
                      GPA: {edu.gpa}
                    </p>
                  )}

                  {edu.description && (
                    <p className="text-sm mt-1.5 text-gray-700">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* SKILLS */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-4 uppercase tracking-wider text-gray-900">
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span key={i} className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-md font-bold border border-gray-200">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* CERTIFICATIONS */}
          {data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-4 uppercase tracking-wider text-gray-900">
                Certifications
              </h2>

              <div className="space-y-3">
                {data.certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-sm text-gray-900">{cert.title}</h3>
                    {cert.issuer && <p className="text-xs font-medium text-blue-600 mt-0.5">{cert.issuer}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* LANGUAGES */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-4 uppercase tracking-wider text-gray-900">
                Languages
              </h2>

              <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                {data.languages.map((lang, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-bold text-gray-900 block">{lang.name}</span>
                    {lang.proficiency && <span className="text-gray-500 text-xs font-medium">{lang.proficiency}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>

    </div>
  );
};

export default Template1Classic;