import { actionTypes } from './actions';

// listing props just for documentation
const initialState = {
   list: undefined,
   selectedVenue: undefined,
   insiderChallengeForm: undefined,
};

export function reducer(state = initialState, action) {
   switch (action.type) {
      case actionTypes.LOAD_VENUES_DATA_SUCCESS:
         return { ...state, list: action.data };
      case actionTypes.SET_SELECTED_VENUE: {
         const {
            payload: { venue: selectedVenue },
         } = action;
         return { ...state, selectedVenue, insiderChallengeForm: undefined };
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
      case actionTypes.SET_CHALLENGE_FORM_DATA: {
         const { payload } = action;
         return { ...state, insiderChallengeForm: payload };
      }

      default:
         return state;
   }
}
