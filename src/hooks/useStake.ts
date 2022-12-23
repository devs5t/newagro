import { useEthers } from "@usedapp/core";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateUserBalance, updateUserStakedBalance } from "src/state/pools";
import { sousStake, sousStakeBnb, stake } from "src/utils/contractCalls";
import { useMasterChef, useSousChef } from "./useGetContract";

export const useStake = (sousId: number, isBnbPool: boolean) => {
  const dispatch = useDispatch();
  const masterChefContract = useMasterChef();
  const sousChefContract = useSousChef(sousId);
  const { account } = useEthers();

  const handleStake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        await stake(masterChefContract, 0, amount);
      } else if (isBnbPool) {
        await sousStakeBnb(sousChefContract, amount);
      } else {
        await sousStake(sousChefContract, amount);
      }
      dispatch(updateUserStakedBalance(sousId, account));
      dispatch(updateUserBalance(sousId, account));
    },
    [account, dispatch, isBnbPool, masterChefContract, sousChefContract, sousId]
  );

  return { onStake: handleStake };
};
