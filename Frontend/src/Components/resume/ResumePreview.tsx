import React from "react";

interface Props {
  resumeData: any;
}

const ResumePreview: React.FC<Props> = ({ resumeData }) => {

  return (
    <div className="bg-white shadow-lg p-10 w-[794px] min-h-[1123px] mx-auto">

      <h1 className="text-3xl font-bold">
        {resumeData.personal.fullName || "Your Name"}
      </h1>

      <p className="text-blue-600 font-medium mt-2">
        {resumeData.personal.title || "Your Title"}
      </p>

      <div className="mt-4 text-sm text-gray-600 space-x-4">
        <span>{resumeData.personal.email}</span>
        <span>{resumeData.personal.phone}</span>
        <span>{resumeData.personal.location}</span>
      </div>

      <hr className="my-6" />

    </div>
  );
};

export default ResumePreview;
