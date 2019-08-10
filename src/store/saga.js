import { all, fork } from 'redux-saga/effects';

import aggregateSaga from './aggregate/saga';
import feedbackSaga from './feedback/saga';
import venuesSaga from './venues/saga';

function* rootSaga() {
   yield all([fork(aggregateSaga), fork(venuesSaga), fork(feedbackSaga)]);
}

export default rootSaga;
