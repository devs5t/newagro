import Navbar from "../../components/navbar/Navbar";
import Footer from "src/components/footer";

const Layout = ({ children }) => {

  return (
    <>
      <Navbar/>
      <div className="flex flex-col md:flex-row">
        <main className="main flex flex-col min-h-screen dark:bg-d-1 flex-no-wrap px-5 py-5 md:px-20 md:py-8 border-r-2 border-grey flex-1">
          {children}
        </main>

        <Footer/>
      </div>
    </>
  );
};

export default Layout;
