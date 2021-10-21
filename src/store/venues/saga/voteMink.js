import { call, select, put, delay, all } from 'redux-saga/effects';

import api from '../../../api';
import {
  selectSelectedMink,
  selectSelectedVenue,
  selectSelectedVenueTopMinkId,
  selectAnswerMinkStatus,
} from '../selectors';
import {
  showVoteMinkConfirmation,
  setSelectedMink,
  setNewMinkElected,
  tryAnswerMink,
} from '../actions';
import { reloadVenueMinks } from './loadVenueMinks';
import { reloadInsiderVenueIds } from './reloadInsiderVenueIds';
import { CONFIRMATION_INTERVAL } from './consts';
import { watchMinkAnswerAttempts } from './watchMinkAnswerAttempts';

function* reloadMinksAndCheckIfNewElected(venue) {
  const prevTopMink = yield select(selectSelectedVenueTopMinkId);

  // order and top mink can change
  yield all([reloadInsiderVenueIds(), reloadVenueMinks(venue.id)]);

  const currentTopMink = yield select(selectSelectedVenueTopMinkId);
  if (currentTopMink === prevTopMink) {
    return;
  }

  yield put(setNewMinkElected(true));
  yield delay(CONFIRMATION_INTERVAL);
  yield put(setNewMinkElected(false));
}

export function* voteMink({ payload: { vote, minkId } }) {
  const venue = yield select(selectSelectedVenue);

  try {
    const { data } = yield call(api.post, `venues/${venue.id}/mink/${minkId}/rate`, { vote });

    if (typeof data === 'string' && data.length) {
      yield put(showVoteMinkConfirmation(data));
      yield delay(CONFIRMATION_INTERVAL);
    }
  } finally {
    yield put(setSelectedMink(undefined));
    yield put(showVoteMinkConfirmation(undefined));
  }

  yield call(reloadMinksAndCheckIfNewElected, venue);
}

export function* downvoteMink(minkId) {
  yield* voteMink({ payload: { vote: -1, minkId } });
}

export function* upvoteMink(minkId) {
  yield* voteMink({ payload: { vote: 1, minkId } });
}
