import { call, put } from 'redux-saga/effects';
import orderBy from 'lodash/orderBy';

import api, { isForbidden } from '../../../api';
import { clearInsiderVenue } from '../../aggregate';
import { setVenueRates } from '../actions';
import { showInsiderChallenge } from './showInsiderChallenge';

export function* loadVenueRateTags(id) {
   try {
      const { data } = yield call(api.get, `/Venues/${id}/rateTags`);
      yield put(setVenueRates(orderBy(data, t => t.orderIndex)));
   } catch (e) {
      if (isForbidden(e)) {
         // TODO: test when UI allows changing top mink
         yield clearInsiderVenue(id);
         yield showInsiderChallenge(id);
         return;
      }
      throw e;
   }
}
