import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template6Corporate: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white mx-auto shadow-lg px-10 py-6 font-sans text-gray-800 text-[13px] leading-relaxed">

      {/* ================= HEADER ================= */}
      <div className="border-b border-blue-600 pb-4 mb-6">

        <div className="grid grid-cols-3 items-start text-sm">

          {/* LEFT */}
          <div className="space-y-1 text-gray-600">
            {data.personal.phone && <p>{data.personal.phone}</p>}
            {data.personal.location && <p>{data.personal.location}</p>}
            {data.personal.email && <p>{data.personal.email}</p>}
          </div>

          {/* CENTER */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {data.personal.fullName}
            </h1>
            <p className="text-blue-700 font-medium">
              {data.personal.title}
            </p>
          </div>

          {/* RIGHT */}
          <div className="text-right text-gray-600 space-y-1">
            {/* Optional future: portfolio/github/linkedin */}
            <p>Portfolio</p>
            <p>github.com/username</p>
            <p>linkedin.com/in/username</p>
          </div>

        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      {data.personal.summary && (
        <section className="mb-5">
          <p className="text-gray-700">
            {data.personal.summary}
          </p>
        </section>
      )}

      {/* ================= SKILLS ================= */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-blue-700 font-semibold border-b border-gray-300 pb-1 mb-3 uppercase tracking-wide">
            Skills
          </h2>

          <div className="grid grid-cols-2 gap-x-8">
            <p><strong>Technical:</strong> {data.skills.join(", ")}</p>
            <p><strong>Tools:</strong> Git, Python, SQL</p>
          </div>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      <section className="mb-6">
        <h2 className="text-blue-700 font-semibold border-b border-gray-300 pb-1 mb-4 uppercase tracking-wide">
          Technical Experience
        </h2>

        {data.experience.map((exp, i) => (
          <div key={i} className="mb-5">

            <div className="flex justify-between font-semibold">
              <span>{exp.role}</span>
              <span className="text-gray-600">{exp.duration}</span>
            </div>

            <div className="flex justify-between text-gray-600 text-sm mb-2">
              <span>{exp.company}</span>
              <span>somewhere, state</span>
            </div>

            {exp.description && (
              <ul className="list-disc ml-5 space-y-1">
                {exp.description.split("\n").map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            )}

          </div>
        ))}
      </section>

      {/* ================= EDUCATION ================= */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-blue-700 font-semibold border-b border-gray-300 pb-1 mb-4 uppercase tracking-wide">
            Education
          </h2>

          {data.education.map((edu, i) => (
            <div key={i} className="flex justify-between mb-2">
              <div>
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-sm text-gray-600">
                  {edu.institution}
                </p>
              </div>
              <span className="text-gray-600">{edu.year}</span>
            </div>
          ))}
        </section>
      )}

      {/* ================= ACTIVITIES (Optional Future Section) ================= */}
      <section>
        <h2 className="text-blue-700 font-semibold border-b border-gray-300 pb-1 mb-3 uppercase tracking-wide">
          Activities
        </h2>

        <ul className="space-y-1">
          <li>Graduate Student Council Representative</li>
          <li>City Symposium Series – Poster Presenter</li>
          <li>Research Showcase – Presenter</li>
        </ul>
      </section>

    </div>
  );
};

export default Template6Corporate;