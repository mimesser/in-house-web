export const actionTypes = {
   RATE_DEMO_TAG: 'RATE_DEMO_TAG',
   CREATE_DEMO_MINK: 'CREATE_DEMO_MINK',
   CREATE_DEMO_POST: 'CREATE_DEMO_POST',
   VOTE_DEMO_POST: 'VOTE_DEMO_POST',
   VOTE_DEMO_MINK: 'VOTE_DEMO_MINK',
   TURN_DEMO_ON: 'TURN_DEMO_ON',
   TURN_DEMO_OFF: 'TURN_DEMO_OFF',
   SET_DEMO_DATA: 'SET_DEMO_DATA',
   SET_DEMO_MOCK_ADAPTER: 'SET_DEMO_MOCK_ADAPTER',
};

export const createDemoMink = mink => ({
   type: actionTypes.CREATE_DEMO_MINK,
   payload: mink,
});

export const createDemoPost = post => {
   return {
      type: actionTypes.CREATE_DEMO_POST,
      payload: post,
   };
};

export const rateDemoTag = tag => {
   return {
      type: actionTypes.RATE_DEMO_TAG,
      payload: tag,
   };
};

export const voteDemoPost = post => {
   return {
      type: actionTypes.VOTE_DEMO_POST,
      payload: post,
   };
};

export const voteDemoMink = mink => {
   return {
      type: actionTypes.VOTE_DEMO_MINK,
      payload: mink,
   };
};

export const turnDemoOn = () => ({ type: actionTypes.TURN_DEMO_ON });

export const turnDemoOff = () => ({ type: actionTypes.TURN_DEMO_OFF });

export const setDemoData = data => ({
   type: actionTypes.SET_DEMO_DATA,
   payload: data,
});

export const setDemoMockAdapter = mockAdapter => ({
   type: actionTypes.SET_DEMO_MOCK_ADAPTER,
   payload: mockAdapter,
});
