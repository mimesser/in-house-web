import { call, put } from 'redux-saga/effects';
import orderBy from 'lodash/orderBy';

import api, { isForbidden } from '../../../api';
import { setVenueRates } from '../actions';
import { handleForbiddenResponse } from './handleForbiddenResponse';

export function* loadVenueRateTags(id) {
   try {
      const { data } = yield call(api.get, `/Venues/${id}/rateTags`);
      yield put(setVenueRates(orderBy(data, t => t.orderIndex)));
   } catch (e) {
      if (isForbidden(e)) {
         yield handleForbiddenResponse(id);
         return;
      }
      throw e;
   }
}
