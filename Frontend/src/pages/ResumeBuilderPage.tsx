import { useState } from "react";
import ResumePreview from "../resume/components/ResumePreview";
import { resumeData as defaultData } from "../resume/data/resumeData";
import { useSearchParams } from "react-router-dom";
import type { ResumeData } from "../resume/types/resume.types";

const ResumeBuilderPage = () => {
  const [data, setData] = useState<ResumeData>(defaultData);

  // ✅ Get template from URL only
  const [searchParams] = useSearchParams();
  const selectedTemplate = Number(searchParams.get("template")) || 1;

  // =========================
  // PERSONAL FIELD UPDATE
  // =========================
  const updatePersonal = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  // =========================
  // SUMMARY UPDATE
  // =========================
  const updateSummary = (value: string) => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        summary: value,
      },
    }));
  };

  // =========================
  // SKILLS UPDATE
  // =========================
  const updateSkills = (value: string) => {
    const skills = value.split(",").map((skill) => ({
      name: skill.trim(),
      level: 70,
      years: "",
    }));

    setData((prev) => ({
      ...prev,
      skills,
    }));
  };

  // =========================
  // EDUCATION LOGIC
  // =========================
  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          year: "",
        },
      ],
    }));
  };

  const removeEducation = (index: number) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const updateEducation = (
    index: number,
    field: "institution" | "degree" | "year",
    value: string
  ) => {
    const updated = [...data.education];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setData((prev) => ({
      ...prev,
      education: updated,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* LEFT SIDE - FORM */}
      <div className="w-1/2 bg-white p-8 overflow-y-auto border-r">

        <h2 className="text-2xl font-semibold mb-8">
          Resume Details
        </h2>

        {/* PERSONAL INFO */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4">
            Personal Information
          </h3>

          <input
            type="text"
            value={data.personal.fullName}
            onChange={(e) => updatePersonal("fullName", e.target.value)}
            className="w-full border rounded p-3 mb-4"
            placeholder="Full Name"
          />

          <input
            type="text"
            value={data.personal.title}
            onChange={(e) => updatePersonal("title", e.target.value)}
            className="w-full border rounded p-3 mb-4"
            placeholder="Title"
          />

          <input
            type="email"
            value={data.personal.email}
            onChange={(e) => updatePersonal("email", e.target.value)}
            className="w-full border rounded p-3 mb-4"
            placeholder="Email"
          />

          <input
            type="text"
            value={data.personal.phone}
            onChange={(e) => updatePersonal("phone", e.target.value)}
            className="w-full border rounded p-3"
            placeholder="Phone"
          />
        </div>

        {/* SUMMARY */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4">
            Professional Summary
          </h3>

          <textarea
            rows={4}
            value={data.personal.summary}
            onChange={(e) => updateSummary(e.target.value)}
            className="w-full border rounded p-3"
          />
        </div>

        {/* SKILLS */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4">
            Skills
          </h3>

          <input
            type="text"
            value={data.skills.map((s) => s.name).join(", ")}
            onChange={(e) => updateSkills(e.target.value)}
            className="w-full border rounded p-3"
            placeholder="React, Node.js, Python"
          />
        </div>

        {/* EDUCATION */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4">
            Education
          </h3>

          {data.education.map((edu, index) => (
            <div key={index} className="border p-4 rounded mb-4">

              <input
                type="text"
                value={edu.institution}
                onChange={(e) =>
                  updateEducation(index, "institution", e.target.value)
                }
                className="w-full border rounded p-2 mb-2"
                placeholder="Institution"
              />

              <input
                type="text"
                value={edu.degree}
                onChange={(e) =>
                  updateEducation(index, "degree", e.target.value)
                }
                className="w-full border rounded p-2 mb-2"
                placeholder="Degree"
              />

              <input
                type="text"
                value={edu.year}
                onChange={(e) =>
                  updateEducation(index, "year", e.target.value)
                }
                className="w-full border rounded p-2 mb-2"
                placeholder="Year"
              />

              <button
                onClick={() => removeEducation(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={addEducation}
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Education
          </button>

        </div>
      </div>

      {/* RIGHT SIDE - PREVIEW */}
      <div className="w-1/2 p-8 overflow-y-auto">
        <ResumePreview templateId={selectedTemplate} data={data} />
      </div>

    </div>
  );
};

export default ResumeBuilderPage;