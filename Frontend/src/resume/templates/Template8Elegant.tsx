import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template8Elegant: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-[#ECECEC] mx-auto shadow-xl p-10">

      <div className="bg-white relative shadow-md">

        {/* Top Accent Bar */}
        <div className="h-8 bg-[#3B4D61]" />

        <div className="flex">

          {/* ================= SIDEBAR ================= */}
          <div className="w-[32%] bg-[#E6E6E6] p-6">

            {/* PROFILE IMAGE */}
            {data.personal.photo && (
              <div className="mb-5">
                <img
                  src={data.personal.photo}
                  alt="profile"
                  className="w-32 h-32 object-cover mx-auto mb-4"
                />
              </div>
            )}

            {/* NAME */}
            <h1 className="text-base font-bold text-gray-800">
              {data.personal.fullName}
            </h1>

            <p className="text-xs text-gray-600 mb-4">
              {data.personal.title}
            </p>

            {/* CONTACT */}
            <div className="text-xs text-gray-700 space-y-2 mb-6">
              {data.personal.location && <p>📍 {data.personal.location}</p>}
              {data.personal.phone && <p>📞 {data.personal.phone}</p>}
              {data.personal.email && <p>✉ {data.personal.email}</p>}
            </div>

            {/* SKILLS */}
            {data.skills.length > 0 && (
              <>
                <h2 className="text-xs font-bold uppercase tracking-wide mb-3">
                  Skills
                </h2>

                {data.skills.map((skill, i) => (
                  <div key={i} className="mb-4">

                    <div className="flex justify-between text-xs mb-1">
                      <span>{skill.name}</span>
                      <span className="text-gray-500">
                        {skill.years || ""}
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-gray-300">
                      <div
                        className="h-1.5 bg-[#3B4D61]"
                        style={{ width: `${skill.level || 70}%` }}
                      />
                    </div>

                  </div>
                ))}
              </>
            )}

          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="w-[68%] p-8">

            {/* BIOGRAPHY */}
            {data.personal.summary && (
              <Section title="Biography">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {data.personal.summary}
                </p>
              </Section>
            )}

            {/* WORK EXPERIENCE */}
            {data.experience.length > 0 && (
              <Section title="Work Experience">

                {data.experience.map((exp, i) => (
                  <div key={i} className="mb-6">

                    <div className="flex justify-between items-center">

                      <h3 className="text-sm font-semibold">
                        {exp.role}
                      </h3>

                      <span className="bg-[#3B4D61] text-white text-[10px] px-3 py-1">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </span>

                    </div>

                    <p className="text-xs text-gray-600 mt-1 mb-2">
                      {exp.company}
                    </p>

                    {/* Achievements if available */}
                    {exp.achievements && exp.achievements.length > 0 ? (
                      <ul className="list-disc ml-4 text-xs space-y-1 text-gray-700">
                        {exp.achievements.map((a, idx) => (
                          <li key={idx}>{a}</li>
                        ))}
                      </ul>
                    ) : (
                      exp.description && (
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {exp.description}
                        </p>
                      )
                    )}

                  </div>
                ))}

              </Section>
            )}

            {/* EDUCATION */}
            {data.education.length > 0 && (
              <Section title="Education">

                {data.education.map((edu, i) => (
                  <div key={i} className="mb-5">

                    <div className="flex justify-between">

                      <h3 className="text-sm font-semibold">
                        {edu.degree}
                      </h3>

                      <span className="bg-[#3B4D61] text-white text-[10px] px-3 py-1">
                        {edu.startDate} - {edu.endDate}
                      </span>

                    </div>

                    <p className="text-xs text-gray-600">
                      {edu.institution}
                    </p>

                    {edu.gpa && (
                      <p className="text-xs text-gray-500">
                        GPA: {edu.gpa}
                      </p>
                    )}

                  </div>
                ))}

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

    <h2 className="text-sm font-bold text-gray-800 mb-1">
      {title}
    </h2>

    <div className="h-[2px] w-16 bg-[#3B4D61] mb-4"></div>

    {children}

  </div>
);

export default Template8Elegant;