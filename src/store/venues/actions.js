export const actionTypes = {
   LOAD_VENUES_DATA: 'LOAD_VENUES_DATA',
   LOAD_VENUES_DATA_SUCCESS: 'LOAD_VENUES_DATA_SUCCESS',
   SET_SELECTED_VENUE: 'SET_SELECTED_VENUE',
   SET_SELECTED_VENUE_MINK: 'SET_SELECTED_VENUE_MINK',
   ANSWER_MINK: 'ANSWER_MINK',
   SET_MINK_ANSWER_STATUS: 'SET_MINK_ANSWER_STATUS',
};

export function loadVenuesData() {
   return { type: actionTypes.LOAD_VENUES_DATA };
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
export const setMinkAnswerStatus = status => ({ type: actionTypes.SET_MINK_ANSWER_STATUS, payload: { status } });
