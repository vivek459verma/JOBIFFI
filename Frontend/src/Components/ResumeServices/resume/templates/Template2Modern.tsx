import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
}

const Template2Modern: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white shadow-lg mx-auto flex font-sans text-gray-800">

      {/* ================= LEFT SIDEBAR ================= */}
      <div className="w-[35%] bg-gray-900 text-white p-8 flex flex-col space-y-10">

        {/* PHOTO + NAME */}
        <div className="text-center">
          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-gray-700 shadow-xl mb-6 bg-gray-800 flex items-center justify-center">
            {data.personal.photo ? (
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
            ) : (
               <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest">No Portrait</span>
            )}
          </div>

          <h1 className="text-2xl font-black tracking-tight leading-tight uppercase">
            {data.personal.fullName}
          </h1>

          <p className="text-[10px] text-blue-400 font-black mt-3 uppercase tracking-[0.2em]">
            {data.personal.title}
          </p>
        </div>

        {/* CONTACT DETAILS */}
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-gray-800 pb-3 mb-5 text-gray-500">
            Contact
          </h2>

          <div className="space-y-4 text-[11px] font-medium text-gray-300 break-all leading-tight">
            {data.personal.phone && (
              <div className="flex items-center gap-3">
                <svg className="w-3 h-3 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>{data.personal.phone}</span>
              </div>
            )}
            {data.personal.email && (
              <div className="flex items-center gap-3">
                <svg className="w-3 h-3 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>{data.personal.email}</span>
              </div>
            )}
            {data.personal.location && (
              <div className="flex items-start gap-3">
                <svg className="w-3 h-3 text-blue-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>{data.personal.location}</span>
              </div>
            )}
            {data.personal.linkedin && (
              <div className="flex items-center gap-3">
                <span className="text-blue-400 font-black text-[9px] shrink-0 w-3 text-center tracking-tighter">IN</span>
                <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="truncate hover:text-white transition-colors">{data.personal.linkedin.replace(/^https?:\/\//, '')}</a>
              </div>
            )}
            {data.personal.github && (
              <div className="flex items-center gap-3">
                <span className="text-blue-400 font-black text-[9px] shrink-0 w-3 text-center tracking-tighter">GH</span>
                <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="truncate hover:text-white transition-colors">{data.personal.github.replace(/^https?:\/\//, '')}</a>
              </div>
            )}
            {/* ✅ ADDED: Portfolio Link */}
            {data.personal.portfolio && (
              <div className="flex items-center gap-3">
                <svg className="w-3 h-3 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                <a href={data.personal.portfolio} target="_blank" rel="noopener noreferrer" className="truncate hover:text-white transition-colors">{data.personal.portfolio.replace(/^https?:\/\//, '')}</a>
              </div>
            )}
            {data.personal.website && (
              <div className="flex items-center gap-3">
                <svg className="w-3 h-3 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                <a href={data.personal.website} target="_blank" rel="noopener noreferrer" className="truncate hover:text-white transition-colors">{data.personal.website.replace(/^https?:\/\//, '')}</a>
              </div>
            )}
          </div>
        </div>

        {/* SKILLS */}
        {data.skills && data.skills.length > 0 && (
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-gray-800 pb-3 mb-5 text-gray-500">
              Expertise
            </h2>
            <div className="space-y-4">
              {data.skills.map((skill, i) => (
                <div key={i}>
                  <div className="text-[11px] font-bold uppercase tracking-tight mb-2 flex justify-between">
                    <span>{skill.name}</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-1000 ease-out" style={{ width: '85%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LANGUAGES */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-gray-800 pb-3 mb-5 text-gray-500">
              Languages
            </h2>
            <div className="space-y-3">
              {data.languages.map((lang, i) => (
                <div key={i} className="text-[11px] font-bold uppercase flex justify-between">
                  <span>{lang.name}</span>
                  <span className="text-gray-500 tracking-wider text-[9px]">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= RIGHT CONTENT ================= */}
      <div className="w-[65%] p-14 flex flex-col space-y-12 bg-gray-50/20">
        
        {/* SUMMARY */}
        {data.personal.summary && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-5 flex items-center gap-4">
              <span className="shrink-0">Profile</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap italic font-medium">{data.personal.summary}</p>
          </section>
        )}

        {/* WORK HISTORY */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-8 flex items-center gap-4">
              <span className="shrink-0">Experience</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </h2>
            <div className="space-y-10">
              {data.experience.map((exp, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-14 top-0 font-black text-blue-600/10 text-4xl select-none group-hover:text-blue-600 transition-colors">{i + 1}</div>
                  <h3 className="font-black text-lg text-gray-900 leading-none mb-2">{exp.role}</h3>
                  <div className="flex justify-between items-center text-xs font-black text-blue-600 uppercase tracking-widest mb-4">
                    <span>{exp.company}</span>
                    <span className="text-gray-400 font-medium lowercase italic">
                      {exp.duration ? exp.duration : `${exp.startDate} - ${exp.endDate || "Present"}`}
                    </span>
                  </div>
                  
                  {/* ✅ ADDED: Conditional rendering for Achievements array vs normal description */}
                  {exp.achievements && exp.achievements.length > 0 ? (
                    <ul className="list-disc ml-4 text-xs text-gray-600 space-y-1.5 font-medium leading-relaxed">
                      {exp.achievements.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    exp.description && (
                      <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap font-medium">{exp.description}</p>
                    )
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-8 flex items-center gap-4">
              <span className="shrink-0">Projects</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {data.projects.map((proj, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="font-black text-sm text-gray-900 mb-2 uppercase tracking-tight">{proj.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">{proj.description}</p>
                  {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="block mt-3 text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest truncate">{proj.link.replace(/^https?:\/\//, '')}</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-8 flex items-center gap-4">
              <span className="shrink-0">Academics</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </h2>
            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div key={i} className="flex gap-6 items-baseline">
                  <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest min-w-[80px]">{edu.year}</div>
                  <div>
                    <h3 className="font-black text-sm text-gray-900 uppercase tracking-tight">{edu.degree}</h3>
                    <p className="text-xs font-medium text-gray-500 mt-1">{edu.institution}</p>
                    {edu.gpa && <p className="text-[10px] font-bold text-gray-400 mt-1">GPA: {edu.gpa}</p>}
                    {/* ✅ ADDED: Education Description */}
                    {edu.description && <p className="text-[11px] leading-relaxed text-gray-500 mt-2 font-medium">{edu.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ✅ ADDED: CERTIFICATIONS */}
        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-8 flex items-center gap-4">
              <span className="shrink-0">Certifications</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </h2>
            <div className="space-y-5">
              {data.certifications.map((cert, i) => (
                <div key={i} className="flex flex-col">
                  <h3 className="font-black text-sm text-gray-900 uppercase tracking-tight">{cert.title}</h3>
                  {cert.issuer && <p className="text-xs font-medium text-gray-500 mt-1">{cert.issuer}</p>}
                  {cert.date && <p className="text-[10px] font-bold text-gray-400 mt-1">{cert.date}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default Template2Modern;