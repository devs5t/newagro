import BigNumber from "bignumber.js";

export const formatNumber = (value = 0, decimals = 18) =>
  new BigNumber(value).dividedBy(new BigNumber(10).exponentiatedBy(decimals));

export const format1e18Number = (number: number) => number / 1E18;

export const formatHexNumber = (hex: string) => new BigNumber(hex).toNumber();