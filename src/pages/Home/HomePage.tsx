import { useEthers } from "@usedapp/core";
import { useTranslation } from "react-i18next";
import Banner from "src/components/Banner/Banner";

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
      <h3>Landing Page</h3>
      Translations: {t("Test")}
      {account && <p>Account Connected: {account}</p>}
    </>
  );
};

export default HomePage;
