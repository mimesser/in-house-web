export const actionTypes = {
   INIT_VENUES_PAGE: 'INIT_VENUES_PAGE',
   LOAD_VENUES_DATA_SUCCESS: 'LOAD_VENUES_DATA_SUCCESS',
   SET_SELECTED_VENUE: 'SET_SELECTED_VENUE',
   SET_VENUE_TOP_MINK: 'SET_VENUE_TOP_MINK',
   ANSWER_TOP_MINK: 'ANSWER_TOP_MINK',
   SET_CHALLENGE_FORM_DATA: 'SET_CHALLENGE_FORM_DATA',
   DISMISS_CHALLENGE_FORM: 'DISMISS_CHALLENGE_FORM',
   SET_VENUE_RATES: 'SET_VENUE_RATES',
   LOAD_MINKS: 'LOAD_MINKS',
   SET_VENUE_MINKS: 'SET_VENUE_MINKS',
   CREATE_MINK: 'CREATE_MINK',
   STORE_NEW_MINK: 'STORE_NEW_MINK',
   SET_SELECTED_MINK: 'SET_SELECTED_MINK',
   VOTE_MINK: 'VOTE_MINK',
   SHOW_VOTE_MINK_CONFIRMATION: 'SHOW_VOTE_MINK_CONFIRMATION',
   TRY_ANSWER_MINK: 'TRY_ANSWER_MINK',
   SET_ANSWER_MINK_STATUS: 'SET_ANSWER_MINK_STATUS',
   SET_MY_CORRECT_ANSWER: 'SET_MY_CORRECT_ANSWER',
};

export const initVenuesPage = idToSelect => ({
   type: actionTypes.INIT_VENUES_PAGE,
   payload: { idToSelect },
});

export const loadVenuesDataSuccess = data => ({
   type: actionTypes.LOAD_VENUES_DATA_SUCCESS,
   data,
});

export const setSelectedVenue = venue => ({
   type: actionTypes.SET_SELECTED_VENUE,
   payload: { venue },
});

export const setVenueTopMink = topMink => ({
   type: actionTypes.SET_VENUE_TOP_MINK,
   payload: { topMink },
});

export const answerTopMink = answer => ({
   type: actionTypes.ANSWER_TOP_MINK,
   payload: { answer },
});

export const setChallengeFormData = payload => ({
   type: actionTypes.SET_CHALLENGE_FORM_DATA,
   payload,
});

export const dismissChallengeForm = payload => ({
   type: actionTypes.DISMISS_CHALLENGE_FORM,
});

export const setVenueRates = rates => ({
   type: actionTypes.SET_VENUE_RATES,
   payload: { rates },
});

export const loadMinks = () => ({
   type: actionTypes.LOAD_MINKS,
});

export const setVenueMinks = minks => ({
   type: actionTypes.SET_VENUE_MINKS,
   payload: { minks },
});

export const createMink = (id, question, answer) => ({
   type: actionTypes.CREATE_MINK,
   payload: { id, question, answer },
});

export const storeNewMink = mink => ({
   type: actionTypes.STORE_NEW_MINK,
   payload: { mink },
});

export const setSelectedMink = selectedMinkId => ({
   type: actionTypes.SET_SELECTED_MINK,
   payload: { selectedMinkId },
});

export const upvoteMink = () => ({
   type: actionTypes.VOTE_MINK,
   payload: { vote: 1 },
});

export const downvoteMink = () => ({
   type: actionTypes.VOTE_MINK,
   payload: { vote: -1 },
});

export const showVoteMinkConfirmation = value => ({
   type: actionTypes.SHOW_VOTE_MINK_CONFIRMATION,
   payload: { voteMinkConfirmation: value },
});

export const tryAnswerMink = (venueId, minkId, answer) => ({
   type: actionTypes.TRY_ANSWER_MINK,
   payload: { venueId, minkId, answer },
});

export const setAnswerMinkStatus = answerMinkStatus => ({
   type: actionTypes.SET_ANSWER_MINK_STATUS,
   payload: { answerMinkStatus },
});

export const setMyCorrectAnswer = (minkId, answer) => ({
   type: actionTypes.SET_MY_CORRECT_ANSWER,
   payload: {
      minkId,
      answer,
   },
});
