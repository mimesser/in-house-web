import MockAdapter from 'axios-mock-adapter';

import api from '../../api';
import configureMockAdapterRoutes, { RESPONSE_DELAY } from './configureMockAdapterRoutes';
import { actionTypes } from './actions';
import { loadAggregateDataSuccess } from '../aggregate';
import { loadVenuesDataSuccess } from '../venues';
import DEMO_AGGREGATE from './data/aggregate';

let mockAdapter;
let realAggregate;

const demoMiddleware = store => next => action => {
  if (action.type === actionTypes.TURN_DEMO_ON) {
    // cache the real aggregate
    realAggregate = action.payload;

    // use the demo aggregate
    store.dispatch(loadAggregateDataSuccess(DEMO_AGGREGATE));

    mockAdapter = new MockAdapter(api, { delayResponse: RESPONSE_DELAY });
    configureMockAdapterRoutes(mockAdapter, store);
  }

  if (action.type === actionTypes.TURN_DEMO_OFF) {
    // TODO: this check is only necc. bc turnDemoOff is called everytime new venue is selected
    if (mockAdapter) {
      // TODO: maybe have a CLEAR_VENUE action to make this more clear
      store.dispatch(loadVenuesDataSuccess(null));

      // restore the cached realAggregate
      store.dispatch(loadAggregateDataSuccess(realAggregate));

      mockAdapter.restore();
      mockAdapter = undefined;
    }
  }

  return next(action);
};

export default demoMiddleware;
