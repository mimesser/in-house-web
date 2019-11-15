import { call, select, put, all } from 'redux-saga/effects';

import api from '../../../api';
import { selectSelectedVenue, selectSelectedMink, selectSelectedVenueTopMinkId } from '../selectors';
import { setVenueMinks, setSelectedMink, setNewMinkElected } from '../actions';
import { reloadInsiderVenueIds } from './reloadInsiderVenueIds';
import { reloadVenueMinks } from './loadVenueMinks';

export function* toggleMinkFlag() {
  const venue = yield select(selectSelectedVenue);
  const mink = yield select(selectSelectedMink);

  const { data: response } = yield call(
    api.put,
    `venues/${venue.id}/minks/${mink.id}/${mink.wasFlaggedByMe ? 'unflag' : 'flag'}`,
  );

  if (response.wasDeleted) {
    yield put(setSelectedMink(undefined));
    yield put(setVenueMinks(venue.minks.filter(p => p.id !== mink.id)));

    const topMinkId = yield select(selectSelectedVenueTopMinkId);
    if (topMinkId === mink.id) {
      yield put(setNewMinkElected(true));
      yield all([reloadInsiderVenueIds(), reloadVenueMinks(venue.id)]);
      yield put(setNewMinkElected(false));
    }
  } else {
    const updatedMink = {
      ...mink,
      wasFlaggedByMe: response.wasFlaggedByMe,
    };
    const updatedMinks = venue.minks.slice();
    const index = updatedMinks.findIndex(p => p.id === mink.id);
    updatedMinks[index] = updatedMink;
    yield put(setVenueMinks(updatedMinks));
  }
}
