import React from "react";
import {useTranslation} from "react-i18next";
import WarningIcon from '@mui/icons-material/Warning';
import Button from "src/components/Buttons/Button";
import {ConnectWalletButton} from "src/features/App/ConnectWalletButton";

const NoWallet: React.FC = () => {

  const {t} = useTranslation();

  return (
    <div className="flex h-84 justify-center items-center flex-col pt-10 pb-20 px-10 min-w">
      <div className="w-24 h-24 rounded-full bg-yellow/[0.3] flex justify-center items-center mb-6">
        <WarningIcon className="fill-yellow h-12 w-12 m-auto"/>
      </div>
      <h3 className="text-blue text-lg text-center font-bold mb-4">{t("no_wallet.subtitle")}</h3>
      <p className="text-blue text-sm text-center mb-6">{t("no_wallet.description")}</p>

      <ConnectWalletButton buttonClasses="font-semibold text-white text-blue !border-blue mb-4"/>

      <span className="text-blue font-semibold text-sm mb-4">{t("no_wallet.or")}</span>

      <Button
        extraClasses="flex items-center border-blue font-semibold text-white text-blue"
        link="https://metamask.io/"
        linkTarget="_blank"
      >
        <img src="logos/metamask.png" className="w-8 mr-4" />
        <span>{t("no_wallet.metamask_button")}</span>
      </Button>
    </div>
  )
}

export default NoWallet;