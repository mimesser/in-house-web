import { createSelector } from 'reselect';
import { selectInsiderVenueIds } from '../aggregate';

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

export const selectIsActiveInsider = createSelector(
   selectInsiderVenueIds,
   selectSelectedVenue,
   (insiderVenueIds, selectedVenue) => insiderVenueIds && selectedVenue && insiderVenueIds.includes(selectedVenue.id),
);
