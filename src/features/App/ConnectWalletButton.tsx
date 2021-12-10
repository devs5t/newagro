import { getChainName, shortenAddress, useEthers } from "@usedapp/core";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { spacing } from "@mui/system";
import { styled } from "@mui/styles";
import React from "react";

const SpacingIconButton = styled(IconButton)(spacing);
const SpacingButton = styled(Button)(spacing);

export const ConnectWalletButton = () => {
  const { activateBrowserWallet, account, deactivate, chainId } = useEthers();

  const handleConnectWallet = () => {
    activateBrowserWallet();
  };

  if (account) {
    const abbr = shortenAddress(account);
    const chainName = getChainName(chainId || 56).toLowerCase();

    return (
      <Tooltip title={"Connected wallet"}>
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
      </Tooltip>
    );
  }

  return (
    <Tooltip title={"Connect your wallet"}>
      <SpacingIconButton
        size="medium"
        onClick={handleConnectWallet}
        aria-label="Delete"
      >
        <AccountBalanceWalletIcon style={{ color: "white" }} fontSize="large" />
      </SpacingIconButton>
    </Tooltip>
  );
};
