import { localStorageAccessor } from '../../../utils/storage';

const ANSWER_STORAGE_KEY = 'answerRecord';
const CLEAR_ATTEMPT_DELAY = 60 * 1000; // 1min
const CLEAR_BLOCK_DELAY = 24 * 60 * 60 * 1000; // 24 hrs

const getEmptyRecord = () => ({ attempt: 0, time: Date.now() });
const resetRecord = () => {
   const newRecord = getEmptyRecord();
   setRecord(newRecord);
   return newRecord;
};

export const getRecord = () => {
   const record = localStorageAccessor.get(ANSWER_STORAGE_KEY, getEmptyRecord());
   if (record.blocked) {
      if (Date.now() - CLEAR_BLOCK_DELAY > record.time) {
         return resetRecord();
      }
      return record;
   }

   if (Date.now() - CLEAR_ATTEMPT_DELAY > record.time) {
      return resetRecord();
   }
   return record;
};

export const clearRecord = () => localStorageAccessor.remove(ANSWER_STORAGE_KEY);

export const setRecord = record => localStorageAccessor.set(ANSWER_STORAGE_KEY, record);
