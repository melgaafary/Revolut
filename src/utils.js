/* eslint-disable import/prefer-default-export */
export const isValidCurrency = num => {
  return `${num}`.split('.')[1] && `${num}`.split('.')[1].length > 2
    ? parseFloat(num).toFixed(2)
    : num;
};
