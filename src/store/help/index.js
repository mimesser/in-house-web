import { createSelector } from 'reselect';

const TOGGLE_HELP = 'TOGGLE_HELP';
const REGISTER_TIP = 'REGISTER_TIP';
const UNREGISTER_TIP = 'UNREGISTER_TIP';

export const toggleHelp = () => ({ type: TOGGLE_HELP });
export const registerTip = () => ({ type: REGISTER_TIP });
export const unregisterTip = () => ({ type: UNREGISTER_TIP });

const initialState = {
  showHelp: false,
  tipCounter: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_HELP:
      return { ...state, showHelp: !state.showHelp };
    case REGISTER_TIP:
      return { ...state, tipCounter: state.tipCounter + 1 };
    case UNREGISTER_TIP:
      return { ...state, tipCounter: state.tipCounter - 1 };
    default:
      return state;
  }
};

const selectHelp = state => state.help;

export const selectShowHelp = createSelector(
  selectHelp,
  ({ showHelp }) => showHelp,
);

export const selectHasTips = createSelector(
  selectHelp,
  ({ tipCounter }) => tipCounter > 0,
);
