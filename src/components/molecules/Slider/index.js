/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { CircleSlider } from 'react-circle-slider';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import isNumber from 'lodash/isNumber';

const FONT_RATIO = 4.5;

const Container = styled.div`
   position: relative;
   display: flex;
   width: ${({ size }) => size}px;
   height: ${({ size }) => size}px;
   flex-shrink: 0;

   svg {
      position: absolute;
   }
`;

const RealSliderTooltip = styled.div`
   display: ${props => (props.showTooltip ? 'block' : 'none')};
   font-size: ${props => props.fontSize};
   margin: auto;
`;

const SuperScriptDecimalSpan = styled.span`
   vertical-align: super;
   font-size: 0.5em;
   margin-left: -2px;
`;

export class Slider extends React.Component {
   static defaultProps = {
      animationColorOne: '#002633',
      animationColorTwo: '#e4e4e4',
      readonly: false,
      size: 180,
      defaultIfEmpty: '?',
      onChange: () => {},
   };

   constructor(props) {
      super(props);
      const { value, size, readonly, animationColorOne, animationColorTwo } = props;
      this.fontSize = `${size / FONT_RATIO}px`;

      this.state = Slider.determineInitialRenderState({
         readonly,
         value,
         animationColorOne,
         animationColorTwo,
      });
   }

   componentDidMount() {
      const { value, readonly } = this.props;
      if (!isNumber(value) && !readonly) {
         this.animate();
      }
   }

   componentWillUnmount() {
      clearInterval(this.initialAnimationInterval);
      this.reportChange.cancel();
   }

   componentDidUpdate({ value: prevValue }) {
      if (prevValue === this.props.value) {
         return;
      }

      const { value, readonly, animationColorOne, animationColorTwo } = this.props;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
         Slider.determineInitialRenderState({
            readonly,
            value,
            animationColorOne,
            animationColorTwo,
         }),
      );
   }

   static determineInitialRenderState({ readonly, value, animationColorOne, animationColorTwo }) {
      if (readonly || isNumber(value)) {
         return Slider.createValueDrivenState({
            value,
            animationColorOne,
            animationColorTwo,
            readonly,
         });
      }

      return Slider.createAnimatingState({
         value: 0,
         animatedProgressColor: animationColorOne,
         animatedCircleColor: animationColorTwo,
      });
   }

   static calculateAnimatingState({ state, animationColorOne, animationColorTwo }) {
      const roundedValue = Math.floor(state.value);
      const newValue = roundedValue === 10 ? 0 : state.value + 0.1;
      let newProgressColor = state.progressColor;
      let newCircleColor = state.circleColor;
      if (roundedValue === 10) {
         newProgressColor = state.progressColor === animationColorOne ? animationColorTwo : animationColorOne;
         newCircleColor = state.progressColor === animationColorOne ? animationColorOne : animationColorTwo;
      }
      return Slider.createAnimatingState({
         value: newValue,
         animatedProgressColor: newProgressColor,
         animatedCircleColor: newCircleColor,
      });
   }

   static createAnimatingState({ value, animatedProgressColor, animatedCircleColor }) {
      return {
         value,
         progressColor: animatedProgressColor,
         circleColor: animatedCircleColor,
         knobColor: animatedProgressColor,
         showTooltip: false,
         stepSize: 0.1,
      };
   }

   // This belongs somewhere other than the control, obv
   static roundToPrecision(value, precision) {
      return parseFloat(value.toFixed(precision));
   }

   static createValueDrivenState({ value, animationColorOne, animationColorTwo, readonly }) {
      return {
         value: readonly && isNumber(value) ? Slider.roundToPrecision(value, 1) : value,
         progressColor: animationColorOne,
         circleColor: animationColorTwo,
         knobColor: animationColorOne,
         showTooltip: true,
         stepSize: 1,
      };
   }

   animate() {
      this.initialAnimationInterval = setInterval(() => {
         const newAnimatingState = Slider.calculateAnimatingState({
            state: this.state,
            animationColorOne: this.props.animationColorOne,
            animationColorTwo: this.props.animationColorTwo,
         });
         this.setState(newAnimatingState);
      }, 25);
   }

   handleChange = rawValue => {
      clearInterval(this.initialAnimationInterval);
      const value = Math.round(rawValue);
      this.setState(
         Slider.createValueDrivenState({
            value,
            animationColorOne: this.props.animationColorOne,
            animationColorTwo: this.props.animationColorTwo,
            readonly: this.props.readonly,
         }),
      );
      this.reportChange(value);
   };

   reportChange = debounce(this.props.onChange, 700);

   render() {
      return (
         <Container size={this.props.size}>
            <CircleSlider
               value={this.state.value}
               progressColor={this.state.progressColor}
               circleColor={this.state.circleColor}
               showTooltip={false}
               knobRadius={10}
               knobColor={this.state.knobColor}
               circleWidth={1}
               progressWidth={1}
               stepSize={this.state.stepSize}
               min={0}
               max={10}
               disabled={this.props.readonly}
               onChange={this.handleChange}
               size={this.props.size}
            />
            <RealSliderTooltip showTooltip={this.state.showTooltip} fontSize={this.fontSize}>
               {Slider.renderValue({
                  value: this.state.value,
                  useDecimal: this.props.readonly,
                  defaultIfEmpty: this.props.defaultIfEmpty,
               })}
            </RealSliderTooltip>
         </Container>
      );
   }

   static renderValue({ value, useDecimal, defaultIfEmpty }) {
      if (!isNumber(value)) {
         return defaultIfEmpty;
      }

      if (useDecimal) {
         const parts = String(value).split('.');
         return (
            <>
               <span>{parts[0]}.</span>
               <SuperScriptDecimalSpan>{parts[1] || 0}</SuperScriptDecimalSpan>
            </>
         );
      }

      return value;
   }
}

Slider.propTypes = {
   defaultIfEmpty: PropTypes.string,
   animationColorOne: PropTypes.string,
   animationColorTwo: PropTypes.string,
   readonly: PropTypes.bool,
   onChange: PropTypes.func,
   value: PropTypes.number,
   size: PropTypes.number,
};
