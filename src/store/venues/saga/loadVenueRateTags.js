import { call, put, select } from 'redux-saga/effects';
import orderBy from 'lodash/orderBy';

import api, { isForbidden } from '../../../api';
import { setVenueRates } from '../actions';
import { handleForbiddenResponse } from './handleForbiddenResponse';
import { selectIsActiveInsider, selectSelectedVenue } from '../selectors';

export function* reloadVenueRateTags(id) {
  try {
    const { data } = yield call(api.get, `/venues/${id}/rateTags`);
    yield put(setVenueRates(orderBy(data, t => t.orderIndex)));
  } catch (e) {
    if (isForbidden(e)) {
      yield handleForbiddenResponse(id);
      return;
    }
    throw e;
  }
}

export function* loadVenueRateTags() {
  const { id, rates: loaded } = yield select(selectSelectedVenue);
  const isActiveInsider = yield select(selectIsActiveInsider);
  if (loaded || !isActiveInsider) {
    return;
  }
  yield reloadVenueRateTags(id);
}
