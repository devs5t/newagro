import React, {useContext, useMemo, useState} from "react";
import InvestmentCard from "src/components/cards/InvestmentCard";
import {useTranslation} from "react-i18next";
import {PriceContext} from "src/contexts/PriceContext";
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
import InvestmentAssetsCard from "src/components/cards/InvestmentAssetsCard";
import {ReactSVG} from "react-svg";
import {NMILK_TOKENS_BY_COW, NLAND_TOKENS_BY_HECTARE, NBEEF_TOKENS_BY_STEER } from "src/config/constants";

const Investment: React.FC = () => {
  const { t } = useTranslation();
  const { account, library } = useEthers();
  const { reloadPrices } = useReloadPrices();
  const { historicalEarning } = useContext(PriceContext);
  const { totalCows, userCows, nmilkUserDeposited, nmilkUserEarns, nmilkApr, nmilkProfitability, nmilkSuggestedPrice, nmilkUserAssets } = useContext(NmilkContext);
  const { totalHectares, userHectares, nlandUserDeposited, nlandUserEarns, nlandApr, nlandProfitability, nlandSuggestedPrice, nlandUserAssets } = useContext(NlandContext);
  const { totalSteers, userSteers, nbeefUserDeposited, nbeefUserEarns, nbeefApr, nbeefProfitability, nbeefSuggestedPrice, nbeefUserAssets } = useContext(NbeefContext);

  const [selectedToken, setSelectedToken] = useState<undefined | 'nmilk' | 'nland' | 'nbeef'>(undefined);

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

  const [selectedTokenAssets, selectedTokenProfitability, selectedTokenUserAssets, selectedTokenHistoricalEarning, selectedTokenIcon] = useMemo(() => {
    switch (selectedToken) {
      case 'nmilk':
        return [totalCows, nmilkProfitability, userCows, historicalEarning, 'icons/milk.svg'];
      case 'nland':
        return [totalHectares, nlandProfitability, userHectares, historicalEarning, 'icons/land.svg'];
      case 'nbeef':
        return [totalSteers, nbeefProfitability, userSteers, historicalEarning, 'icons/beef.svg'];
      default:
        return [0, 0, 0, 0, ''];
    }
  }, [selectedToken]);

  const userAssets: {amount: number, description: string, icon: string}[] = useMemo(() => [
    {amount: userCows, description: t('investment.assets.nmilk'), icon: 'icons/milk.svg'},
    {amount: userHectares, description: t('investment.assets.nland'), icon: 'icons/land.svg'},
    {amount: userSteers, description: t('investment.assets.nbeef'), icon: 'icons/beef.svg'}
  ], [userCows, userHectares, userSteers]);

  return (
    <div className="flex justify-center">
      <div className="mt-8 xl:flex xl:flex-col max-w-6xl">
        <div className="flex flex-col xl:flex-row justify-between items-center">
          <h3 className="text-blue text-center text-xs">{t('investment.text')}</h3>
          <div className="flex flex-row justify-center items-center mt-5 xl:mt-0">
            <p className="text-blue text-sm font-semibold leading-5">NAC <br/> {t('investment.pending')}</p>
            <CountUp
              className="text-blue text-4xl mx-4"
              end={nmilkUserEarns + nlandUserEarns + nbeefUserEarns}
              decimals={2}
              separator=","
              decimal="."
              preserveValue={true}
            />
            <Button
              text={`${t("investment.retire")} NAC`}
              extraClasses="border-blue border-2 text-blue px-4 font-bold text-tiny md:text-xs whitespace-nowrap text-center h-8 w-32"
              onClick={onHarvestAll}
              isLoading={isHarvestingLoading}
              isLoadingColor="blue"
              disabled={!account}
              needWallet={true}
            />
          </div>
        </div>
        <div className="xl:pl-10 xl:grid xl:grid-cols-4 xl:gap-4 py-8">
          <div className="col-span-3 flex-3 max-w-3xl">
            <InvestmentCard
              apr={nmilkApr}
              token="nmilk"
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              deposit={nmilkUserDeposited}
              depositAuxiliary={nmilkUserDeposited / NMILK_TOKENS_BY_COW}
              assets={nmilkUserAssets}
              earn={nmilkUserEarns}
              earnAuxiliary={nmilkUserEarns / NMILK_TOKENS_BY_COW}
              totalAssets={nmilkUserDeposited * nmilkSuggestedPrice}
              image={'images/photos/bg_nmilk.jpeg'}
            />
            <br/>
            <InvestmentCard
              apr={nlandApr}
              token="nland"
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              deposit={nlandUserDeposited}
              depositAuxiliary={nlandUserDeposited / NLAND_TOKENS_BY_HECTARE}
              assets={nlandUserAssets}
              earn={nlandUserEarns}
              earnAuxiliary={nlandUserEarns / NLAND_TOKENS_BY_HECTARE}
              totalAssets={nlandUserDeposited * nlandSuggestedPrice}
              image={'images/photos/bg_nland.jpeg'}
              disabled={true}
            />
            <br/>
            <InvestmentCard
              apr={nbeefApr}
              token="nbeef"
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              deposit={nbeefUserDeposited}
              depositAuxiliary={nbeefUserDeposited / NBEEF_TOKENS_BY_STEER}
              assets={nbeefUserAssets}
              earn={nbeefUserEarns}
              earnAuxiliary={nbeefUserEarns / NBEEF_TOKENS_BY_STEER}
              totalAssets={nbeefUserAssets * nbeefSuggestedPrice}
              image={'images/photos/bg_nbeef.jpeg'}
              disabled={true}
            />
            <br/>
          </div>

          {selectedToken === undefined && (
            <div className="w-full max-w-[20rem] m-auto xl:m-0">
              <div className={`flex flex-col items-center w-full rounded-lg border-green border-2 shadow`}>
                <div className={`w-full flex flex-col p-10`}>
                  <h3 className="text-blue font-bold text-base">{t(`investment.assets.title`)}</h3>
                  <p className="text-blue mt-4 mb-8 text-xs">{t(`investment.assets.description`)}</p>

                  {userAssets.map((userAsset, key) => (
                    <div className="flex justify-between items-center mb-2" key={key}>
                      <CountUp
                        className="text-sm font-semibold text-green"
                        end={userAsset.amount}
                        suffix={` ${userAsset.description}`}
                        decimals={2}
                        separator=","
                        decimal="."
                        preserveValue={true}
                      />
                      <ReactSVG
                        src={userAsset.icon}
                        beforeInjection={(svg) => {
                          svg.classList.add('fill-green');
                          svg.classList.add('w-4');
                          svg.classList.add('h-4');
                        }}
                      />
                    </div>
                  ))}

                  <h4 className="text-blue font-bold text-base mt-8">{t(`investment.rentability.historical_earnings`)}</h4>
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
          )}

          {selectedToken !== undefined && (
            <InvestmentAssetsCard
              token={selectedToken}
              assets={selectedTokenAssets}
              profitability={selectedTokenProfitability}
              userAssets={selectedTokenUserAssets}
              historicalEarning={selectedTokenHistoricalEarning}
              tokenIcon={selectedTokenIcon}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Investment;
