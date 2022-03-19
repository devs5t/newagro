import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { useBoolean } from "react-use";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NMILK from "src/config/abi/NMILK.json";
import OracleNMILK from "src/config/abi/OracleNMILK.json";
import MainStaking from "src/config/abi/MainStaking.json";
import {callViewFunction, callFunction} from "reblox-web3-utils";
import {useEthers} from "@usedapp/core";
import {NMILK_POOL_ID, NMILK_TOKENS_BY_COW} from "src/config/constants";
import {get} from "lodash";
import {formatUintToDecimal, formatHexToUintToDecimal} from "src/utils/formatUtils";
import {PriceContext} from "src/contexts/PriceContext";
import {SECONDS_PER_YEAR} from "src/utils";

const NmilkContext = createContext({
  nmilkTotalSupply: 0,
  nmilkExchangeRate: 0,
  nmilkTotalAssets: 0,
  nmilkLastRewardDate: new Date(),
  nmilkRewardPerSecond: 0,
  nmilkBalance: 0,
  nmilkApr: 0,
  nmilkProfitability: 0,

  nmilkUserAssets: 0,
  nmilkUserDeposited: 0,
  nmilkUserEarns: 0,

  milkingCows: 0,
  userMilkingCows: 0,

  isLoading: true,
  loadPrices: () => {},
});

interface NmilkContextProviderProps {
  children: ReactNode;
}
const NmilkContextProvider = ({ children }: NmilkContextProviderProps) => {
  const { account, library } = useEthers();
  const {nacExchangeRate} = useContext(PriceContext)

  const [nmilkTotalSupply, setNmilkTotalSupply] = useState<number>(0);
  const [nmilkExchangeRate, setNmilkExchangeRate] = useState<number>(0);
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

  const [milkingCows, setMilkingCows] = useState<number>(0);
  const [userMilkingCows, setUserMilkingCows] = useState<number>(0);

  const [isLoading, setLoading] = useBoolean(true);

  const loadPrices = () => {
    setLoading(true);

    callViewFunction(
      CHAIN_ID,
      contracts.nmilk[CHAIN_ID],
      [],
      "totalSupply",
      NMILK
    ).then((value: number) => setNmilkTotalSupply(formatUintToDecimal(value)));

    callViewFunction(
      CHAIN_ID,
      contracts.mainStaking[CHAIN_ID],
      [NMILK_POOL_ID],
      "poolInfo",
      MainStaking
    ).then((value: any) => {
      setNmilkLastRewardDate(new Date(value.lastRewardTimestamp * 1000));
      setNmilkRewardPerSecond(formatUintToDecimal(value.nativePerSecond));
      setNmilkAssetsPerMonth(formatUintToDecimal(value.assetPerMonthPerFullWantToken))
    });

    callViewFunction(
      CHAIN_ID,
      contracts.nmilk[CHAIN_ID],
      [contracts.mainStaking[CHAIN_ID]],
      "balanceOf",
      NMILK
    ).then((value: number) => setNmilkBalance(formatUintToDecimal(value)));

    callViewFunction(
      CHAIN_ID,
      contracts.oracleNmilk[CHAIN_ID],
      [],
      "getPrice",
      OracleNMILK
    ).then((value: number) => setNmilkExchangeRate(formatUintToDecimal(value)));


    if (library && account) {

      callFunction(
        contracts.nmilk[CHAIN_ID],
        library,
        [account],
        "balanceOf",
        NMILK
      ).then((value: number) => setNmilkUserAssets(formatUintToDecimal(value)));

      callFunction(
        contracts.mainStaking[CHAIN_ID],
        library,
        [NMILK_POOL_ID, account],
        "userInfo",
        MainStaking
      ).then((userInfo: {amount: {_hex: string}}) => setNmilkUserDeposited(formatHexToUintToDecimal(get(userInfo, 'amount._hex', '0x00'))));


      callFunction(
        contracts.mainStaking[CHAIN_ID],
        library,
        [NMILK_POOL_ID, account],
        "getPendingNative",
        MainStaking
      ).then((value: {_hex: string}) => setNmilkUserEarns(formatHexToUintToDecimal(value._hex)));
    }

    setLoading(false);
  };

  useEffect(() => {
    setNmilkTotalAssets((nmilkTotalSupply * nmilkExchangeRate) / nacExchangeRate);
    setMilkingCows(nmilkTotalSupply / NMILK_TOKENS_BY_COW);
    setUserMilkingCows(nmilkUserAssets / NMILK_TOKENS_BY_COW);
  }, [nmilkExchangeRate, nmilkTotalSupply, nmilkUserAssets]);

  useEffect(() => {
    setNmilkProfitability((nmilkAssetsPerMonth * nmilkExchangeRate * NMILK_TOKENS_BY_COW));
  }, [nmilkAssetsPerMonth, nmilkExchangeRate]);

  useEffect(() => {
    const nmilkTVL: number = nmilkBalance * nmilkExchangeRate;
    let apr: number = (((nmilkRewardPerSecond * SECONDS_PER_YEAR) / nmilkTVL) * 100) / nacExchangeRate;
    if (!isFinite(apr)) {
      apr = 0
    }
    setNmilkApr(apr);
  }, [nmilkRewardPerSecond, nmilkBalance, nacExchangeRate, nmilkExchangeRate]);

  return (
    <NmilkContext.Provider
      value={{
        nmilkTotalSupply,
        nmilkExchangeRate,
        nmilkTotalAssets,
        nmilkLastRewardDate,
        nmilkRewardPerSecond,
        nmilkBalance,
        nmilkApr,
        nmilkProfitability,

        nmilkUserAssets,
        nmilkUserDeposited,
        nmilkUserEarns,

        milkingCows,
        userMilkingCows,

        isLoading,
        loadPrices
      }}
    >
      {children}
    </NmilkContext.Provider>
  );
};

export { NmilkContext, NmilkContextProvider };
