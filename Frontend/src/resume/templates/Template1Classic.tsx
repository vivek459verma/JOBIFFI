import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template1Classic: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white mx-auto shadow-lg font-sans text-gray-800">

      {/* ================= HEADER ================= */}
      <div className="bg-gray-100 p-8 flex gap-6 items-center border-b">

        {/* Profile Image */}
        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center text-sm">
          {data.personal.photo ? (
            <img
              src={data.personal.photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            "Photo"
          )}
        </div>

        {/* Personal Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {data.personal.fullName}
          </h1>

          <p className="text-blue-600 font-medium mb-2">
            {data.personal.title}
          </p>

          <div className="text-sm text-gray-600 space-y-1">
            {data.personal.email && <p>{data.personal.email}</p>}
            {data.personal.phone && <p>{data.personal.phone}</p>}
            {data.personal.location && <p>{data.personal.location}</p>}
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
              <h2 className="text-lg font-semibold border-b pb-2 mb-3">
                Professional Summary
              </h2>
              <p className="text-sm leading-6">
                {data.personal.summary}
              </p>
            </section>
          )}

          {/* EXPERIENCE */}
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                Experience
              </h2>

              {data.experience.map((exp, index) => (
                <div key={index} className="mb-6">
                  <h3 className="font-semibold">{exp.role}</h3>

                  <p className="text-xs text-gray-500 mb-2">
                    {exp.company}
                    {(exp.startDate || exp.endDate) && (
                      <> | {exp.startDate} - {exp.endDate || "Present"}</>
                    )}
                  </p>

                  {/* Achievements */}
                  {exp.achievements && exp.achievements.length > 0 ? (
                    <ul className="list-disc ml-5 text-sm space-y-1">
                      {exp.achievements.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    exp.description && (
                      <p className="text-sm">{exp.description}</p>
                    )
                  )}
                </div>
              ))}
            </section>
          )}

        </div>

        {/* RIGHT COLUMN */}
        <div className="w-1/2 space-y-8">

          {/* EDUCATION */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                Education
              </h2>

              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{edu.degree}</h3>

                  <p className="text-xs text-gray-500">
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

                  {edu.description && (
                    <p className="text-sm mt-1">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* SKILLS */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                Skills
              </h2>

              <div className="space-y-4">
                {data.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.years}</span>
                    </div>

                    <div className="w-full h-2 bg-gray-300">
                      <div
                        className="h-2 bg-blue-600"
                        style={{ width: `${skill.level || 70}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="border-t p-6 text-center text-xs text-gray-600">
        {data.personal.fullName}
        {data.personal.email && <> • {data.personal.email}</>}
        {data.personal.phone && <> • {data.personal.phone}</>}
      </div>

    </div>
  );
};

export default Template1Classic;