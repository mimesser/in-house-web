import { call, select, put, delay, fork } from 'redux-saga/effects';

import api from '../../../api';
import { selectSelectedMink, selectSelectedVenue } from '../selectors';
import { showVoteMinkConfirmation, setSelectedMink } from '../actions';
import { reloadVenueMinks } from './loadVenueMinks';
import { reloadInsiderVenueIds } from './reloadInsiderVenueIds';

const CONFIRMATION_INTERVAL = 1500;

export function* voteMink({ payload: { vote } }) {
  const venue = yield select(selectSelectedVenue);
  const mink = yield select(selectSelectedMink);

  const { data } = yield call(api.post, `venues/${venue.id}/mink/${mink.id}/rate`, { vote });

  try {
    yield put(showVoteMinkConfirmation(data));
    // order and top mink can change
    yield fork(reloadVenueMinks, venue.id);
    yield reloadInsiderVenueIds();
    yield delay(CONFIRMATION_INTERVAL);
  } finally {
    yield put(setSelectedMink(undefined));
    yield put(showVoteMinkConfirmation(undefined));
  }
}
