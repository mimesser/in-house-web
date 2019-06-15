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

export const selectSelectedMink = createSelector(
   selectSelectedVenue,
   selectedVenue =>
      selectedVenue && selectedVenue.minks && selectedVenue.minks.find(m => m.id === selectedVenue.selectedMinkId),
);

export const selectVoteMinkConfirmation = createSelector(
   selectSelectedVenue,
   selectedVenue => selectedVenue && selectedVenue.voteMinkConfirmation,
);

export const selectAnswerMinkStatus = createSelector(
   selectSelectedVenue,
   selectedVenue => selectedVenue && selectedVenue.answerMinkStatus,
);

export const selectSelectedTag = createSelector(
   selectSelectedVenue,
   selectedVenue =>
      selectedVenue &&
      selectedVenue.rates &&
      selectedVenue.rates.find(t => t.definitionId === selectedVenue.selectedTagId),
);

export const selectRateTagConfirmation = createSelector(
   selectSelectedVenue,
   selectedVenue => selectedVenue && selectedVenue.rateTagConfirmation,
);
