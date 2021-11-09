import maxBy from 'lodash/maxBy';

import minks from './data/minks';

export const getDefaultTopMink = () => {
  return maxBy(minks, (mink) => mink.voteRating);
};
