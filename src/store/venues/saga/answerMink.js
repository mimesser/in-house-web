import { put, select, call, delay, fork } from 'redux-saga/effects';

import { selectSelectedVenue } from '../selectors';
import api, { isConflict } from '../../../api';
import { setChallengeFormData } from '../actions';
import { getRecord, clearRecord, setRecord } from './minkAnswerRecord';
import { addInsiderVenue } from '../../aggregate';
import { loadVenueRateTags } from './loadVenueRateTags';

const MAX_ATTEMPTS = 5;
const CONFIRMATION_DELAY = 1000;

/**
 * @description
 * This Redux Saga function helps to do post request in order to  answer the mink question.
 * @param { string } answer Answer is the word that is answer for the mink question.
 * @returns Nothing
 */

export function* answerMink({ payload: { answer } }) {
  if (!answer) {
    return;
  }
  yield put(setChallengeFormData({}));

  const record = getRecord();

  const venue = yield select(selectSelectedVenue);

  try {
    const {
      data: { isAnswerCorrect },
    } = yield call(api.post, `venues/${venue.id}/mink/${venue.topMink.id}/answer`, { answer });

    if (isAnswerCorrect) {
      clearRecord();
      yield put(addInsiderVenue(venue.id));
      yield put(setChallengeFormData({ isAnswerCorrect }));
      yield fork(loadVenueRateTags, venue.id);
      yield delay(CONFIRMATION_DELAY);
      yield put(setChallengeFormData(undefined));
      return;
    }

    record.attempt += 1;
    if (record.attempt >= MAX_ATTEMPTS) {
      record.blocked = true;
      yield call(api.post, `venues/${venue.id}/mink/${venue.topMink.id}/block`);
    }
    setRecord(record);
    yield put(setChallengeFormData({ isAnswerCorrect, blocked: record.blocked }));
  } catch (e) {
    if (!isConflict(e)) {
      throw e;
    }
    const record = { blocked: true, time: Date.now() };
    setRecord(record);
    yield put(setChallengeFormData(record));
  }
}
