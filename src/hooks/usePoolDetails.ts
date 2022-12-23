/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEthers, useTokenBalance } from "@usedapp/core";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { FarmPool } from "src/config/constants/types";
import { calcDepositFee, calcLiquidity } from "src/utils/farmValues";
import { formatNumber } from "src/utils/formatUtils";
import { useERC20, useFarm, useMasterChef, usePool } from "./useGetContract";
import { useTokenPrices } from "./useTokenPrices";

interface PoolDetails {
  apr: BigNumber | number;
  apy: BigNumber | number;
  depositFee: BigNumber | number;
  earned: BigNumber | number;
  poolPrice: BigNumber | number;
  stakedValue: BigNumber | number;
  tokenApy: BigNumber | number;
  tvl?: BigNumber | number;
}

const INITIAL_POOL_DETAILS = {
  apr: 0,
  apy: 0,
  depositFee: 0,
  earned: 0,
  poolPrice: 0,
  stakedValue: 0,
  tokenApy: 0,
  tvl: 0,
};

export const usePoolDetails = (pool: FarmPool): PoolDetails => {
  const poolId = pool.farm?.pid;

  const [poolDetails, setPoolDetails] =
    useState<PoolDetails>(INITIAL_POOL_DETAILS);

  const { prices, apy, tvl } = useTokenPrices();
  const { account } = useEthers();

  const masterchefContract = useMasterChef();
  const farmContract = useFarm(
    pool?.originFarm?.address || pool?.contractAddress?.[56]
  );
  const poolContract = usePool(pool?.contractAddress?.[56]);
  const erc20 = useERC20(pool?.stakingToken?.address);
  const balance = useTokenBalance(
    pool?.stakingToken?.address,
    pool?.strategyContractAddress?.[56]
  );

  useEffect(() => {
    const isEmpty = (object: any) => !Object.keys(object).length;

    const resolveReadOnlyValues = () => {
      const poolPrice = pool?.apiIndexPrice
        ? (prices as any)[pool.apiIndexPrice]
        : 0;
      const tokenApy = (apy as any)[`lory-lory-${pool.farm?.pid}`] * 100;

      const apyVal = pool.apiIndexApy ? (apy as any)[pool.apiIndexApy] : 0;
      const farmApy = apyVal * 100;
      const farmApr = ((apyVal + 1) ** (1 / 2190) - 1) * 2190 * 100;

      return {
        farmApr,
        farmApy,
        poolPrice,
        stakedTokenPrice: 0,
        tokenApy,
        tokenPrice: 0,
      };
    };

    if (isEmpty(prices) || isEmpty(apy) || isEmpty(tvl)) return;

    if (!account) {
      const { farmApy, poolPrice, tokenApy } = resolveReadOnlyValues();

      setPoolDetails({
        apr: farmApy,
        apy: farmApy,
        depositFee: 0,
        earned: 0,
        poolPrice,
        stakedValue: 0,
        tokenApy,
        tvl: formatNumber(balance?._hex).times(poolPrice).toNumber(),
      });
    }

    if (!masterchefContract || !farmContract || !poolContract || !erc20) return;

    Promise.allSettled([
      masterchefContract.poolInfo(poolId),
      poolContract.userInfo(poolId, account),
      poolContract.pendingReward(account),
      erc20.balanceOf(pool?.strategyContractAddress?.[56]),
    ]).then(([poolInfo, poolUserInfo, pendingRewards, balanceOf]) => {
      const earned = formatNumber(pendingRewards.value?._hex);
      const userAmount = formatNumber(poolUserInfo?.value?.shares?._hex);
      const depositFee = calcDepositFee(
        formatNumber(poolInfo?.value?.depositFee?._hex)
      );
      const balanceOfNum = formatNumber(balanceOf?.value?._hex);

      const { farmApy, poolPrice, tokenApy } = resolveReadOnlyValues();

      const poolTvl = calcLiquidity(balanceOfNum, poolPrice);

      setPoolDetails({
        apr: farmApy,
        apy: farmApy,
        depositFee,
        earned: earned.toNumber(),
        poolPrice,
        stakedValue: userAmount.toNumber(),
        tokenApy,
        tvl: poolTvl.toNumber(),
      });
    });
  }, [
    account,
    apy,
    balance,
    erc20,
    farmContract,
    masterchefContract,
    pool,
    poolContract,
    poolId,
    prices,
    tvl,
  ]);

  return poolDetails;
};
