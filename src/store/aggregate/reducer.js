import { actionTypes } from './actions';

const initialState = {};

export function reducer(state = initialState, action) {
   switch (action.type) {
      case actionTypes.LOAD_AGGREGATE_DATA_SUCCESS:
         return action.data;

      default:
         return state;
   }
}
