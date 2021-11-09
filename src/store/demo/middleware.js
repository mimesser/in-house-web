import MockAdapter from 'axios-mock-adapter';

import api from '../../api';
import configureMockAdapterRoutes, { RESPONSE_DELAY } from './configureMockAdapterRoutes';
import { actionTypes } from './actions';
import { clearVenuesData } from '../venues';

let mockAdapter;

const demoMiddleware = (store) => (next) => (action) => {
  if (action.type === actionTypes.TURN_DEMO_ON) {
    mockAdapter = new MockAdapter(api, { delayResponse: RESPONSE_DELAY });
    configureMockAdapterRoutes(mockAdapter, store);
  }

  if (action.type === actionTypes.TURN_DEMO_OFF) {
    if (mockAdapter) {
      store.dispatch(clearVenuesData());

      mockAdapter.restore();
      mockAdapter = undefined;
    }
  }

  return next(action);
};

export default demoMiddleware;
