import React, {useContext} from "react";
import { useTranslation } from "react-i18next";
import Banner from "src/components/Banner/Banner";
import HomeCardColored from "src/components/HomeCard/HomeCardColored";
import HomeCard from "src/components/HomeCard/HomeCard";
import HomeCardSecondary from "src/components/HomeCard/HomeCardSecondary";
import Map from "src/components/Map/Map";
import Tabs from "src/components/tabs/Tabs";
import {PriceContext} from "src/contexts/PriceContext";
import {formatCurrency} from "src/utils/currency";
import { useNavigate } from 'react-router-dom';
import {NmilkContext} from "src/contexts/NmilkContext";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {nacTotalSupply} = useContext(PriceContext);
  const {nmilkTotalAssets, nmilkTotalSupply, milkingCows, nmilkUserAssets, userMilkingCows} = useContext(NmilkContext);

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="max-w-4xl">
        <Banner
          title={t("home.banner_title")}
          subtitle={t("home.banner_subtitle")}
          image={'images/photos/homebanner.jpeg'}
          containerClasses={"p-10 md:p-10 "}
        />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <HomeCardColored
            title={t("home.card.new_agro.title")}
            mainText={t("home.card.new_agro.number", {value: formatCurrency(nacTotalSupply)})}
            thirdText={t("home.card.new_agro.button_text")}
            onClickButton={() => navigate('/exchange')}
          />
          <HomeCardColored
            title={t("home.card.actives.title")}
            mainText={t("home.card.actives.number", {value: formatCurrency(nmilkTotalAssets)})}
            thirdText={t("home.card.actives.third_text")}
          />
        </div>
        <div className="w-full justify-center flex my-8">
          <Tabs
            tabs={[
              {name: 'New Milk', selected: true},
              {name: 'New Beef', disabled: true},
              {name: 'New Land', disabled: true}
            ]}
            containerClass="max-w-md"
          />
        </div>
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 mt-8">
          <HomeCard
            title={t("home.card.nmilk.title")}
            description={t("home.card.nmilk.description")}
            thirdText={nmilkTotalSupply}
            onClickButton={() => navigate('/exchange')}
            buttonText={t("home.card.nmilk.button_text")}
          />
          <HomeCardSecondary
            title={t("home.card.cows.title")}
            description={t("home.card.cows.description")}
            thirdText={Math.round(milkingCows)}
            onClickButton={() => navigate('/investment')}
            buttonText={t("home.card.cows.button_text")}
            fourthText={t("home.card.cows.fourth_text")}
            fifthText={t("home.card.cows.fifth_text", {nmilkUserAssets, userMilkingCows: Math.round(userMilkingCows)})}
            icon="icons/cow.svg"
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
