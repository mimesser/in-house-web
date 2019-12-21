import React from 'react';
import styled from 'styled-components';

import { withHelp, useRegisterTip } from '../../atoms/help';
import { palette, cover, spacing, calcRem } from '../../../style';

const Wrapper = styled.div`
  ${cover()};
  padding: ${calcRem('160px')} ${spacing.xl} 0;
  color: ${palette.white};
  // TODO
  z-index: 1000;
`;
const Main = styled.div``;
const Secondary = styled.div`
  color: ${palette.lightGray};
  margin-bottom: ${spacing.xxxl};
`;

const LandingHelp = ({ showHelp, toggleHelp }) => {
  useRegisterTip();

  return (
    showHelp && (
      <Wrapper onClick={toggleHelp}>
        <Main>verify your team</Main>
        <Secondary>with team security questions, not emails</Secondary>

        <Main>share anonymously</Main>
        <Secondary>to get your team talking easily & safely</Secondary>

        <Main>speak your mind</Main>
        <Secondary>and see your team’s anonymous consensus</Secondary>
      </Wrapper>
    )
  );
};

export default withHelp(LandingHelp);
