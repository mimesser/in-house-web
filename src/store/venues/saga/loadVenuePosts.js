import { call, put, select } from 'redux-saga/effects';

import api, { isForbidden } from '../../../api';
import { setVenuePosts } from '../actions';
import { selectIsActiveInsider, selectSelectedVenue } from '../selectors';
import { handleForbiddenResponse } from './handleForbiddenResponse';

export function* reloadVenuePosts(id) {
  try {
    // TODO: paging?
    const {
      data: { feedback },
    } = yield call(api.get, `/venues/${id}/feedback?OrderBy=VoteCount`);
    const posts = feedback || [];
    const {
      venueInfo: { imageUrl },
    } = yield select(selectSelectedVenue);

    yield put(setVenuePosts(posts));

    return posts;
  } catch (e) {
    if (isForbidden(e)) {
      yield handleForbiddenResponse(id);
    }
    throw e;
  }
}

export function* loadVenuePosts() {
  const { id, posts: loaded } = yield select(selectSelectedVenue);
  const isActiveInsider = yield select(selectIsActiveInsider);
  if (loaded || !isActiveInsider) {
    return;
  }

  yield reloadVenuePosts(id);
}
