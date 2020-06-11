import { call, select, put } from 'redux-saga/effects';

import api from '../../../api';
import { selectSelectedVenue, selectSelectedPost } from '../selectors';
import { setVenuePosts, setSelectedPost, toggleFlagError } from '../actions';

export function* togglePostFlag() {
  const venue = yield select(selectSelectedVenue);
  const post = yield select(selectSelectedPost);

  try {
    const { data: response } = yield call(
      api.put,
      `venues/${venue.id}/feedback/${post.id}/${post.wasFlaggedByMe ? 'unflag' : 'flag'}`,
    );
    if (response.wasDeleted) {
      yield put(setSelectedPost(undefined));
      yield put(setVenuePosts(venue.posts.filter((p) => p.id !== post.id)));
    } else {
      const updatedPost = {
        ...post,
        wasFlaggedByMe: response.wasFlaggedByMe,
      };
      const updatedPosts = venue.posts.slice();
      const index = updatedPosts.findIndex((p) => p.id === post.id);
      updatedPosts[index] = updatedPost;
      yield put(setVenuePosts(updatedPosts));
    }
  } catch (error) {
    console.log('### could not flag:', error);
    yield put(toggleFlagError("User can't ask to remove post when he didn't vote for it"));
  }
}
