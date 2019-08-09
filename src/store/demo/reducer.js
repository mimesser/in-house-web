import { actionTypes } from './actions';

const initialState = {
   mockAdapter: undefined,
};

export function reducer(state = initialState, action) {
   switch (action.type) {
      case actionTypes.TURN_DEMO_ON: {
         return {
            mockAdapter: action.payload,
         };
      }
      case actionTypes.TURN_DEMO_OFF: {
         // TODO: this check is only necc. bc turnDemoOff is called everytime new venue is selected
         if (state.mockAdapter) {
            state.mockAdapter.restore();
         }
         return {
            mockAdapter: undefined,
         };
      }
      default:
         return state;
   }
}
