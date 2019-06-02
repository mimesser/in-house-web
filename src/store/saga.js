import { all, fork } from 'redux-saga/effects';
import es6promise from 'es6-promise';

import aggregateSaga from './aggregate/saga';
import venuesSaga from './venues/saga';

es6promise.polyfill();

function* rootSaga() {
   yield all([fork(aggregateSaga), fork(venuesSaga)]);
}

export default rootSaga;
