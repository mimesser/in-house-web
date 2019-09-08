import random from 'lodash/random';
import clamp from 'lodash/clamp';

const MIN_RATING = 1;
const MAX_RATING = 10;

export const mockRating = () => {
  const rating = random(MIN_RATING, MAX_RATING, true);
  return parseFloat(rating.toFixed(2));
};

export const mockVoteRating = () => {
  const options = [1, -1];
  return options[random(0, 1)];
};

export const mockCalculateRating = (rate, total) => {
  const change = random(1, true);
  const shouldIncrease = rate > 0;
  const result = shouldIncrease ? total + change : total - change;
  return clamp(parseFloat(result.toFixed(2)), MIN_RATING, MAX_RATING);
};
