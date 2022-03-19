import { createContext, ReactNode, useState } from "react";
import { useBoolean } from "react-use";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NAC from "src/config/abi/NAC.json";
import OracleFX from "src/config/abi/OracleFX.json";
import MainStaking from "src/config/abi/MainStaking.json";
import {callViewFunction, callFunction} from "reblox-web3-utils";
import {useEthers} from "@usedapp/core";
import {formatUintToDecimal, formatHexToUintToDecimal} from "src/utils/formatUtils";

const PriceContext = createContext({
  usdtUserAssets: 0,

  nacExchangeRate: 0,
  nacTotalSupply: 0,
  nacUserAssets: 0,

  historicalEarning: 0,

  isLoading: true,

  loadPrices: () => {},
});

interface PriceContextProviderProps {
  children: ReactNode;
}
const PriceContextProvider = ({ children }: PriceContextProviderProps) => {
  const { account, library } = useEthers();

  const [usdtUserAssets, setUsdtUserAssets] = useState<number>(0);

  const [nacExchangeRate, setNacExchangeRate] = useState<number>(0);
  const [nacTotalSupply, setNacTotalSupply] = useState<number>(0);
  const [nacUserAssets, setNacUserAssets] = useState<number>(0);

  const [historicalEarning, setHistoricalEarning] = useState<number>(0);

  const [isLoading, setLoading] = useBoolean(true);

  const loadPrices = () => {
    setLoading(true);

    callViewFunction(
      CHAIN_ID,
      contracts.oracleFX[CHAIN_ID],
      [],
      "getPrice",
      OracleFX
    ).then((value: number) => setNacExchangeRate(formatUintToDecimal(value)));

    callViewFunction(
      CHAIN_ID,
      contracts.nac[CHAIN_ID],
      [],
      "totalSupply",
      NAC
    ).then((value) => setNacTotalSupply(formatUintToDecimal(value)));

    if (library && account) {
      callFunction(
        contracts.usdt[CHAIN_ID],
        library,
        [account],
        "balanceOf",
        NAC
      ).then((value: number) => setUsdtUserAssets(formatUintToDecimal(value)));

      callFunction(
        contracts.nac[CHAIN_ID],
        library,
        [account],
        "balanceOf",
        NAC
      ).then((value: number) => setNacUserAssets(formatUintToDecimal(value)));


      callFunction(
        contracts.mainStaking[CHAIN_ID],
        library,
        [account],
        "getUserHistoricalRewards",
        MainStaking
      ).then((value: {_hex: string}) => setHistoricalEarning(formatHexToUintToDecimal(value._hex)))
    }

    setLoading(false);
  };

  return (
    <PriceContext.Provider
      value={{
        usdtUserAssets,

        nacTotalSupply,
        nacExchangeRate,

        nacUserAssets,
        historicalEarning,

        isLoading,
        loadPrices
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};

export { PriceContext, PriceContextProvider };
