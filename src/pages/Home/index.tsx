import React, {useContext} from "react";
import { useTranslation } from "react-i18next";
import Banner from "src/components/Banner/Banner";
import HomeCardColored from "src/components/HomeCard/HomeCardColored";
import HomeCard from "src/components/HomeCard/HomeCard";
import HomeCardSecondary from "src/components/HomeCard/HomeCardSecondary";
import Map from "src/components/Map/Map";
import Tabs from "src/components/tabs/Tabs";
import {PriceContext} from "src/contexts/PriceContext";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const {nacTotalSupply, nmilkTotalAssets, nmilkTotalSupply, milkingCows, userNmilkAssets, userMilkingCows} = useContext(PriceContext);

  return (
    <div>
      <Banner
        title={t("home.banner_title")}
        subtitle={t("home.banner_subtitle")}
        image={'images/photos/homebanner.jpeg'}
        containerClasses={"p-10 md:p-10 "}
      />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mt-8">
        <HomeCardColored
          title={t("home.card.new_agro.title")}
          mainText={t("home.card.new_agro.number", {value: nacTotalSupply})}
          thirdText={t("home.card.new_agro.button_text")}
          onClickButton={console.log}
        />
        <HomeCardColored
          title={t("home.card.actives.title")}
          mainText={t("home.card.actives.number", {value: nmilkTotalAssets})}
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
          containerClass="max-w-xl"
        />
      </div>
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-2 mt-8">
        <HomeCard
          title={t("home.card.nmilk.title")}
          description={t("home.card.nmilk.description")}
          thirdText={nmilkTotalSupply}
          onClickButton={console.log}
          buttonText={t("home.card.nmilk.button_text")}
        />
        <HomeCardSecondary
          title={t("home.card.cows.title")}
          description={t("home.card.cows.description")}
          thirdText={milkingCows.toFixed(2)}
          onClickButton={console.log}
          buttonText={t("home.card.cows.button_text")}
          fourthText={t("home.card.cows.fourth_text")}
          fifthText={t("home.card.cows.fifth_text", {userNmilkAssets, userMilkingCows})}
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
  );
};

export default Home;
