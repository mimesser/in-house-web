import { select, put } from 'redux-saga/effects';
import Router from 'next/router';

import { selectSelectedVenue } from '../selectors';
import { setChallengeFormData } from '../actions';
import { selectInDemo } from '../../demo';
import { DEMO_VENUES_ID } from '../../demo/data';

export function* dismissPollChallengeForm({ payload: { showContactForm } }) {
  const { id } = yield select(selectSelectedVenue);
  const inDemo = yield select(selectInDemo);
  if (showContactForm) {
    Router.push(`/feedback?subjectIndex=2&redirect=/polls`);
  } else {
    const redirectUrl = inDemo ? `/polls/${DEMO_VENUES_ID}` : '/polls';
    Router.push(redirectUrl, redirectUrl, { shallow: true });
  }
  yield put(setChallengeFormData(undefined));
}
