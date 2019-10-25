import { createSelector } from 'reselect';

const TOGGLE_HELP = 'TOGGLE_HELP';

export const toggleHelp = () => ({ type: TOGGLE_HELP });

const initialState = {
  showHelp: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_HELP:
      return { ...state, showHelp: !state.showHelp };
    default:
      return state;
  }
};

const selectHelp = state => state.help;

export const selectShowHelp = createSelector(
  selectHelp,
  ({ showHelp }) => showHelp,
);
