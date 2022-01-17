import Navbar from "../../components/navbar/Navbar";
import Footer from "src/components/footer";
import React from "react";

const Layout: React.FC = ({ children }) => {

  return (
    <>
      <Navbar/>
      <div className="flex flex-col md:flex-row">
        <main className="main flex flex-col min-h-screen dark:bg-d-1 flex-no-wrap px-5 py-5 md:px-20 xl:py-8 flex-1">
          {children}
        </main>
        <Footer/>
      </div>
    </>
  );
};

export default Layout;
