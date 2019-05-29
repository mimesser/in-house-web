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
