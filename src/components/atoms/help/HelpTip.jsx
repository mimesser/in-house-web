import React from 'react';
import styled from 'styled-components';

import { spacing } from '../../../style';
import { withHelp } from './withHelp';
import { Tip } from '../Tip';
import { useRegisterTip } from './useRegisterTip';

// TODO
const width = ({ theme: { desktop } }) => -60 + (desktop ? 400 : window.document.body.offsetWidth);

const Message = styled.div`
  width: ${width}px;
  text-align: center;
  padding: ${spacing.xl};
  > div:not(:first-child) {
    margin-top: ${spacing.xl};
  }
`;

const HelpTip = ({ tip, toggleHelp, showHelp, children, placement = 'bottom' }) => {
  useRegisterTip();

  if (!showHelp) {
    return children;
  }

  const triggerElementProps = {
    style: { zIndex: 1000, position: 'relative' },
    onClick: toggleHelp,
  };

  return (
    <Tip
      triggerElementProps={triggerElementProps}
      tooltip={<Message>{tip}</Message>}
      placement={placement}
      tooltipShown
    >
      {children}
    </Tip>
  );
};

export default withHelp(HelpTip);
