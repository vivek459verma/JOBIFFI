import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template3Executive: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white mx-auto shadow-lg font-serif text-[#303030] p-10">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-10">

        {data.personal.photo && (
          <img
            src={data.personal.photo}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
          />
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
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-4 uppercase tracking-wide">
                Work Experience
              </h2>

              {data.experience.map((exp, i) => (
                <div key={i} className="mb-6">

                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate || "Present"}
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
          {data.education.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-4 uppercase tracking-wide">
                Education
              </h2>

              {data.education.map((edu, i) => (
                <div key={i} className="mb-5">

                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>

                  <h3 className="font-semibold">
                    {edu.degree}
                  </h3>

                  <p className="italic text-sm">
                    {edu.institution}
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

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">

          {/* PERSONAL INFO BOX */}
          <section className="bg-[#F5DD9D] p-5 rounded">

            <h2 className="font-semibold mb-3 uppercase text-sm">
              Contact
            </h2>

            <div className="text-sm space-y-1">
              {data.personal.location && <p>{data.personal.location}</p>}
              {data.personal.phone && <p>{data.personal.phone}</p>}
              {data.personal.email && <p>{data.personal.email}</p>}
              {data.personal.linkedin && <p>{data.personal.linkedin}</p>}
              {data.personal.github && <p>{data.personal.github}</p>}
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
          {data.skills.length > 0 && (
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

        </div>

      </div>

      {/* ================= FOOTER ================= */}
      <div className="mt-12 text-center text-xs text-gray-500 border-t pt-4">
        {data.personal.fullName}
        {data.personal.email && <> • {data.personal.email}</>}
        {data.personal.phone && <> • {data.personal.phone}</>}
      </div>

    </div>
  );
};

export default Template3Executive;