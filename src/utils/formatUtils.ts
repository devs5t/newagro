import BigNumber from "bignumber.js";

export const formatNumber = (value = 0, decimals = 18) =>
  new BigNumber(value).dividedBy(new BigNumber(10).exponentiatedBy(decimals));

export const formatUintToDecimal = (number: number) => number / 1E18;

export const formatHexNumber = (hex: string) => new BigNumber(hex).toNumber();

export const formatDecimalToUint = (number: number) => new BigNumber(number).times(new BigNumber(10).pow(18)).toString();