import { all, takeLatest, takeLeading } from 'redux-saga/effects';

import { actionTypes } from '../actions';
import { withErrorReporter } from '../../error/saga';
import { answerMink } from './answerMink';
import { initVenuesPage } from './initVenuesPage';
import { setSelectedVenue } from './setSelectedVenue';
import { loadVenueMinks } from './loadVenueMinks';

export default function* venuesSaga() {
   yield all([
      takeLatest(actionTypes.INIT_VENUES_PAGE, withErrorReporter(initVenuesPage)),
      takeLatest(actionTypes.SET_SELECTED_VENUE, withErrorReporter(setSelectedVenue)),
      takeLeading(actionTypes.ANSWER_MINK, withErrorReporter(answerMink)),
      takeLatest(actionTypes.LOAD_MINKS, withErrorReporter(loadVenueMinks)),
   ]);
}
