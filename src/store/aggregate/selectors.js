import { createSelector } from 'reselect';
import keyBy from 'lodash/keyBy';

export const selectAggregate = state => state.aggregate;

export const selectReady = createSelector(
   selectAggregate,
   ({ userId }) => !!userId,
);

export const selectIndustriesMap = createSelector(
   selectAggregate,
   ({ industries }) => industries && keyBy(industries, i => i.id),
);

export const selectInsiderVenueIds = createSelector(
   selectAggregate,
   ({ insiderVenueIds }) => insiderVenueIds,
);

export const selectAcceptedTerms = createSelector(
   selectAggregate,
   ({ isTermAccepted }) => isTermAccepted,
);
