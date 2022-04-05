import { createSelector } from 'reselect';

const selectFeedbackState = (state) => state.feedback;

export const selectInterests = createSelector(selectFeedbackState, ({ interests }) => interests);
export const selectSources = createSelector(selectFeedbackState, ({ sources }) => sources);
