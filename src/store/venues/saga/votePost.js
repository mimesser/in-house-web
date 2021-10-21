import { call, select, put, delay } from 'redux-saga/effects';

import api, { isForbidden } from '../../../api';
import { clearInsiderVenue } from '../../aggregate';
import { selectIsActiveInsider, selectSelectedVenue } from '../selectors';
import { showVotePostConfirmation, setSelectedPost, toggleFlagError } from '../actions';
import { handleForbiddenResponse } from './handleForbiddenResponse';
import { showInsiderChallenge } from './showInsiderChallenge';
import { CONFIRMATION_INTERVAL } from './consts';

export function* votePost({ payload: { vote, postId } }) {
  const venue = yield select(selectSelectedVenue);
  const isActiveInsider = yield select(selectIsActiveInsider);

  if (!isActiveInsider) {
    // this possible when private share link sent
    yield put(clearInsiderVenue(venue.id));
    yield showInsiderChallenge(venue.id);

    return;
  }

  try {
    const { data } = yield call(api.post, `venues/${venue.id}/feedback/${postId}/vote`, { vote });

    if (typeof data === 'string' && data.length) {
      yield put(showVotePostConfirmation(data));
      yield delay(CONFIRMATION_INTERVAL);
    }
  } catch (e) {
    if (isForbidden(e)) {
      yield handleForbiddenResponse(venue.id);
    }

    throw e;
  } finally {
    yield put(showVotePostConfirmation(undefined));
    yield put(setSelectedPost(undefined));
  }
}

export function* downvotePost(postId) {
  yield* votePost({ payload: { vote: -1, postId } });
}

export function* upvotePost(postId) {
  yield* votePost({ payload: { vote: 1, postId } });
}
