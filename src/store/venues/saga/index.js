import { all, takeLatest, takeLeading } from 'redux-saga/effects';

import { actionTypes } from '../actions';
import { withErrorReporter } from '../../error/saga';
import { answerMink } from './answerMink';
import { loadVenues } from './loadVenues';
import { setSelectedVenue } from './setSelectedVenue';

export default function* venuesSaga() {
   yield all([
      takeLatest(actionTypes.LOAD_VENUES_DATA, withErrorReporter(loadVenues)),
      takeLatest(actionTypes.SET_SELECTED_VENUE, withErrorReporter(setSelectedVenue)),
      takeLeading(actionTypes.ANSWER_MINK, withErrorReporter(answerMink)),
   ]);
}
