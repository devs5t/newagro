import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { useBoolean } from "react-use";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NLAND from "src/config/abi/NMILK.json";
import OracleNLAND from "src/config/abi/OracleNMILK.json";
import MainStaking from "src/config/abi/MainStaking.json";
import {callViewFunction, callFunction} from "reblox-web3-utils";
import {useEthers} from "@usedapp/core";
import {NLAND_POOL_ID, NLAND_TOKENS_BY_HECTARE} from "src/config/constants";
import {get} from "lodash";
import {formatUintToDecimal, formatHexToUintToDecimal} from "src/utils/formatUtils";
import {PriceContext} from "src/contexts/PriceContext";
import {SECONDS_PER_YEAR} from "src/utils";
import NLANDExchange from "src/config/abi/NLANDExchange.json";

const NlandContext = createContext({
  nlandTotalSupply: 0,
  nlandExchangeRate: 0,
  nlandSuggestedPrice: 0,
  nlandTotalAssets: 0,
  nlandLastRewardDate: new Date(),
  nlandRewardPerSecond: 0,
  nlandBalance: 0,
  nlandApr: 0,
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
      NLAND
    ).then((value: number) => setNlandTotalSupply(formatUintToDecimal(value)));

    callViewFunction(
      CHAIN_ID,
      contracts.mainStaking[CHAIN_ID],
      [NLAND_POOL_ID],
      "poolInfo",
      MainStaking
    ).then((value: any) => {
      setNlandLastRewardDate(new Date(value.lastRewardTimestamp * 1000));
      setNlandRewardPerSecond(formatUintToDecimal(value.nativePerSecond));
      setNlandAssetsPerMonth(formatUintToDecimal(value.assetPerMonthPerFullWantToken))
    });

    callViewFunction(
      CHAIN_ID,
      contracts.nland[CHAIN_ID],
      [contracts.mainStaking[CHAIN_ID]],
      "balanceOf",
      NLAND
    ).then((value: number) => setNlandBalance(formatUintToDecimal(value)));

    callViewFunction(
      CHAIN_ID,
      contracts.oracleNland[CHAIN_ID],
      [],
      "getPrice",
      OracleNLAND
    ).then((value: number) => setNlandExchangeRate(formatUintToDecimal(value)));

    callViewFunction(
      CHAIN_ID,
      contracts.exchangeNland[CHAIN_ID],
      [],
      "getSuggestedPrice",
      NLANDExchange
    ).then((value: number) => setNlandSuggestedPrice(formatUintToDecimal(value)));

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
      ).then((userInfo: {amount: {_hex: string}}) => setNlandUserDeposited(formatHexToUintToDecimal(get(userInfo, 'amount._hex', '0x00'))));

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
    ).then((value: {_hex: string}) => setNlandUserEarns(formatHexToUintToDecimal(value._hex)));
  }

  useEffect(() => {
    setNlandTotalAssets(nlandTotalSupply * nlandSuggestedPrice);
    setTotalHectares(nlandTotalSupply / NLAND_TOKENS_BY_HECTARE);
  }, [nlandSuggestedPrice, nlandTotalSupply]);

  useEffect(() => {
    setUserHectares(nlandUserAssets / NLAND_TOKENS_BY_HECTARE);
  }, [nlandUserAssets]);

  useEffect(() => {
    setNlandProfitability((nlandAssetsPerMonth * nlandExchangeRate));
  }, [nlandAssetsPerMonth, nlandExchangeRate]);

  useEffect(() => {
    const nlandTVL: number = nlandBalance * nlandSuggestedPrice;
    let apr: number = (((nlandRewardPerSecond * SECONDS_PER_YEAR) / nlandTVL) * 100) / nacExchangeRate;
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
