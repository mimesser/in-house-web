import random from 'lodash/random';
import clamp from 'lodash/clamp';

const MIN_RATING = 1;
const MAX_RATING = 10;

export const mockRate = () => {
   const rate = random(MIN_RATING, MAX_RATING, true);
   return parseFloat(rate.toFixed(2));
};

export const mockRateCalculate = (rate, total) => {
   const change = random(1, true);
   const shouldIncrease = rate > 0;
   const result = shouldIncrease ? total + change : total - change;
   return clamp(parseFloat(result.toFixed(2)), MIN_RATING, MAX_RATING);
};
