import { getChainName, shortenAddress, useEthers } from "@usedapp/core";
import { Box, Button as MaterialButton } from "@mui/material";
import { spacing } from "@mui/system";
import { styled } from "@mui/styles";
import React, {useState} from "react";
import { useAddNetwork } from "src/hooks/useAddNetwork";
import BigNumber from "bignumber.js";
import {useTranslation} from "react-i18next";
import Button from "src/components/Buttons/Button";

const SpacingButton = styled(MaterialButton)(spacing);

interface ConnectWalletButtonProps {
  buttonClasses?: string;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  buttonClasses
}) => {
  const { t } = useTranslation();
  const { activateBrowserWallet, account, deactivate, chainId } = useEthers();
  const [offerNetworkChange, setOfferNetworkChange] = useState<boolean>(true);

  const envChainId = import.meta.env.VITE_APP_CHAIN_ID;

  const handleConnectWallet = () => {
    activateBrowserWallet();
  };

  if (window.hasOwnProperty("ethereum") && account) {
    window.ethereum.on("chainChanged", (_chainId) => {
      if (new BigNumber(_chainId).toNumber() !== Number(envChainId)) {
        useAddNetwork(parseInt(envChainId as string));
      } else {
        window.location.reload();
      }
    });
  }

  if (Number(chainId) !== Number(envChainId) && offerNetworkChange && window.hasOwnProperty("ethereum") && chainId && account) {
    useAddNetwork(parseInt(envChainId as string));
    if (offerNetworkChange) {
      setOfferNetworkChange(false);
    }
  }

  if (account) {
    const abbr = shortenAddress(account);
    const chainName = getChainName(chainId || 56).toLowerCase();

    if (Number(chainId) !== Number(envChainId)) {
      return (
        <Button
          extraClasses="uppercase text-white border-white font-bold text-tiny md:text-xs whitespace-nowrap text-center h-8 md:h-10"
          onClick={deactivate}
          text={t('navbar.wrong_wallet')}
        />
      );
    }

    return (
      <SpacingButton size="large" onClick={deactivate}>
        <img
          src={`/images/chains/${chainName}-logo.png`}
          width={20}
          height={20}
          alt={chainName}
          className="me-2"
        />
        <Box color={"white"} ml={1}>
          {abbr}
        </Box>
      </SpacingButton>
    );
  }

  return (
    <Button
      text={t('navbar.pair_wallet')}
      onClick={handleConnectWallet}
      extraClasses={`uppercase text-white border-white font-bold text-tiny md:text-xs whitespace-nowrap text-center h-8 md:h-10 ${buttonClasses}`}
    />
  );
};
