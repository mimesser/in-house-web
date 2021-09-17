import { put } from 'redux-saga/effects';
import * as Sentry from '@sentry/nextjs';
import { failure } from './actions';

export const withErrorReporter = (worker) =>
  function* errorReporterWrapper(...args) {
    try {
      return yield worker(...args);
    } catch (e) {
      Sentry.captureException(e);
      yield put(failure(e));
      return undefined;
    }
  };
