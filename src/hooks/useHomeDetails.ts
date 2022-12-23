import { useToken } from "@usedapp/core";
import BigNumber from "bignumber.js";
import contracts from "src/config/constants/contracts";
import { formatNumber } from "src/utils/formatUtils";
import { useTokenPrice } from "./useTokenPrice";
import { useTvl } from "./useTvl";

export const useHomeDetails = () => {
  const token = useToken(contracts.bikini[56]);
  const tokenPrice = useTokenPrice();
  const tvl = useTvl();

  const totalSupplyNum = formatNumber(token?.totalSupply?._hex || 0);
  const marketCap = totalSupplyNum.times(new BigNumber(tokenPrice));

  return {
    marketCap: marketCap.toNumber(),
    price: tokenPrice,
    totalSupply: totalSupplyNum.toNumber(),
    tvl,
  };
};
