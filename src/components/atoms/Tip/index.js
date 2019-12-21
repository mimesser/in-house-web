import React, { memo } from 'react';
import styled from 'styled-components';
import TooltipTrigger from 'react-popper-tooltip';

import { palette } from '../../../style';

const Trigger = (children, triggerElementProps) => ({ triggerRef, getTriggerProps }) => {
  if (triggerElementProps && triggerElementProps.style) {
    triggerElementProps.style = { ...triggerElementProps.style, ...children.props.style };
  }

  return React.cloneElement(children, {
    ...triggerElementProps,
    ...getTriggerProps({
      ref: triggerRef,
    }),
  });
};

const Container = styled.div`
  transition: opacity 0.3s;
  z-index: 2147483647;
`;

const Content = styled.div`
  background-color: ${palette.gray};
  border: 1px solid ${palette.gray};
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  position: absolute;
  &&& {
    border-style: solid;
  }

  &[data-placement^='bottom'] {
    border-left: 1rem transparent;
    border-right: 1rem transparent;

    border-bottom: 1rem ${palette.gray};
    top: 0;
  }

  &[data-placement^='top'] {
    border-left: 1rem transparent;
    border-right: 1rem transparent;

    border-top: 1rem ${palette.gray};
    bottom: 0;
  }

  // &[data-placement^='right'] {
  //   border-top: 1rem transparent;
  //   border-bottom: 1rem transparent;
  //
  //   border-left: 1rem ${palette.gray};
  //   left: 0;
  // }
  //
  // &[data-placement^='left'] {
  //   border-top: 1rem transparent;
  //   border-bottom: 1rem transparent;
  //
  //   border-right: 1rem ${palette.gray};
  //   right: 0;
  // }
`;

const Tooltip = (tooltip, hideArrow) => ({ arrowRef, tooltipRef, getArrowProps, getTooltipProps, placement }) => (
  <Container
    {...getTooltipProps({
      ref: tooltipRef,
    })}
  >
    {!hideArrow && (
      <Arrow
        {...getArrowProps({
          'data-placement': placement,
          ref: arrowRef,
        })}
      />
    )}
    <Content>{tooltip}</Content>
  </Container>
);

// TODO: remove ToolTip component
// TODO: reconsider this lib after evaluation

const modifiers = {
  preventOverflow: {
    // boundariesElement: 'rootContainer',
  },
};

// won't be needed once we get rid of mobile frame
export const setBoundariesElement = element => {
  modifiers.preventOverflow.boundariesElement = element;
};

export const Tip = memo(({ tooltip, children, hideArrow, triggerElementProps, ...props }) => (
  <TooltipTrigger {...props} tooltip={Tooltip(tooltip, hideArrow)} modifiers={modifiers}>
    {Trigger(children, triggerElementProps)}
  </TooltipTrigger>
));
