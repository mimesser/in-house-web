import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectNewMinkElected } from '../../../../store/venues';
import { spacing } from '../../../../style';
import { WinkConfirmation } from '../../../molecules';
import { Modal } from '../../Modal';
import { H1 } from '../../../atoms';

const Message = styled(H1)`
  margin-top: ${spacing.xxxl};
`;

const NewMinkElected = ({ open }) => {
  return open ? (
    <Modal canClose={false} canDismiss={false} inverse>
      <Message>new #1 MINK elected!</Message>
      <WinkConfirmation />
    </Modal>
  ) : null;
};

const mapState = createStructuredSelector({
  open: selectNewMinkElected,
});

export default connect(mapState)(NewMinkElected);
