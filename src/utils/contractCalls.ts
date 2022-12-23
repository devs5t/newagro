import BigNumber from "bignumber.js";
import { Contract } from "ethers";

export const unstake = async (
  masterChefContract: Contract,
  pid: number,
  amount: string
) => {
  return masterChefContract
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
    )
    .then(async (result) => {
      const receipt = await result.wait();
      return receipt;
    });
};

export const sousEmegencyUnstake = async (sousChefContract: Contract) => {
  return sousChefContract.emergencyWithdraw().then(async (result) => {
    const receipt = await result.wait();
    return receipt;
  });
};

export const sousUnstake = async (
  sousChefContract: Contract,
  amount: string
) => {
  return sousChefContract
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .then(async (result) => {
      const receipt = await result.wait();
      return receipt;
    });
};

export const harvest = async (masterChefContract: Contract, pid: number) => {
  return masterChefContract.deposit(pid, "0").then(async (result) => {
    const receipt = await result.wait();
    return receipt;
  });
};

export const soushHarvest = async (sousChefContract: Contract) => {
  return sousChefContract.deposit("0").then(async (result) => {
    const receipt = await result.wait();
    return receipt;
  });
};

export const soushHarvestBnb = async (sousChefContract: Contract) => {
  return sousChefContract.deposit().then(async (result) => {
    const receipt = await result.wait();
    return receipt;
  });
};

export const stake = async (
  masterChefContract: Contract,
  pid: number,
  amount: string
) => {
  return masterChefContract
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
    )
    .then(async (result) => {
      const receipt = await result.wait();
      return receipt;
    });
};

export const sousStake = async (sousChefContract: Contract, amount: string) => {
  return sousChefContract
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .then(async (result) => {
      const receipt = await result.wait();
      return receipt;
    });
};

export const sousStakeBnb = async (
  sousChefContract: Contract,
  amount: string
) => {
  return sousChefContract
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .then(async (result) => {
      const receipt = await result.wait();
      return receipt;
    });
};
