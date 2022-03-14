import React, {useContext, useMemo} from "react";
import {useTranslation} from "react-i18next";
import Blog from "./Blog";
import Button from "src/components/Buttons/Button";
import { ReactSVG } from 'react-svg'
import {ModalContext} from "src/contexts/ModalContext";
import VisitFieldForm from "src/components/forms/VisitFieldForm";
import {useLocation} from "react-router-dom";
import {PriceContext} from "src/contexts/PriceContext";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const {setModal} = useContext(ModalContext);
  const {nacExchangeRate} = useContext(PriceContext);

  const socialLinks: {name: string, url: string, icon: string}[] = [
    {name: 'Medium', url: 'https://medium.com/@NewAgroCoin', icon: 'icons/medium.svg'},
    {name: 'Telegram', url: 'https://t.me/NewAgroCoin', icon: 'icons/telegram.svg'},
    {name: 'LinkedIn', url: 'https://www.linkedin.com/company/newagro-coin', icon: 'icons/linkedin.svg'},
    {name: 'Instagram', url: 'https://www.instagram.com/newagrocoin', icon: 'icons/instagram.svg'},
  ];

  const location = useLocation();

  const isInHome: boolean = useMemo(() => {
    const supportedPaths: string[] = ['home'];
    for (const supportedPath of supportedPaths) {
      if (location.pathname.includes(supportedPath)) {
        return true
      }
    }
    return false;
  }, [location.pathname]);

  return (
    <div className={`w-full md:max-w-xs md:border-l-2 md:border-grey ${!isInHome ? 'md:hidden' : ''}`}>
      <div className="hidden md:flex flex-col justify-center items-center h-64 border-b-2 border-grey">
        <p className="uppercase font-medium text-xl	text-blue">{t('footer.exchange_rate')}</p>
        <p className="uppercase font-black mt-2 text-2xl text-blue">1 USD = {nacExchangeRate} NAC</p>
      </div>

      {isInHome && (
        <Blog />
      )}

      <div className="flex flex-col md:flex-col-reverse justify-center md:mb-4 px-6 bg-blue md:bg-transparent py-20 md:py-2">
        <Button
          text={t("footer.about_us")}
          extraClasses="hidden md:block border-green text-green font-bold w-full"
          link="https://newagro.com.ar/"
          linkTarget="_blank"
        />
        <Button
          text={t("footer.field_visit")}
          extraClasses="border-white md:border-green text-white md:text-green mb-4 font-bold self-center md:self-auto"
          onClick={() => setModal({
            component: VisitFieldForm,
            title: t('field_visit_form.title')
          })}
        />

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
            <a
              key={key}
              href={socialLink.url}
              target="_blank"
              rel="noreferrer"
              className="mx-4"
            >
              <ReactSVG
                src={socialLink.icon}
                beforeInjection={(svg) => {
                  svg.classList.add('fill-white');
                  svg.classList.add('md:fill-green');
                  svg.classList.add('w-6');
                  svg.classList.add('h-6');
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
