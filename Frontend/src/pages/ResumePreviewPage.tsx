import { useParams } from "react-router-dom";
import TemplateRenderer from "../resume/components/TemplateRenderer";
import { resumeData } from "../resume/data/resumeData";
import { exportToPDF } from "../resume/utils/exportPdf";

const ResumePreviewPage = () => {
  const { id } = useParams();

  const templateId = Number(id) || 1;

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center py-8">

      {/* Top Controls */}
      <div className="w-[794px] flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-700">
          Resume Preview
        </h1>

        <button
          onClick={() => exportToPDF("resume-preview")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Download PDF
        </button>
      </div>

      {/* Resume A4 Container */}
      <div
        id="resume-preview"
        className="bg-white shadow-lg w-[794px] min-h-[1123px]"
      >
        <TemplateRenderer
          templateId={templateId}
          data={resumeData}
        />
      </div>
    </div>
  );
};

export default ResumePreviewPage;
