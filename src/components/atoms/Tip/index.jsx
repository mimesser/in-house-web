import React, { memo } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

const Trigger = (children, setTriggerRef) => {
  return React.cloneElement(children, {
    ref: setTriggerRef,
  });
};

const Tooltip = ({ tooltip, arrowRef, getArrowProps, getTooltipProps, setTooltipRef, visible }) => {
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

export const Tip = memo(({ tooltip, children, placement, ...props }) => {
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
      />
    </>
  );
});
