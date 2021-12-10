/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEthers } from "@usedapp/core";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import contracts from "src/config/constants/contracts";
import { FarmPool } from "src/config/constants/types";
import {
  calcApr,
  calcEarnedValue,
  calcLiquidity,
  calcUserStakedValue,
  calcVaultUserStakedValue
} from "src/utils/farmValues";
import { formatNumber } from "src/utils/formatUtils";
import { useImmediateCall } from ".";
import { useFarm, useMasterChef, useStrategy } from "./useGetContract";
import { useTokenPrices } from "./useTokenPrices";

interface FarmDetails {
  apr: BigNumber | number;
  apy: BigNumber | number;
  depositFee: BigNumber | number;
  earned: BigNumber | number;
  farmPrice: BigNumber | number;
  stakedValue: BigNumber | number;
  tokenApy: BigNumber | number;
  tvl?: BigNumber | number;
}

const INITIAL_FARM_DETAILS = {
  apr: 0,
  apy: 0,
  depositFee: 0,
  earned: 0,
  farmPrice: 0,
  stakedValue: 0,
  tokenApy: 0,
  tvl: 0,
};

export const useFarmDetails = (
  farm: FarmPool,
  isVault?: boolean
): FarmDetails => {
  const poolId = farm.farm?.pid;

  const [farmDetails, setFarmDetails] =
    useState<FarmDetails>(INITIAL_FARM_DETAILS);

  const { prices, apy, tvl } = useTokenPrices();
  const { account } = useEthers();

  const masterchefContract = useMasterChef();
  const farmContract = useFarm(
    farm?.originFarm?.address || farm?.contractAddress?.[56]
  );
  const strategyContract = useStrategy(farm?.strategyContractAddress?.[56]);
  const balance = useImmediateCall(
    "strategy",
    farm?.strategyContractAddress?.[56],
    "wantLockedTotal",
    undefined
  )?.[0];

  const NATIVEPerBlock = useImmediateCall(
    "masterchef",
    contracts.masterChef[56],
    "NATIVEPerBlock",
    undefined
  )?.[0];

  const poolInfo = useImmediateCall(
    "masterchef",
    contracts.masterChef[56],
    "poolInfo",
    [farm.farm?.pid]
  );

  const totalAllocPoint = useImmediateCall(
    "masterchef",
    contracts.masterChef[56],
    "totalAllocPoint",
    undefined
  )?.[0];

  useEffect(() => {
    const isEmpty = (object: any) => !Object.keys(object).length;

    const resolveReadOnlyValues = () => {
      let stakedTokenPrice = farm.apiIndexPrice
        ? (prices as any)[farm.apiIndexPrice]
        : 0;
      let tokenPrice = (prices as any)[farm.earningToken.name];
      let earnTokenPrice = (prices as any)[farm.originFarm.earnApiIndexPrice];
      let farmPrice = farm?.apiIndexPrice
        ? (prices as any)[farm.apiIndexPrice]
        : 0;

      const tokenApy = calcApr(
        formatNumber(NATIVEPerBlock?._hex),
        formatNumber(poolInfo?.["allocPoint"]?._hex, 0),
        formatNumber(totalAllocPoint?._hex, 0),
        new BigNumber(tokenPrice),
        new BigNumber(farmPrice),
        formatNumber(balance?._hex)
      );

      const apyVal = farm.apiIndexApy ? (apy as any)[farm.apiIndexApy] : 0;
      const farmApy = apyVal * 100;
      const farmApr = ((apyVal + 1) ** (1 / 2190) - 1) * 2190 * 100;

      return {
        farmApr,
        farmApy,
        farmPrice,
        stakedTokenPrice,
        tokenApy,
        tokenPrice,
        earnTokenPrice
      };
    };

    if (isEmpty(prices) || isEmpty(apy) || isEmpty(tvl)) return;

    if (!account) {
      const { farmApr, farmApy, farmPrice, tokenApy } = resolveReadOnlyValues();

      setFarmDetails({
        apr: isNaN(farmApr) ? tokenApy : farmApr,
        apy: farmApy,
        depositFee: 0,
        earned: 0,
        farmPrice,
        stakedValue: 0,
        tokenApy,
        tvl: formatNumber(balance?._hex).times(farmPrice).toNumber(),
      });

      return;
    }

    if (!masterchefContract || !farmContract || !strategyContract) return;

    const promiseArray = [
      masterchefContract?.pendingNATIVE(poolId, account),
      farm.originFarm?.functionName
        ? farmContract?.[farm.originFarm?.functionName](
            farm.originFarm?.pid,
            farm.strategyContractAddress?.[56]
          )
        : Promise.resolve(0),
      masterchefContract?.userInfo(poolId, account),
      strategyContract?.sharesTotal(),
      masterchefContract?.poolInfo(poolId),
      strategyContract?.wantLockedTotal(),
    ];

    Promise.allSettled(promiseArray)
      .then((results) => {
        const pendingNativeNum = formatNumber(results[0]?.value?._hex);
        const pendingCakeNum = formatNumber(results[1]?.value?._hex);
        const sharesNum = formatNumber(results[2]?.value?.shares?._hex);
        const sharesTotalNum = formatNumber(results[3]?.value?._hex);
        const depositFee = (results[4]?.value?.depositFee?.toNumber() * 100) / 10000;
        const wantLockedTotalNum = formatNumber(results[5]?.value?._hex);

        const {
          farmApr,
          farmApy,
          farmPrice,
          stakedTokenPrice,
          tokenApy,
          tokenPrice,
          earnTokenPrice
        } = resolveReadOnlyValues();

        const farmTvl = calcLiquidity(wantLockedTotalNum, stakedTokenPrice);

        const earned = !farm.originFarm?.address
          ? pendingNativeNum
          : calcEarnedValue(
              pendingNativeNum,
              pendingCakeNum,
              sharesNum,
              sharesTotalNum,
              new BigNumber(earnTokenPrice),
              new BigNumber(tokenPrice)
            );

        const userStakedValue = isVault
          ? calcVaultUserStakedValue(
              sharesNum,
              sharesTotalNum,
              wantLockedTotalNum,
              pendingCakeNum,
              farm.performanceFee || 0
            )
          : calcUserStakedValue(sharesNum, sharesTotalNum, wantLockedTotalNum);

        setFarmDetails({
          apr: isNaN(farmApr) ? tokenApy : farmApr,
          apy: farmApy,
          depositFee,
          earned: earned.toNumber(),
          farmPrice,
          stakedValue: userStakedValue.toNumber(),
          tokenApy: tokenApy.toNumber(),
          tvl: farmTvl.toNumber(),
        });
      })
      .catch((e) => {
        console.debug("Some requests failed", e);
      });
  }, [
    NATIVEPerBlock,
    account,
    apy,
    balance,
    farm,
    farmContract,
    isVault,
    masterchefContract,
    poolId,
    poolInfo,
    prices,
    strategyContract,
    totalAllocPoint,
    tvl,
  ]);

  return farmDetails;
};
