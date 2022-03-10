import React, {useContext} from "react";
import InvestCard from "src/components/HomeCard/InvestCard";
import {useTranslation} from "react-i18next";
import {PriceContext} from "src/contexts/PriceContext";
import {ReactSVG} from "react-svg";
import {NMILK_TOKENS_BY_COW} from "src/config/constants";
import {formatCurrency} from "src/utils/currency";
import { formatUintToDecimal } from "src/utils/formatUtils";

const Investment: React.FC = () => {
  const { t } = useTranslation();
  const {milkingCows, userMilkingCows, historicalEarning, nmilkUserDeposited, nmilkUserEarns, nmilkApr, nmilkProfitability, nmilkExchangeRate} = useContext(PriceContext);

  return (
    <div className="xl:p-10 xl:flex xl:flex-col">
      <h3 className="text-blue text-center text-xs md:text-lg xl:px-10">{t('investment.text')}</h3>
      <div className="xl:px-10 xl:grid xl:grid-cols-4 xl:gap-4">
        <div className="col-span-3 px-5 py-5 lg:px-20 md:py-8 flex-3">
          <InvestCard
            title={t('investment.card_milk.title')}
            subtitle={t('investment.card_milk.subtitle', {apr: nmilkApr.toFixed(5)})}
            token={"nmilk"}
            deposit={nmilkUserDeposited}
            earn={nmilkUserEarns}
            totalAssets={nmilkUserDeposited * nmilkExchangeRate}
            image={'images/photos/bg_nmilk.jpeg'}
          />
          <br/>
          <br/>
          <InvestCard
            title={t('investment.card_beef.title')}
            subtitle={t('investment.card_beef.subtitle', {apr: 0})}
            token={"nbeef"}
            deposit={0}
            earn={0}
            totalAssets={0}
            image={'images/photos/bg_nbeef.jpeg'}
            containerClasses={"opacity-50 pointer-events-none"}
          />
          <br/>
          <br/>
          <InvestCard
            title={t('investment.card_land.title')}
            subtitle={t('investment.card_land.subtitle', {apr: 0})}
            token={"nland"}
            deposit={0}
            earn={0}
            totalAssets={0}
            image={'images/photos/bg_nland.jpeg'}
            containerClasses={"opacity-50 pointer-events-none"}
          />
          <br/>
        </div>


        <div className="lg:py-8">
          <div className={`flex flex-col items-center w-full rounded-lg border-green border-2 shadow`}>
            <div className={`w-full flex flex-col px-10 py-5 border-b-green border-b-2 border-green`}>
              <h3 className="text-blue font-bold text-lg">{t('investment.rentability.title1')}</h3>
              <p className="text-blue text-3xl mb-3">{Math.round(milkingCows)}</p>
              <p className="text-blue text-sm">{t("investment.rentability.description")}</p>
              <h3 className="text-blue font-bold text-lg mt-3">{t('investment.rentability.subtitle1')}</h3>
              <h4 className="text-blue font-bold">{t("investment.rentability.profitability_description", {value: formatCurrency(nmilkProfitability)})}</h4>
            </div>
            <div className={`w-full flex flex-col px-10 py-5 border-bottom-2 border-green/[.5]`}>
              <h3 className="text-blue font-bold text-lg mb-4">{t('investment.rentability.title2')}</h3>
              <div className="h-full flex flex-col justify-evenly mb-4 md:justify-betweenmd:px-7">
                <h3 className="text-green font-semibold text-sm md:text-lg">{t('investment.rentability.currentBalance')}</h3>
                <div className="flex">
                  <ReactSVG
                    src="icons/cow.svg"
                    beforeInjection={(svg) => {
                      svg.classList.add('fill-green');
                      svg.classList.add('mr-4');
                      svg.classList.add('text-sm');
                      svg.classList.add('md:text-lg');
                    }}
                  />
                  <p className="text-green font-semibold text-sm md:text-lg">{t('investment.cows', {value:  Math.round(userMilkingCows / NMILK_TOKENS_BY_COW)})}</p>
                </div>
              </div>
              <h4 className="text-blue font-bold">{t('investment.rentability.subtitle2')}</h4>
              <h3 className="text-green font-bold text-lg">{formatUintToDecimal(historicalEarning)} NAC</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investment;
