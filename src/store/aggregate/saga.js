import { all, put, takeLatest, select, take, call, delay } from 'redux-saga/effects';
import Router from 'next/router';

import api, { isUnauthorized, setAuthorization, clearAuthorization } from '../../api';

import { actionTypes, loadAggregateDataSuccess, checkBetaAuthFailure, checkBetaAuthSuccess } from './actions';
import { selectReady } from './selectors';
import { withErrorReporter } from '../error/saga';

const REDIRECT_FORMER_INSIDER_FROM = ['/'];
const REDIRECT_DELAY = 1000;

function* loadAggregateDataSaga({ meta: { isServer, pathname } }) {
  let response;
  try {
    response = yield call(api.get, 'aggregate');
  } catch (e) {
    if (isUnauthorized(e)) {
      clearAuthorization();
      response = yield call(api.get, 'aggregate');
    } else {
      throw e;
    }
  }
  const { data } = response;
  setAuthorization(data.userId);
  // TODO: currently only landing pages should be shown
  // const pathNotChanged = pathname === Router.router.pathname;
  // if (isServer && pathNotChanged && REDIRECT_FORMER_INSIDER_FROM.includes(pathname) && data.isFormerInsider) {
  //   yield delay(REDIRECT_DELAY);
  //   Router.push('/houses');
  // }
  yield put(loadAggregateDataSuccess(data));
}

export function* waitTillReady() {
  const ready = yield select(selectReady);
  if (!ready) {
    yield take(actionTypes.LOAD_AGGREGATE_DATA_SUCCESS);
  }
}

export function* checkBetaAuth({ payload: { password } }) {
  try {
    const res = yield call(api.post, `User/betaPassword`, { password });

    yield put(checkBetaAuthSuccess());
    yield performBetaAuthRedirect();
  } catch (error) {
    console.log(error);
    yield put(checkBetaAuthFailure());
  }
}

export function* performBetaAuthRedirect() {
  yield delay(REDIRECT_DELAY);
  Router.push('/houses');
}

export default function* aggregateSaga() {
  yield all([
    takeLatest(actionTypes.LOAD_AGGREGATE_DATA, withErrorReporter(loadAggregateDataSaga)),
    takeLatest(actionTypes.BETA_AUTHORIZE, withErrorReporter(checkBetaAuth)),
    takeLatest(actionTypes.BETA_AUTHORIZE_REDIRECT, withErrorReporter(performBetaAuthRedirect)),
  ]);
}
