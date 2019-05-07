import { actionTypes as aggregateActionTypes, loadAggregateData, loadAggregateDataSuccess } from './aggregate/actions';
import { actionTypes as venuesActionTypes, loadVenuesData, loadVenuesDataSuccess } from './venues/actions';
import { actionTypes as clockActionTypes, startClock, tickClock } from './clock/actions';
import { actionTypes as counterActionTypes, decrement, increment, reset } from './counter/actions';
import { actionTypes as errorActionTypes, failure } from './error/actions';

export const actionTypes = {
   ...aggregateActionTypes,
   ...venuesActionTypes,
   ...clockActionTypes,
   ...counterActionTypes,
   ...errorActionTypes,
};

export { loadAggregateData, loadAggregateDataSuccess, loadVenuesData, loadVenuesDataSuccess, startClock, tickClock, decrement, increment, reset, failure };
