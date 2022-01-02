import InvestCard from "src/components/HomeCard/InvestCard";
import {useTranslation} from "react-i18next";

const Investment = () => {
  const { t } = useTranslation();

  return (
    <div className="md:p-10">
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
    </div>
  );
};

export default Investment;
