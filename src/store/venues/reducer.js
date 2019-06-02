import { actionTypes } from './actions';

// listing props just for documentation
const initialState = {
   list: undefined,
   selectedVenue: undefined,
   minkAnswerStatus: undefined,
};

export function reducer(state = initialState, action) {
   switch (action.type) {
      case actionTypes.LOAD_VENUES_DATA_SUCCESS:
         return { ...state, list: action.data };
      case actionTypes.SET_SELECTED_VENUE: {
         const {
            payload: { venue: selectedVenue },
         } = action;
         return { ...state, selectedVenue, minkAnswer: undefined };
      }
      case actionTypes.SET_SELECTED_VENUE_MINK: {
         if (!state.selectedVenue) {
            return state;
         }
         const {
            payload: { topMink },
         } = action;

         // TODO: cache topMink in store?
         const selectedVenue = { ...state.selectedVenue, topMink };
         return { ...state, selectedVenue };
      }
      case actionTypes.SET_MINK_ANSWER_STATUS: {
         const {
            payload: { status: minkAnswerStatus },
         } = action;
         return { ...state, minkAnswerStatus };
      }

      default:
         return state;
   }
}
