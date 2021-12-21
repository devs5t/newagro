import { getChainName, shortenAddress, useEthers } from "@usedapp/core";
import { Box, Button as MaterialButton } from "@mui/material";
import { spacing } from "@mui/system";
import { styled } from "@mui/styles";
import React from "react";
import { addNetwork } from "src/hooks/useAddNetwork";
import BigNumber from "bignumber.js";
import {useTranslation} from "react-i18next";
import Button from "src/components/Buttons/Button";

const SpacingButton = styled(MaterialButton)(spacing);

export const ConnectWalletButton: React.FC = () => {
  const { t } = useTranslation();
  const { activateBrowserWallet, account, deactivate, chainId } = useEthers();
  const envChainId = import.meta.env.VITE_APP_CHAIN_ID;

  const handleConnectWallet = () => {
    activateBrowserWallet();
    addNetwork(parseInt(envChainId as string));
  };

  if (window.hasOwnProperty("ethereum") && account) {
    window.ethereum.on("chainChanged", (_chainId) => {
      if (new BigNumber(_chainId).toNumber() !== Number(envChainId)) {
        addNetwork(parseInt(envChainId as string));
      } else {
        window.location.reload();
      }
    });
  }

  if (account) {
    const abbr = shortenAddress(account);
    const chainName = getChainName(chainId || 56).toLowerCase();

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
      extraClasses="uppercase text-white border-white font-bold"
    />
  );
};
