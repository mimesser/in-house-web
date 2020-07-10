import { call, select, put, delay, fork } from 'redux-saga/effects';

import api, { isForbidden } from '../../../api';
import { selectIsActiveInsider, selectSelectedTag, selectSelectedVenue } from '../selectors';
import { showRateTagConfirmation, setSelectedTag, updateVenueRate, setRateInProgress } from '../actions';
import { handleForbiddenResponse } from './handleForbiddenResponse';
import { showInsiderChallenge } from './showInsiderChallenge';
import { reloadVenueRateTags } from './loadVenueRateTags';
import { CONFIRMATION_INTERVAL } from './consts';

export function* rateTag({ payload: { rating, newTagId } }) {
  console.log('# trying to rate tag:', rating, newTagId);
  const tag = yield select(selectSelectedTag);

  if (tag && tag.definitionId !== newTagId) {
    yield put(setRateInProgress(tag.definitionId));
    const { id: venueId } = yield select(selectSelectedVenue);
    const isActiveInsider = yield select(selectIsActiveInsider);

    if (!isActiveInsider) {
      // this possible when private share link sent
      yield showInsiderChallenge(venueId);
      yield setSelectedTag({ ...tag });
      return;
    }

    const startApiCall = Date.now();

    const {
      data: { venueRateTag, venue },
    } = yield call(api.post, `venues/${venueId}/rateTag/${tag.definitionId}/rate`, { rate: rating });

    try {
      const confirmationRemainingTime = CONFIRMATION_INTERVAL - (Date.now() - startApiCall);
      if (confirmationRemainingTime > 0) {
        yield delay(confirmationRemainingTime);
      }
      yield put(updateVenueRate(venue));
      yield fork(reloadVenueRateTags, venueId);
      yield delay(CONFIRMATION_INTERVAL);
    } catch (e) {
      if (isForbidden(e)) {
        yield handleForbiddenResponse(venueId);
        return;
      }
      throw e;
    } finally {
      yield put(setSelectedTag(undefined));
      yield put(setRateInProgress(undefined));
    }
  } else {
    yield put(setSelectedTag(newTagId));
    yield put(setRateInProgress(undefined));
  }
}
