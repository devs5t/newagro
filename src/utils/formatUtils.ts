import BigNumber from "bignumber.js";

export const formatNumber = (value = 0, decimals = 18) =>
  new BigNumber(value).dividedBy(new BigNumber(10).exponentiatedBy(decimals));
