import React, { memo } from 'react';
import styled from 'styled-components';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import { palette } from '../../../style';

const Trigger = (children, setTriggerRef) => {
  return React.cloneElement(children, {
    ref: setTriggerRef,
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
  /* margin: 1rem; */
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  position:absolute;
 
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

const Tooltip = ({
  placement,
  tooltip,
  hideArrow,
  arrowRef,
  getArrowProps,
  getTooltipProps,
  setTooltipRef,
  visible,
}) => {
  return (
    <>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: 'tooltip-container',
          })}
        >
          <div>{tooltip}</div>

          <div
            {...getArrowProps({
              ref: arrowRef,
              className: 'tooltip-arrow',
            })}
          />
        </div>
      )}
    </>
  );
};

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

export const Tip = memo(
  ({ tooltip, children, hideArrow, placement, triggerElementProps, ...props }) => {
    const {
      getArrowProps,
      getTooltipProps,
      setTooltipRef,
      setTriggerRef,
      visible,
    } = usePopperTooltip({ placement });
    return (
      <>
        {Trigger(children, setTriggerRef)}
        <Tooltip
          {...props}
          getArrowProps={getArrowProps}
          getTooltipProps={getTooltipProps}
          setTooltipRef={setTooltipRef}
          visible={visible}
          tooltip={tooltip}
          hideArrow={hideArrow}
        />
      </>
    );
  },
);
