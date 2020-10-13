import { call, select, put, delay, fork } from 'redux-saga/effects';

import api from '../../../api';
import { selectIsActiveInsider, selectSelectedVenue } from '../selectors';
import { showVotePostConfirmation, setSelectedPost, toggleFlagError } from '../actions';
import { reloadVenuePosts } from './loadVenuePosts';
import { showInsiderChallenge } from './showInsiderChallenge';
import { CONFIRMATION_INTERVAL } from './consts';

export function* votePost({ payload: { vote, postId } }) {
  const venue = yield select(selectSelectedVenue);
  const isActiveInsider = yield select(selectIsActiveInsider);

  if (!isActiveInsider) {
    // this possible when private share link sent
    yield showInsiderChallenge(venue.id);
    return;
  }

  const { data } = yield call(api.post, `venues/${venue.id}/feedback/${postId}/vote`, { vote });

  try {
    yield put(showVotePostConfirmation(data));
    // order can change
    yield fork(reloadVenuePosts, venue.id);
    yield delay(CONFIRMATION_INTERVAL);
  } finally {
    yield put(toggleFlagError(''));
    yield put(setSelectedPost(undefined));
    yield put(showVotePostConfirmation(undefined));
  }
}
