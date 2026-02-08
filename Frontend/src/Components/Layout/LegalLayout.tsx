import Navbar from "../Nav";
import Footer from "../Footer/footer";
import AsideFooter from "../Footer/AsideFooter";

type Props = {
  children: React.ReactNode;
};

const LegalLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />

      <main className="bg-blue-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-10 text-left">
          {children}
        </div>
      </main>

      <AsideFooter />
      <Footer />
    </>
  );
};

export default LegalLayout;