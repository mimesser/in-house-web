import { put, select, call, delay, fork } from 'redux-saga/effects';
import Router from 'next/router';

import { selectSelectedVenue } from '../selectors';
import api, { isConflict } from '../../../api';
import { setChallengeFormData, setMyCorrectAnswer } from '../actions';
import { getRecord, clearRecord, setRecord } from './minkAnswerRecord';
import { addInsiderVenue, selectAcceptedTerms } from '../../aggregate';
import { reloadVenueRateTags } from './loadVenueRateTags';
import { reloadVenuePosts } from './loadVenuePosts';

const MAX_ATTEMPTS = 5;
const CONFIRMATION_DELAY = 1000;

const getLoadDataSaga = () => {
  const currentTab = Router.query.tab;
  if (!currentTab || currentTab === 'rate') {
    return reloadVenueRateTags;
  }
  if (currentTab === 'post') {
    return reloadVenuePosts;
  }
  return undefined;
};

export function* answerTopMink({ payload: { answer } }) {
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
      const loadDataSaga = getLoadDataSaga();
      if (loadDataSaga) {
        yield fork(loadDataSaga, venue.id);
      }

      yield delay(CONFIRMATION_DELAY);
      const acceptedTerms = yield select(selectAcceptedTerms);
      yield put(setChallengeFormData(acceptedTerms ? undefined : { showTerms: true }));
      yield put(setMyCorrectAnswer(venue.topMink.id, answer));
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
