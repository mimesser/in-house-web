import { call, put } from 'redux-saga/effects';

import api from '../../../api';
import { setSources, setSourcesLoading } from '../actions';

/**
 * @description
 * This Redux Saga function helps to reload sources.
 * @returns {array} sources
 */

export function* reloadSources() {
  // TODO: handle pagination, store total count
  const {
    data: { data: sources },
  } = yield call(api.get, `/memberships/sources`);

  yield put(setSources(sources));
S
  return sources;
}

/**
 * @description
 * This Redux Saga function helps to load Sourcess.
 */

export function* loadSources() {
  yield put(setSourcesLoading(true));
  yield reloadSources();
  yield put(setSourcesLoading(false));
}
