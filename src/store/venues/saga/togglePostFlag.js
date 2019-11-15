import { call, select, put } from 'redux-saga/effects';

import api from '../../../api';
import { selectSelectedVenue, selectSelectedPost } from '../selectors';
import { setVenuePosts, setSelectedPost } from '../actions';

export function* togglePostFlag() {
  const venue = yield select(selectSelectedVenue);
  const post = yield select(selectSelectedPost);

  const { data: response } = yield call(
    api.put,
    `venues/${venue.id}/feedback/${post.id}/${post.wasFlaggedByMe ? 'unflag' : 'flag'}`,
  );

  if (response.wasDeleted) {
    yield put(setSelectedPost(undefined));
    yield put(setVenuePosts(venue.posts.filter(p => p.id !== post.id)));
  } else {
    const updatedPost = {
      ...post,
      wasFlaggedByMe: response.wasFlaggedByMe,
    };
    const updatedPosts = venue.posts.slice();
    const index = updatedPosts.findIndex(p => p.id === post.id);
    updatedPosts[index] = updatedPost;
    yield put(setVenuePosts(updatedPosts));
  }
}
