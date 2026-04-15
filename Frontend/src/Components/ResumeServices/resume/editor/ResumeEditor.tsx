import type { ResumeData } from "../types/resume.types";

interface Props {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const ResumeEditor: React.FC<Props> = ({ data, setData }) => {
  return (
    <div className="space-y-6">

      {/* Personal Info */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Personal Information</h2>

        <input
          type="text"
          value={data.personal.fullName}
          onChange={(e) =>
            setData({
              ...data,
              personal: { ...data.personal, fullName: e.target.value },
            })
          }
          placeholder="Full Name"
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="text"
          value={data.personal.title}
          onChange={(e) =>
            setData({
              ...data,
              personal: { ...data.personal, title: e.target.value },
            })
          }
          placeholder="Title (e.g. Software Engineer)"
          className="w-full border p-2 rounded mb-3"
        />

        <textarea
          value={data.personal.summary}
          onChange={(e) =>
            setData({
              ...data,
              personal: { ...data.personal, summary: e.target.value },
            })
          }
          placeholder="Professional Summary"
          className="w-full border p-2 rounded"
        />
      </div>

<div className="mb-4">
  <label className="block text-sm font-medium mb-1">
    Profile Photo
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setData({
          ...data,
          personal: {
            ...data.personal,
            photo: reader.result as string,
          },
        });
      };

      reader.readAsDataURL(file);
    }}
    className="text-sm"
  />

  {data.personal.photo && (
    <img
      src={data.personal.photo}
      alt="Preview"
      className="mt-3 w-32 h-32 object-cover rounded"
    />
  )}
</div>
    </div>
  );
};

export default ResumeEditor;
