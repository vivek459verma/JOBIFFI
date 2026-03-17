import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template2Modern: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white shadow-lg mx-auto flex font-sans">

      {/* ================= LEFT SIDEBAR ================= */}
      <div className="w-[35%] bg-gray-900 text-white p-8 flex flex-col space-y-6">

        {/* PHOTO + NAME */}
        <div className="text-center">
          {data.personal.photo && (
            <img
              src={data.personal.photo}
              alt="Profile"
              className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
            />
          )}

          <h1 className="text-xl font-bold">
            {data.personal.fullName}
          </h1>

          <p className="text-xs opacity-80">
            {data.personal.title}
          </p>
        </div>

        {/* PERSONAL INFO */}
        <div>
          <h2 className="text-xs font-semibold uppercase border-b border-gray-600 pb-1 mb-3">
            Personal Info
          </h2>

          <div className="space-y-2 text-xs">
            {data.personal.phone && <p>{data.personal.phone}</p>}
            {data.personal.email && <p>{data.personal.email}</p>}
            {data.personal.location && <p>{data.personal.location}</p>}
            {data.personal.linkedin && <p>{data.personal.linkedin}</p>}
            {data.personal.github && <p>{data.personal.github}</p>}
          </div>
        </div>

        {/* SKILLS */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase border-b border-gray-600 pb-1 mb-3">
              Skills
            </h2>

            <div className="space-y-3">
              {data.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{skill.name}</span>
                    <span className="opacity-70">{skill.years}</span>
                  </div>

                  <div className="w-full h-1.5 bg-gray-700">
                    <div
                      className="h-1.5 bg-white"
                      style={{ width: `${skill.level || 70}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LANGUAGES */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase border-b border-gray-600 pb-1 mb-3">
              Languages
            </h2>

            <ul className="text-xs space-y-1">
              {data.languages.map((lang, i) => (
                <li key={i}>
                  {lang.name} – {lang.proficiency}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* ================= RIGHT CONTENT ================= */}
      <div className="w-[65%] p-10 flex flex-col space-y-6">

        {/* SUMMARY */}
        {data.personal.summary && (
          <div>
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
              Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {data.personal.summary}
            </p>
          </div>
        )}

        {/* EXPERIENCE */}
        {data.experience.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-3">
              Work Experience
            </h2>

            {data.experience.map((exp, i) => (
              <div key={i} className="mb-5">

                <h3 className="font-semibold text-sm">
                  {exp.role}
                </h3>

                <p className="text-xs text-gray-500 mb-2">
                  {exp.company}
                  {(exp.startDate || exp.endDate) && (
                    <> | {exp.startDate} - {exp.endDate || "Present"}</>
                  )}
                </p>

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 ? (
                  <ul className="list-disc ml-5 text-xs text-gray-700 space-y-1">
                    {exp.achievements.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  exp.description && (
                    <p className="text-xs text-gray-700">
                      {exp.description}
                    </p>
                  )
                )}

              </div>
            ))}
          </div>
        )}

        {/* PROJECTS */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-3">
              Projects
            </h2>

            {data.projects.map((project, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold text-sm">
                  {project.name}
                </h3>

                {project.link && (
                  <p className="text-xs text-blue-600">
                    {project.link}
                  </p>
                )}

                <p className="text-xs text-gray-700">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-3">
              Education
            </h2>

            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <h3 className="font-semibold text-sm">
                  {edu.degree}
                </h3>

                <p className="text-xs text-gray-600">
                  {edu.institution}
                  {(edu.startDate || edu.endDate) && (
                    <> | {edu.startDate} - {edu.endDate}</>
                  )}
                </p>

                {edu.gpa && (
                  <p className="text-xs text-gray-600">
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CERTIFICATIONS */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-3">
              Certifications
            </h2>

            {data.certifications.map((cert, i) => (
              <div key={i} className="text-xs mb-2">
                {cert.title} – {cert.issuer} ({cert.date})
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Template2Modern;