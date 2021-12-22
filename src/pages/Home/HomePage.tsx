import { useTranslation } from "react-i18next";
import Banner from "src/components/Banner/Banner";
import HomeCardColored from "src/components/HomeCardColored/HomeCardColored";
import HomeCard from "src/components/HomeCard/HomeCard";
import HomeCardSecondary from "src/components/HomeCard/HomeCardSecondary";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Banner
        title={t("home.banner_title")}
        subtitle={t("home.banner_subtitle")}
        image={'images/photos/homebanner.jpeg'}
      />
      <div className="w-full grid grid-cols-2 gap-2 mt-8">
        <HomeCardColored
          title={t("home.card.new_agro.title")}
          mainText={t("home.card.new_agro.number")}
          thirdText={t("home.card.new_agro.button_text")}
          onClickButton={console.log}
          containerClasses="mr-2"
        />
        <HomeCardColored
          title={t("home.card.actives.title")}
          mainText={t("home.card.actives.number")}
          thirdText={t("home.card.actives.third_text")}
          containerClasses="ml-2"
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-2 mt-8">
        <HomeCard
          title={t("home.card.nmilk.title")}
          description={t("home.card.nmilk.description")}
          thirdText={t("home.card.nmilk.third_text")}
          onClickButton={console.log}
          containerClasses="mr-2"
          buttonText={t("home.card.nmilk.button_text")}
        />
        <HomeCardSecondary
          title={t("home.card.cows.title")}
          description={t("home.card.cows.description")}
          thirdText={t("home.card.cows.third_text")}
          onClickButton={console.log}
          containerClasses="ml-2"
          buttonText={t("home.card.cows.button_text")}
          fourthText={t("home.card.cows.fourth_text")}
          fifthText={t("home.card.cows.fifth_text")}
        />
      </div>
    </>
  );
};

export default HomePage;
