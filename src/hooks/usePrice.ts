import BigNumber from "bignumber.js";
import { useErc20Call } from ".";

const CURRENT_LP = "0x376d38a381919f9d1c61715d34f8163c28bb23e5";

export const usePrice = (
  tokenAddress: string,
  currencyAddress: string
): BigNumber => {
  const tokenBalance = useErc20Call(tokenAddress, "balanceOf", true, [
    CURRENT_LP,
  ]);
  const currencyBalance = useErc20Call(currencyAddress, "balanceOf", true, [
    CURRENT_LP,
  ]);

  return currencyBalance && tokenBalance
    ? new BigNumber(currencyBalance[0]?._hex).div(
        new BigNumber(tokenBalance[0]?._hex)
      )
    : new BigNumber(0);
};
