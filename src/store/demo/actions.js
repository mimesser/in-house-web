export const actionTypes = {
  TURN_DEMO_ON: 'TURN_DEMO_ON',
  TURN_DEMO_OFF: 'TURN_DEMO_OFF',
};

export const turnDemoOn = realAggregate => ({ type: actionTypes.TURN_DEMO_ON, payload: realAggregate });

export const turnDemoOff = () => ({ type: actionTypes.TURN_DEMO_OFF });
