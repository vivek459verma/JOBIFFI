import Navbar from "../Components/Nav";

interface Props {
  children: React.ReactNode;
}

const ResumeLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        {children}
      </div>
    </>
  );
};

export default ResumeLayout;
