import { useTokenBalance } from "@usedapp/core";
import BigNumber from "bignumber.js";
import pools from "src/config/constants/pools";
import { FarmPool } from "src/config/constants/types";
import { formatNumber } from "src/utils/formatUtils";
import { useImmediateCall } from ".";
import { useTokenPrices } from "./useTokenPrices";

export const useTvl = () => {
  let tvl = new BigNumber(0);
  const { prices } = useTokenPrices();

  pools.map((pool) => {
    tvl = tvl.plus(
      CalculateTVL({
        isPool: false,
        item: pool,
        prices,
      })
    );
  });

  return tvl.toNumber();
};

interface CalculateTVLProps {
  isPool?: boolean;
  item?: FarmPool;
  prices?: unknown;
}
const CalculateTVL = ({ isPool = false, item, prices }: CalculateTVLProps) => {
  const price = prices[item?.apiIndexPrice];
  let balance;

  if (isPool) {
    balance = useTokenBalance(
      item?.stakingToken?.address,
      item?.strategyContractAddress?.[56]
    );
  } else {
    balance = useImmediateCall(
      "strategy",
      item?.strategyContractAddress?.[56],
      "wantLockedTotal",
      undefined
    );
  }

  if (formatNumber(balance).times(new BigNumber(price)).toJSON() == "NaN") {
    return 0;
  }
  return formatNumber(balance).times(new BigNumber(price));
};
