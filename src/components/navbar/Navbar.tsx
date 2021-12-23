import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import { ConnectWalletButton } from "src/features/App/ConnectWalletButton";
import {NavLink, Link} from "react-router-dom";
import NavbarLanguagesDropdown from "src/components/navbar/NavbarLanguagesDropdown";
import {ReactSVG} from "react-svg";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const links: {path: string, name: string}[] = [
    {path: '/home', name: t('navbar.home')},
    {path: '/investment', name: t('navbar.investment')},
    {path: '/exchange', name: t('navbar.exchange')},
    {path: '/docs', name: t('navbar.docs')},
    {path: '/news', name: t('navbar.news')}
  ];

  return (
    <>
      <div className="relative w-full bg-blue">

        <div className="flex justify-between items-center py-4 mx-auto px-6 md:px-10">
          <div className="flex justify-start navbar-logo">
            <button
              className="lg:hidden cursor-pointer mr-4"
              onClick={() => setSidebarOpen(true)}
            >
              <ReactSVG
                src="icons/menu.svg"
                beforeInjection={(svg) => {
                  svg.classList.add('fill-white');
                }}
              />
            </button>

            <Link to="/" className="flex items-center flex-shrink-0 text-white md:mr-6">
              <img className="h-4 xl:h-6 w-auto" src="logos/logo.svg" alt="logo"/>
            </Link>
          </div>

          <nav className="hidden lg:flex lg:flex-grow justify-around max-w-4xl">
            {links.map((link, index) => (
              <NavLink
                to={link.path}
                className={({ isActive }) => `block text-white uppercase text-xs xl:text-sm font-bold ${
                  isActive ? 'underline underline-offset-8 decoration-green decoration-2' : ''
                }`}
                key={index}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>


          <div className="flex justify-end ml-4 items-center">
            <NavbarLanguagesDropdown />
            <ConnectWalletButton />
          </div>

        </div>

        <div className={`transform top-0 left-0 w-64 bg-blue fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="pt-5 pb-6 px-5">
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 cursor-pointer"
                onClick={() => setSidebarOpen(false)}
              >
                <ReactSVG src="icons/cross.svg"/>
              </button>
            </div>

            <div className="flex flex-col justify-center mt-8">
              {links.map((link, index) => (
                <NavLink
                  to={link.path}
                  className={({ isActive }) => `block text-white text-center uppercase text-md my-4 font-bold ${
                    isActive ? 'underline underline-offset-8 decoration-green decoration-4' : ''
                  }`}
                  key={index}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`z-10 fixed inset-0 transition-opacity bg-black opacity-50 ${sidebarOpen ? 'block' : 'hidden'}`}
          onClick={() => setSidebarOpen(false)}
        />

      </div>
    </>

  );
};

export default Navbar;
