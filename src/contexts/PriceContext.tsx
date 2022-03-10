import { createContext, ReactNode, useEffect, useState } from "react";
import { useBoolean } from "react-use";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NAC from "src/config/abi/NAC.json";
import NMILK from "src/config/abi/NMILK.json";
import OracleNMILK from "src/config/abi/OracleNMILK.json";
import OracleFX from "src/config/abi/OracleFX.json";
import MainStaking from "src/config/abi/MainStaking.json";
import {callViewFunction, callFunction} from "reblox-web3-utils";
import {useEthers} from "@usedapp/core";
import {NLAND_POOL_ID, NMILK_POOL_ID, NMILK_TOKENS_BY_COW} from "src/config/constants";
import {get} from "lodash";
import {formatUintToDecimal, formatHexNumber} from "src/utils/formatUtils";

const PriceContext = createContext({
  usdtUserAssets: 0,

  nacTotalSupply: 0,
  nacUserAssets: 0,

  nmilkTotalSupply: 0,
  nmilkExchangeRate: 0,
  nmilkTotalAssets: 0,
  nmilkRewardPerYear: 0,
  nmilkBalance: 0,
  nmilkApr: 0,
  nmilkProfitability: 0,

  nmilkUserAssets: 0,
  nmilkUserDeposited: 0,
  nmilkUserEarns: 0,

  nbeefUserAssets: 0,
  nbeefUserDeposited: 0,
  nbeefUserEarns: 0,

  nlandUserAssets: 0,
  nlandUserDeposited: 0,
  nlandUserEarns: 0,


  milkingCows: 0,
  userMilkingCows: 0,

  historicalEarning: 0,

  nacExchangeRate: 0,
  isLoading: true
});

