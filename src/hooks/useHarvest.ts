import { useEthers } from "@usedapp/core";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateUserBalance, updateUserPendingReward } from "src/state/pools";
import {
  harvest,
  soushHarvest,
  soushHarvestBnb,
} from "src/utils/contractCalls";
import { useMasterChef, useSousChef } from "./useGetContract";

export const useHarvest = (sousId: number, isBnbPool: boolean) => {
  const dispatch = useDispatch();
  const { account } = useEthers();
  const sousChefContract = useSousChef(sousId);
  const masterChefContract = useMasterChef();

  const handleHarvest = useCallback(async () => {
    if (sousId === 0) {
      await harvest(masterChefContract, 0);
    } else if (isBnbPool) {
      await soushHarvestBnb(sousChefContract);
    } else {
      await soushHarvest(sousChefContract);
    }
    dispatch(updateUserPendingReward(sousId, account));
    dispatch(updateUserBalance(sousId, account));
  }, [
    account,
    dispatch,
    isBnbPool,
    masterChefContract,
    sousChefContract,
    sousId,
  ]);

  return { onReward: handleHarvest };
};
