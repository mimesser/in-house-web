import { put } from 'redux-saga/effects';

import { loadAggregateData } from '../../aggregate';

export function* reloadInsiderVenueIds() {
  yield put(loadAggregateData());
}
