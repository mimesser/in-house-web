import { put } from 'redux-saga/effects';

import { failure } from './actions';

export const withErrorReporter = worker =>
   function* errorReporterWrapper(...args) {
      try {
         return yield worker(...args);
      } catch (e) {
         // TODO: report
         yield put(failure(e));
         return undefined;
      }
   };
