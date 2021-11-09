import { call, select, put, delay, fork } from 'redux-saga/effects';

import api, { isForbidden } from '../../../api';
import { selectIsActiveInsider, selectSelectedTag, selectSelectedVenue } from '../selectors';
import { setSelectedTag, updateVenueRate, setRateInProgress } from '../actions';
import { handleForbiddenResponse } from './handleForbiddenResponse';
import { showInsiderChallenge } from './showInsiderChallenge';
import { reloadVenueRateTags } from './loadVenueRateTags';
import { CONFIRMATION_INTERVAL_ULTRA_SHORT as CONFIRMATION_INTERVAL } from './consts';

export function* rateTag({ payload: { targetRate, doReloadVenueRateTags = true } }) {
  const tag = yield select(selectSelectedTag);

  if (targetRate && tag) {
    const { id: venueId } = yield select(selectSelectedVenue);
    const isActiveInsider = yield select(selectIsActiveInsider);
    const startApiCall = Date.now();

    if (!isActiveInsider) {
      // this possible when private share link sent
      yield showInsiderChallenge(venueId);
      yield setSelectedTag({ ...tag });

      return;
    }

    yield put(setRateInProgress(tag.definitionId));

    // TODO remove round to int
    const {
      data: { venue },
    } = yield call(api.post, `venues/${venueId}/rateTag/${tag.definitionId}/rate`, {
      rate: targetRate,
    });

    try {
      const confirmationRemainingTime = CONFIRMATION_INTERVAL - (Date.now() - startApiCall);

      yield put(updateVenueRate(venue));

      if (doReloadVenueRateTags) {
        if (confirmationRemainingTime > 0) {
          yield delay(confirmationRemainingTime);
        }
        yield fork(reloadVenueRateTags, venueId);
        yield delay(CONFIRMATION_INTERVAL);
      }
    } catch (e) {
      if (isForbidden(e)) {
        yield handleForbiddenResponse(venueId);
      }

      throw e;
    } finally {
      yield put(setSelectedTag(undefined));
      yield put(setRateInProgress(undefined));
    }
  } else {
    yield put(setSelectedTag(undefined));
    yield put(setRateInProgress(undefined));
  }
}
