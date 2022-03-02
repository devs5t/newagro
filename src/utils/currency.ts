export const formatCurrency = (number: number) =>
  Intl.NumberFormat('en-US').format(number.toFixed(2))