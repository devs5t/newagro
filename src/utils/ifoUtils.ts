/* eslint-disable react-hooks/rules-of-hooks */
import BigNumber from "bignumber.js";
import { Ifo } from "src/config/constants/types";
import { PublicIfoState } from "src/config/types";
import { useGetPublicIfoData } from "src/hooks/useGetPublicIfoData";

export const getPrice = (ifo: PublicIfoState, max = 6): string => {
  const price = ifo.raisingAmount.div(ifo.offeringAmount).toFixed(18);

  return Number(price).toLocaleString(undefined, {
    minimumFractionDigits: 3,
    maximumFractionDigits: max,
  });
};

export const getFilledValue = (ifo: PublicIfoState): string => {
  return ifo.totalAmount.div(ifo.raisingAmount).times(100).toFixed(2);
};

export function GetMultiTierFilledValue(ifo: Ifo): string {
  const tier0: PublicIfoState = useGetPublicIfoData({
    address: ifo.address,
    releaseBlockNumber: ifo.releaseBlockNumber,
  } as Ifo);
  const tier1: PublicIfoState = ifo.address1
    ? useGetPublicIfoData({
        address: ifo.address1,
        releaseBlockNumber: ifo.releaseBlockNumber,
      } as Ifo)
    : ({} as PublicIfoState);
  const tier2: PublicIfoState = ifo.address2
    ? useGetPublicIfoData({
        address: ifo.address2,
        releaseBlockNumber: ifo.releaseBlockNumber,
      } as Ifo)
    : ({} as PublicIfoState);

  const totalAmount = tier0.totalAmount
    .plus(tier1?.totalAmount || 0)
    .plus(tier2?.totalAmount || 0);
  const raisingAmount = tier0.raisingAmount
    .plus(tier1?.raisingAmount || 0)
    .plus(tier2?.raisingAmount || 0);

  return totalAmount.div(raisingAmount).times(100).toFixed(2);
}

export const getValueWithoutDecimals = (
  amount: BigNumber,
  decimals = 18
): string => {
  return Number(amount.div(`1e${decimals}`)).toLocaleString();
};

export const getPresaleStatus = (filledValue: string): string => {
  const value = Number(filledValue);

  if (value >= 100) {
    return "Filled";
  }

  if (value >= 0 && value < 100) {
    return filledValue;
  }

  return "Pending";
};
