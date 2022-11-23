import React, {useContext, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import Banner from "src/components/Banner/Banner";
import HomeCardColored from "src/components/cards/HomeCardColored";
import HomeCard from "src/components/cards/HomeCard";
import HomeCardSecondary from "src/components/cards/HomeCardSecondary";
import Map from "src/components/Map/Map";
import Tabs from "src/components/tabs/Tabs";
import { useNavigate } from 'react-router-dom';
import {NmilkContext} from "src/contexts/NmilkContext";
import {NlandContext} from "src/contexts/NlandContext";
import {NbeefContext} from "src/contexts/NbeefContext";
import {useTotalSupply} from "src/hooks/useTotalSupply";
import {formatUintToDecimal} from "src/utils/formatUtils";
import {Helmet} from "react-helmet-async";
import BigNumber from "bignumber.js";
import { NMILK_TOKENS_BY_COW } from "src/config/constants";
import Video from "src/components/Video/Video";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {nmilkTotalAssets, nmilkTotalSupply, totalCows, userCows, nmilkSuggestedPrice} = useContext(NmilkContext);
  const {nlandTotalAssets, nlandTotalSupply, totalHectares, userHectares} = useContext(NlandContext);
  const {nbeefTotalAssets, nbeefTotalSupply, totalSteers, userSteers} = useContext(NbeefContext);

  const totalSupply = useTotalSupply();

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
      <Helmet defer={false}>
        <title>{`${t('navbar.home')} - New Agro Coin`}</title>
      </Helmet>
      <div className="max-w-5xl">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <HomeCardColored
            title={t("home.card.new_agro.title")}
            amount={formatUintToDecimal(nmilkSuggestedPrice) * NMILK_TOKENS_BY_COW}
            currency="USDT"
            subtitle={t("home.card.new_agro.button_text")}
            onClickButton={() => navigate(`/exchange?token=${selectedToken}`)}
          />
          <HomeCardColored
            title={t("home.card.actives.title")}
            amount={nmilkTotalAssets + nlandTotalAssets + nbeefTotalAssets}
            currency="USDT"
            subtitle={t("home.card.actives.third_text")}
          />
        </div>
        <Video className="my-8" />
        <div className="w-full justify-center flex my-8">
          <Tabs
            tabs={[
              {name: 'New Milk', selected: selectedToken === 'nmilk', onClick: () => setSelectedToken('nmilk')},
              {name: 'New Land', selected: selectedToken === 'nland', onClick: () => setSelectedToken('nland'), disabled: true},
              {name: 'New Beef', selected: selectedToken === 'nbeef', onClick: () => setSelectedToken('nbeef'), disabled: true},
            ]}
            containerClass="max-w-md"
          />
        </div>
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 mt-8">
          <HomeCard
            title={t(`home.card.${selectedToken}.title`)}
            description={t(`home.card.${selectedToken}.description`)}
            amount={formatUintToDecimal(selectedTokenTotalSupply)}
            onClickButton={() => navigate(`/exchange?token=${selectedToken}`)}
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
