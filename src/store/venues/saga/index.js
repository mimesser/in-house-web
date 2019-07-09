import { all, takeLatest, takeLeading } from 'redux-saga/effects';

import { actionTypes } from '../actions';
import { actionTypes as aggregateActions } from '../../aggregate';
import { withErrorReporter } from '../../error/saga';
import { answerTopMink } from './answerTopMink';
import { initVenuesPage } from './initVenuesPage';
import { setSelectedVenue } from './setSelectedVenue';
import { loadVenueMinks } from './loadVenueMinks';
import { dismissChallengeForm } from './dismissChallengeForm';
import { createMink } from './createMink';
import { voteMink } from './voteMink';
import { watchMinkAnswerAttempts } from './watchMinkAnswerAttempts';
import { rateTag } from './rateTag';
import { loadVenuePosts } from './loadVenuePosts';
import { loadVenueRateTags } from './loadVenueRateTags';
import { createPost } from './createPost';
import { votePost } from './votePost';
import { privateShare } from './privateShare';
import { acceptTerms } from './acceptTerms';

export default function* venuesSaga() {
   yield all([
      takeLatest(actionTypes.INIT_VENUES_PAGE, withErrorReporter(initVenuesPage)),
      takeLatest(actionTypes.SET_SELECTED_VENUE, withErrorReporter(setSelectedVenue)),
      takeLeading(actionTypes.ANSWER_TOP_MINK, withErrorReporter(answerTopMink)),
      takeLatest(actionTypes.LOAD_MINKS, withErrorReporter(loadVenueMinks)),
      takeLatest(actionTypes.DISMISS_CHALLENGE_FORM, withErrorReporter(dismissChallengeForm)),
      takeLeading(actionTypes.CREATE_MINK, withErrorReporter(createMink)),
      takeLatest(actionTypes.SET_SELECTED_MINK, withErrorReporter(watchMinkAnswerAttempts)),
      takeLeading(actionTypes.VOTE_MINK, withErrorReporter(voteMink)),
      takeLeading(actionTypes.RATE_TAG, withErrorReporter(rateTag)),
      takeLatest(actionTypes.LOAD_POSTS, withErrorReporter(loadVenuePosts)),
      takeLatest(actionTypes.LOAD_RATES, withErrorReporter(loadVenueRateTags)),
      takeLeading(actionTypes.CREATE_POST, withErrorReporter(createPost)),
      takeLeading(actionTypes.VOTE_POST, withErrorReporter(votePost)),
      takeLeading(actionTypes.PRIVATE_SHARE, withErrorReporter(privateShare)),
      takeLeading(aggregateActions.ACCEPT_TERMS, withErrorReporter(acceptTerms)),
   ]);
}
