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
import {NMILK_POOL_ID, NMILK_TOKENS_BY_COW} from "src/config/constants";
import {PriceContext} from "src/contexts/PriceContext";
import {SECONDS_PER_YEAR} from "src/utils";
import {formatUintToDecimal} from "src/utils/formatUtils";
import {SellOrdersContext} from "src/contexts/SellOrdersContex";

const NmilkContext = createContext({
  nmilkTotalSupply: 0,
  nmilkExchangeRate: 0,
  nmilkSuggestedPrice: 0,
  nmilkTotalAssets: 0,
  nmilkLastRewardDate: new Date(),
  nmilkRewardPerSecond: 0,
  nmilkBalance: 0,
  nmilkApr: 0,
  nmilkAssetsPerMonth: 0,
  nmilkProfitability: 0,

  nmilkUserAssets: 0,
  nmilkUserDeposited: 0,
  nmilkUserEarns: 0,

  totalCows: 0,
  userCows: 0,

  isLoading: true,
  loadPrices: () => {},
});

interface NmilkContextProviderProps {
  children: ReactNode;
}
const NmilkContextProvider = ({ children }: NmilkContextProviderProps) => {
  const { account, library } = useEthers();
  const {nacExchangeRate} = useContext(PriceContext);
  const {nmilkUserPendingSell} = useContext(SellOrdersContext);

  const [nmilkTotalSupply, setNmilkTotalSupply] = useState<number>(0);
  const [nmilkExchangeRate, setNmilkExchangeRate] = useState<number>(0);
  const [nmilkSuggestedPrice, setNmilkSuggestedPrice] = useState<number>(0);
  const [nmilkTotalAssets, setNmilkTotalAssets] = useState<number>(0);
  const [nmilkLastRewardDate, setNmilkLastRewardDate] = useState<Date>(new Date());
  const [nmilkRewardPerSecond, setNmilkRewardPerSecond] = useState<number>(0);
  const [nmilkBalance, setNmilkBalance] = useState<number>(0);
  const [nmilkApr, setNmilkApr] = useState<number>(0);
  const [nmilkAssetsPerMonth, setNmilkAssetsPerMonth] = useState<number>(0);
  const [nmilkProfitability, setNmilkProfitability] = useState<number>(0);

  const [nmilkUserAssets, setNmilkUserAssets] = useState<number>(0);
  const [nmilkUserDeposited, setNmilkUserDeposited] = useState<number>(0);
  const [nmilkUserEarns, setNmilkUserEarns] = useState<number>(0);

  const [totalCows, setTotalCows] = useState<number>(0);
  const [userCows, setUserCows] = useState<number>(0);

  const [isLoading, setLoading] = useBoolean(true);

  const loadPrices = () => {
    setLoading(true);

    callViewFunction(
      CHAIN_ID,
      contracts.nmilk[CHAIN_ID],
      [],
      "totalSupply",
      NewToken
    ).then(setNmilkTotalSupply);

    callViewFunction(
      CHAIN_ID,
      contracts.mainStaking[CHAIN_ID],
      [NMILK_POOL_ID],
      "poolInfo",
      MainStaking
    ).then((value: any) => {
      setNmilkLastRewardDate(new Date(value.lastRewardTimestamp * 1000));
      setNmilkRewardPerSecond(value.nativePerSecond);
      setNmilkAssetsPerMonth(value.assetPerMonthPerFullWantToken)
    });

    callViewFunction(
      CHAIN_ID,
      contracts.nmilk[CHAIN_ID],
      [contracts.mainStaking[CHAIN_ID]],
      "balanceOf",
      NewToken
    ).then(setNmilkBalance);

    callViewFunction(
      CHAIN_ID,
      contracts.oracleNmilk[CHAIN_ID],
      [],
      "getPrice",
      NewTokenOracle
    ).then(setNmilkExchangeRate);

    callViewFunction(
      CHAIN_ID,
      contracts.exchangeNmilk[CHAIN_ID],
      [],
      "getSuggestedPrice",
      NewTokenExchange
    ).then(setNmilkSuggestedPrice);

    if (library && account) {

      callFunction(
        contracts.nmilk[CHAIN_ID],
        library,
        [account],
        "balanceOf",
        NewToken
      ).then(setNmilkUserAssets);

      callFunction(
        contracts.mainStaking[CHAIN_ID],
        library,
        [NMILK_POOL_ID, account],
        "userInfo",
        MainStaking
      ).then((userInfo: {amount: any}) => setNmilkUserDeposited(userInfo.amount));

      requestUserEarns()
      setInterval(() => requestUserEarns(), 10000);
    }

    setLoading(false);
  };

  const requestUserEarns = () => {
    callFunction(
      contracts.mainStaking[CHAIN_ID],
      library,
      [NMILK_POOL_ID, account],
      "getPendingNative",
      MainStaking
    ).then(setNmilkUserEarns);
  };

  useEffect(() => {
    setNmilkTotalAssets(formatUintToDecimal(nmilkTotalSupply) * formatUintToDecimal(nmilkSuggestedPrice));
    setTotalCows(formatUintToDecimal(nmilkTotalSupply) / NMILK_TOKENS_BY_COW);
  }, [nmilkSuggestedPrice, nmilkTotalSupply]);

  useEffect(() => {
    setUserCows((formatUintToDecimal(nmilkUserAssets) + formatUintToDecimal(nmilkUserDeposited) + nmilkUserPendingSell) / NMILK_TOKENS_BY_COW);
  }, [nmilkUserAssets, nmilkUserDeposited]);

  useEffect(() => {
    setNmilkProfitability((formatUintToDecimal(nmilkAssetsPerMonth) * formatUintToDecimal(nmilkExchangeRate) * NMILK_TOKENS_BY_COW));
  }, [nmilkAssetsPerMonth, nmilkExchangeRate]);

  useEffect(() => {
    const nmilkTVL: number = formatUintToDecimal(nmilkBalance) * formatUintToDecimal(nmilkSuggestedPrice);
    let apr: number = (((formatUintToDecimal(nmilkRewardPerSecond) * SECONDS_PER_YEAR) / nmilkTVL) * 100) / formatUintToDecimal(nacExchangeRate);
    if (!isFinite(apr)) {
      apr = 0
    }
    setNmilkApr(apr);
  }, [nmilkRewardPerSecond, nmilkBalance, nacExchangeRate, nmilkSuggestedPrice]);

  return (
    <NmilkContext.Provider
      value={{
        nmilkTotalSupply,
        nmilkExchangeRate,
        nmilkSuggestedPrice,
        nmilkTotalAssets,
        nmilkLastRewardDate,
        nmilkRewardPerSecond,
        nmilkBalance,
        nmilkApr,
        nmilkAssetsPerMonth,
        nmilkProfitability,

        nmilkUserAssets,
        nmilkUserDeposited,
        nmilkUserEarns,

        totalCows,
        userCows,

        isLoading,
        loadPrices
      }}
    >
      {children}
    </NmilkContext.Provider>
  );
};

export { NmilkContext, NmilkContextProvider };
