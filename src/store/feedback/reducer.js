import { actionTypes } from './actions';

const initialState = {};

export function reducer(state = initialState, action) {
   switch (action.type) {
      case actionTypes.SET_FEEDBACK_ERROR: {
         return { error: action.payload.error };
      }
      case actionTypes.SET_FEEDBACK_LOADING: {
         return { loading: true };
      }
      case actionTypes.SET_FEEDBACK_SUCCESS: {
         return { success: true };
      }
      case actionTypes.CLEAR_FEEDBACK: {
         return {};
      }

      default:
         return state;
   }
}
