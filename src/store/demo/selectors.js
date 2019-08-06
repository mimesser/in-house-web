import { createSelector } from 'reselect';

export const selectDemo = state => state.demo;

export const selectDemoVenue = createSelector(
   selectDemo,
   ({ data }) => data.venue,
);

export const selectDemoAggregate = createSelector(
   selectDemo,
   ({ data }) => data.aggregate,
);

export const selectDemoRateTags = createSelector(
   selectDemo,
   ({ data }) => data.rateTags,
);

export const selectDemoPosts = createSelector(
   selectDemo,
   ({ data }) => data.posts,
);

export const selectDemoMinks = createSelector(
   selectDemo,
   ({ data }) => data.minks,
);

export const selectDemoData = createSelector(
   selectDemo,
   ({ data }) => data,
);
export const selectMockAdapter = createSelector(
   selectDemo,
   ({ mockAdapter }) => mockAdapter,
);

export const selectIsDemoing = createSelector(
   selectDemo,
   ({ isDemoing }) => isDemoing,
);
