import { useEthers } from "@usedapp/core";
import { useTranslation } from "react-i18next";
import Banner from "src/components/Banner/Banner";
import HomeCardColored from "src/components/HomeCardColored/HomeCardColored";
import HomeButton from "src/components/Buttons/HomeButton";

const HomePage = () => {
  const { account } = useEthers();
  const { t } = useTranslation();

  return (
    <>
      <Banner
        title={"home.banner_title"}
        subtitle={"home.banner_subtitle"}
        image={'images/photos/homebanner.jpeg'}
      />
      <div style={{width: "100%", flexDirection: "row", display: "flex"}} >
        <HomeCardColored
          title={"New Agro cash generado"}
          mainText={"123.141"}
          thirdText={"Comprar new agro tokens"}
          onClickButton={console.log}
        />
        <HomeCardColored
          title={"Activos totales"}
          mainText={"USD 150.000"}
          thirdText={"Explicación de cómo se componen sus activos totales"}
        />
      </ div>
      <h3>Landing Page</h3>
      Translations: {t("Test")}
      {account && <p>Account Connected: {account}</p>}
    </>
  );
};

export default HomePage;
