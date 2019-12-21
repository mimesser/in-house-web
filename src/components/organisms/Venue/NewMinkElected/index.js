import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectNewMinkElected } from '../../../../store/venues';
import { palette, spacing, calcRem } from '../../../../style';
import { HeaderTitle } from '../../../atoms';
import { WinkConfirmation } from '../../../molecules';
import { Modal } from '../../Modal';

const Layout = styled.div`
  padding-top: ${spacing.xxxl};
  ${HeaderTitle} {
    color: ${palette.white};
  }
  ${WinkConfirmation} {
    color: ${palette.gray};
    justify-content: left;
    position: relative;
    // TODO
    left: -${calcRem('40px')};
  }
`;

const NewMinkElected = ({ open }) => {
  return (
    <Modal open={open} canClose={false} canDismiss={false} inverse>
      <Layout>
        <HeaderTitle>
          new <br />
          #1 MINK <sup>©</sup> <br />
          elected!
        </HeaderTitle>
        <WinkConfirmation />
      </Layout>
    </Modal>
  );
};

const mapState = createStructuredSelector({
  open: selectNewMinkElected,
});

export default connect(mapState)(NewMinkElected);
