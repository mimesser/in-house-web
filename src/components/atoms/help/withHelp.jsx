import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectShowHelp, selectHasTips, toggleHelp } from '../../../store/help';

const mapState = createStructuredSelector({
  showHelp: selectShowHelp,
  hasTips: selectHasTips,
});

const mapDispatch = {
  toggleHelp,
};

export const withHelp = (component) => connect(mapState, mapDispatch)(component);
