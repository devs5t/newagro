import * as React from "react";
import {useTranslation} from "react-i18next";
import Blog from "./Blog";


const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-shrink-0 w-72">
      <div className="flex flex-col w-full justify-center items-center h-64 border-b-2 border-grey">
        <p className="uppercase font-semibold text-xl	text-blue">{t('footer.exchange_rate')}</p>
        <p className="uppercase font-extrabold mt-2 text-2xl text-blue">1 USD = 200 NAC</p>
      </div>
      <Blog />
    </div>
  );
}

export default Footer;
