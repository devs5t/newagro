import Navbar from "../../components/navbar/Navbar";
import Footer from "src/components/footer";
import React, {useEffect} from "react";
import {useEthers} from "@usedapp/core";
import {useReloadPrices} from "src/hooks/useReloadPrices";
import {useLocalStorage} from "react-use";
import GlobalPassword from "src/components/GlobalPassword";

const Layout: React.FC = ({ children }) => {
  const {reloadPrices} = useReloadPrices();
  const {account} = useEthers();
  const globalPassword = String(import.meta.env.VITE_APP_GLOBAL_PASSWORD);
  const [password] = useLocalStorage("password", '');

  useEffect(() => {
    reloadPrices();
  }, [account]);

  if (!!globalPassword && globalPassword !== password) {
    return <GlobalPassword/>
  }

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
