import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template4Minimal: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white mx-auto shadow-lg font-sans text-gray-700">

      {/* ================= HEADER ================= */}
      <div className="bg-[#3E0097] text-white px-10 py-8">

        <h1 className="text-4xl font-bold">
          {data.personal.fullName}
        </h1>

        <p className="text-lg opacity-90">
          {data.personal.title}
        </p>

        <div className="mt-4 text-sm space-y-1">
          {data.personal.email && <p>{data.personal.email}</p>}
          {data.personal.phone && <p>{data.personal.phone}</p>}
          {data.personal.location && <p>{data.personal.location}</p>}
        </div>

      </div>

      {/* ================= BODY ================= */}
      <div className="grid grid-cols-3 gap-8 px-10 py-8">

        {/* LEFT MAIN CONTENT */}
        <div className="col-span-2 space-y-8">

          {/* EXPERIENCE */}
          {data.experience.length > 0 && (
            <section>

              <h2 className="text-lg font-semibold text-[#3E0097] border-b-2 border-[#3E0097] pb-1 mb-4 uppercase">
                Experience
              </h2>

              {data.experience.map((exp, i) => (
                <div key={i} className="mb-6">

                  <h3 className="font-semibold">
                    {exp.role}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {exp.company} • {exp.startDate} - {exp.endDate || "Present"}
                  </p>

                  {exp.achievements && exp.achievements.length > 0 ? (
                    <ul className="list-disc ml-5 text-sm mt-2 space-y-1">
                      {exp.achievements.map((a, index) => (
                        <li key={index}>{a}</li>
                      ))}
                    </ul>
                  ) : (
                    exp.description && (
                      <p className="text-sm mt-2 leading-6">
                        {exp.description}
                      </p>
                    )
                  )}

                </div>
              ))}

            </section>
          )}

          {/* EDUCATION */}
          {data.education.length > 0 && (
            <section>

              <h2 className="text-lg font-semibold text-[#3E0097] border-b-2 border-[#3E0097] pb-1 mb-4 uppercase">
                Education
              </h2>

              {data.education.map((edu, i) => (
                <div key={i} className="mb-4">

                  <h3 className="font-semibold">
                    {edu.degree}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {edu.institution} • {edu.startDate} - {edu.endDate}
                  </p>

                  {edu.gpa && (
                    <p className="text-xs text-gray-500">
                      GPA: {edu.gpa}
                    </p>
                  )}

                </div>
              ))}

            </section>
          )}

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

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-8">

          {/* SKILLS */}
          {data.skills.length > 0 && (
            <section>

              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-3 uppercase tracking-wide">
                Skills
              </h2>

              <ul className="text-sm space-y-2">
                {data.skills.map((skill, i) => (
                  <li key={i}>• {skill.name}</li>
                ))}
              </ul>

            </section>
          )}

          {/* CONTACT */}
          <section>

            <h2 className="text-md font-semibold text-[#3E0097] border-b border-[#3E0097] pb-1 mb-3 uppercase">
              Contact
            </h2>

            <div className="text-sm space-y-2">
              {data.personal.email && <p>{data.personal.email}</p>}
              {data.personal.phone && <p>{data.personal.phone}</p>}
              {data.personal.location && <p>{data.personal.location}</p>}
            </div>

          </section>

        </div>

      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-gray-400 py-4 border-t">
        {data.personal.fullName}
      </div>

    </div>
  );
};

export default Template4Minimal;