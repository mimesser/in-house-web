import { call, select, put, delay, fork } from 'redux-saga/effects';

import api, { isForbidden } from '../../../api';
import { selectSelectedTag, selectSelectedVenue } from '../selectors';
import { showRateTagConfirmation, setSelectedTag, updateTagAndVenueRates } from '../actions';
import { handleForbiddenResponse } from './handleForbiddenResponse';

const CONFIRMATION_INTERVAL = 1500;

export function* rateTag({ payload: { rating } }) {
   const { id: venueId } = yield select(selectSelectedVenue);
   const tag = yield select(selectSelectedTag);

   const {
      data: { venueRateTag, venue },
   } = yield call(api.post, `venues/${venueId}/rateTag/${tag.definitionId}/rate`, { rate: rating });

   try {
      yield put(showRateTagConfirmation(venueRateTag));
      yield put(updateTagAndVenueRates(venueRateTag, venue));
      yield delay(CONFIRMATION_INTERVAL);
   } catch (e) {
      if (isForbidden(e)) {
         yield handleForbiddenResponse(venueId);
         return;
      }
      throw e;
   } finally {
      yield put(setSelectedTag(undefined));
      yield put(showRateTagConfirmation(undefined));
   }
}
