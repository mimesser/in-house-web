// Based on https://github.com/dmitrymorozoff/react-circle-slider
import React from 'react';
import styled from 'styled-components';
import noop from 'lodash/noop';
import isNumber from 'lodash/isNumber';

import { StepHelper } from './stepHelper';
import { theme, palette } from '../../../style';
import { Container, SliderLabel } from './style';
// TODO: BAD - basic components can't be dependant on smart ones
import { HelpTip } from '../help';

const buildPath = (center, radius, direction, x, y) =>
  `M${center} ${center + radius} A ${radius} ${radius} 0 ${direction} 1 ${x} ${y}`;

const calculateAngle = (container, { clientX, clientY }) => {
  const { width, left, top } = container.getBoundingClientRect();
  const center = width / 2;
  const relativeX = clientX - left;
  const relativeY = clientY - top;

  const angleBetweenTwoVectors = Math.atan2(relativeY - center, relativeX - center);
  return (angleBetweenTwoVectors + (3 * Math.PI) / 2) % (2 * Math.PI);
};

const valueOutTransform = Math.floor;

const getElementSizes = size => {
  let k = 1;
  if (size > 150) {
    k = 2;
  }
  if (size > 300) {
    k = 3;
  }
  return {
    circleWidth: 8 * k,
    progressWidth: 8 * k,
    knobRadius: 6 * k,
  };
};

// TODO render text here?

class CircleSlider extends React.PureComponent {
  static defaultProps = {
    size: 350,
    padd: 0,
    circleColor: theme.colors.lightGray,
    progressColor: theme.colors.darkGray,
    stepSize: 0.1,
    // TODO: quick and dirty zones support https://in-house.atlassian.net/browse/MVP-219
    min: 0,
    max: 10.9,
    readonly: false,
    onChanging: noop,
    onChange: noop,
  };

  radius;

  stepHelper;

  ref = this.props.containerRef || React.createRef();

  animationInterval;

  dragging;

  hoverEvents;

  circleWidth;

  progressWidth;

  knobRadius;

  state = {
    angle: 0,
  };

  constructor(props) {
    super(props);

    const { min, max, stepSize, initialValue, size } = this.props;
    const { circleWidth, progressWidth, knobRadius } = getElementSizes(size);
    this.circleWidth = circleWidth;
    this.progressWidth = progressWidth;
    this.knobRadius = knobRadius;

    const maxLineWidth = Math.max(circleWidth, progressWidth);
    this.radius = this.getCenter() - Math.max(maxLineWidth, knobRadius * 2) / 2;

    // TODO
    const value = initialValue >= 10 ? max : initialValue;
    this.stepHelper = new StepHelper(min, stepSize, max, value || 0);

    this.handleHoverEvents();
  }

  handleHoverEvents() {
    const { showHelp, readonly } = this.props;
    this.hoverEvents =
      readonly || showHelp
        ? undefined
        : {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
        };
  }

  handleMouseEnter = () => {
    this.stopAnimation();
    window.addEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseLeave = () => {
    if (!this.dragging) {
      this.cleanupEventListeners();
    }
  };

  componentDidMount() {
    this.setState({
      angle: this.stepHelper.getAngle(),
    });
    const { initialValue } = this.props;
    if (!isNumber(initialValue)) {
      this.startAnimation();
    }
  }

  componentWillUnmount() {
    this.cleanupEventListeners();
    this.stopAnimation();
  }

  componentDidUpdate(prevProps) {
    const { showHelp, readonly, initialValue } = this.props;
    if ((readonly && initialValue !== prevProps.initialValue) || showHelp !== prevProps.showHelp) {
      this.updateSliderFromProps();
    }
  }

  startAnimation = () => {
    this.setState(({ angle: prev }) => ({
      angle: Math.random() + Math.random(),
    }));
    this.animationInterval = setInterval(() => {
      this.setState(({ angle: prev }) => ({
        angle: (prev + 0.02) % 6.27,
      }));
    }, 20);
  };

  stopAnimation = () => {
    clearInterval(this.animationInterval);
    this.animationInterval = undefined;
  };

  updateAngle = event => {
    const angle = calculateAngle(this.ref.current, event);
    this.stepHelper.updateStepIndexFromAngle(angle);
    const currentStep = this.stepHelper.getCurrentStep();
    this.setState({
      angle,
    });
    if (!this.animationInterval) {
      this.props.onChanging(valueOutTransform(currentStep));
    }
  };

  updateSliderFromProps = () => {
    this.cleanupEventListeners();
    this.handleHoverEvents();
    this.stopAnimation();
    const { stepSize, initialValue, showHelp } = this.props;
    const newValue = Math.round(initialValue / stepSize) * stepSize;
    this.stepHelper.updateStepIndexFromValue(newValue);
    this.setState({
      angle: showHelp ? 3 : this.stepHelper.getAngle(),
    });
    if (!isNumber(initialValue) && !showHelp) {
      this.startAnimation();
    }
  };

  getCenter = () => this.props.size / 2;

  getAngle = () => this.state.angle + Math.PI / 2;

  getPointPosition = () => {
    const center = this.getCenter();
    const angle = this.getAngle();
    return {
      x: center + this.radius * Math.cos(angle),
      y: center + this.radius * Math.sin(angle),
    };
  };

  getPath = () => {
    const center = this.getCenter();
    const direction = this.getAngle() < 1.5 * Math.PI ? 0 : 1;
    const { x, y } = this.getPointPosition();
    return buildPath(center, this.radius, direction, x, y);
  };

  cleanupEventListeners = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
  };

