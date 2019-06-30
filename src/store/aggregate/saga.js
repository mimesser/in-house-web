import { all, put, takeLatest, select, take, call, delay } from 'redux-saga/effects';
import Router from 'next/router';

import api, { setAuthorization } from '../../api';

import { actionTypes, loadAggregateDataSuccess } from './actions';
import { selectReady } from './selectors';
import { withErrorReporter } from '../error/saga';

const REDIRECT_FORMER_INSIDER_FROM = ['/', '/how-it-works'];
const REDIRECT_DELAY = 600;

function* loadAggregateDataSaga({ meta: { isServer, pathname } }) {
   const res = yield call(api.get, 'aggregate');
   const { data } = res;
   setAuthorization(data.userId);
   const pathNotChanged = pathname === Router.router.pathname;
   if (isServer && pathNotChanged && REDIRECT_FORMER_INSIDER_FROM.includes(pathname) && data.isFormerInsider) {
      yield delay(REDIRECT_DELAY);
      Router.push('/houses');
   }
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
