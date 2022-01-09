import { put, call } from 'redux-saga/effects';

import api from '../../../api';
import { getRecord } from './minkAnswerRecord';
import { setChallengeFormData, setVenueTopMink } from '../actions';

/**
 * @description
 * This Redux Saga function helps to show the team challenge for the the new user.
 * @param {string} venueId is the id of Venue.
 * @returns Nothing
 */

export function* showInsiderChallenge(venueId) {
  const { blocked } = getRecord(venueId);
  yield put(setChallengeFormData({ blocked }));
  if (blocked) {
    return;
  }

  const { data } = yield call(api.get, `venues/${venueId}/topmink`);
  yield put(setVenueTopMink(data));
}

/**
 * @description
 * This Redux Saga function helps to show the team challenge for the the new user. Only the people who answers correctly
 * will continue with the work.
 * @param {string} venueId is the id of Venue.
 * @returns Nothing
 */

export function* triggerInsiderChallenge({ payload: { venueId } }) {
  yield showInsiderChallenge(venueId);
}
