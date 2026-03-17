import Navbar from "../Components/Nav";
import Footer from "../Components/Footer/footer";
import AsideFooter from "../Components/Footer/AsideFooter";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="bg-blue-50 min-h-screen">
        {children}
        <AsideFooter />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
