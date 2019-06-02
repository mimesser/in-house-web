import { createSelector } from 'reselect';

const selectVenueState = state => state.venues;

export const selectVenues = createSelector(
   selectVenueState,
   ({ list }) => list,
);

export const selectSelectedVenue = createSelector(
   selectVenueState,
   ({ selectedVenue }) => selectedVenue,
);

export const selectMinkAnswerStatus = createSelector(
   selectVenueState,
   ({ minkAnswerStatus }) => minkAnswerStatus,
);
