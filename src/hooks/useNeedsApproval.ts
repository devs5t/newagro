import { useEthers } from "@usedapp/core";
import BigNumber from "bignumber.js";
import { useEffect } from "react";
import { useBoolean } from "react-use";
import { useERC20 } from "./useGetContract";

export const useNeedsApproval = (
  currencyAddress?: string,
  contractAddress?: string
) => {
  const { account } = useEthers();

  const [needsApproval, setNeedsApproval] = useBoolean(true);
  const erc20Contract = useERC20(currencyAddress);

  useEffect(() => {
    const checkAllowance = async () => {
      const allowance = await erc20Contract.allowance(account, contractAddress);
      setNeedsApproval(new BigNumber(allowance?._hex).eq(0));
    };

    if (erc20Contract && account && contractAddress) {
      checkAllowance();
    } else {
      setNeedsApproval(true);
    }
  }, [erc20Contract, account, contractAddress, setNeedsApproval]);

  return needsApproval;
};
