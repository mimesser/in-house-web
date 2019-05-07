import { actionTypes } from '../actions';

export const initialState = {
   aggregate: null,
};

export function reducer(state = initialState, action) {
   switch (action.type) {
      case actionTypes.LOAD_AGGREGATE_DATA_SUCCESS:
         return action.data;

      default:
         return state;
   }
}
