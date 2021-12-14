import { useEthers } from "@usedapp/core";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { account } = useEthers();
  const { t } = useTranslation();

  return (
    <>
      <h3>Landing Page</h3>
      Translations: {t("Test")}
      {account && <p>Account Connected: {account}</p>}
    </>
  );
};

export default HomePage;
