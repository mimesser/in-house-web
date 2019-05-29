import { all, put, takeLatest, select, take } from 'redux-saga/effects';

import api, { setAuthorization } from '../../api';

import { actionTypes, failure, loadAggregateDataSuccess } from '../actions';
import { selectReady } from '../selectors';

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

export function* waitTillReady() {
   const ready = yield select(selectReady);
   if (!ready) {
      yield take(actionTypes.LOAD_AGGREGATE_DATA_SUCCESS);
   }
}

export default function* aggregateSaga() {
   yield all([takeLatest(actionTypes.LOAD_AGGREGATE_DATA, loadAggregateDataSaga)]);
}
