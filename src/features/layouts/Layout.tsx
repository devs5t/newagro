import Navbar from "../../components/navbar/Navbar";
import Footer from "src/components/footer";
import React, {useMemo} from "react";
import {useLocation} from "react-router-dom";

const Layout: React.FC = ({ children }) => {

  const location = useLocation();

  const showFooter: boolean = useMemo(() => {
    const supportedPaths: string[] = ['home'];
    for (const supportedPath of supportedPaths) {
      if (location.pathname.includes(supportedPath)) {
        return true
      }
    }
    return false;
  }, [location.pathname]);

  return (
    <>
      <Navbar/>
      <div className="flex flex-col md:flex-row">
        <main className="main flex flex-col min-h-screen dark:bg-d-1 flex-no-wrap px-5 py-5 md:px-20 md:py-8 flex-1">
          {children}
        </main>
        {showFooter && (
          <Footer/>
        )}
      </div>
    </>
  );
};

export default Layout;
