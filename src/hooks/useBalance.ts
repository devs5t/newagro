import { formatUnits } from "@ethersproject/units";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { useEffect, useState } from "react";

export const useBalance = (address: string | undefined): string | number => {
  const [balance, setBalance] = useState<string | number>(0);
  const { account } = useEthers();

  const tokenBalance = useTokenBalance(address, account);

  useEffect(() => {
    if (account && tokenBalance) {
      setBalance(formatUnits(tokenBalance));
    } else {
      setBalance(0);
    }
  }, [account, tokenBalance]);

  return balance;
};
