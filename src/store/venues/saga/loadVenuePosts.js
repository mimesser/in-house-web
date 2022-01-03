import { call, put, select } from 'redux-saga/effects';

import api, { isForbidden } from '../../../api';
import { setVenuePosts, setVenueLoading } from '../actions';
import { selectIsActiveInsider, selectSelectedVenue } from '../selectors';
import { handleForbiddenResponse } from './handleForbiddenResponse';

/**
 * @description
 * This Redux Saga function helps to reload venue posts.
 * @param {string} id is the id of the Venue.
 */

export function* reloadVenuePosts(id) {
  try {
    // TODO: paging?
    const {
      data: { feedback },
    } = yield call(api.get, `/venues/${id}/feedback?OrderBy=VoteCount`);

    yield put(setVenuePosts(feedback || []));
  } catch (e) {
    if (isForbidden(e)) {
      yield handleForbiddenResponse(id);
    }

    throw e;
  }
}

/**
 * @description
 * This Redux Saga function helps to load venue posts.
 */

export function* loadVenuePosts() {
  const selectedVenue = yield select(selectSelectedVenue);
  const isActiveInsider = yield select(selectIsActiveInsider);

  if (isActiveInsider) {
    yield put(setVenueLoading(true));
    yield reloadVenuePosts(selectedVenue.id);
    yield put(setVenueLoading(false));
  }
}
