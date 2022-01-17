import React from "react";
import InvestCard from "src/components/HomeCard/InvestCard";
import RentabilityCard from "src/components/HomeCard/RentabilityCard";
import {useTranslation} from "react-i18next";

const Investment: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="xl:p-10 xl:grid xl:grid-cols-4 xl:gap-4">
      <div className="col-span-3 px-5 py-5 md:px-20 md:py-8 flex-3">
        <h3 className="text-blue text-center mb-10 text-xs md:text-lg md:mb-5">{t('investment.text')}</h3>
        <InvestCard
          title={t('investment.card_milk.title')}
          subtitle={t('investment.card_milk.subtitle')}
          token={"NMILK"}
          deposit={"5.567"}
          earn={"3.560"}
          image={'images/photos/bg_nmilk.jpeg'}
        />
        <br/>
        <br/>
        <InvestCard
          title={t('investment.card_beef.title')}
          subtitle={t('investment.card_beef.subtitle')}
          token={"NBEEF"}
          deposit={"0000"}
          earn={"0000"}
          image={'images/photos/bg_nbeef.jpeg'}
          containerClasses={"opacity-50"}
        />
        <br/>
        <br/>
        <InvestCard
          title={t('investment.card_land.title')}
          subtitle={t('investment.card_land.subtitle')}
          token={"NLAND"}
          deposit={"5.567"}
          earn={"0000"}
          image={'images/photos/bg_nland.jpeg'}
          containerClasses={"opacity-50"}
        />
        <br/>
      </div>
      <div>
        <RentabilityCard
          title1={t('investment.rentability.title1')}
          title2={t('investment.rentability.title2')}
          subtitle1={t('investment.rentability.subtitle1')}
          subtitle2={t('investment.rentability.subtitle2')}
          description={t("investment.rentability.description")}
          currentBalance={t('investment.rentability.currentBalance')}
          icon="icons/cow.svg"
        />
      </div>
    </div>
  );
};

export default Investment;
