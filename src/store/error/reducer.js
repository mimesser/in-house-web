import { actionTypes } from '../actions';

export const initialState = {
   error: false,
};

export function reducer(state = initialState, action) {
   switch (action.type) {
      case actionTypes.FAILURE:
         return action.error.response ? action.error.response : action.error;

      default:
         return state;
   }
}
