export const actionTypes = {
   INIT_VENUES_PAGE: 'INIT_VENUES_PAGE',
   LOAD_VENUES_DATA_SUCCESS: 'LOAD_VENUES_DATA_SUCCESS',
   SET_SELECTED_VENUE: 'SET_SELECTED_VENUE',
   SET_VENUE_TOP_MINK: 'SET_VENUE_TOP_MINK',
   ANSWER_MINK: 'ANSWER_MINK',
   SET_CHALLENGE_FORM_DATA: 'SET_CHALLENGE_FORM_DATA',
   DISMISS_CHALLENGE_FORM: 'DISMISS_CHALLENGE_FORM',
   SET_VENUE_RATES: 'SET_VENUE_RATES',
   LOAD_MINKS: 'LOAD_MINKS',
   SET_VENUE_MINKS: 'SET_VENUE_MINKS',
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

export const answerMink = answer => ({
   type: actionTypes.ANSWER_MINK,
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
