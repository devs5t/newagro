import React, {useContext, useState} from "react";
import InvestmentCard from "src/components/cards/InvestmentCard";
import {useTranslation} from "react-i18next";
import {PriceContext} from "src/contexts/PriceContext";
import {ReactSVG} from "react-svg";
import {NmilkContext} from "src/contexts/NmilkContext";
import Button from "src/components/Buttons/Button";
import contracts from "src/config/constants/contracts";
import {CHAIN_ID} from "src/config";
import { callFunction } from "reblox-web3-utils";
import MainStaking from "src/config/abi/MainStaking.json";
import {useEthers} from "@usedapp/core";
import {NlandContext} from "src/contexts/NlandContext";
import {NbeefContext} from "src/contexts/NbeefContext";
import {useReloadPrices} from "src/hooks/useReloadPrices";
import CountUp from "react-countup";

const Investment: React.FC = () => {
  const { t } = useTranslation();
  const { account, library } = useEthers();
  const { reloadPrices } = useReloadPrices();
  const { historicalEarning } = useContext(PriceContext);
  const { milkingCows, userMilkingCows, nmilkUserDeposited, nmilkUserEarns, nmilkApr, nmilkProfitability, nmilkSuggestedPrice, nmilkUserAssets } = useContext(NmilkContext);
  const { nlandUserEarns } = useContext(NlandContext);
  const { nbeefUserEarns } = useContext(NbeefContext);

  const [isHarvestingLoading, setIsHarvestingLoading] = useState<boolean>(false);

  const onHarvestAll = (e: any) => {
    e.stopPropagation();
    setIsHarvestingLoading(true);
    callFunction(
      contracts.mainStaking[CHAIN_ID],
      library,
      [],
      "harvestAll",
      MainStaking
    ).finally(() => {
      setIsHarvestingLoading(false);
      reloadPrices();
    });
  };

  return (
    <div className="flex justify-center">
      <div className="mt-8 xl:flex xl:flex-col max-w-6xl">
        <div className="flex flex-col xl:flex-row justify-between pr-10">
          <h3 className="text-blue text-center text-xs md:mt-5">{t('investment.text')}</h3>
          <div className="flex flex-row justify-center mt-5 xl:mt-0">
            <p className="text-blue font-bold leading-5">NAC <br/> {t('investment.raised')}</p>
            <CountUp
              className="text-blue text-3xl mx-4 font-semibold"
              end={nmilkUserEarns + nlandUserEarns + nbeefUserEarns}
              decimals={2}
              separator=","
              decimal="."
              preserveValue={true}
            />
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
            <InvestmentCard
              title={t('investment.card_milk.title')}
              apr={nmilkApr}
              token={"nmilk"}
              deposit={nmilkUserDeposited}
              assets={nmilkUserAssets}
              earn={nmilkUserEarns}
              totalAssets={nmilkUserDeposited * nmilkSuggestedPrice}
              image={'images/photos/bg_nmilk.jpeg'}
              descriptionText={t("investment.card_milk.description")}
            />
            <br/>
            <InvestmentCard
              title={t('investment.card_beef.title')}
              apr={0}
              token={"nbeef"}
              deposit={0}
              assets={0}
              earn={0}
              totalAssets={0}
              image={'images/photos/bg_nbeef.jpeg'}
              containerClasses={"opacity-50 pointer-events-none"}
            />
            <br/>
            <InvestmentCard
              title={t('investment.card_land.title')}
              apr={0}
              token={"nland"}
              deposit={0}
              assets={0}
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
                <CountUp
                  className="text-blue text-2xl mb-3"
                  end={milkingCows}
                  separator=","
                  preserveValue={true}
                />
                <p className="text-blue text-xs">{t("investment.rentability.description")}</p>
                <h3 className="text-blue font-bold text-base mt-3">{t('investment.rentability.subtitle1')}</h3>
                <CountUp
                  className="text-blue font-bold text-sm"
                  end={nmilkProfitability}
                  separator=","
                  decimal="."
                  decimals={2}
                  suffix={` ${t("investment.rentability.profitability_description")}`}
                  preserveValue={true}
                />
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
                    <CountUp
                      className="text-green font-bold text-base"
                      end={userMilkingCows}
                      separator=","
                      decimal="."
                      decimals={2}
                      suffix={` ${t('investment.cows')}`}
                      preserveValue={true}
                    />
                  </div>
                </div>
                <h4 className="text-blue font-bold text-base">{t('investment.rentability.subtitle2')}</h4>
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
        </div>
      </div>
    </div>
  );
};

export default Investment;
