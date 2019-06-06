export const actionTypes = {
   LOAD_AGGREGATE_DATA: 'LOAD_AGGREGATE_DATA',
   LOAD_AGGREGATE_DATA_SUCCESS: 'LOAD_AGGREGATE_DATA_SUCCESS',
   ADD_INSIDER_VENUE: 'ADD_INSIDER_VENUE',
};

export function loadAggregateData(isServer, pathname) {
   return { type: actionTypes.LOAD_AGGREGATE_DATA, meta: { isServer, pathname } };
}

export function loadAggregateDataSuccess(data) {
   return {
      type: actionTypes.LOAD_AGGREGATE_DATA_SUCCESS,
      data,
   };
}

export const addInsiderVenue = id => ({ type: actionTypes.ADD_INSIDER_VENUE, payload: { id } });
