import { call, select, put, delay } from 'redux-saga/effects';

import api, { isForbidden } from '../../../api';
import { clearInsiderVenue } from '../../aggregate';
import { selectIsActiveInsider, selectSelectedVenue } from '../selectors';
import { showVotePostConfirmation, setSelectedPost, setVenuePosts } from '../actions';
import { handleForbiddenResponse } from './handleForbiddenResponse';
import { showInsiderChallenge } from './showInsiderChallenge';
import { CONFIRMATION_INTERVAL } from './consts';

export function* votePost({ payload: { vote, postId, skipConfirmation = false } }) {
  const selectedVenue = yield select(selectSelectedVenue);
  const isActiveInsider = yield select(selectIsActiveInsider);

  if (!isActiveInsider) {
    // this possible when private share link sent
    yield put(clearInsiderVenue(selectedVenue.id));
    yield showInsiderChallenge(selectedVenue.id);

    return;
  }

  try {
    const {
      data: { venue, post: updatedPost },
    } = yield call(api.post, `venues/${selectedVenue.id}/feedback/${postId}/vote`, { vote });

    if (venue.id === selectedVenue.id && updatedPost?.id === postId) {
      const updatedPosts = selectedVenue.posts.map((p) => (p.id === postId ? updatedPost : p));

      if (!skipConfirmation) {
        yield put(
          showVotePostConfirmation({
            voteRating: updatedPost.voteRating,
            voteCount: updatedPost.voteCount,
          }),
        );
        yield put(setVenuePosts(updatedPosts));

        yield delay(CONFIRMATION_INTERVAL);
      } else {
        yield put(setVenuePosts(updatedPosts));
      }

      return { venue, post: updatedPost, posts: updatedPosts };
    }
  } catch (e) {
    if (isForbidden(e)) {
      yield handleForbiddenResponse(selectedVenue.id);
    }

    throw e;
  } finally {
    // @HINT conditional includes setting sel Post null, because
    // skipConfirmation is the case of toggleFlagError without previous Votings
    if (!skipConfirmation) {
      yield put(showVotePostConfirmation(undefined));
      yield put(setSelectedPost(undefined));
    }
  }
}

export function* downvotePost(postId, skipConfirmation = false) {
  return yield* votePost({ payload: { vote: -1, postId, skipConfirmation } });
}

export function* upvotePost(postId, skipConfirmation = false) {
  return yield* votePost({ payload: { vote: 1, postId, skipConfirmation } });
}
