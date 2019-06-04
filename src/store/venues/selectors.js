import { createSelector } from 'reselect';

const selectVenueState = state => state.venues;

export const selectVenues = createSelector(
   selectVenueState,
   ({ list }) => list,
);

export const selectLoadingVenues = createSelector(
   selectVenues,
   list => !list,
);

export const selectSelectedVenue = createSelector(
   selectVenueState,
   ({ selectedVenue }) => selectedVenue,
);

export const selectInsiderChallengeForm = createSelector(
   selectVenueState,
   ({ insiderChallengeForm }) => insiderChallengeForm,
);
