import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectShowHelp, toggleHelp } from '../../../store/help';

const mapState = createStructuredSelector({
  showHelp: selectShowHelp,
});

const mapDispatch = {
  toggleHelp,
};

export const withHelp = component =>
  connect(
    mapState,
    mapDispatch,
  )(component);
