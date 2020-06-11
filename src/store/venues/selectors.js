import { createSelector } from 'reselect';

import { selectInsiderVenueIds } from '../aggregate';
import { SEND_STATUS } from './actions';

const selectVenueState = (state) => state.venues;

export const selectPolls = createSelector(selectVenueState, ({ polls }) => polls);

export const selectLoadingPolls = createSelector(selectPolls, (polls) => !polls);

export const selectSelectedPoll = createSelector(selectVenueState, ({ selectedPoll }) => selectedPoll);

export const selectLoading = createSelector(selectVenueState, ({ loading }) => loading);

export const selectVenues = createSelector(selectVenueState, ({ list }) => list);

export const selectLoadingVenues = createSelector(selectVenues, (list) => !list);

export const selectSelectedVenue = createSelector(selectVenueState, ({ selectedVenue }) => selectedVenue);

export const selectInsiderChallengeForm = createSelector(
  selectVenueState,
  ({ insiderChallengeForm }) => insiderChallengeForm,
);

export const selectIsActiveInsider = createSelector(
  selectInsiderVenueIds,
  selectSelectedVenue,
  (insiderVenueIds, selectedVenue) => insiderVenueIds && selectedVenue && insiderVenueIds.includes(selectedVenue.id),
);

const selectSelectedVenueMinks = createSelector(
  selectSelectedVenue,
  (selectedVenue) => selectedVenue && selectedVenue.minks,
);

export const selectSelectedVenueTopMinkId = createSelector(selectSelectedVenueMinks, (minks) => minks && minks[0].id);

export const selectSelectedMink = createSelector(
  selectSelectedVenue,
  (selectedVenue) =>
    selectedVenue && selectedVenue.minks && selectedVenue.minks.find((m) => m.id === selectedVenue.selectedMinkId),
);

export const selectVoteMinkConfirmation = createSelector(
  selectSelectedVenue,
  (selectedVenue) => selectedVenue && selectedVenue.voteMinkConfirmation,
);

export const selectAnswerMinkStatus = createSelector(
  selectSelectedVenue,
  (selectedVenue) => selectedVenue && selectedVenue.answerMinkStatus,
);

export const selectNewMinkElected = createSelector(
  selectSelectedVenue,
  (selectedVenue) => selectedVenue && selectedVenue.newMinkElected,
);

export const selectSelectedTag = createSelector(
  selectSelectedVenue,
  (selectedVenue) =>
    selectedVenue &&
    selectedVenue.rates &&
    selectedVenue.rates.find((t) => t.definitionId === selectedVenue.selectedTagId),
);

export const selectRateTagConfirmation = createSelector(
  selectSelectedVenue,
  (selectedVenue) => selectedVenue && selectedVenue.rateTagConfirmation,
);

export const selectSelectedPost = createSelector(
  selectSelectedVenue,
  (selectedVenue) =>
    selectedVenue && selectedVenue.posts && selectedVenue.posts.find((m) => m.id === selectedVenue.selectedPostId),
);

export const selectAnyTabItemSelected = createSelector(
  selectSelectedTag,
  selectSelectedPost,
  selectSelectedMink,
  (...args) => args.some((i) => !!i),
);

export const selectVotePostConfirmation = createSelector(
  selectSelectedVenue,
  (selectedVenue) => selectedVenue && selectedVenue.votePostConfirmation,
);
export const selectPostFlagError = createSelector(
  selectSelectedVenue,
  (selectedVenue) => selectedVenue && selectedVenue.message,
);

export const selectPrivateShareItemId = createSelector(
  selectVenueState,
  ({ privateShareItemId }) => privateShareItemId,
);

export const selectPrivateShareRecipientError = createSelector(
  selectVenueState,
  ({ privateShareRecipientError }) => privateShareRecipientError,
);

export const selectPrivateShareSending = createSelector(
  selectVenueState,
  ({ privateShareSending }) => privateShareSending === SEND_STATUS.sending,
);

export const selectPrivateShareSent = createSelector(
  selectVenueState,
  ({ privateShareSending }) => privateShareSending === SEND_STATUS.sent,
);
