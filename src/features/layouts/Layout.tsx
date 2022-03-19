import Navbar from "../../components/navbar/Navbar";
import Footer from "src/components/footer";
import React, {useEffect} from "react";
import {useEthers} from "@usedapp/core";
import {useReloadPrices} from "src/hooks/useReloadPrices";

const Layout: React.FC = ({ children }) => {
  const {reloadPrices} = useReloadPrices();
  const {account} = useEthers();

  useEffect(() => {
    // This is done because account value initialize as undefined, then goes to null nad finally the user address
    if (account !== undefined) {
      reloadPrices();
    }
  }, [account]);

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
