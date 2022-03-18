import React, {useContext, useState} from "react";
import InvestCard from "src/components/HomeCard/InvestCard";
import {useTranslation} from "react-i18next";
import {PriceContext} from "src/contexts/PriceContext";
import {ReactSVG} from "react-svg";
import {NMILK_POOL_ID, NMILK_TOKENS_BY_COW} from "src/config/constants";
import {formatCurrency} from "src/utils/currency";
import {NmilkContext} from "src/contexts/NmilkContext";
import Button from "src/components/Buttons/Button";
import contracts from "src/config/constants/contracts";
import {CHAIN_ID} from "src/config";
import { callFunction } from "reblox-web3-utils";
import MainStaking from "src/config/abi/MainStaking.json";
import {useEthers} from "@usedapp/core";
import {NlandContext} from "src/contexts/NlandContext";
import {NbeefContext} from "src/contexts/NbeefContext";

const Investment: React.FC = () => {
  const { t } = useTranslation();
  const { account, library } = useEthers();
  const { historicalEarning } = useContext(PriceContext);
  const { milkingCows, userMilkingCows, nmilkUserDeposited, nmilkUserEarns, nmilkApr, nmilkProfitability, nmilkExchangeRate } = useContext(NmilkContext);
  const { nlandUserEarns } = useContext(NlandContext);
  const { nbeefUserEarns } = useContext(NbeefContext);

  const [isHarvestingLoading, setIsHarvestingLoading] = useState<boolean>(false);

  const onHarvestAll = (e) => {
    e.stopPropagation();
    setIsHarvestingLoading(true);
    callFunction(
      contracts.mainStaking[CHAIN_ID],
      library,
      [],
      "harvestAll",
      MainStaking
    ).finally(() => setIsHarvestingLoading(false));
  };

  return (
    <div className="flex justify-center">
      <div className="mt-8 xl:flex xl:flex-col max-w-6xl">
        <div className="flex flex-col xl:flex-row justify-between pr-10">
          <h3 className="text-blue text-center text-xs md:mt-5">{t('investment.text')}</h3>
          <div className="flex flex-row justify-center mt-5 xl:mt-0">
            <p className="text-blue font-bold leading-5">NAC <br/> {t('investment.raised')}</p>
            <p className="text-blue text-3xl mx-4 font-semibold">{formatCurrency(nmilkUserEarns + nlandUserEarns + nbeefUserEarns )}</p>
            <Button
              text={`${t("investment.retire")} NAC`}
              extraClasses="border-blue border-2 text-blue px-4 font-bold text-tiny md:text-xs whitespace-nowrap text-center h-8 w-32 mt-1"
              onClick={onHarvestAll}
              isLoading={isHarvestingLoading}
              isLoadingColor="blue"
              disabled={!account}
            />
          </div>
        </div>
        <div className="xl:px-10 xl:grid xl:grid-cols-4 xl:gap-4 py-8">
          <div className="col-span-3 flex-3 max-w-3xl">
            <InvestCard
              title={t('investment.card_milk.title')}
              subtitle={t('investment.card_milk.subtitle', {apr: nmilkApr.toFixed(2)})}
              token={"nmilk"}
              deposit={nmilkUserDeposited}
              earn={nmilkUserEarns}
              totalAssets={nmilkUserDeposited * nmilkExchangeRate}
              image={'images/photos/bg_nmilk.jpeg'}
              descriptionText={t("investment.card_milk.description")}
            />
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


          <div className="w-full max-w-[20rem] m-auto xl:m-0">
            <div className={`flex flex-col items-center w-full rounded-lg border-green border-2 shadow`}>
              <div className={`w-full flex flex-col px-10 py-5 border-b-green border-b-2 border-green`}>
                <h3 className="text-blue font-bold text-base">{t('investment.rentability.title1')}</h3>
                <p className="text-blue text-2xl mb-3">{Math.round(milkingCows)}</p>
                <p className="text-blue text-xs">{t("investment.rentability.description")}</p>
                <h3 className="text-blue font-bold text-base mt-3">{t('investment.rentability.subtitle1')}</h3>
                <h4 className="text-blue font-bold text-sm">{t("investment.rentability.profitability_description", {value: formatCurrency(nmilkProfitability)})}</h4>
              </div>
              <div className={`w-full flex flex-col px-10 py-5 border-bottom-2 border-green/[.5]`}>
                <h3 className="text-blue font-bold text-base mb-4">{t('investment.rentability.title2')}</h3>
                <div className="h-full flex flex-col justify-evenly mb-4 md:justify-betweenmd:px-7">
                  <h3 className="text-green font-semibold text-sm md:text-base">{t('investment.rentability.currentBalance')}</h3>
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
                    <p className="text-green font-semibold text-sm md:text-base">{t('investment.cows', {value:  Math.round(userMilkingCows / NMILK_TOKENS_BY_COW)})}</p>
                  </div>
                </div>
                <h4 className="text-blue font-bold text-base">{t('investment.rentability.subtitle2')}</h4>
                <h3 className="text-green font-bold text-base">{formatCurrency(historicalEarning)} NAC</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investment;
