import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template7Creative: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white mx-auto shadow-lg px-12 py-10 font-serif text-gray-900">

      {/* ================= NAME ================= */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold italic text-[#00367B]">
          {data.personal.fullName}
        </h1>
      </div>

      {/* ================= PERSONAL INFO ================= */}
      <div className="text-center text-sm text-gray-700 space-y-1 mb-8">
        {data.personal.email && <p>{data.personal.email}</p>}
        {data.personal.phone && <p>{data.personal.phone}</p>}
        {data.personal.location && <p>{data.personal.location}</p>}
      </div>

      {/* ================= SUMMARY ================= */}
      {data.personal.summary && (
        <Section title="Profile">
          <p className="leading-relaxed text-sm">
            {data.personal.summary}
          </p>
        </Section>
      )}

      {/* ================= EXPERIENCE ================= */}
      <Section title="Work Experience">
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-5">

            <div className="flex justify-between">
              <span className="font-bold">
                {exp.company}
              </span>
              <span className="italic text-sm">
                {exp.duration}
              </span>
            </div>

            <div className="italic text-sm mb-2">
              {exp.role}
            </div>

            {exp.description && (
              <ul className="ml-6 space-y-1 text-sm">
                {exp.description.split("\n").map((point, index) => (
                  <li key={index} className="flex">
                    <span className="text-[#00367B] mr-2">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Section>

      {/* ================= EDUCATION ================= */}
      {data.education.length > 0 && (
        <Section title="Education">
          {data.education.map((edu, i) => (
            <div key={i} className="mb-3 flex justify-between">
              <div>
                <p className="font-bold">{edu.degree}</p>
                <p className="italic text-sm">{edu.institution}</p>
              </div>
              <span className="italic text-sm">
                {edu.year}
              </span>
            </div>
          ))}
        </Section>
      )}

      {/* ================= SKILLS ================= */}
      {data.skills.length > 0 && (
        <Section title="Technical Skills">
          <p className="text-sm">
            {data.skills.join(", ")}
          </p>
        </Section>
      )}

    </div>
  );
};

/* ================= SECTION COMPONENT ================= */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mb-8">
    <h2 className="text-[#00367B] font-bold italic mb-2">
      {title}
    </h2>
    <div className="h-[2px] bg-[#00367B] mb-4"></div>
    {children}
  </div>
);

export default Template7Creative;