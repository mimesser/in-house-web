import MockAdapter from 'axios-mock-adapter';

import api from '../../api';
import configureMockAdapterRoutes from './configureMockAdapterRoutes';
import { actionTypes, setDemoData, setDemoMockAdapter } from './actions';
import { selectMockAdapter } from './selectors';
import { data as INITIAL_DATA } from './data';
import { loadVenuesDataSuccess } from '../venues';

const RESPONSE_DELAY = 300;

const turnDemoOnMiddleware = store => next => action => {
   if (action.type === actionTypes.TURN_DEMO_ON) {
      store.dispatch(setDemoData(INITIAL_DATA));
      const mockAdapter = new MockAdapter(api, { delayResponse: RESPONSE_DELAY });
      configureMockAdapterRoutes(mockAdapter, store);
      store.dispatch(setDemoMockAdapter(mockAdapter));
   }

   return next(action);
};

const turnDemoOffMiddleware = store => next => action => {
   if (action.type === actionTypes.TURN_DEMO_OFF) {
      store.dispatch(loadVenuesDataSuccess(null));
      const mockAdapter = selectMockAdapter(store.getState());
      mockAdapter.restore();
   }
   return next(action);
};

export default [turnDemoOnMiddleware, turnDemoOffMiddleware];
