import { combineReducers } from 'redux';

import { reducer as aggregate } from './aggregate/reducer';
import { reducer as clock } from './clock/reducer';
import { reducer as counter } from './counter/reducer';
import { reducer as error } from './error/reducer';
import { reducer as venues } from './venues/reducer';

export default combineReducers({
   aggregate,
   clock,
   counter,
   error,
   venues,
});
