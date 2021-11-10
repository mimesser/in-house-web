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
  background-color: ${palette.lightGray};
  border: 1px solid ${palette.lightGray};
  box-shadow: 0 1px 4px 2px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  position: absolute;

  &[data-placement^='bottom'] {
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;

    border-bottom: 1rem solid ${palette.lightGray};
    top: 0;
  }

  &[data-placement^='top'] {
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;

    border-top: 1rem solid ${palette.lightGray};
    bottom: 0;
  }

  // &[data-placement^='right'] {
  //   border-top: 1rem solid transparent;
  //   border-bottom: 1rem solid transparent;
  //
  //   border-left: 1rem solid ${palette.lightGray};
  //   left: 0;
  // }
  //
  // &[data-placement^='left'] {
  //   border-top: 1rem solid transparent;
  //   border-bottom: 1rem solid transparent;
  //
  //   border-right: 1rem solid ${palette.lightGray};
  //   right: 0;
  // }
`;

const Tooltip = (tooltip, hideArrow) => ({
  arrowRef,
  tooltipRef,
  getArrowProps,
  getTooltipProps,
  placement,
}) => (
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
export const setBoundariesElement = (element) => {
  modifiers.preventOverflow.boundariesElement = element;
};

export const Tip = memo(({ tooltip, children, hideArrow, triggerElementProps, ...props }) => (
  <TooltipTrigger {...props} tooltip={Tooltip(tooltip, hideArrow)} modifiers={modifiers}>
    {Trigger(children, triggerElementProps)}
  </TooltipTrigger>
));
