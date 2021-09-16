import { call, put, select } from 'redux-saga/effects';

import api from '../../../api';
import { setVenueMinks, setVenueLoading } from '../actions';
import { selectSelectedVenue } from '../selectors';

export function* reloadVenueMinks(id) {
  // TODO: handle pagination, store total count
  const {
    data: { minks },
  } = yield call(api.get, `/venues/${id}/minks?orderBy=voteRating`);
  yield put(setVenueMinks(minks));

  return minks;
}

export function* loadVenueMinks() {
  const selectedVenue = yield select(selectSelectedVenue);

  yield put(setVenueLoading(true));
  yield reloadVenueMinks(selectedVenue.id);
  yield put(setVenueLoading(false));
}
