import TemplateRenderer from "./TemplateRenderer";
import type { ResumeData } from "../types/resume.types";

interface Props {
  templateId: number;
  data: ResumeData;
}

const ResumePreview: React.FC<Props> = ({ templateId, data }) => {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center py-10">
      <div className="bg-white shadow-lg w-[794px] min-h-[1123px]">
        <TemplateRenderer templateId={templateId} data={data} />
      </div>
    </div>
  );
};

export default ResumePreview;
