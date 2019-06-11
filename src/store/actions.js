import { actionTypes as counterActionTypes, decrement, increment, reset } from './counter/actions';
import { actionTypes as errorActionTypes, failure } from './error/actions';

export const actionTypes = {
   ...counterActionTypes,
   ...errorActionTypes,
};

export { decrement, increment, reset, failure };
