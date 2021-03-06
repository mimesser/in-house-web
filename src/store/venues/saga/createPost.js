import { call } from 'redux-saga/effects';
import Router from 'next/router';

import api, { isForbidden } from '../../../api';
import { reloadVenuePosts } from './loadVenuePosts';
import { handleForbiddenResponse } from './handleForbiddenResponse';
import { upvotePost } from '..';
import { formatMovementURL } from '../../../utils/format';

/**
 * @description
 * This Redux Saga function helps to create new post.
 * @param {string} id  is the id of Venue.
 * @param {string} name  is the name of Venue.
 * @param {string} title  is the title of the new post.
 * @param {file} image  is the image of the new post.
 * @param {string} message  is the message of the new post.
 * @param {string} venueType  is the type of the venue.
 * @param {boolean} lite  is the boolean value of Venue.
 *
 * @returns Nothing
 */

export function* createPost({
  payload: { id, name, title, image, message: text, venueType = 'houses', lite },
}) {
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

    const { data: post } = yield call(api.post, `/venues/${id}/feedback`, {
      title,
      text,
      imageUrl,
    });
    try {
      yield call(api.post, `venues/${id}/feedback/${post.id}/vote`, { vote: 1 });
    } catch (e) {
      console.log(e);
    }
    // TODO: optimize and insert into existing list?
    // order can change
    yield reloadVenuePosts(id);
    const movementName = yield formatMovementURL(name);

    Router.push(
      `/${venueType}?id=${id}&tab=post&time={Date.now()}`,
      `/${lite ? 'movement' : venueType}/${lite ? movementName : id}/post`,
      { shallow: true },
    );
  } catch (e) {
    if (isForbidden(e)) {
      yield handleForbiddenResponse(id);
      return;
    }
    throw e;
  }
}
