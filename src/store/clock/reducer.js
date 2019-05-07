import { actionTypes } from '../actions';

export const initialState = {
   lastUpdate: 0,
   light: false,
};

export function reducer(state = initialState, action) {
   switch (action.type) {
      case actionTypes.TICK_CLOCK:
         return {
            ...state,
            ...{ lastUpdate: action.ts, light: !!action.light },
         };

      default:
         return state;
   }
}
