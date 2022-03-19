import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { useBoolean } from "react-use";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NBEEF from "src/config/abi/NMILK.json";
import OracleNBEEF from "src/config/abi/OracleNMILK.json";
import MainStaking from "src/config/abi/MainStaking.json";
import {callViewFunction, callFunction} from "reblox-web3-utils";
import {useEthers} from "@usedapp/core";
import {NBEEF_POOL_ID} from "src/config/constants";
import {get} from "lodash";
import {formatUintToDecimal, formatHexToUintToDecimal} from "src/utils/formatUtils";
import {PriceContext} from "src/contexts/PriceContext";
import {SECONDS_PER_YEAR} from "src/utils";

const NbeefContext = createContext({
  nbeefTotalSupply: 0,
  nbeefExchangeRate: 0,
  nbeefTotalAssets: 0,
  nbeefRewardPerYear: 0,
  nbeefBalance: 0,
  nbeefApr: 0,
  nbeefProfitability: 0,

  nbeefUserAssets: 0,
  nbeefUserDeposited: 0,
  nbeefUserEarns: 0,

  isLoading: true
});

interface NbeefContextProviderProps {
  children: ReactNode;
}
const NbeefContextProvider = ({ children }: NbeefContextProviderProps) => {
  const { account, library } = useEthers();
  const {nacExchangeRate} = useContext(PriceContext)

  const [nbeefTotalSupply, setNbeefTotalSupply] = useState<number>(0);
  const [nbeefExchangeRate, setNbeefExchangeRate] = useState<number>(0);
  const [nbeefTotalAssets, setNbeefTotalAssets] = useState<number>(0);
  const [nbeefRewardPerYear, setNbeefRewardPerYear] = useState<number>(0);
  const [nbeefBalance, setNbeefBalance] = useState<number>(0);
  const [nbeefApr, setNbeefApr] = useState<number>(0);
  const [nbeefAssetsPerMonth, setNbeefAssetsPerMonth] = useState<number>(0);
  const [nbeefProfitability, setNbeefProfitability] = useState<number>(0);

  const [nbeefUserAssets, setNbeefUserAssets] = useState<number>(0);
  const [nbeefUserDeposited, setNbeefUserDeposited] = useState<number>(0);
  const [nbeefUserEarns, setNbeefUserEarns] = useState<number>(0);

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
      setNbeefRewardPerYear(value.nativePerSecond * SECONDS_PER_YEAR);
      setNbeefAssetsPerMonth(formatUintToDecimal(value.assetPerMonthPerFullWantToken))
    });

    callViewFunction(
      CHAIN_ID,
      contracts.nbeef[CHAIN_ID],
      [contracts.mainStaking[CHAIN_ID]],
      "balanceOf",
      NBEEF
    ).then(setNbeefBalance);

    callViewFunction(
      CHAIN_ID,
      contracts.oracleNbeef[CHAIN_ID],
      [],
      "getPrice",
      OracleNBEEF
    ).then((value: number) => setNbeefExchangeRate(formatUintToDecimal(value)));


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


      callFunction(
        contracts.mainStaking[CHAIN_ID],
        library,
        [NBEEF_POOL_ID, account],
        "getPendingNative",
        MainStaking
      ).then((value: {_hex: string}) => setNbeefUserEarns(formatHexToUintToDecimal(value._hex)));
    }

    setLoading(false);
  };

  useEffect(() => {
    setNbeefTotalAssets((nbeefTotalSupply * nbeefExchangeRate) / nacExchangeRate);
  }, [nbeefExchangeRate, nbeefTotalSupply, nbeefUserAssets]);

  useEffect(() => {
    setNbeefProfitability((nbeefAssetsPerMonth * nbeefExchangeRate));
  }, [nbeefAssetsPerMonth, nbeefExchangeRate]);

  useEffect(() => {
    const nbeefTVL: number = nbeefBalance * nbeefExchangeRate;
    let apr: number = ((nbeefRewardPerYear / nbeefTVL) * 100) / nacExchangeRate;
    if (!isFinite(apr)) {
      apr = 0
    }
    setNbeefApr(apr);
  }, [nbeefRewardPerYear, nbeefBalance, nacExchangeRate, nbeefExchangeRate]);

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
    <NbeefContext.Provider
      value={{
        nbeefTotalSupply,
        nbeefExchangeRate,
        nbeefTotalAssets,
        nbeefRewardPerYear,
        nbeefBalance,
        nbeefApr,
        nbeefProfitability,

        nbeefUserAssets,
        nbeefUserDeposited,
        nbeefUserEarns,

        isLoading
      }}
    >
      {children}
    </NbeefContext.Provider>
  );
};

export { NbeefContext, NbeefContextProvider };
