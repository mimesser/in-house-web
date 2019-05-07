export const actionTypes = {
   LOAD_VENUES_DATA: 'LOAD_VENUES_DATA',
   LOAD_VENUES_DATA_SUCCESS: 'LOAD_VENUES_DATA_SUCCESS',
};

export function loadVenuesData() {
   return { type: actionTypes.LOAD_VENUES_DATA };
}

export function loadVenuesDataSuccess(data) {
   return {
      type: actionTypes.LOAD_VENUES_DATA_SUCCESS,
      data,
   };
}
