import BigNumber from "bignumber.js";

export const formatNumber = (value = 0, decimals = 18) =>
  new BigNumber(value).dividedBy(new BigNumber(10).exponentiatedBy(decimals));

export const formatBigNumberToDecimal = (bigNumber: BigNumber, decimals = 2) => Number(new BigNumber(bigNumber._hex).shiftedBy(-18).toFixed(decimals, 1));

export const formatUintToDecimal = (number: number | BigNumber, decimals = 2) => {
  if (BigNumber.isBigNumber(number)) {
    return formatBigNumberToDecimal(number, decimals);
  }
  return Number(new BigNumber(number).shiftedBy(-18).toFixed(decimals, 1));
}

export const formatHexToDecimal = (hex: string) => new BigNumber(hex).toNumber();

export const formatHexToDate = (hex: string) => new Date((new BigNumber(hex).toNumber() * 1000));

export const formatDecimalToUint = (number: number) => new BigNumber(number).times(new BigNumber(10).pow(18)).decimalPlaces(0).toString();

export const formatDateToDisplay = (date: Date) => `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

export const formatDateToUnixTimestamp = (date: Date) => Math.floor(date.getTime() / 1000);