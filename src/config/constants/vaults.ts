import { VaultConfig } from "./types";

const pools: VaultConfig[] = [
  {
    pid: 0, // must be created in our Masterchef Contract
    stakeTokenName: "CAKE", // stake token name
    stakeTokenAddress: "0x....cake...", // stake token contract address
    stakeTokenApiPrice: "CAKE", // can be the /lp too (https://api.yieldparrot.finance/prices)
    stakeTokenGetUri:
      "https://pancakeswap.finance/swap?inputCurrency=0x....cake....",
    strategyAddress: "0x...strat...", // strategy contract from the pool
    strategyDestinationFarm: "0x...cakefarm...", // farm where the funds are invested by the strategy
    strategyDestinationFarmPid: 0, // pid of the destination farm where the funds are invested by the strategy
    strategyPendingFunction: "pendingCake", // name of the function that returns unharvested tokens by the strategy
    strategyEarnTokenApiPrice: "CAKE", // api code from the API to get the price of the token earned by the strategy https://api.yieldparrot.finance/prices
    strategyDestionationFarmAPY: "cake-cake", // APY (APR compounded) of the destination farm https://api.yieldparrot.finance/apy. This needs to be decompounded.
  },
];

export default pools;
