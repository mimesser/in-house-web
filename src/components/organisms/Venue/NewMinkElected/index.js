import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectNewMinkElected } from '../../../../store/venues';
import { palette, spacing, calcRem } from '../../../../style';
import { Title } from '../../../atoms';
import { WinkConfirmation } from '../../../molecules';
import { Modal } from '../../Modal';

const Layout = styled.div`
  padding-top: ${spacing.xxxLarge};
  ${Title} {
    color: ${palette.white};
  }
  ${WinkConfirmation} {
    color: ${palette.secondaryDark};
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
        <Title>
          new <br />
          #1 MINK <sup>©</sup> <br />
          elected!
        </Title>
        <WinkConfirmation />
      </Layout>
    </Modal>
  );
};

const mapState = createStructuredSelector({
  open: selectNewMinkElected,
});

export default connect(mapState)(NewMinkElected);
