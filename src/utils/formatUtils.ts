import BigNumber from "bignumber.js";

export const formatNumber = (value = 0, decimals = 18) =>
  new BigNumber(value).dividedBy(new BigNumber(10).exponentiatedBy(decimals));

export const formatUintToDecimal = (number: number) => number / 1E18;

export const formatHexToDecimal = (hex: string) => formatUintToDecimal(new BigNumber(hex).toNumber());

export const formatHexToDate = (hex: string) => new Date((new BigNumber(hex).toNumber() * 1000));

export const formatDecimalToUint = (number: number) => new BigNumber(number).times(new BigNumber(10).pow(18)).toString();

export const formatDecimalWithLeadingZeros = (number: number, size = 3) => {
  let num: string = number.toString();
  while (num.length < size) {
    num = "0" + num;
  }
  return num;
};

export const formatDateToDisplay = (date: Date) => `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;