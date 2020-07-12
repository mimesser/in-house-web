import { call } from 'redux-saga/effects';
import Router from 'next/router';

import api, { isForbidden } from '../../../api';
import { reloadVenuePosts } from './loadVenuePosts';
import { handleForbiddenResponse } from './handleForbiddenResponse';

export function* createPost({ payload: { id, title, image, message: text, venueType = 'houses' } }) {
  try {
    let imageUrl;
    if (image) {
      const formData = new FormData();
      formData.append('file', image, Date.now() + image.name);
      const { data: response } = yield call(api.post, `/venues/${id}/feedback/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      imageUrl = response.url;
    }

    yield call(api.post, `/venues/${id}/feedback`, { title, text, imageUrl });

    // TODO: optimize and insert into existing list?
    // order can change
    yield reloadVenuePosts(id);

    Router.push(`/${venueType}?id=${id}&tab=post`, `/${venueType}/${id}/post`, { shallow: true });
  } catch (e) {
    if (isForbidden(e)) {
      yield handleForbiddenResponse(id);
      return;
    }
    throw e;
  }
}
