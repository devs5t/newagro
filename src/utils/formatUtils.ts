import BigNumber from "bignumber.js";

export const formatNumber = (value = 0, decimals = 18) =>
  new BigNumber(value).dividedBy(new BigNumber(10).exponentiatedBy(decimals));

export const formatUintToDecimal = (number: any, decimals = 2, castNumber = true) => {
  if (BigNumber.isBigNumber(number)) {
    number = number._hex;
  }
  number = new BigNumber(number).shiftedBy(-18).toFixed(decimals, 1);
  if (castNumber) {
    number = Number(number);
  }
  return number;
}

export const formatHexToDecimal = (hex: string) => new BigNumber(hex).toNumber();

export const formatHexToDate = (hex: string) => new Date((new BigNumber(hex).toNumber() * 1000));

export const formatDecimalToUint = (number: number) => new BigNumber(number).times(new BigNumber(10).pow(18)).decimalPlaces(0).toString();

export const formatDateToDisplay = (date: Date) => `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

export const formatDateToUnixTimestamp = (date: Date) => Math.floor(date.getTime() / 1000);

export const minFromString = (number1: any, number2: any) => {
  if (Number(number1) < Number(number2)){
    return number1;
  }
  return number2
}