import { call, select, put, delay, fork, all } from 'redux-saga/effects';

import api from '../../../api';
import {
  selectSelectedMink,
  selectSelectedVenue,
  selectSelectedVenueTopMinkId,
  selectAnswerMinkStatus,
} from '../selectors';
import { showVoteMinkConfirmation, setSelectedMink, setNewMinkElected, tryAnswerMink } from '../actions';
import { reloadVenueMinks } from './loadVenueMinks';
import { reloadInsiderVenueIds } from './reloadInsiderVenueIds';
import { CONFIRMATION_INTERVAL } from './consts';
import { watchMinkAnswerAttempts } from './watchMinkAnswerAttempts';

function* reloadMinksAndCheckIfNewElected(venue) {
  const startLoading = Date.now();
  const prevTopMink = yield select(selectSelectedVenueTopMinkId);
  // order and top mink can change
  yield all([reloadInsiderVenueIds(), reloadVenueMinks(venue.id)]);

  const currentTopMink = yield select(selectSelectedVenueTopMinkId);
  if (currentTopMink === prevTopMink) {
    return;
  }

  const confirmationRemainingTime = CONFIRMATION_INTERVAL - (Date.now() - startLoading);
  if (confirmationRemainingTime > 0) {
    yield delay(confirmationRemainingTime);
  }
  yield put(setNewMinkElected(true));
  yield delay(CONFIRMATION_INTERVAL);
  yield put(setNewMinkElected(false));
}

export function* voteMink({ payload: { vote, minkId } }) {
  const venue = yield select(selectSelectedVenue);

  // try {
  //   const answerStatus = yield select(selectAnswerMinkStatus);
  //   if (!answerStatus || typeof answerStatus.isAnswerCorrect !== 'boolean' || !!answerStatus.isAnswerCorrect) {
  //     const {
  //       data: { isAnswerCorrect },
  //     } = yield call(api.post, `venues/${venue.id}/mink/${minkId}/answer`, { answer: 'null' });
  //   }
  // } catch (error) {
  //   console.log(error);
  // }

  const { data } = yield call(api.post, `venues/${venue.id}/mink/${minkId}/rate`, { vote });

  try {
    yield put(showVoteMinkConfirmation(data));
    // order and top mink can change
    yield fork(reloadMinksAndCheckIfNewElected, venue);
  } catch (e) {
    console.log(e);
  } finally {
    yield put(setSelectedMink(undefined));
    yield put(showVoteMinkConfirmation(undefined));
  }
}
