import React, {useContext, useMemo} from "react";
import {useTranslation} from "react-i18next";
import Button from "src/components/Buttons/Button";
import { ReactSVG } from 'react-svg'
import {ModalContext} from "src/contexts/ModalContext";
import VisitFieldForm from "src/components/forms/VisitFieldForm";
import {useLocation} from "react-router-dom";
import {PriceContext} from "src/contexts/PriceContext";
import CountUp from "react-countup";
import {formatUintToDecimal} from "src/utils/formatUtils";

const MainFooter: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="px-4 py-16 md:py-24 bg-blue text-white">
      <div className="max-w-4xl flex flex-col space-y-4 md:space-y-0 md:grid grid-cols-10 m-auto gap-12">
        <div className="col-span-2">
          <img src="/logos/logo.svg" className="w-[70%] md:w-full" />
        </div>
        <div className="col-span-4">
          <div className="space-y-6 -mt-2">
            <h2 className="text-xl md:text-2xl">{t('main_footer.title')}</h2>
            <div className="text-sm underline">
              <a href="https://api.whatsapp.com/send?phone=+5491132921363&text=%C2%A1Hola!%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20de%20New%20Agro%20Coin." target="_blank">
                (+54) 911 3292 1363
              </a>
              <br />
              <a href="mailto:info@newagro.com.ar">
                info@newagro.com.ar
              </a>
            </div>
            <div className="text-xs">
              Av. Sgto. Cayetano Beliera 3025, B1629,
              Parque Empresarial Austral, Edificio M3,
              Piso 1, Oficina 15A
            </div>
          </div>
        </div>
        <div className="col-span-4 space-y-6 flex flex-col justify-between">
          <div className="grid grid-cols-2 text-xs gap-2">
            <a href="https://newagrocoin.com/#contact">{t('main_footer.work_with_us')}</a>
            <a href="https://www.instagram.com/newagrocoin/" className="text-right">Instagram</a>
            <a href="https://newagrocoin.com/anexo/terminos-y-condiciones.html">{t('main_footer.terms')}</a>
            <a href="https://medium.com/@NewAgroCoin" className="text-right">Medium</a>
            <a href="https://newagrocoin.com/anexo/politicas-y-privacidad.html">{t('main_footer.policies')}</a>
            <a href="https://www.linkedin.com/company/newagro-coin/" className="text-right">Linkedin</a>
            <a href="https://newagrocoin.gitbook.io/whitepaper/referentes">{t('main_footer.who_are_we')}</a>
          </div>
          <h2 className="text-sm !mt-12 md:mt-0 text-center md:text-left pt-8 md:pt-0 border-t md:border-0">© 2022 New Agro Coin. All rights reserved.</h2>
        </div>
      </div>
    </div>
  );
}

export default MainFooter;