interface PriceContextProviderProps {
  children: ReactNode;
}
const PriceContextProvider = ({ children }: PriceContextProviderProps) => {
  const { account, library } = useEthers();

  const [usdtUserAssets, setUsdtUserAssets] = useState<number>(0);

  const [nacTotalSupply, setNacTotalSupply] = useState<number>(0);
  const [nacUserAssets, setNacUserAssets] = useState<number>(0);

  const [nmilkTotalSupply, setNmilkTotalSupply] = useState<number>(0);
  const [nmilkExchangeRate, setNmilkExchangeRate] = useState<number>(0);
  const [nmilkTotalAssets, setNmilkTotalAssets] = useState<number>(0);
  const [nmilkRewardPerYear, setNmilkRewardPerYear] = useState<number>(0);
  const [nmilkBalance, setNmilkBalance] = useState<number>(0);
  const [nmilkApr, setNmilkApr] = useState<number>(0);
  const [nmilkAssetsPerMonth, setNmilkAssetsPerMonth] = useState<number>(0);
  const [nmilkProfitability, setNmilkProfitability] = useState<number>(0);
  const [nmilkUserAssets, setNmilkUserAssets] = useState<number>(0);
  const [nmilkUserDeposited, setNmilkUserDeposited] = useState<number>(0);
  const [nmilkUserEarns, setNmilkUserEarns] = useState<number>(0);

  const [nbeefUserAssets, setNbeefUserAssets] = useState<number>(0);
  const [nbeefUserDeposited, setNbeefUserDeposited] = useState<number>(0);
  const [nbeefUserEarns, setNbeefUserEarns] = useState<number>(0);

  const [nlandUserAssets, setNlandUserAssets] = useState<number>(0);
  const [nlandUserDeposited, setNlandUserDeposited] = useState<number>(0);
  const [nlandUserEarns, setNlandUserEarns] = useState<number>(0);

  const [milkingCows, setMilkingCows] = useState<number>(0);
  const [userMilkingCows, setUserMilkingCows] = useState<number>(0);

  const [historicalEarning, setHistoricalEarning] = useState<number>(0);

  const [nacExchangeRate, setNacExchangeRate] = useState<number>(0);

  const [isLoading, setLoading] = useBoolean(true);

  const loadPrices = () => {
    setLoading(true);

    callViewFunction(
      CHAIN_ID,
      contracts.nac[CHAIN_ID],
      [],
      "totalSupply",
      NAC
    ).then((value) => setNacTotalSupply(formatUintToDecimal(value)));

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
      setNmilkRewardPerYear(value.nativePerSecond);
      setNmilkAssetsPerMonth(formatUintToDecimal(value.assetPerMonthPerFullWantToken))
    });

    callViewFunction(
      CHAIN_ID,
      contracts.nmilk[CHAIN_ID],
      [contracts.mainStaking[CHAIN_ID]],
      "balanceOf",
      NMILK
    ).then(setNmilkBalance);

    callViewFunction(
      CHAIN_ID,
      contracts.oracleNmilk[CHAIN_ID],
      [],
      "getPrice",
      OracleNMILK
    ).then((value: number) => setNmilkExchangeRate(formatUintToDecimal(value)));

    callViewFunction(
      CHAIN_ID,
      contracts.oracleFX[CHAIN_ID],
      [],
      "getPrice",
      OracleFX
    ).then((value: number) => setNacExchangeRate(formatUintToDecimal(value)));

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
        contracts.nmilk[CHAIN_ID],
        library,
        [account],
        "balanceOf",
        NMILK
      ).then((value: number) => setNmilkUserAssets(formatUintToDecimal(value)));

      // callFunction(
      //   contracts.nbeef[CHAIN_ID],
      //   library,
      //   [account],
      //   "balanceOf",
      //   NBEEF
      // ).then((value: number) => setNbeefUserAssets(formatUintToDecimal(value)));


      // callFunction(
      //   contracts.nland[CHAIN_ID],
      //   library,
      //   [account],
      //   "balanceOf",
      //   NLAND
      // ).then((value: number) => setNland(formatUintToDecimal(value)));

      callFunction(
        contracts.mainStaking[CHAIN_ID],
        library,
        [NMILK_POOL_ID, account],
        "userInfo",
        MainStaking
      ).then((userInfo: {amount: {_hex: string}}) => setNmilkUserDeposited(formatHexNumber(get(userInfo, 'amount._hex', '0x00'))));

      // callFunction(
      //   contracts.mainStaking[CHAIN_ID],
      //   library,
      //   [NBEEF_POOL_ID, account],
      //   "userInfo",
      //   MainStaking
      // ).then((userInfo: {amount: {_hex: string}}) => setNbeefUserDeposited(formatHexNumber(get(userInfo, 'amount._hex', '0x00'))));

      // callFunction(
      //   contracts.mainStaking[CHAIN_ID],
      //   library,
      //   [NLAND_POOL_ID, account],
      //   "userInfo",
      //   MainStaking
      // ).then((userInfo: {amount: {_hex: string}}) => setNlandUserDeposited(formatHexNumber(get(userInfo, 'amount._hex', '0x00'))));

      callFunction(
        contracts.mainStaking[CHAIN_ID],
        library,
        [NMILK_POOL_ID, account],
        "getPendingNative",
        MainStaking
      ).then((value: {_hex: string}) => setNmilkUserEarns(formatHexNumber(value._hex)));

      // callFunction(
      //   contracts.mainStaking[CHAIN_ID],
      //   library,
      //   [NBEEF_POOL_ID, account],
      //   "getPendingNative",
      //   MainStaking
      // ).then((value: {_hex: string}) => setNbeefUserEarns(formatHexNumber(value._hex)));

      // callFunction(
      //   contracts.mainStaking[CHAIN_ID],
      //   library,
      //   [NLAND_POOL_ID, account],
      //   "getPendingNative",
      //   MainStaking
      // ).then((value: {_hex: string}) => setNlandUserEarns(formatHexNumber(value._hex)));
      

      callFunction(
        contracts.mainStaking[CHAIN_ID],
        library,
        [account],
        "getUserHistoricalRewards",
        MainStaking
      ).then((value: {_hex: string}) => setHistoricalEarning(formatHexNumber(value._hex)))
    }

    setLoading(false);
  };

  useEffect(() => {
    setNmilkTotalAssets(nmilkExchangeRate * nmilkTotalSupply);
    setMilkingCows(nmilkTotalSupply / NMILK_TOKENS_BY_COW);
    setUserMilkingCows(nmilkUserAssets / NMILK_TOKENS_BY_COW);
  }, [nmilkExchangeRate, nmilkTotalSupply, nmilkUserAssets]);

  useEffect(() => {
    setNmilkProfitability((nmilkAssetsPerMonth * nmilkExchangeRate * NMILK_TOKENS_BY_COW));
  }, [nmilkAssetsPerMonth, nmilkExchangeRate]);

  useEffect(() => {
    const nmilkTVL: number = nmilkBalance * nmilkExchangeRate;
    let apr: number = ((nmilkRewardPerYear / nmilkTVL) * 100) / nacExchangeRate;
    if (!isFinite(apr)) {
      apr = 0
    }
    setNmilkApr(apr);
  }, [nmilkRewardPerYear, nmilkBalance, nacExchangeRate, nmilkExchangeRate]);

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
        usdtUserAssets,

        nacTotalSupply,
        nacUserAssets,

        nmilkTotalSupply,
        nmilkExchangeRate,
        nmilkTotalAssets,
        nmilkRewardPerYear,
        nmilkBalance,
        nmilkApr,
        nmilkProfitability,

        nmilkUserAssets,
        nmilkUserDeposited,
        nmilkUserEarns,

        // nbeefUserAssets,
        // nbeefUserDeposited,
        // nbeefUserEarns,

        // nlandUserAssets,
        // nlandUserDeposited,
        // nlandUserEarns,

        milkingCows,
        userMilkingCows,

        historicalEarning,

        nacExchangeRate,
        isLoading
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};

export { PriceContext, PriceContextProvider };
