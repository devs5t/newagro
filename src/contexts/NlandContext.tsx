import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { useBoolean } from "react-use";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NewToken from "src/config/abi/NewToken.json";
import NewTokenExchange from "src/config/abi/NewTokenExchange.json";
import NewTokenOracle from "src/config/abi/NewTokenOracle.json";
import MainStaking from "src/config/abi/MainStaking.json";
import {callViewFunction, callFunction} from "reblox-web3-utils";
import {useEthers} from "@usedapp/core";
import {NLAND_POOL_ID, NLAND_TOKENS_BY_HECTARE} from "src/config/constants";
import {PriceContext} from "src/contexts/PriceContext";
import {SECONDS_PER_YEAR} from "src/utils";
import {formatUintToDecimal} from "src/utils/formatUtils";

const NlandContext = createContext({
  nlandTotalSupply: 0,
  nlandExchangeRate: 0,
  nlandSuggestedPrice: 0,
  nlandTotalAssets: 0,
  nlandLastRewardDate: new Date(),
  nlandRewardPerSecond: 0,
  nlandBalance: 0,
  nlandApr: 0,
  nlandAssetsPerMonth: 0,
  nlandProfitability: 0,

  nlandUserAssets: 0,
  nlandUserDeposited: 0,
  nlandUserEarns: 0,

  totalHectares: 0,
  userHectares: 0,

  isLoading: true,
  loadPrices: () => {},
});

interface NlandContextProviderProps {
  children: ReactNode;
}
const NlandContextProvider = ({ children }: NlandContextProviderProps) => {
  const { account, library } = useEthers();
  const {nacExchangeRate} = useContext(PriceContext)

  const [nlandTotalSupply, setNlandTotalSupply] = useState<number>(0);
  const [nlandExchangeRate, setNlandExchangeRate] = useState<number>(0);
  const [nlandSuggestedPrice, setNlandSuggestedPrice] = useState<number>(0);
  const [nlandTotalAssets, setNlandTotalAssets] = useState<number>(0);
  const [nlandLastRewardDate, setNlandLastRewardDate] = useState<Date>(new Date());
  const [nlandRewardPerSecond, setNlandRewardPerSecond] = useState<number>(0);
  const [nlandBalance, setNlandBalance] = useState<number>(0);
  const [nlandApr, setNlandApr] = useState<number>(0);
  const [nlandAssetsPerMonth, setNlandAssetsPerMonth] = useState<number>(0);
  const [nlandProfitability, setNlandProfitability] = useState<number>(0);

  const [nlandUserAssets, setNlandUserAssets] = useState<number>(0);
  const [nlandUserDeposited, setNlandUserDeposited] = useState<number>(0);
  const [nlandUserEarns, setNlandUserEarns] = useState<number>(0);

  const [totalHectares, setTotalHectares] = useState<number>(0);
  const [userHectares, setUserHectares] = useState<number>(0);

  const [isLoading, setLoading] = useBoolean(true);

  const loadPrices = () => {
    setLoading(true);

    callViewFunction(
      CHAIN_ID,
      contracts.nland[CHAIN_ID],
      [],
      "totalSupply",
      NewToken
    ).then(setNlandTotalSupply);

    callViewFunction(
      CHAIN_ID,
      contracts.mainStaking[CHAIN_ID],
      [NLAND_POOL_ID],
      "poolInfo",
      MainStaking
    ).then((value: any) => {
      setNlandLastRewardDate(new Date(value.lastRewardTimestamp * 1000));
      setNlandRewardPerSecond(value.nativePerSecond);
      setNlandAssetsPerMonth(value.assetPerMonthPerFullWantToken)
    });

    callViewFunction(
      CHAIN_ID,
      contracts.nland[CHAIN_ID],
      [contracts.mainStaking[CHAIN_ID]],
      "balanceOf",
      NewToken
    ).then(setNlandBalance);

    callViewFunction(
      CHAIN_ID,
      contracts.oracleNland[CHAIN_ID],
      [],
      "getPrice",
      NewTokenOracle
    ).then(setNlandExchangeRate);

    callViewFunction(
      CHAIN_ID,
      contracts.exchangeNland[CHAIN_ID],
      [],
      "getSuggestedPrice",
      NewTokenExchange
    ).then(setNlandSuggestedPrice);

    if (library && account) {

      callFunction(
        contracts.nland[CHAIN_ID],
        library,
        [account],
        "balanceOf",
        NewToken
      ).then(setNlandUserAssets);

      callFunction(
        contracts.mainStaking[CHAIN_ID],
        library,
        [NLAND_POOL_ID, account],
        "userInfo",
        MainStaking
      ).then((userInfo: {amount: any}) => setNlandUserDeposited(userInfo.amount));

      requestUserEarns()
      setInterval(() => requestUserEarns(), 10000);
    }

    setLoading(false);
  };

  const requestUserEarns = () => {
    callFunction(
      contracts.mainStaking[CHAIN_ID],
      library,
      [NLAND_POOL_ID, account],
      "getPendingNative",
      MainStaking
    ).then(setNlandUserEarns);
  }

  useEffect(() => {
    setNlandTotalAssets(formatUintToDecimal(nlandTotalSupply) * formatUintToDecimal(nlandSuggestedPrice));
    setTotalHectares(formatUintToDecimal(nlandTotalSupply) / NLAND_TOKENS_BY_HECTARE);
  }, [nlandSuggestedPrice, nlandTotalSupply]);

  useEffect(() => {
    setUserHectares((formatUintToDecimal(nlandUserAssets) + formatUintToDecimal(nlandUserDeposited)) / NLAND_TOKENS_BY_HECTARE);
  }, [nlandUserAssets]);

  useEffect(() => {
    setNlandProfitability((formatUintToDecimal(nlandAssetsPerMonth) * formatUintToDecimal(nlandExchangeRate) * NLAND_TOKENS_BY_HECTARE));
  }, [nlandAssetsPerMonth, nlandExchangeRate]);

  useEffect(() => {
    const nlandTVL: number = formatUintToDecimal(nlandBalance) * formatUintToDecimal(nlandSuggestedPrice);
    let apr: number = (((formatUintToDecimal(nlandRewardPerSecond) * SECONDS_PER_YEAR) / nlandTVL) * 100) / formatUintToDecimal(nacExchangeRate);
    if (!isFinite(apr)) {
      apr = 0
    }
    setNlandApr(apr);
  }, [nlandRewardPerSecond, nlandBalance, nacExchangeRate, nlandSuggestedPrice]);

  return (
    <NlandContext.Provider
      value={{
        nlandTotalSupply,
        nlandExchangeRate,
        nlandSuggestedPrice,
        nlandTotalAssets,
        nlandLastRewardDate,
        nlandRewardPerSecond,
        nlandBalance,
        nlandApr,
        nlandAssetsPerMonth,
        nlandProfitability,

        nlandUserAssets,
        nlandUserDeposited,
        nlandUserEarns,

        totalHectares,
        userHectares,

        isLoading,
        loadPrices
      }}
    >
      {children}
    </NlandContext.Provider>
  );
};

export { NlandContext, NlandContextProvider };
