import { useTokenBalance } from "@usedapp/core";
import BigNumber from "bignumber.js";
import contracts from "src/config/constants/contracts";
import { formatNumber } from "src/utils/formatUtils";

export const useTokenPrice = (): BigNumber => {
  const tokenBalance = useTokenBalance(
    contracts.bikini[56],
    contracts.defiLaunchBusdLp[56]
  );
  const currencyBalance = useTokenBalance(
    contracts.busd[56],
    contracts.defiLaunchBusdLp[56]
  );

  const tokenBalanceNum = formatNumber(tokenBalance?._hex);
  const currencyBalanceNum = formatNumber(currencyBalance?._hex);
  const value = currencyBalanceNum.div(tokenBalanceNum);

  return isNaN(value.toNumber()) || tokenBalanceNum.toNumber() === 0
    ? new BigNumber(1)
    : value;
};
