import BigNumber from "bignumber.js";
import { BLOCKS_PER_YEAR } from "src/config";

/**
 * Calculating Earned Value:
 * masterchefContract.pendingNATIVE() +
 * (strategyContract.pendingCake() * (masterchefContract.userInfo().shares / masterchefContract.userInfo().sharesTotal) * (stakeTokenPrice / tokenPrice))
 */
export const calcEarnedValue = (
  pendingNative: BigNumber,
  pendingCake: BigNumber,
  shares: BigNumber,
  sharesTotal: BigNumber,
  earnTokenPrice: BigNumber,
  tokenPrice: BigNumber
) => 
  pendingNative.plus(
    pendingCake
      .times(shares.div(sharesTotal))
      .times(earnTokenPrice.div(tokenPrice))
  );

/**
 * Calculating Earned Value
 * Calculating Deposit Fee:
 * masterchefContract.poolInfo().depositFee / 10.000
 */
export const calcDepositFee = (depositFee: BigNumber) => depositFee.div(10000);

/**
 * UNUSED: Farm
 *
 * Calculating APR:
 * masterchefContract.NATIVEPerBlock() * (masterchefContract.poolInfo().allocPoint / masterchefContract.totalAllocPoint()) * BLOCKS_PER_YEAR * tokenPrice +
 * strategyContract.wantLockedTotal() * stakeTokenPrice
 */
export const calcApr = (
  nativePerBlock: BigNumber,
  allocPoint: BigNumber,
  totalAllocPoint: BigNumber,
  tokenPrice: BigNumber,
  farmPrice: BigNumber,
  liquidity: BigNumber
) => {
  const rewardsPerYear = nativePerBlock
    .times(allocPoint.div(totalAllocPoint))
    .times(BLOCKS_PER_YEAR)
    .times(tokenPrice);

  return rewardsPerYear
    .div(liquidity.eq(0) ? new BigNumber(1) : liquidity.times(farmPrice))
    .times(100);
};

/**
 * Calculating Liquidity:
 * strategyContract.wantLockedTotal() * stakeTokenPrice()
 */
export const calcLiquidity = (
  wantLockedTotal: BigNumber,
  stakeTokenPrice: BigNumber
) => wantLockedTotal.times(stakeTokenPrice);

/**
 * Calculating User Staked value:
 * (masterchefContract.userInfo().shares / strategyContract().sharesTotal) * strategyContract.wantLockedTotal()
 */
export const calcUserStakedValue = (
  shares: BigNumber,
  sharesTotal: BigNumber,
  wantLockedTotal: BigNumber
) => shares.div(sharesTotal).times(wantLockedTotal);

/**
 * Calculating User Staked value for vaults:
 * (masterchefContract.userInfo().shares / strategyContract().sharesTotal) * strategyContract.wantLockedTotal() +
 * (masterchefContract.userInfo().shares / strategyContract().sharesTotal) * farmContract.pendingCake() * (1 - performanceFee)
 */
export const calcVaultUserStakedValue = (
  shares: BigNumber,
  sharesTotal: BigNumber,
  wantLockedTotal: BigNumber,
  pendingCake: BigNumber,
  performanceFee: number
) => {
  const sharesDivByTotal = shares.div(sharesTotal);
  const totalShares = sharesDivByTotal.times(wantLockedTotal);
  const pendingCakeTotal = pendingCake
    .times(sharesDivByTotal)
    .times(new BigNumber(1 - performanceFee));

  return totalShares.plus(pendingCakeTotal);
};
