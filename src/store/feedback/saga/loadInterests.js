import { call, put } from 'redux-saga/effects';

import api from '../../../api';
import { setInterests, setInterestsLoading } from '../actions';

/**
 * @description
 * This Redux Saga function helps to reload interests.
 * @returns {array} Interests
 */

export function* reloadInterests() {
  // TODO: handle pagination, store total count
  const {
    data: { data: interests },
  } = yield call(api.get, `/memberships/interests`);

  yield put(setInterests(interests));

  return interests;
}

/**
 * @description
 * This Redux Saga function helps to load interests.
 */

export function* loadInterests() {
  yield put(setInterestsLoading(true));
  yield reloadInterests();
  yield put(setInterestsLoading(false));
}
