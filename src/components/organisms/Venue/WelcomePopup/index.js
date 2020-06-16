import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, HelpTip, H1, Checkbox, ClearButton } from '../../../atoms';
import { spacing, appBackground, calcRem, palette } from '../../../../style';
import { Modal } from '../../Modal';

const Message = styled(H1)`
  margin-top: ${spacing.xxxl};
`;
const Heading = styled(H1)`
  position: relative;
  margin-top: 89px;
  color: white;
`;
const HelpWrap = styled.div`
  margin-top: ${spacing.xxxl};
`;

const StyledCheckbox = styled(Checkbox)`
  margin-top: 100px;
  span,
  div {
    margin: auto;
  }
`;
export const OkButton = styled(Button).attrs(() => ({
  type: 'submit',
  outline: true,
  icon: 'arrow-right',
  wide: true,
}))`
  height: 50px;
  margin-top: auto;
  margin-bottom: 100px;
  transition: all 0.3s linear;
`;
export const WelcomePopup = () => {
  const [accepted, setAccepted] = useState(false);
  const handleChange = () => setAccepted(!accepted);
  return (
    <Modal canClose={false} canDismiss={false} inverse>
      <p>IN-HOUSE</p>
      <Heading>welcome insider</Heading>
      <HelpTip tip="don’t be a jerk">
        <HelpWrap>
          <p>
            after 10% of the insiders have rated this biz/org we will notify & invite your ownership to hear your team’s
            consensus
          </p>

          <HelpWrap>
            <StyledCheckbox onChange={handleChange} checked={accepted} classname="welcomeCheckbox">
              don't show me this again
            </StyledCheckbox>
          </HelpWrap>
        </HelpWrap>
      </HelpTip>

      <OkButton>ok</OkButton>
    </Modal>
  );
};
