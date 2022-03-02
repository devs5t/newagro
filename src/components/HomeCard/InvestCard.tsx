import React, {useContext, useState} from "react";
import Button from '../Buttons/Button';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ModalContext} from "src/contexts/ModalContext";
import DepositTokenForm from "src/components/forms/DepositTokenForm";
import {upperCase} from "lodash";
import {NMILK_TOKENS_BY_COW} from "src/config/constants";

interface InvestCardProps {
  title: string;
  subtitle: string;
  token: 'nmilk' | 'nbeef' | 'nland';
  containerClasses?: string;
  image: string;
  deposit: number;
  earn: number;
}

const InvestCard: React.FC<InvestCardProps> = ({
  title,
  subtitle,
  token,
  containerClasses,
  image,
  deposit,
  earn
}) => {
  const {t} = useTranslation();
  const {setModal} = useContext(ModalContext);
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`flex flex-col md:flex-row  w-full rounded-lg bg-lightblue/[.15] py-8 px-5 shadow relative grid grid-cols-1 md:grid-cols-2 cursor-pointer ${containerClasses}`}
      onClick={() => setOpen(!open)}
    >
      <div style={{backgroundImage: `url(${image})`}} className="absolute rounded-full -top-6 -right-2 right-0 h-24 w-24 bg-center bg-cover opacity-75 md:h-44 md:w-44 md:top-1/2 md:transform md:-translate-y-1/2 md:-left-16"/>
      <div className="w-full mt-5 relative md:pl-32 md:mt-0">
        <h3 className="text-blue font-bold text-left text-lg md:text-3xl">{title}</h3>
        <h2 className="text-blue font-bold text-left font-bold md:text-3xl">{subtitle}</h2>
        <Link className="absolute bottom-0 right-0 md:relative" to={`/exchange?token=${token}`} target={'_self'}>
          <span className="text-blue text-xs underline md:text-xl">
            {t('investment.card_beef.buy')} {upperCase(token)}
          </span>
        </Link>
      </div>
      <div className={"grid grid-cols-2 gap-2 mt-5 w-full md:mt-0"}>
        <div className="border-2 border-green/[.5] rounded-lg w-full">
          <h3 className="py-1 text-green font-bold text-center text-xs border-b-green/[.5] border-b-2 border-green md:text-lg">{upperCase(token)} - {t('investment.deposited')}</h3>
          <p className="text-3xl 2xl:text-6xl xl:text-4xl lg:text-3xl text-green text-center mt-2 md:mt-0">{deposit}</p>
          <p className="text-xs font-medium text-blue text-center mb-2 md:text-base">{t('investment.cows', {value:  Math.round(deposit / NMILK_TOKENS_BY_COW)})}</p>
        </div>
        <div className="border-2 border-green/[.5] rounded-lg w-full">
          <h3 className="py-1 text-green font-bold text-center text-xs border-b-green/[.5] border-b-2 border-green md:text-lg md:px-4">NAC - {t('investment.earnings')}</h3>
          <p className="text-3xl 2xl:text-6xl xl:text-4xl lg:text-3xl text-green text-center mt-2 md:mt-0">{earn}</p>
          <p className="text-xs font-medium text-blue text-center mb-2 md:text-base">{t('investment.cows', {value:  Math.round(earn / NMILK_TOKENS_BY_COW)})}</p>
        </div>
      </div>

      {open && (
        <>
          <div className="mt-4 w-full md:pl-32">
            <a className="w-full underline text-blue font-bold pointer">
              <p className="w-full underline text-blue font-bold">{t('investment.watch_cams')}</p>
            </a>
          </div>
          <div className={"grid grid-cols-2 gap-2 mt-5 w-full mt-5"}>
            <Button
              text={t('investment.deposit_buy')}
              extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0"
              onClick={() => setModal({
                component: () => DepositTokenForm({token}),
                title: `${t('deposit_token_form.deposit')} ${upperCase(token)}`
              })}
            />
            <Button
              text={`${t('investment.retire')} NAC`}
              extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0"
            />
            <Button
              text={`${t('investment.withdraw')} ${upperCase(token)}`}
              extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0"
            />
            <Button
              text={`${t('investment.reinvest')} NAC`}
              extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0"
            />
          </div>
          <div className="mt-6  w-full md:pl-32">
            <p className="w-full text-blue text-xs">Acá va a ir más info desplegada para el inversor desconocido / usuarios nuevos</p>
          </div>
          <div className={"rounded-lg border-2 border-green bg-blue/[.10] w-full mt-5 p-2"}>
            <h4 className="text-blue text-center font-bold text-lg">{t('investment.card_milk.actives')}</h4>
            <p className="text-center text-blue text-2xl">USD 100.345</p>
          </div>
        </>
      )}
    </div>
  );
}


export default InvestCard;