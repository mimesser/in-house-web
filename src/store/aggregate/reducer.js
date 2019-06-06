import { actionTypes } from './actions';

const initialState = {};

export function reducer(state = initialState, action) {
   switch (action.type) {
      case actionTypes.LOAD_AGGREGATE_DATA_SUCCESS:
         return action.data;
      case actionTypes.ADD_INSIDER_VENUE: {
         const {
            payload: { id },
         } = action;
         return {
            ...state,
            insiderVenueIds: state.insiderVenueIds.concat(id),
         };
      }

      default:
         return state;
   }
}
