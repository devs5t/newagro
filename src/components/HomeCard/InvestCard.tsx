import React from "react";
import Button from '../Buttons/Button';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface InvestCardProps {
  title: string;
  subtitle: string;
  token: string;
  containerClasses?: string;
  image: string;
  deposit: string;
  earn: string;
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
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col md:flex-row  w-full rounded-lg bg-lightblue/[.15] py-8 px-5 shadow relative  ${containerClasses}`}>
      <div style={{backgroundImage: `url(${image})`}} className="absolute rounded-full -top-6 -right-2 right-0 h-24 w-24 bg-center bg-cover opacity-75 md:h-44 md:w-44
       md:top-1/2 md:transform md:-translate-y-1/2 md:-left-16"/>
      <div className="w-full mt-5 relative md:ml-32 md:mt-0">
        <h3 className="text-blue font-bold text-left text-lg md:text-4xl">{title}</h3>
        <h2 className="text-blue font-bold text-left font-bold md:text-3xl">{subtitle}</h2>
        <Link className="absolute bottom-0 right-0 md:relative" to={`/purchase?token=${token}`} target={'_self'}>
          <span className="text-blue text-xs underline md:text-xl">{t('investment.card_beef.buy')} {token}</span>
        </Link>
      </div>
      <div className={"grid grid-cols-2 gap-2 mt-5 w-full md:mt-0"}>
        <div className="border-2 border-green/[.5] rounded-lg w-full">
          <h3 className="py-1 text-green font-bold text-center text-xs border-b-green/[.5] border-b-2 border-green md:text-xl">{token} - Depositado</h3>
          <p className="text-3xl text-green text-center mt-2 md:text-6xl md:mt-0">{deposit}</p>
          <p className="text-xs font-medium text-blue text-center mb-2 md:text-base">(1,3 vacas)</p>
        </div>
        <div className="border-2 border-green/[.5] rounded-lg w-full">
          <h3 className="py-1 text-green font-bold text-center text-xs border-b-green/[.5] border-b-2 border-green md:text-xl md:px-4">NAC - Ganancias</h3>
          <p className="text-3xl text-green text-center mt-2 md:text-6xl md:mt-0">{earn}</p>
          <p className="text-xs font-medium text-blue text-center mb-2 md:text-base">(1,2 vacas)</p>
        </div>
      </div>
    </div>
  );
}


export default InvestCard;