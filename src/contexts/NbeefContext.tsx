import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { useBoolean } from "react-use";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NBEEF from "src/config/abi/NMILK.json";
import OracleNBEEF from "src/config/abi/OracleNMILK.json";
import MainStaking from "src/config/abi/MainStaking.json";
import {callViewFunction, callFunction} from "reblox-web3-utils";
import {useEthers} from "@usedapp/core";
import {NBEEF_POOL_ID, NBEEF_TOKENS_BY_STEER} from "src/config/constants";
import {get} from "lodash";
import {formatUintToDecimal, formatHexToUintToDecimal} from "src/utils/formatUtils";
import {PriceContext} from "src/contexts/PriceContext";
import {SECONDS_PER_YEAR} from "src/utils";
import NBEEFExchange from "src/config/abi/NBEEFExchange.json";

const NbeefContext = createContext({
  nbeefTotalSupply: 0,
  nbeefExchangeRate: 0,
  nbeefSuggestedPrice: 0,
  nbeefTotalAssets: 0,
  nbeefLastRewardDate: new Date(),
  nbeefRewardPerSecond: 0,
  nbeefBalance: 0,
  nbeefApr: 0,
  nbeefAssetsPerMonth: 0,
  nbeefProfitability: 0,

  nbeefUserAssets: 0,
  nbeefUserDeposited: 0,
  nbeefUserEarns: 0,

  totalSteers: 0,
  userSteers: 0,

  isLoading: true,
  loadPrices: () => {},
});

interface NbeefContextProviderProps {
  children: ReactNode;
}
const NbeefContextProvider = ({ children }: NbeefContextProviderProps) => {
  const { account, library } = useEthers();
  const {nacExchangeRate} = useContext(PriceContext)

  const [nbeefTotalSupply, setNbeefTotalSupply] = useState<number>(0);
  const [nbeefExchangeRate, setNbeefExchangeRate] = useState<number>(0);
  const [nbeefSuggestedPrice, setNbeefSuggestedPrice] = useState<number>(0);
  const [nbeefTotalAssets, setNbeefTotalAssets] = useState<number>(0);
  const [nbeefLastRewardDate, setNbeefLastRewardDate] = useState<Date>(new Date());
  const [nbeefRewardPerSecond, setNbeefRewardPerSecond] = useState<number>(0);
  const [nbeefBalance, setNbeefBalance] = useState<number>(0);
  const [nbeefApr, setNbeefApr] = useState<number>(0);
  const [nbeefAssetsPerMonth, setNbeefAssetsPerMonth] = useState<number>(0);
  const [nbeefProfitability, setNbeefProfitability] = useState<number>(0);

  const [nbeefUserAssets, setNbeefUserAssets] = useState<number>(0);
  const [nbeefUserDeposited, setNbeefUserDeposited] = useState<number>(0);
  const [nbeefUserEarns, setNbeefUserEarns] = useState<number>(0);

  const [totalSteers, setTotalSteers] = useState<number>(0);
  const [userSteers, setUserSteers] = useState<number>(0);

  const [isLoading, setLoading] = useBoolean(true);

  const loadPrices = () => {
    setLoading(true);

    callViewFunction(
      CHAIN_ID,
      contracts.nbeef[CHAIN_ID],
      [],
      "totalSupply",
      NBEEF
    ).then((value: number) => setNbeefTotalSupply(formatUintToDecimal(value)));

    callViewFunction(
      CHAIN_ID,
      contracts.mainStaking[CHAIN_ID],
      [NBEEF_POOL_ID],
      "poolInfo",
      MainStaking
    ).then((value: any) => {
      setNbeefLastRewardDate(new Date(value.lastRewardTimestamp * 1000));
      setNbeefRewardPerSecond(formatUintToDecimal(value.nativePerSecond));
      setNbeefAssetsPerMonth(formatUintToDecimal(value.assetPerMonthPerFullWantToken))
    });

    callViewFunction(
      CHAIN_ID,
      contracts.nbeef[CHAIN_ID],
      [contracts.mainStaking[CHAIN_ID]],
      "balanceOf",
      NBEEF
    ).then((value: number) => setNbeefBalance(formatUintToDecimal(value)));

    callViewFunction(
      CHAIN_ID,
      contracts.oracleNbeef[CHAIN_ID],
      [],
      "getPrice",
      OracleNBEEF
    ).then((value: number) => setNbeefExchangeRate(formatUintToDecimal(value)));

    callViewFunction(
      CHAIN_ID,
      contracts.exchangeNbeef[CHAIN_ID],
      [],
      "getSuggestedPrice",
      NBEEFExchange
    ).then((value: number) => setNbeefSuggestedPrice(formatUintToDecimal(value)));

    if (library && account) {

      callFunction(
        contracts.nbeef[CHAIN_ID],
        library,
        [account],
        "balanceOf",
        NBEEF
      ).then((value: number) => setNbeefUserAssets(formatUintToDecimal(value)));

      callFunction(
        contracts.mainStaking[CHAIN_ID],
        library,
        [NBEEF_POOL_ID, account],
        "userInfo",
        MainStaking
      ).then((userInfo: {amount: {_hex: string}}) => setNbeefUserDeposited(formatHexToUintToDecimal(get(userInfo, 'amount._hex', '0x00'))));

      requestUserEarns()
      setInterval(() => requestUserEarns(), 10000);
    }

    setLoading(false);
  };

  const requestUserEarns = () => {
    callFunction(
      contracts.mainStaking[CHAIN_ID],
      library,
      [NBEEF_POOL_ID, account],
      "getPendingNative",
      MainStaking
    ).then((value: {_hex: string}) => setNbeefUserEarns(formatHexToUintToDecimal(value._hex)));
  }

  useEffect(() => {
    setNbeefTotalAssets(nbeefTotalSupply * nbeefSuggestedPrice);
    setTotalSteers(nbeefTotalSupply / NBEEF_TOKENS_BY_STEER);
  }, [nbeefSuggestedPrice, nbeefTotalSupply]);

  useEffect(() => {
    setUserSteers(nbeefUserAssets / NBEEF_TOKENS_BY_STEER);
  }, [nbeefUserAssets]);

  useEffect(() => {
    setNbeefProfitability((nbeefAssetsPerMonth * nbeefExchangeRate * NBEEF_TOKENS_BY_STEER));
  }, [nbeefAssetsPerMonth, nbeefExchangeRate]);

  useEffect(() => {
    const nbeefTVL: number = nbeefBalance * nbeefSuggestedPrice;
    let apr: number = (((nbeefRewardPerSecond * SECONDS_PER_YEAR) / nbeefTVL) * 100) / nacExchangeRate;
    if (!isFinite(apr)) {
      apr = 0
    }
    setNbeefApr(apr);
  }, [nbeefRewardPerSecond, nbeefBalance, nacExchangeRate, nbeefSuggestedPrice]);

  return (
    <NbeefContext.Provider
      value={{
        nbeefTotalSupply,
        nbeefExchangeRate,
        nbeefSuggestedPrice,
        nbeefTotalAssets,
        nbeefLastRewardDate,
        nbeefRewardPerSecond,
        nbeefBalance,
        nbeefApr,
        nbeefAssetsPerMonth,
        nbeefProfitability,

        nbeefUserAssets,
        nbeefUserDeposited,
        nbeefUserEarns,

        totalSteers,
        userSteers,

        isLoading,
        loadPrices
      }}
    >
      {children}
    </NbeefContext.Provider>
  );
};

export { NbeefContext, NbeefContextProvider };
