import { combineReducers } from 'redux';
import aggregate from './aggregate/reducer';

const rootReducer = combineReducers({
   aggregate,
});

export default rootReducer;
