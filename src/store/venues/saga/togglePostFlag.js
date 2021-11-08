import { call, select, put, putResolve, delay, fork } from 'redux-saga/effects';

import api from '../../../api';
import { selectSelectedVenue, selectSelectedPost } from '../selectors';
import { setVenuePosts, setSelectedPost, toggleFlagError } from '../actions';
import { downvotePost } from './votePost';

const CONFIRMATION_DELAY = 1500;

export function* togglePostFlag({ payload: { wasVotedByMe } }) {
  const venue = yield select(selectSelectedVenue);
  const post = yield select(selectSelectedPost);

  try {
    if (!wasVotedByMe && !post.wasFlaggedByMe) {
      yield call(downvotePost, post.id, true);
    }

    const { data: response } = yield call(
      api.put,
      `venues/${venue.id}/feedback/${post.id}/${post.wasFlaggedByMe ? 'unflag' : 'flag'}`,
    );

    if (response.post.wasDeleted) {
      const filteredPosts = venue.posts.filter((p) => p.id !== post.id);

      yield put(toggleFlagError('Team affirmation level reached: Deleting ...'));
      yield delay(CONFIRMATION_DELAY);
      yield put(setVenuePosts(filteredPosts));
    } else {
      const updatedPosts = venue.posts.map((p) => (p.id === post.id ? response.post : p));

      if (response.post.wasFlaggedByMe) {
        yield put(toggleFlagError('Flagged for deletion: awaiting team confirmation.'));
      } else {
        yield put(toggleFlagError('Flag removed successfully!'));
      }

      yield delay(CONFIRMATION_DELAY);
      yield put(setVenuePosts(updatedPosts));

      return { venue, post: response.post, posts: updatedPosts };
    }
  } catch (e) {
    yield put(toggleFlagError('Whoopsie daisy, something went wrong ... sorry for that!'));

    throw e;
  } finally {
    yield put(toggleFlagError(''));
    yield put(setSelectedPost(undefined));
  }
}
