import type { ResumeData } from "../types/resume.types";

import Template1Classic from "../templates/Template1Classic";
import Template2Modern from "../templates/Template2Modern";
import Template3Executive from "../templates/Template3Executive";
import Template4Minimal from "../templates/Template4Minimal";
import Template5Sidebar from "../templates/Template5Sidebar";
import Template6Corporate from "../templates/Template6Corporate";
import Template7Creative from "../templates/Template7Creative";
import Template8Elegant from "../templates/Template8Elegant";

interface Props {
  templateId: number;
  data: ResumeData;
}

const TemplateRenderer: React.FC<Props> = ({ templateId, data }) => {
  switch (templateId) {
    case 1:
      return <Template1Classic data={data} />;
    case 2:
      return <Template2Modern data={data} />;
    case 3:
      return <Template3Executive data={data} />;
    case 4:
      return <Template4Minimal data={data} />;
    case 5:
      return <Template5Sidebar data={data} />;
    case 6:
      return <Template6Corporate data={data} />;
    case 7:
      return <Template7Creative data={data} />;
    case 8:
      return <Template8Elegant data={data} />;
    default:
      return <Template1Classic data={data} />;
  }
};

export default TemplateRenderer;
