import React from "react";
import { useTranslation } from "react-i18next";
import { ConnectWalletButton } from "src/features/App/ConnectWalletButton";
import {NavLink, Link} from "react-router-dom";
import NavbarLanguagesDropdown from "src/components/navbar/NavbarLanguagesDropdown";

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  const links: {path: string, name: string}[] = [
    {path: '/home', name: t('navbar.home')},
    {path: '/investment', name: t('navbar.investment')},
    {path: '/exchange', name: t('navbar.exchange')},
    {path: '/docs', name: t('navbar.docs')},
    {path: '/news', name: t('navbar.news')},
    {path: '/admin', name: t('navbar.admin')},
  ];

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue py-6 px-10 text-white">
      <Link to="/" className="flex items-center flex-shrink-0 text-white mr-6">
        <img src="logos/logo.svg" alt="logo"/>
      </Link>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto max-w-4xl">
        <div className="flex text-sm lg:flex-grow justify-around">
          {links.map((link, index) => (
            <NavLink
              to={link.path}
              className={({ isActive }) => `block text-white uppercase font-bold ${
                isActive ? 'underline underline-offset-8 decoration-green decoration-2' : ''
              }`}
              key={index}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>

      <div>
        <NavbarLanguagesDropdown />
        <ConnectWalletButton />
      </div>
    </nav>
  );
};

export default Navbar;
