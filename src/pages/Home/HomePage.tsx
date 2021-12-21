import { useTranslation } from "react-i18next";
import Banner from "src/components/Banner/Banner";
import HomeCardColored from "src/components/HomeCardColored/HomeCardColored";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Banner
        title={t("home.banner_title")}
        subtitle={t("home.banner_subtitle")}
        image={'images/photos/homebanner.jpeg'}
      />
      <div className="w-full flex flex-row mt-8">
        <HomeCardColored
          title={"New Agro cash generado"}
          mainText={"123.141"}
          thirdText={"Comprar new agro tokens"}
          onClickButton={console.log}
          containerClasses="mr-4"
        />
        <HomeCardColored
          title={"Activos totales"}
          mainText={"USD 150.000"}
          thirdText={"Explicación de cómo se componen sus activos totales"}
          containerClasses="ml-4"
        />
      </div>
    </>
  );
};

export default HomePage;
