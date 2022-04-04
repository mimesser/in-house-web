import { all, delay, takeLatest, takeLeading, put, call } from 'redux-saga/effects';
import Router from 'next/router';
import { withErrorReporter } from '../error/saga';
import api, { jsonToFormData } from '../../api';
import { isEmailValid } from '../../utils';
import {
  setFeedbackError,
  setFeedbackLoading,
  setFeedbackSuccess,
  actionTypes,
  clearFeedback,
} from './actions';
import { loadInterests } from './saga/loadInterests';
import { loadSources } from './saga/loadSources';

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
    if (callback) {
      callback();
    }
  } catch (e) {
    yield put(
      setFeedbackError(
        `Warning: Error while trying to sending ${message} [${subject}] to: ${email}: ${e}`,
      ),
    );
  }
}

export function* postJoinUs({
  payload: { name, email, comment, file, heardAbout, interest, redirectLink },
}) {
  try {
    const interestIds = interest ? Object.keys(interest) : undefined;
    console.log(interestIds);

    const data = {
      Name: name,
      Email: email,
      Summary: comment,
      Document: file,
      HearAboutUsId: heardAbout.value, // "b7f6802c-54da-4401-5efb-08da0678883f",
      MembershipType: 0,
      InterestIds: interestIds,
    };

    console.log("data", data);
    const formData = jsonToFormData(data);

    console.log("formData", formData);

    yield call(api.post, 'memberships', formData);
    yield delay(CONFIRMATION_DELAY);
    if (redirectLink) {
      Router.push(redirectLink);
    }
    if (callback) {
      callback();
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* feedbackSaga() {
  yield all([
    takeLatest(actionTypes.POST_FEEDBACK, postFeedback),
    takeLatest(actionTypes.POST_JOIN_US, postJoinUs),
    takeLeading(actionTypes.LOAD_INTERESTS, withErrorReporter(loadInterests)),
    takeLeading(actionTypes.LOAD_SOURCES, withErrorReporter(loadSources)),
  ]);
}
