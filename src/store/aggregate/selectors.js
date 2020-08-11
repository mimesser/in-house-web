import { createSelector } from 'reselect';
import keyBy from 'lodash/keyBy';

export const selectAggregate = (state) => state.aggregate;

export const selectReady = createSelector(selectAggregate, ({ userId }) => !!userId);

export const selectIndustries = createSelector(selectAggregate, ({ industries }) => industries);

export const selectIndustriesMap = createSelector(
  selectIndustries,
  (industries) => industries && keyBy(industries, (i) => i.id),
);

export const selectInsiderVenueIds = createSelector(selectAggregate, ({ insiderVenueIds }) => insiderVenueIds);

export const selectAcceptedTerms = createSelector(selectAggregate, ({ isTermsAccepted }) => isTermsAccepted);

export const selectAuthorizedBetaUser = createSelector(
  selectAggregate,
  ({ isAuthorizedBetaUser }) => isAuthorizedBetaUser || false,
);
export const selectBetaWrongAnswer = createSelector(selectAggregate, ({ wrongAnswer }) => wrongAnswer);

export const selectEsgCategories = createSelector(selectAggregate, ({ rateTagGroups }) => {
  const item = rateTagGroups.filter((object) => object.name === 'E.S.G');
  return item && item[0] && item[0].categories;
});
