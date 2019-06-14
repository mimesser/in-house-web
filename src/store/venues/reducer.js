import { actionTypes } from './actions';
import { actionTypes as aggregateActions } from '../aggregate';

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
      case actionTypes.STORE_NEW_MINK: {
         if (!state.selectedVenue) {
            return state;
         }
         const {
            payload: { mink },
         } = action;
         const newMinks = [mink, ...(state.selectedVenue.newMinks || [])];
         return { ...state, selectedVenue: { ...state.selectedVenue, newMinks } };
      }
      case aggregateActions.CLEAR_INSIDER_VENUE: {
         if (!state.selectedVenue) {
            return state;
         }
         const {
            payload: { id },
         } = action;

         const selectedVenue = state.list && state.list.find(v => v.id === id);
         return { ...state, selectedVenue };
      }

      default:
         return state;
   }
}
