import { useEthers } from "@usedapp/core";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserBalance,
  updateUserPendingReward,
  updateUserStakedBalance,
} from "src/state/pools";
import {
  sousEmegencyUnstake,
  sousUnstake,
  unstake,
} from "src/utils/contractCalls";
import { useMasterChef, useSousChef } from "./useGetContract";

const SYRUPIDS = [5, 6, 3, 1, 22, 23, 66];

export const useUnstake = (sousId: number) => {
  const dispatch = useDispatch();
  const { account } = useEthers();
  const masterChefContract = useMasterChef();
  const sousChefContract = useSousChef(sousId);
  const isOldSyrup = SYRUPIDS.includes(sousId);

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account);
        console.info({ txHash });
      } else if (isOldSyrup) {
        const txHash = await sousEmegencyUnstake(
          sousChefContract,
          amount,
          account
        );
        console.info({ txHash });
      } else {
        const txHash = await sousUnstake(sousChefContract, amount, account);
        console.info({ txHash });
      }

      dispatch(updateUserStakedBalance(sousId, account));
      dispatch(updateUserBalance(sousId, account));
      dispatch(updateUserPendingReward(sousId, account));
    },
    [
      account,
      dispatch,
      isOldSyrup,
      masterChefContract,
      sousChefContract,
      sousId,
    ]
  );

  return { onUnstake: handleUnstake };
};
