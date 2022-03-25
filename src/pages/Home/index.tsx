import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import Banner from "src/components/Banner/Banner";
import HomeCardColored from "src/components/cards/HomeCardColored";
import HomeCard from "src/components/cards/HomeCard";
import HomeCardSecondary from "src/components/cards/HomeCardSecondary";
import Map from "src/components/Map/Map";
import Tabs from "src/components/tabs/Tabs";
import {PriceContext} from "src/contexts/PriceContext";
import { useNavigate } from 'react-router-dom';
import {NmilkContext} from "src/contexts/NmilkContext";
import {formatDateToUnixTimestamp} from "src/utils/formatUtils";
import {NlandContext} from "src/contexts/NlandContext";
import {NbeefContext} from "src/contexts/NbeefContext";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {nacTotalSupply} = useContext(PriceContext);
  const {nmilkTotalAssets, nmilkTotalSupply, totalCows, userCows, nmilkLastRewardDate, nmilkRewardPerSecond} = useContext(NmilkContext);
  const {nlandTotalAssets, nlandTotalSupply, totalHectares, userHectares, nlandLastRewardDate, nlandRewardPerSecond} = useContext(NlandContext);
  const {nbeefTotalAssets, nbeefTotalSupply, totalSteers, userSteers, nbeefLastRewardDate, nbeefRewardPerSecond} = useContext(NbeefContext);

  const [totalSupply, setTotalSupply] = useState<number>(0);

  const calculateTotalSupply = useCallback(() => {
    const pendingNmilkNac = (formatDateToUnixTimestamp(new Date()) - formatDateToUnixTimestamp(nmilkLastRewardDate)) * nmilkRewardPerSecond;
    const pendingNlandNac = (formatDateToUnixTimestamp(new Date()) - formatDateToUnixTimestamp(nlandLastRewardDate)) * nlandRewardPerSecond;
    const pendingNbeefNac = (formatDateToUnixTimestamp(new Date()) - formatDateToUnixTimestamp(nbeefLastRewardDate)) * nbeefRewardPerSecond;

    setTotalSupply(nacTotalSupply + pendingNmilkNac + pendingNlandNac + pendingNbeefNac);

  }, [nacTotalSupply, nmilkLastRewardDate, nmilkRewardPerSecond, nlandLastRewardDate, nlandRewardPerSecond, nbeefLastRewardDate, nbeefRewardPerSecond]);

  useEffect(() => {
    calculateTotalSupply();
    const interval = setInterval(calculateTotalSupply, 10000);
    return () => clearInterval(interval);
  }, [nacTotalSupply, nmilkLastRewardDate, nmilkRewardPerSecond, nlandLastRewardDate, nlandRewardPerSecond, nbeefLastRewardDate, nbeefRewardPerSecond]);

  const [selectedToken, setSelectedToken] = useState<'nmilk' | 'nland' | 'nbeef'>('nmilk');

  const [selectedTokenTotalSupply, totalAssetsAuxiliary, userAssetsAuxiliary, selectedTokenIcon] = useMemo(() => {
    switch (selectedToken) {
      case "nmilk":
        return [nmilkTotalSupply, totalCows, userCows, 'icons/milk.svg'];
      case "nland":
        return [nlandTotalSupply, totalHectares, userHectares, 'icons/land.svg'];
      case "nbeef":
        return [nbeefTotalSupply, totalSteers, userSteers, 'icons/beef.svg'];
    }
  }, [selectedToken, nmilkTotalSupply, totalCows, userCows, nlandTotalSupply, totalHectares, userHectares, nbeefTotalSupply, totalSteers, userSteers]);

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="max-w-5xl">
        <Banner
          title={t("home.banner_title")}
          subtitle={t("home.banner_subtitle")}
          image={'images/photos/homebanner.jpeg'}
          containerClasses={"p-10"}
        />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <HomeCardColored
            title={t("home.card.new_agro.title")}
            amount={totalSupply}
            currency="NAC"
            subtitle={t("home.card.new_agro.button_text")}
            onClickButton={() => navigate('/exchange')}
          />
          <HomeCardColored
            title={t("home.card.actives.title")}
            amount={nmilkTotalAssets + nlandTotalAssets + nbeefTotalAssets}
            currency="USD"
            subtitle={t("home.card.actives.third_text")}
          />
        </div>
        <div className="w-full justify-center flex my-8">
          <Tabs
            tabs={[
              {name: 'New Milk', selected: selectedToken === 'nmilk', onClick: () => setSelectedToken('nmilk')},
              {name: 'New Land', selected: selectedToken === 'nland', onClick: () => setSelectedToken('nland')},
              {name: 'New Beef', selected: selectedToken === 'nbeef', onClick: () => setSelectedToken('nbeef'), disabled: true},
            ]}
            containerClass="max-w-md"
          />
        </div>
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 mt-8">
          <HomeCard
            title={t(`home.card.${selectedToken}.title`)}
            description={t(`home.card.${selectedToken}.description`)}
            amount={selectedTokenTotalSupply}
            onClickButton={() => navigate('/exchange')}
            buttonText={t(`home.card.${selectedToken}.button_text`)}
          />
          <HomeCardSecondary
            title={t(`home.secondary_card.${selectedToken}.title`)}
            description={t(`home.secondary_card.${selectedToken}.description`)}
            amount={totalAssetsAuxiliary}
            onClickButton={() => navigate('/investment')}
            assetsDescription={t(`home.secondary_card.${selectedToken}.assetsDescription`, {userAssetsAuxiliary: userAssetsAuxiliary.toFixed(2)})}
            icon={selectedTokenIcon}
          />
        </div>

        <div className="w-full flex flex-col mt-8 md:mb-10">
          <h3 className="w-full text-center text-blue font-medium text-base md:text-lg my-2">{t('home.map.title')}</h3>
          <div className="w-full flex flex-col ">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
