import MockAdapter from 'axios-mock-adapter';

import api from '../../api';
import configureMockAdapterRoutes from './configureMockAdapterRoutes';
import { actionTypes } from './actions';
import { selectMockAdapter } from './selectors';

const RESPONSE_DELAY = 300;

const turnDemoOnMiddleware = store => next => action => {
   if (action.type === actionTypes.TURN_DEMO_ON) {
      const mockAdapter = new MockAdapter(api, { delayResponse: RESPONSE_DELAY });
      configureMockAdapterRoutes(mockAdapter, store);
      action.payload = mockAdapter;
   }
   return next(action);
};

export default [turnDemoOnMiddleware];
