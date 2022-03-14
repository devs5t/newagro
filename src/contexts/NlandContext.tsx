import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { useBoolean } from "react-use";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NLAND from "src/config/abi/NMILK.json";
import OracleNLAND from "src/config/abi/OracleNMILK.json";
import MainStaking from "src/config/abi/MainStaking.json";
import {callViewFunction, callFunction} from "reblox-web3-utils";
import {useEthers} from "@usedapp/core";
import {NLAND_POOL_ID} from "src/config/constants";
import {get} from "lodash";
import {formatUintToDecimal, formatHexNumber} from "src/utils/formatUtils";
import {PriceContext} from "src/contexts/PriceContext";

const NlandContext = createContext({
  nlandTotalSupply: 0,
  nlandExchangeRate: 0,
  nlandTotalAssets: 0,
  nlandRewardPerYear: 0,
  nlandBalance: 0,
  nlandApr: 0,
  nlandProfitability: 0,

  nlandUserAssets: 0,
  nlandUserDeposited: 0,
  nlandUserEarns: 0,

  isLoading: true
});

interface NlandContextProviderProps {
  children: ReactNode;
}
const NlandContextProvider = ({ children }: NlandContextProviderProps) => {
  const { account, library } = useEthers();
  const {nacExchangeRate} = useContext(PriceContext)

  const [nlandTotalSupply, setNlandTotalSupply] = useState<number>(0);
  const [nlandExchangeRate, setNlandExchangeRate] = useState<number>(0);
  const [nlandTotalAssets, setNlandTotalAssets] = useState<number>(0);
  const [nlandRewardPerYear, setNlandRewardPerYear] = useState<number>(0);
  const [nlandBalance, setNlandBalance] = useState<number>(0);
  const [nlandApr, setNlandApr] = useState<number>(0);
  const [nlandAssetsPerMonth, setNlandAssetsPerMonth] = useState<number>(0);
  const [nlandProfitability, setNlandProfitability] = useState<number>(0);

  const [nlandUserAssets, setNlandUserAssets] = useState<number>(0);
  const [nlandUserDeposited, setNlandUserDeposited] = useState<number>(0);
  const [nlandUserEarns, setNlandUserEarns] = useState<number>(0);

  const [isLoading, setLoading] = useBoolean(true);

  const loadPrices = () => {
    setLoading(true);

    callViewFunction(
      CHAIN_ID,
      contracts.nland[CHAIN_ID],
      [],
      "totalSupply",
      NLAND
    ).then((value: number) => setNlandTotalSupply(formatUintToDecimal(value)));

    callViewFunction(
      CHAIN_ID,
      contracts.mainStaking[CHAIN_ID],
      [NLAND_POOL_ID],
      "poolInfo",
      MainStaking
    ).then((value: any) => {
      setNlandRewardPerYear(value.nativePerSecond);
      setNlandAssetsPerMonth(formatUintToDecimal(value.assetPerMonthPerFullWantToken))
    });

    callViewFunction(
      CHAIN_ID,
      contracts.nland[CHAIN_ID],
      [contracts.mainStaking[CHAIN_ID]],
      "balanceOf",
      NLAND
    ).then(setNlandBalance);

    callViewFunction(
      CHAIN_ID,
      contracts.oracleNland[CHAIN_ID],
      [],
      "getPrice",
      OracleNLAND
    ).then((value: number) => setNlandExchangeRate(formatUintToDecimal(value)));


    if (library && account) {

      callFunction(
        contracts.nland[CHAIN_ID],
        library,
        [account],
        "balanceOf",
        NLAND
      ).then((value: number) => setNlandUserAssets(formatUintToDecimal(value)));

      callFunction(
        contracts.mainStaking[CHAIN_ID],
        library,
        [NLAND_POOL_ID, account],
        "userInfo",
        MainStaking
      ).then((userInfo: {amount: {_hex: string}}) => setNlandUserDeposited(formatHexNumber(get(userInfo, 'amount._hex', '0x00'))));


      callFunction(
        contracts.mainStaking[CHAIN_ID],
        library,
        [NLAND_POOL_ID, account],
        "getPendingNative",
        MainStaking
      ).then((value: {_hex: string}) => setNlandUserEarns(formatHexNumber(value._hex)));
    }

    setLoading(false);
  };

  useEffect(() => {
    setNlandTotalAssets(nlandExchangeRate * nlandTotalSupply);
  }, [nlandExchangeRate, nlandTotalSupply, nlandUserAssets]);

  useEffect(() => {
    setNlandProfitability((nlandAssetsPerMonth * nlandExchangeRate));
  }, [nlandAssetsPerMonth, nlandExchangeRate]);

  useEffect(() => {
    const nlandTVL: number = nlandBalance * nlandExchangeRate;
    let apr: number = ((nlandRewardPerYear / nlandTVL) * 100) / nacExchangeRate;
    if (!isFinite(apr)) {
      apr = 0
    }
    setNlandApr(apr);
  }, [nlandRewardPerYear, nlandBalance, nacExchangeRate, nlandExchangeRate]);

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
    <NlandContext.Provider
      value={{
        nlandTotalSupply,
        nlandExchangeRate,
        nlandTotalAssets,
        nlandRewardPerYear,
        nlandBalance,
        nlandApr,
        nlandProfitability,

        nlandUserAssets,
        nlandUserDeposited,
        nlandUserEarns,

        isLoading
      }}
    >
      {children}
    </NlandContext.Provider>
  );
};

export { NlandContext, NlandContextProvider };
