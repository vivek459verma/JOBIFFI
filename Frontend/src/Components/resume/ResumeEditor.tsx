import React from "react";

interface Props {
  resumeData: any;
  setResumeData: any;
}

const ResumeEditor: React.FC<Props> = ({ resumeData, setResumeData }) => {

  const handleChange = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold mb-6">
        Resume Details
      </h1>

      {/* PERSONAL INFORMATION CARD */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Personal Information</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={resumeData.personal.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Job Title"
          value={resumeData.personal.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          value={resumeData.personal.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Phone"
          value={resumeData.personal.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Location"
          value={resumeData.personal.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

      </div>

    </div>
  );
};

export default ResumeEditor;
