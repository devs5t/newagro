import { ChainId, Config } from "@usedapp/core";

/**
 * If we want to allow readonly for other chains
 * we have to make this dynamic.
 *
 * @returns Config
 */
export const getConfig = (): Config => {
  return {
    readOnlyChainId: ChainId.BSC,
    readOnlyUrls: {
      [ChainId.BSC]: "https://bsc-dataseed1.ninicoin.io",
      [ChainId.BSC]: "https://bsc-dataseed1.defibit.io",
      [ChainId.BSC]: "https://bsc-dataseed.binance.org",
    },
  };
};