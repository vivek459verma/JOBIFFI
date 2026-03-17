import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template5Sidebar: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white mx-auto shadow-lg px-10 py-8 font-sans text-gray-800">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          {data.personal.fullName}
        </h1>

        <div className="mt-3 text-sm text-gray-600 space-x-3">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>• {data.personal.phone}</span>}
          {data.personal.location && <span>• {data.personal.location}</span>}
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      {data.personal.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-3 uppercase tracking-wide">
            Summary
          </h2>
          <p className="text-sm leading-6">
            {data.personal.summary}
          </p>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-4 uppercase tracking-wide">
          Work Experience
        </h2>

        {data.experience.map((exp, i) => (
          <div key={i} className="mb-5">
            <div className="flex justify-between">
              <h3 className="font-semibold">
                {exp.role}
              </h3>
              <span className="text-sm text-gray-500">
                {exp.duration}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-2">
              {exp.company}
            </p>

            {exp.description && (
              <p className="text-sm leading-6">
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* ================= PROJECTS (Optional future support) ================= */}
      {/* If later you add projects to ResumeData, you can map here */}

      {/* ================= EDUCATION ================= */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-4 uppercase tracking-wide">
          Education
        </h2>

        {data.education.map((edu, i) => (
          <div key={i} className="flex justify-between mb-3">
            <div>
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-sm text-gray-600">
                {edu.institution}
              </p>
            </div>
            <span className="text-sm text-gray-500">
              {edu.year}
            </span>
          </div>
        ))}
      </section>

      {/* ================= SKILLS ================= */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-3 uppercase tracking-wide">
          Skills
        </h2>

        <p className="text-sm leading-6">
          {data.skills.join(" • ")}
        </p>
      </section>

      {/* ================= FOOTER ================= */}
      <div className="text-center text-xs text-gray-400 mt-12">
        Last updated
      </div>

    </div>
  );
};

export default Template5Sidebar;