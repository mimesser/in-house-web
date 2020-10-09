import { all, delay, takeLatest, put, call } from 'redux-saga/effects';
import Router from 'next/router';

import api from '../../api';
import { isEmailValid } from '../../utils/validation';
import { setFeedbackError, setFeedbackLoading, setFeedbackSuccess, actionTypes, clearFeedback } from './actions';

const CONFIRMATION_DELAY = 2000;

export function* postFeedback({ payload: { subject, message, email, redirectLink } }) {
  const valid = email ? isEmailValid(email) : true;
  if (!valid) {
    yield put(setFeedbackError('Please provide a valid email'));
    return;
  }

  try {
    yield put(setFeedbackLoading());
    yield put(setFeedbackError(`Sending ${message} [${subject}] to: ${email}`));
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
    } else {
      Router.back();
    }
  } catch (e) {
    yield put(setFeedbackError(`Warning: Error while trying to sending ${message} [${subject}] to: ${email}: ${e}`));
  }
}

export default function* feedbackSaga() {
  yield all([takeLatest(actionTypes.POST_FEEDBACK, postFeedback)]);
}
