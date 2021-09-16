import { call, fork, put, select, delay } from 'redux-saga/effects';

import api, { isForbidden } from '../../../api';
import { setVenueRates, setVenueLoading, showWelcomeForm } from '../actions';
import { handleForbiddenResponse } from './handleForbiddenResponse';
import { selectAggregate } from '../../aggregate';
import { selectIsActiveInsider, selectSelectedVenue } from '../selectors';
import { localStorageAccessor } from '../../../utils/storage';

const SHOW_WELCOME_DELAY = 5000;

export function* showDelayedWelcome(ms) {
  yield delay(ms);
  put(showWelcomeForm());
}

export function* reloadVenueRateTags(id) {
  try {
    const { data } = yield call(api.get, `/venues/${id}/rateTags`);
    yield put(setVenueRates(data));

    const { userId } = yield select(selectAggregate);
    const storageKey = `user/${userId}/${id}/skipWelcomeCount`;
    const skipWelcome = localStorageAccessor.get(storageKey, 0);

    if (skipWelcome < 2) {
      fork(showDelayedWelcome, SHOW_WELCOME_DELAY);
    }
  } catch (e) {
    if (isForbidden(e)) {
      yield handleForbiddenResponse(id);
    } else {
      throw e;
    }
  }
}

export function* loadVenueRateTags() {
  const selectedVenue = yield select(selectSelectedVenue);
  const isActiveInsider = yield select(selectIsActiveInsider);

  if (isActiveInsider) {
    yield put(setVenueLoading(true));
    yield reloadVenueRateTags(selectedVenue.id);
    yield put(setVenueLoading(false));
  }
}
