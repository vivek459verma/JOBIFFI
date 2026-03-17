import React from "react";

interface Props {
  children: React.ReactNode;
}

const ResumeBuilderLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen w-screen bg-gray-100 overflow-hidden">
      {children}
    </div>
  );
};

export default ResumeBuilderLayout;
