import { all, put, takeLatest, select, take, call } from 'redux-saga/effects';

import api, { setAuthorization } from '../../api';

import { actionTypes, loadAggregateDataSuccess } from './actions';
import { selectReady } from '../selectors';
import { withErrorReporter } from '../error/saga';

function* loadAggregateDataSaga() {
   const res = yield call(api.get, 'aggregate');
   const { data } = res;
   setAuthorization(data.userId);
   yield put(loadAggregateDataSuccess(data));
}

export function* waitTillReady() {
   const ready = yield select(selectReady);
   if (!ready) {
      yield take(actionTypes.LOAD_AGGREGATE_DATA_SUCCESS);
   }
}

export default function* aggregateSaga() {
   yield all([takeLatest(actionTypes.LOAD_AGGREGATE_DATA, withErrorReporter(loadAggregateDataSaga))]);
}
