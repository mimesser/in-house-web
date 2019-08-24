import { call } from 'redux-saga/effects';
import Router from 'next/router';

import api, { isForbidden } from '../../../api';
import { reloadVenuePosts } from './loadVenuePosts';
import { handleForbiddenResponse } from './handleForbiddenResponse';

export function* createPost({ payload: { id, title, message: text } }) {
  try {
    yield call(api.post, `/venues/${id}/feedback`, { title, text });

    // TODO: optimize and insert into existing list?
    // order can change
    yield reloadVenuePosts(id);

    Router.push(`/houses?id=${id}&tab=post`, `/houses/${id}/post`, { shallow: true });
  } catch (e) {
    if (isForbidden(e)) {
      yield handleForbiddenResponse(id);
      return;
    }
    throw e;
  }
}