  reportChange = () => {
    if (!this.dragging) {
      return;
    }
    this.props.onChange(valueOutTransform(this.stepHelper.getCurrentStep()));
    this.dragging = false;
  };

  handleMouseMove = event => {
    event.preventDefault();
    this.updateAngle(event);
  };

  handleMouseUp = event => {
    this.handleMouseMove(event);
    this.cleanupEventListeners();
    this.reportChange();
  };

  handleMouseDown = event => {
    if (this.props.readonly) {
      return;
    }
    event.preventDefault();
    this.dragging = true;
    this.stopAnimation();
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  handleTouchMove = event => {
    const { targetTouches, changedTouches } = event;
    const currentTouch =
      targetTouches.item(targetTouches.length - 1) ||
      (changedTouches && changedTouches.item(changedTouches.length - 1));
    if (currentTouch) {
      this.updateAngle(currentTouch);
    }
  };

  handleTouchEnd = event => {
    event.preventDefault();
    this.handleTouchMove(event);
    this.cleanupEventListeners();
    this.reportChange();
  };

  handleTouchStart = () => {
    if (this.props.readonly) {
      return;
    }
    this.dragging = true;
    this.stopAnimation();
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleTouchEnd);
  };

  render() {
    const { size, padd, readonly, className, children, inverse, showHelp } = this.props;

    let { knobColor, circleColor, progressColor } = this.props;

    if (showHelp) {
      knobColor = palette.white;
      circleColor = palette.white;
      progressColor = palette.white;
    } else if (inverse) {
      knobColor = theme.colors.lightGray;
      circleColor = theme.colors.darkGray;
      progressColor = theme.colors.lightGray;
    }

    const { x, y } = this.getPointPosition();
    const center = this.getCenter();
    const animating = !!this.animationInterval;

    // const knob = (
    //   <circle
    //     style={{
    //       fill: animating ? circleColor : knobColor || progressColor,
    //       cursor: readonly ? 'initial' : 'pointer',
    //     }}
    //     r={this.knobRadius}
    //     cx={x}
    //     cy={y}
    //   />
    // );

    return (
      <Container
        ref={this.ref}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        {...this.hoverEvents}
        className={className}
        size={size}
        padd={padd}
        showHelp={showHelp}
      >
        <svg width={`${size}px`} height={`${size}px`} viewBox={`0 0 ${size} ${size}`}>
          <circle
            style={{
              strokeWidth: showHelp ? 9 : this.circleWidth,
              stroke: circleColor,
              fill: 'none',
            }}
            r={this.radius}
            cx={center}
            cy={center}
          />
          {!animating && (
            <path
              style={{
                // strokeLinecap: 'round',
                strokeWidth: this.progressWidth,
                stroke: progressColor,
                fill: 'none',
              }}
              d={this.getPath()}
            />
          )}
          {/* {showHelp ? ( */}
          {/*  <HelpTip */}
          {/*    tip={ */}
          {/*      <> */}
          {/*        drag dial to select your rating <br /> let go to enter */}
          {/*      </> */}
          {/*    } */}
          {/*    placement="top" */}
          {/*  > */}
          {/*    {knob} */}
          {/*  </HelpTip> */}
          {/* ) : ( */}
          {/*  knob */}
          {/* )} */}
        </svg>
        {children && !showHelp && <SliderLabel>{children}</SliderLabel>}
      </Container>
    );
  }
}

export default styled(CircleSlider)``;
