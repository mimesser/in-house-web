import { actionTypes } from '../actions';

export const initialState = {
   venues: null,
};

export function reducer(state = initialState, action) {
   switch (action.type) {
      case actionTypes.LOAD_VENUES_DATA_SUCCESS:
         return action.data;

      default:
         return state;
   }
}
