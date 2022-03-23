import React from "react";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import {ReactSVG} from "react-svg";

interface InvestmentAssetsCardProps {
  token: 'nmilk' | 'nland' | 'nbeef';
  assets: number;
  profitability: number;
  userAssets: number;
  historicalEarning: number;
  tokenIcon: string;
}

const InvestmentAssetsCard: React.FC<InvestmentAssetsCardProps> = ({
  token,
  assets,
  profitability,
  userAssets,
  historicalEarning,
  tokenIcon
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-[20rem] m-auto xl:m-0">
      <div className={`flex flex-col items-center w-full rounded-lg border-green border-2 shadow`}>
        <div className={`w-full flex flex-col px-10 py-5 border-b-green border-b-2 border-green`}>
          <h3 className="text-blue font-bold text-base">{t(`investment.rentability.${token}.assets_title`)}</h3>
          <CountUp
            className="text-blue text-2xl mb-3"
            end={assets}
            separator=","
            preserveValue={true}
          />
          <p className="text-blue text-xs">{t(`investment.rentability.${token}.assets_description`)}</p>
          <h3 className="text-blue font-bold text-base mt-3">{t(`investment.rentability.profitability`)}</h3>
          <CountUp
            className="text-blue font-bold text-sm"
            end={profitability}
            separator=","
            decimal="."
            decimals={2}
            suffix={` ${t(`investment.rentability.${token}.profitability_description`)}`}
            preserveValue={true}
          />
        </div>
        <div className={`w-full flex flex-col px-10 py-5 border-bottom-2 border-green/[.5]`}>
          <h3 className="text-blue font-bold text-base mb-4">{t(`investment.rentability.${token}.user_assets_title`)}</h3>
          <div className="h-full flex flex-col justify-evenly mb-4 md:justify-betweenmd:px-7">
            <h3 className="text-green font-semibold text-sm md:text-base">{t('investment.rentability.your_assets')}</h3>
            <div className="flex items-center">
              <ReactSVG
                src={tokenIcon}
                beforeInjection={(svg) => {
                  svg.classList.add('fill-green');
                  svg.classList.add('mr-4');
                  svg.classList.add('text-sm');
                  svg.classList.add('md:text-lg');
                }}
              />
              <CountUp
                className="text-green font-bold text-base mr-2"
                end={userAssets}
                separator=","
                decimal="."
                decimals={2}
                preserveValue={true}
              />
              <p className="text-sm text-green">{t(`investment.rentability.${token}.user_assets_description`)}</p>
            </div>
          </div>
          <h4 className="text-blue font-bold text-base">{t(`investment.rentability.historical_earnings`)}</h4>
          <CountUp
            className="text-green font-bold text-base"
            end={historicalEarning}
            separator=","
            decimal="."
            decimals={2}
            suffix=" NAC"
            preserveValue={true}
          />
        </div>
      </div>
    </div>
  );
};

export default InvestmentAssetsCard;
