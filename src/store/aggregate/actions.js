export const actionTypes = {
   LOAD_AGGREGATE_DATA: 'LOAD_AGGREGATE_DATA',
   LOAD_AGGREGATE_DATA_SUCCESS: 'LOAD_AGGREGATE_DATA_SUCCESS',
};

export function loadAggregateData() {
   return { type: actionTypes.LOAD_AGGREGATE_DATA };
}

export function loadAggregateDataSuccess(data) {
   return {
      type: actionTypes.LOAD_AGGREGATE_DATA_SUCCESS,
      data,
   };
}
