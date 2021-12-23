import Navbar from "../../components/navbar/Navbar";
import Footer from "src/components/footer";

const Layout = ({ children }) => {

  return (
    <>
      <Navbar/>
      <div className="flex flex-col md:flex-row">
        <main className="main flex flex-col min-h-screen dark:bg-d-1 flex-no-wrap py-8 px-20 border-r-2 border-grey flex-1">
          {children}
        </main>

        <Footer/>
      </div>
    </>
  );
};

export default Layout;
