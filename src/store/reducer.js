import { combineReducers } from 'redux';

import { reducer as aggregateReducer, initialState as aggregateInitialState } from './aggregate/reducer';
import { reducer as clockReducer, initialState as clockInitialState } from './clock/reducer';
import { reducer as counterReducer, initialState as counterInitialState } from './counter/reducer';
import { reducer as errorReducer, initialState as errorInitialState } from './error/reducer';
import { reducer as venuesReducer, initialState as venuesInitialState } from './venues/reducer';

export const initialState = {
   ...aggregateInitialState,
   ...clockInitialState,
   ...counterInitialState,
   ...errorInitialState,
   ...venuesInitialState,
};

const _rootReducer = combineReducers({
   aggregate: aggregateReducer,
   clock: clockReducer,
   counter: counterReducer,
   error: errorReducer,
   venues: venuesReducer,
});

function reducer(state = initialState, action) {
   switch (action.type) {
      default:
         return _rootReducer(state, action);
   }
}

export default reducer;
