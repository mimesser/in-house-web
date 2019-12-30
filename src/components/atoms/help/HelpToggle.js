import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { palette, spacing } from '../../../style';
import { withHelp } from './withHelp';
import Overlay from '../Overlay';
import { Icon } from '../Icon';
import { ClearButton } from '../Button';
import { setBoundariesElement } from '../Tip';

const Btn = styled(ClearButton)`
  padding: ${spacing.lg};
  background-color: ${palette.gray};
  color: ${palette.offWhite};
  border-radius: 50%;
  &&& {
    position: fixed;
  }
  bottom: ${spacing.xl};
  right: ${spacing.xl};
  display: flex;
  flex-shrink: 0;
  // TODO: should be relative to modal z-index
  z-index: 1000;
  opacity: 0.35;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const HelpOverlay = styled(Overlay)`
  transition: background-color 1.5s;
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
      {showHelp && <HelpOverlay onClick={toggleHelp} />}
      {hasTips && (
        <Btn onClick={handleClick}>
          <Icon icon={showHelp ? 'close' : 'question-mark'} />
        </Btn>
      )}
    </>
  );
};

export default withHelp(HelpToggle);
