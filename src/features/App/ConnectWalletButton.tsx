import { getChainName, shortenAddress, useEthers } from "@usedapp/core";
import { Box, Button as MaterialButton } from "@mui/material";
import { spacing } from "@mui/system";
import { styled } from "@mui/styles";
import React, {useContext, useEffect, useState} from "react";
import { useAddNetwork } from "src/hooks/useAddNetwork";
import BigNumber from "bignumber.js";
import {useTranslation} from "react-i18next";
import Button from "src/components/Buttons/Button";
import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider/dist/umd/index.min.js";
import {ModalContext} from "src/contexts/ModalContext";

const SpacingButton = styled(MaterialButton)(spacing);

interface ConnectWalletButtonProps {
  buttonClasses?: string;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  buttonClasses
}) => {
  const { t } = useTranslation();
  const {setModal} = useContext(ModalContext);

  const { activate, account, deactivate, chainId } = useEthers();
  const [offerNetworkChange, setOfferNetworkChange] = useState<boolean>(true);

  const envChainId = import.meta.env.VITE_APP_CHAIN_ID;

  const handleConnectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      await activate(provider);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeactivate = () => {
    deactivate();
    web3Modal.clearCachedProvider();
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      handleConnectWallet();
    }
  }, []);

  if (account) {
    const abbr = shortenAddress(account);
    const chainName = getChainName(chainId || 56).toLowerCase();

    if (Number(chainId) !== Number(envChainId)) {
      return (
        <Button
          extraClasses="uppercase text-white border-white font-bold text-tiny md:text-xs whitespace-nowrap text-center h-8 md:h-10"
          onClick={() => {
            useAddNetwork(parseInt(envChainId as string))
          }}
          text={t('navbar.wrong_wallet')}
        />
      );
    }

    return (
      <SpacingButton size="large" onClick={handleDeactivate}>
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
      onClick={() => {
        setModal(undefined);
        handleConnectWallet();
      }}
      extraClasses={`uppercase text-white border-white font-bold text-tiny md:text-xs whitespace-nowrap text-center h-8 md:h-10 ${buttonClasses}`}
    />
  );
};

const infuraId: number = import.meta.env.VITE_APP_INFURA_ID

const providerOptions = {
  injected: {
    package: null,
  },
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: infuraId, // required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      infuraId: infuraId,
    },
  },
};

const web3Modal = new Web3Modal({
  providerOptions,
  cacheProvider: true,
});