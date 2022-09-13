import { createContext, ReactNode, useEffect, useState } from "react";
import { useBoolean } from "react-use";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NAC from "src/config/abi/NAC.json";
import OracleFX from "src/config/abi/OracleFX.json";
import MainStaking from "src/config/abi/MainStaking.json";
import {callViewFunction, callFunction} from "reblox-web3-utils";
import {useEthers} from "@usedapp/core";
import {BURN_ADDRESS} from "src/config/constants";

const PriceContext = createContext({
  usdtUserAssets: 0,

  nacExchangeRate: 0,
  nacTotalSupply: 0,
  nacUserAssets: 0,

  historicalEarning: 0,
  liquidityFundAssets: 0,
  burnAddressAssets: 0,

  isLoading: true,
  loadPrices: () => {},
});

interface PriceContextProviderProps {
  children: ReactNode;
}
const PriceContextProvider = ({ children }: PriceContextProviderProps) => {
  const { account, library, chainId } = useEthers();

  const [usdtUserAssets, setUsdtUserAssets] = useState<number>(0);

  const [nacExchangeRate, setNacExchangeRate] = useState<number>(0);
  const [nacTotalSupply, setNacTotalSupply] = useState<number>(0);
  const [nacUserAssets, setNacUserAssets] = useState<number>(0);

  const [historicalEarning, setHistoricalEarning] = useState<number>(0);
  const [liquidityFundAssets, setLiquidityFundAssets] = useState<number>(0);
  const [burnAddressAssets, setBurnAddressAssets] = useState<number>(0);

  const [isLoading, setLoading] = useBoolean(true);

  const loadPrices = () => {
    setLoading(true);

    callViewFunction(
      CHAIN_ID,
      contracts.oracleFX[CHAIN_ID],
      [],
      "getPrice",
      OracleFX
    ).then(setNacExchangeRate);

    callViewFunction(
      CHAIN_ID,
      contracts.nac[CHAIN_ID],
      [],
      "totalSupply",
      NAC
    ).then(setNacTotalSupply);

    callViewFunction(
      CHAIN_ID,
      contracts.usdt[CHAIN_ID],
      [contracts.redeemRewards[CHAIN_ID]],
      "balanceOf",
      NAC
    ).then(setLiquidityFundAssets);

    callViewFunction(
      CHAIN_ID,
      contracts.nac[CHAIN_ID],
      [BURN_ADDRESS],
      "balanceOf",
      NAC
    ).then(setBurnAddressAssets);

    if (library && account) {
      callFunction(
        contracts.usdt[CHAIN_ID],
        library,
        [account],
        "balanceOf",
        NAC
      ).then(setUsdtUserAssets);

      callFunction(
        contracts.nac[CHAIN_ID],
        library,
        [account],
        "balanceOf",
        NAC
      ).then(setNacUserAssets);


      callFunction(
        contracts.mainStaking[CHAIN_ID],
        library,
        [account],
        "getUserHistoricalRewards",
        MainStaking
      ).then(setHistoricalEarning);
    } else {
      setUsdtUserAssets(0);
      setNacUserAssets(0);
      setHistoricalEarning(0);
    }

    setLoading(false);
  };

  // useEffect(() => {
  //   console.log("ESO");
  //   loadPrices();
  // }, [account, chainId]);

  return (
    <PriceContext.Provider
      value={{
        usdtUserAssets,

        nacTotalSupply,
        nacExchangeRate,

        nacUserAssets,

        historicalEarning,
        liquidityFundAssets,
        burnAddressAssets,

        isLoading,
        loadPrices
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};

export { PriceContext, PriceContextProvider };
