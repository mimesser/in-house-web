import { call, put, select, delay } from 'redux-saga/effects';

import api, { isForbidden } from '../../../api';
import { setVenueRates, showWelcomeForm } from '../actions';
import { handleForbiddenResponse } from './handleForbiddenResponse';
import { selectAggregate } from '../../aggregate';
import { selectIsActiveInsider, selectSelectedVenue } from '../selectors';
import { localStorageAccessor } from '../../../utils/storage';

export function* reloadVenueRateTags(id) {
  try {
    const { data } = yield call(api.get, `/venues/${id}/rateTags`);
    yield put(setVenueRates(data));

    yield delay(5000);
    const { userId } = yield select(selectAggregate);
    const storageKey = `user/${userId}/${id}/skipWelcomeCout`;
    const skipWelcome = localStorageAccessor.get(storageKey, 0);
    if (skipWelcome < 2) {
      yield put(showWelcomeForm());
    }
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
