import { put, call, select, delay } from 'redux-saga/effects';

import api from '../../../api';
import { setChallengeFormData, setVenueTopMink } from '../actions';
import { selectInsiderVenueIds } from '../../aggregate';
import { getRecord } from './minkAnswerRecord';
import { loadVenueRateTags } from './loadVenueRateTags';

const DELAY_BEFORE_CHALLENGE = 500;
const DELAY_CONFIRMATION = 1000;

export function* setSelectedVenue({ payload: { venue: { id } = {} } }) {
   if (!id) {
      return;
   }
   const { blocked } = getRecord();
   const insiderVenueIds = yield select(selectInsiderVenueIds);
   const isActiveInsider = insiderVenueIds && insiderVenueIds.includes(id);

   yield delay(DELAY_BEFORE_CHALLENGE);

   if (isActiveInsider) {
      yield put(setChallengeFormData({ isAnswerCorrect: true }));
      yield delay(DELAY_CONFIRMATION);
      yield put(setChallengeFormData(undefined));
      yield loadVenueRateTags(id);
      return;
   }

   yield put(setChallengeFormData({ blocked }));
   if (blocked) {
      return;
   }

   const { data } = yield call(api.get, `venues/${id}/topmink`);
   yield put(setVenueTopMink(data));
}
