import * as React from "react";
import {useTranslation} from "react-i18next";
import Blog from "./Blog";
import Button from "src/components/Buttons/Button";


const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-shrink-0 w-72">
      <div className="flex flex-col justify-center items-center h-64 border-b-2 border-grey">
        <p className="uppercase font-medium text-xl	text-blue">{t('footer.exchange_rate')}</p>
        <p className="uppercase font-black mt-2 text-2xl text-blue">1 USD = 200 NAC</p>
      </div>
      <Blog />
      <div className="flex flex-col justify-center mb-4 px-6">
        <Button text={t("footer.field_visit")} extraClasses="border-green text-green mb-4 font-bold"/>
        <Button text={t("footer.about_us")} extraClasses="border-green text-green font-bold"/>
      </div>
    </div>
  );
}

export default Footer;
