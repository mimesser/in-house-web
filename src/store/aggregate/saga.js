import { all, put, takeLatest } from 'redux-saga/effects';

import api, { setAuthorization } from '../../api';

import { actionTypes, failure, loadAggregateDataSuccess } from '../actions';

function* loadAggregateDataSaga() {
   try {
      const res = yield api.get('aggregate', { method: 'GET' });
      const { data } = res;
      yield put(loadAggregateDataSuccess(data));
      setAuthorization(data.userId);
   } catch (err) {
      yield put(failure(err));
   }
}

export default function* aggregateSaga() {
   yield all([takeLatest(actionTypes.LOAD_AGGREGATE_DATA, loadAggregateDataSaga)]);
}
