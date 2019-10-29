import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { palette, spacing } from '../../../style';
import { withHelp } from './withHelp';
import Overlay from '../Overlay';
import { Icon } from '../Icon';
import { IconButton } from '../Button';
import { setBoundariesElement } from '../Tip';

const Btn = styled(IconButton)`
  padding: ${spacing.large};
  background-color: ${palette.secondaryDark};
  color: ${palette.white};
  border-radius: 50%;
  position: fixed;
  bottom: ${spacing.xLarge};
  right: ${spacing.xLarge};
  display: flex;
  flex-shrink: 0;
  z-index: 1000;
`;

const HelpToggle = ({ showHelp, hasTips, toggleHelp, containerRef }) => {
  useEffect(() => {
    if (containerRef.current) {
      setBoundariesElement(containerRef.current);
    }
  }, [containerRef]);
  const handleClick = useCallback(() => {
    toggleHelp();
    if (!containerRef.current) {
      return;
    }
    if (!showHelp) {
      containerRef.current.scroll(0, 0);
    }
    containerRef.current.style.overflow = showHelp ? 'auto' : 'hidden';
  }, [containerRef.current, showHelp]);
  return (
    <>
      {showHelp && <Overlay onClick={toggleHelp} />}
      {hasTips && (
        <Btn onClick={handleClick}>
          <Icon icon={showHelp ? 'close' : 'question-mark'} />
        </Btn>
      )}
    </>
  );
};

export default withHelp(HelpToggle);
