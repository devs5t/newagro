import * as React from "react";
import {useTranslation} from "react-i18next";
import Blog from "./Blog";
import Button from "src/components/Buttons/Button";
import Instagram from "public/icons/instagram.svg"
import Medium from "public/icons/medium.svg"
import Telegram from "public/icons/telegram.svg"
import Twitter from "public/icons/twitter.svg"
import {Link} from "react-router-dom";
import { ReactSVG } from 'react-svg'

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const socialLinks: {name: string, url: string, icon: any}[] = [
    {name: 'Instagram', url: 'https://instagram.com', icon: Instagram},
    {name: 'Twitter', url: 'https://twitter.com', icon: Twitter},
    {name: 'Medium', url: 'https://medium.com', icon: Medium},
    {name: 'Telegram', url: 'https://telegram.com', icon: Telegram}
  ]

  return (
    <div className="w-full md:w-72">
      <div className="flex flex-col justify-center items-center h-64 border-b-2 border-grey">
        <p className="uppercase font-medium text-xl	text-blue">{t('footer.exchange_rate')}</p>
        <p className="uppercase font-black mt-2 text-2xl text-blue">1 USD = 200 NAC</p>
      </div>
      <Blog />
      <div className="flex flex-col md:flex-col-reverse justify-center md:mb-4 px-6 bg-blue md:bg-transparent py-20 md:py-2">
        <Button text={t("footer.about_us")} extraClasses="hidden md:block border-green text-green font-bold"/>
        <Button text={t("footer.field_visit")} extraClasses="border-white md:border-green text-white md:text-green mb-4 font-bold self-center md:self-auto"/>

        <a
          className="text-center text-white hover:underline cursor-pointer md:hidden"
          href="https://newagro.com.ar"
          target="_blank"
          rel="noreferrer"
        >
          www.newagro.com.ar
        </a>

        <div className="flex justify-center mt-8 md:mt-0 md:mb-8">
          {socialLinks.map((socialLink, key) => (
            <Link
              key={key}
              to={socialLink.url}
              rel="noreferrer"
              target="_blank"
              className="mx-4"
            >
              <ReactSVG
                src={socialLink.icon}
                beforeInjection={(svg) => {
                  svg.classList.add('fill-white');
                  svg.classList.add('md:fill-green');
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
