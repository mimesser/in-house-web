import { actionTypes as clockActionTypes, startClock, tickClock } from './clock/actions';
import { actionTypes as counterActionTypes, decrement, increment, reset } from './counter/actions';
import { actionTypes as errorActionTypes, failure } from './error/actions';

export const actionTypes = {
   ...clockActionTypes,
   ...counterActionTypes,
   ...errorActionTypes,
};

export { startClock, tickClock, decrement, increment, reset, failure };
