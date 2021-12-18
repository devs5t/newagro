import React from "react";
import { useTranslation } from "react-i18next";
import { ConnectWalletButton } from "src/features/App/ConnectWalletButton";
import {NavLink, Link} from "react-router-dom";

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  const links: {path: string, name: string}[] = [
    {path: '/home', name: t('navbar.home')},
    {path: '/investment', name: t('navbar.investment')},
    {path: '/exchange', name: t('navbar.exchange')},
    {path: '/docs', name: t('navbar.docs')},
    {path: '/news', name: t('navbar.news')},
    {path: '/administrator', name: t('navbar.administrator')},
  ]

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue py-6 px-10 text-white">
      <Link to="/" className="flex items-center flex-shrink-0 text-white mr-6">
        <img src="/public/logos/logo.svg" alt="logo"/>
      </Link>

      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto max-w-4xl">
        <div className="flex text-sm lg:flex-grow justify-around">
          {links.map((link, index) => (
            <NavLink
              to={link.path}
              className={({ isActive }) => `block text-white uppercase font-semibold ${
                isActive ? 'underline underline-offset-8 decoration-green decoration-2' : ''
              }`}
              key={index}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>

      <ConnectWalletButton />
    </nav>
  );
};

export default Navbar;
