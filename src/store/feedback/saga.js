import { all, delay, takeLatest, put, call } from 'redux-saga/effects';
import Router from 'next/router';

import api from '../../api';
import { isEmailValid } from '../../utils';
import {
  setFeedbackError,
  setFeedbackLoading,
  setFeedbackSuccess,
  actionTypes,
  clearFeedback,
} from './actions';

const CONFIRMATION_DELAY = 2000;

export function* postFeedback({ payload: { subject, message, email, redirectLink, callback } }) {
  const valid = email ? isEmailValid(email) : true;
  if (!valid) {
    yield put(setFeedbackError('Please provide a valid email'));
    return;
  }

  try {
    yield put(setFeedbackLoading());
    yield call(api.post, 'email/contactus', {
      subject,
      message: message || 'null',
      useremail: email,
    });
    yield put(setFeedbackSuccess());
    yield delay(CONFIRMATION_DELAY);
    yield put(clearFeedback());
    if (redirectLink) {
      Router.push(redirectLink);
    }
    // else {
    //   Router.back();
    // }
    if(callback) {
      callback()
    }
  } catch (e) {
    yield put(
      setFeedbackError(
        `Warning: Error while trying to sending ${message} [${subject}] to: ${email}: ${e}`,
      ),
    );
  }
}
export function* postJoinUs({ payload: { name, email, comment, file, heardAbout, interest, redirectLink } }) {
  try {    
    const { interests } = yield call(api.get, 'memberships/interests');
    const { sources } = yield call(api.get, 'memberships/sources');

    yield call(api.post, 'memberships', {
      name: name,
      email: email,
      summary: comment,
      document: file,
      hearAboutUsId: "b7f6802c-54da-4401-5efb-08da0678883f",
      membershipType: 0,
      interestIds:[

      ]
    });
    yield delay(CONFIRMATION_DELAY);
    if (redirectLink) {
      Router.push(redirectLink);
    }
    if(callback) {
      callback()
    }
  } catch (e) {
    
  }
}

export default function* feedbackSaga() {
  yield all([takeLatest(actionTypes.POST_FEEDBACK, postFeedback), takeLatest(actionTypes.POST_JOIN_US, postJoinUs)]);
}
