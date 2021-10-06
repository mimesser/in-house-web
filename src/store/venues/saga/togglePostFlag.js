import { call, select, put, delay, fork } from 'redux-saga/effects';

import api, { isForbidden } from '../../../api';
import { selectSelectedVenue, selectSelectedPost } from '../selectors';
import { setVenuePosts, setSelectedPost, toggleFlagError } from '../actions';

const CONFIRMATION_DELAY = 1500;

export function* waitAndUpdateVenuePosts(posts, filtereePostId) {
  const filteredPosts = posts.filter((p) => p.id !== filtereePostId);

  yield delay(CONFIRMATION_DELAY);
  yield put(setVenuePosts(filteredPosts));
}

export function* togglePostFlag() {
  const venue = yield select(selectSelectedVenue);
  const post = yield select(selectSelectedPost);

  try {
    const { data: response } = yield call(
      api.put,
      `venues/${venue.id}/feedback/${post.id}/${post.wasFlaggedByMe ? 'unflag' : 'flag'}`,
    );

    if (response.success) {
      if (response.wasDeleted) {
        const postId = `${post.id}`;

        yield put(toggleFlagError('Group affirmation level reached: Deleting ...'));
        yield fork(waitAndUpdateVenuePosts, venue.posts, postId);
      } else {
        const updatedPosts = venue.posts.slice();
        const index = updatedPosts.findIndex((p) => p.id === post.id);
        updatedPosts[index] = {
          ...post,
          wasDeleted: response.wasDeleted,
          wasFlaggedByMe: response.wasFlaggedByMe,
        };

        yield put(setVenuePosts(updatedPosts));

        if (response.wasFlaggedByMe) {
          yield put(toggleFlagError('Flagged for deletion: awaiting group confirmation.'));
        } else {
          yield put(toggleFlagError('Flag removed successfully!'));
        }
      }
    } else {
      yield put(toggleFlagError('Whoopsie daisy, something went wrong ...'));
    }
  } catch (e) {
    yield put(toggleFlagError('Whoopsie daisy, something went wrong ... sorry for that!'));

    throw e;
  } finally {
    yield delay(CONFIRMATION_DELAY);
    yield put(toggleFlagError(''));
    yield put(setSelectedPost(undefined));
  }
}
