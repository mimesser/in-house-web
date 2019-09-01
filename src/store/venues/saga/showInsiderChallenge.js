import { put, call } from 'redux-saga/effects';

import api from '../../../api';
import { getRecord } from './minkAnswerRecord';
import { setChallengeFormData, setVenueTopMink } from '../actions';

export function* showInsiderChallenge(venueId) {
  const { blocked } = getRecord(venueId);
  yield put(setChallengeFormData({ blocked }));
  if (blocked) {
    return;
  }

  const { data } = yield call(api.get, `venues/${venueId}/topmink`);
  yield put(setVenueTopMink(data));
}
