export const actionTypes = {
   INIT_VENUES_PAGE: 'INIT_VENUES_PAGE',
   LOAD_VENUES_DATA_SUCCESS: 'LOAD_VENUES_DATA_SUCCESS',
   SET_SELECTED_VENUE: 'SET_SELECTED_VENUE',
   SET_SELECTED_VENUE_MINK: 'SET_SELECTED_VENUE_MINK',
   ANSWER_MINK: 'ANSWER_MINK',
   SET_CHALLENGE_FORM_DATA: 'SET_CHALLENGE_FORM_DATA',
   SET_SELECTED_VENUE_RATES: 'SET_SELECTED_VENUE_RATES',
};

export function initVenuesPage(idToSelect) {
   return { type: actionTypes.INIT_VENUES_PAGE, payload: { idToSelect } };
}

export function loadVenuesDataSuccess(data) {
   return {
      type: actionTypes.LOAD_VENUES_DATA_SUCCESS,
      data,
   };
}

export const setSelectedVenue = venue => ({ type: actionTypes.SET_SELECTED_VENUE, payload: { venue } });

export const setSelectedVenueMink = topMink => ({
   type: actionTypes.SET_SELECTED_VENUE_MINK,
   payload: { topMink },
});

export const answerMink = answer => ({ type: actionTypes.ANSWER_MINK, payload: { answer } });
export const setChallengeFormData = payload => ({
   type: actionTypes.SET_CHALLENGE_FORM_DATA,
   payload,
});

export const setSelectedVenueRates = rates => ({
   type: actionTypes.SET_SELECTED_VENUE_RATES,
   payload: { rates },
});
