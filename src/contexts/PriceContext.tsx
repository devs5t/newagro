import { createContext, ReactNode, useEffect, useState } from "react";
import { useBoolean } from "react-use";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NAC from "src/config/abi/NAC.json";
import NMILK from "src/config/abi/NMILK.json";
import OracleNMILK from "src/config/abi/OracleNMILK.json";
import OracleFX from "src/config/abi/OracleFX.json";
import {callViewFunction, callFunction} from "reblox-web3-utils";
import {useEthers} from "@usedapp/core";
import {NMILK_TOKENS_BY_COW} from "src/config/constants";

const PriceContext = createContext({
  nacTotalSupply: 0,
  nmilkTotalSupply: 0,
  nmilkExchangeRate: 0,
  nmilkTotalAssets: 0,
  milkingCows: 0,
  userNmilkAssets: 0,
  userMilkingCows: 0,

  historicalEarning: 0,

  dollarExchangeRate: 0,
  isLoading: true
});

interface PriceContextProviderProps {
  children: ReactNode;
}
const PriceContextProvider = ({ children }: PriceContextProviderProps) => {
  const { account, library } = useEthers();

  const [nacTotalSupply, setNacTotalSupply] = useState<number>(0);
  const [nmilkTotalSupply, setNmilkTotalSupply] = useState<number>(0);
  const [nmilkExchangeRate, setNmilkExchangeRate] = useState<number>(0);
  const [nmilkTotalAssets, setNmilkTotalAssets] = useState<number>(0);
  const [milkingCows, setMilkingCows] = useState<number>(0);
  const [userNmilkAssets, setUserNmilkAssets] = useState<number>(0);
  const [userMilkingCows, setUserMilkingCows] = useState<number>(0);

  const [historicalEarning, setHistoricalEarning] = useState<number>(0);

  const [dollarExchangeRate, setDollarExchangeRate] = useState<number>(0);

  const [isLoading, setLoading] = useBoolean(true);

  const formatBigNumber = (number: number) => number / 1E18;

  const loadPrices = () => {
    setLoading(true);

    callViewFunction(
      CHAIN_ID,
      contracts.nac[CHAIN_ID],
      [],
      "totalSupply",
      NAC
    ).then(setNacTotalSupply);

    callViewFunction(
      CHAIN_ID,
      contracts.nmilk[CHAIN_ID],
      [],
      "totalSupply",
      NMILK
    ).then((value: number) => setNmilkTotalSupply(formatBigNumber(value)));

    callViewFunction(
      CHAIN_ID,
      contracts.oracleNmilk[CHAIN_ID],
      [],
      "getPrice",
      OracleNMILK
    ).then((value: number) => setNmilkExchangeRate(formatBigNumber(value)));

    callViewFunction(
      CHAIN_ID,
      contracts.oracleFX[CHAIN_ID],
      [],
      "getPrice",
      OracleFX
    ).then((value: number) => setDollarExchangeRate(formatBigNumber(value)));

    if (library && account) {
      callFunction(
        contracts.nmilk[CHAIN_ID],
        library,
        [account],
        "balanceOf",
        NMILK
      ).then((value: number) => setUserNmilkAssets(formatBigNumber(value)));
    }

    setLoading(false);
  };

  useEffect(() => {
    setNmilkTotalAssets(nmilkExchangeRate * nmilkTotalSupply);
    setMilkingCows(nmilkTotalSupply / NMILK_TOKENS_BY_COW);
    setUserMilkingCows(userNmilkAssets / NMILK_TOKENS_BY_COW);
  }, [nmilkExchangeRate, nmilkTotalSupply, userNmilkAssets]);

  useEffect(() => {
    loadPrices();
  }, [account]);

  useEffect(() => {
    /*const priceInterval = setInterval(async () => {
      loadPrices();
    }, 30000);

    return () => clearInterval(priceInterval);*/

    loadPrices();
  }, []);

  return (
    <PriceContext.Provider
      value={{
        nacTotalSupply,
        nmilkTotalSupply,
        nmilkExchangeRate,
        nmilkTotalAssets,
        milkingCows,
        userNmilkAssets,
        userMilkingCows,

        historicalEarning,

        dollarExchangeRate,
        isLoading
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};

export { PriceContext, PriceContextProvider };
