import { combineReducers } from 'redux';

import { reducer as aggregate } from './aggregate/reducer';
import { reducer as error } from './error/reducer';
import { reducer as venues } from './venues/reducer';
import { reducer as feedback } from './feedback/reducer';
import { reducer as help } from './help';

export default combineReducers({
  aggregate,
  error,
  feedback,
  venues,
  help,
});
