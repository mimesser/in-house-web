import { put, select, call, delay, fork } from 'redux-saga/effects';
import Router from 'next/router';

import { selectSelectedVenue } from '../selectors';
import api, { isConflict } from '../../../api';
import { setChallengeFormData, setMyCorrectAnswer, showWelcomeForm } from '../actions';
import { getRecord, clearRecord, setRecord } from './minkAnswerRecord';
import { addInsiderVenue, selectAcceptedTerms, selectAggregate } from '../../aggregate';
import { reloadVenueRateTags } from './loadVenueRateTags';
import { reloadVenuePosts } from './loadVenuePosts';

import { localStorageAccessor } from '../../../utils/storage';

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

/**
 * @description
 * This Redux Saga function helps to do post request in order to  answer top  mink question.
 * @param { string } answer Answer is the word that is answer for the mink question.
 * @returns Nothing
 */

export function* answerTopMink({ payload: { answer } }) {
  if (!answer) {
    return;
  }
  yield put(setChallengeFormData({}));

  const venue = yield select(selectSelectedVenue);

  const record = getRecord(venue.id);

  try {
    const {
      data: { isAnswerCorrect },
    } = yield call(api.post, `venues/${venue.id}/mink/${venue.topMink.id}/answer`, { answer });

    if (isAnswerCorrect) {
      clearRecord(venue.id);
      yield put(addInsiderVenue(venue.id));
      yield put(setChallengeFormData({ isAnswerCorrect }));
      const loadDataSaga = getLoadDataSaga();
      if (loadDataSaga) {
        yield fork(loadDataSaga, venue.id);
      }

      yield delay(CONFIRMATION_DELAY);
      yield put(setMyCorrectAnswer(venue.topMink.id, answer));
      yield put(setChallengeFormData(undefined));

      return;
    }

    record.attempt += 1;
    if (record.attempt >= MAX_ATTEMPTS) {
      record.blocked = true;
      yield call(api.post, `venues/${venue.id}/mink/${venue.topMink.id}/block`);
    }
    setRecord(record, venue.id);
    yield put(setChallengeFormData({ isAnswerCorrect, blocked: record.blocked }));
  } catch (e) {
    if (!isConflict(e)) {
      throw e;
    }
    const record = { blocked: true, time: Date.now() };
    setRecord(record, venue.id);
    yield put(setChallengeFormData(record));
  }
}
