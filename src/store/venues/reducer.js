import { actionTypes } from './actions';

// listing props just for documentation
const initialState = {
   list: undefined,
   selectedVenue: undefined,
   insiderChallengeForm: undefined,
};

const setSelectedVenueProp = (state, action, key) => {
   if (!state.selectedVenue) {
      return state;
   }
   const {
      payload: { [key]: value },
   } = action;

   const selectedVenue = { ...state.selectedVenue, [key]: value };
   return { ...state, selectedVenue };
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
      case actionTypes.SET_CHALLENGE_FORM_DATA: {
         const { payload } = action;
         return { ...state, insiderChallengeForm: payload };
      }
      case actionTypes.SET_VENUE_TOP_MINK: {
         return setSelectedVenueProp(state, action, 'topMink');
      }
      case actionTypes.SET_VENUE_RATES: {
         return setSelectedVenueProp(state, action, 'rates');
      }
      case actionTypes.SET_VENUE_MINKS: {
         return setSelectedVenueProp(state, action, 'minks');
      }

      default:
         return state;
   }
}
