/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { CircleSlider } from 'react-circle-slider';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RealSliderTooltip = styled.div`
   position: 'relative';
   display: ${props => (props.showTooltip ? 'block' : 'none')};
   top: ${props => props.top};
   font-size: ${props => props.fontSize};
`;

const SuperScriptDecimalSpan = styled.span`
   vertical-align: 'super';
   font-size: '.5em';
   margin-left: '-2px';
`;

export class Slider extends React.Component {
   static defaultProps = {
      animationColorOne: '#002633',
      animationColorTwo: '#e4e4e4',
      isReadOnly: false,
      size: 180,
      onSliderChange: value => {},
      useDecimal: true,
   };

   constructor(props) {
      super(props);
      this.initializeDefaults(props);

      const { value } = props;

      this.state = Slider.determineInitialRenderState({
         readOnly: props.isReadOnly,
         sliderValue: value,
         animationColorOne: props.animationColorOne,
         animationColorTwo: props.animationColorTwo,
         useDecimal: props.useDecimal,
         defaultIfEmpty: '?',
      });

      if (!value) {
         this.increment();
      }
   }

   initializeDefaults(props) {
      const otherDimensions = Slider.calculateDimensionSettings(props.size);
      this.fontSize = props.fontSize || otherDimensions.fontSize;
      this.tooltipUpwardAdjustment = props.tooltipUpwardAdjustment || otherDimensions.tooltipUpwardAdjustment;

      this.initialAnimationInterval = null;
   }

   static determineInitialRenderState({
      isReadOnly,
      sliderValue,
      animationColorOne,
      animationColorTwo,
      useDecimal,
      defaultIfEmpty,
   }) {
      const defaultEmptyValue = defaultIfEmpty || '?';

      if (isReadOnly) {
         return Slider.createValueDrivenState({
            sliderValue: sliderValue || defaultEmptyValue,
            animationColorOne,
            animationColorTwo,
            useDecimal,
         });
      }

      return sliderValue
         ? Slider.createValueDrivenState({
              sliderValue,
              animationColorOne,
              animationColorTwo,
              useDecimal,
           })
         : Slider.createAnimatingState({
              sliderAnimatingValue: 0,
              animatedProgressColor: animationColorOne,
              animatedCircleColor: animationColorTwo,
           });
   }

   static calculateDimensionSettings(size) {
      const fontRatio = 4.5;
      const tooltipAdjustmentPercentage = 0.65;

      return {
         fontSize: `${size / fontRatio}px`,
         tooltipUpwardAdjustment: `${-(size * tooltipAdjustmentPercentage)}px`,
      };
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
         sliderAnimatingValue: newValue,
         animatedProgressColor: newProgressColor,
         animatedCircleColor: newCircleColor,
      });
   }

   static createAnimatingState({ sliderAnimatingValue, animatedProgressColor, animatedCircleColor }) {
      return {
         value: sliderAnimatingValue,
         progressColor: animatedProgressColor,
         circleColor: animatedCircleColor,
         knobColor: animatedProgressColor,
         showTooltip: false,
         knobRadius: 10,
         circleWidth: 1,
         progressWidth: 1,
         stepSize: 0.1,
         isAnimating: true,
      };
   }

   // This belongs somewhere other than the control, obv
   static roundToPrecision(value, precision) {
      const numValue = +value;
      return numValue.toFixed(precision || 0);
   }

   static createValueDrivenState({ sliderValue, animationColorOne, animationColorTwo, useDecimal }) {
      return {
         value: useDecimal ? Slider.roundToPrecision(sliderValue, 1) : Math.ceil(sliderValue),
         progressColor: animationColorOne,
         circleColor: animationColorTwo,
         knobColor: animationColorOne,
         showTooltip: true,
         knobRadius: 10,
         circleWidth: 1,
         progressWidth: 1,
         stepSize: 1,
      };
   }

   increment() {
      this.initialAnimationInterval = setInterval(() => {
         const newAnimatingState = Slider.calculateAnimatingState({
            state: this.state,
            animationColorOne: this.props.animationColorOne,
            animationColorTwo: this.props.animationColorTwo,
         });
         this.setState(newAnimatingState);
      }, 25);
   }

   handleChange = value => {
      clearInterval(this.initialAnimationInterval);
      this.setState(
         Slider.createValueDrivenState({
            sliderValue: value,
            animationColorOne: this.props.animationColorOne,
            animationColorTwo: this.props.animationColorTwo,
            useDecimal: this.props.useDecimal,
         }),
      );
      this.props.onSliderChange(value);
   };

   render() {
      return (
         <div>
            <CircleSlider
               value={this.props.isReadOnly ? this.state.value || 0 : this.state.value}
               progressColor={this.state.progressColor}
               circleColor={this.state.circleColor}
               showTooltip={false}
               knobRadius={10}
               knobColor={this.state.knobColor}
               circleWidth={this.state.circleWidth}
               progressWidth={this.state.progressWidth}
               stepSize={this.state.stepSize}
               min={0}
               max={10}
               disabled={this.props.isReadOnly}
               onChange={this.handleChange}
               size={this.props.size}
            />
            <RealSliderTooltip
               showTooltip={this.state.showTooltip}
               top={this.tooltipUpwardAdjustment}
               fontSize={this.fontSize}
            >
               {Slider.renderValue({ value: this.state.value, useDecimal: this.props.useDecimal })}
            </RealSliderTooltip>
         </div>
      );
   }

   static renderValue({ value, useDecimal }) {
      if (!value) {
         return (
            <div>
               <span>{value === 0 ? value : '?'}</span>
            </div>
         );
      }

      const parts = String(value).split('.');
      if (parts.length > 1 && useDecimal) {
         return (
            <div>
               <span>{parts[0]}</span>
               <span>.</span>
               <SuperScriptDecimalSpan>{parts[1]}</SuperScriptDecimalSpan>
            </div>
         );
      }
      return (
         <div>
            <span>{value}</span>
         </div>
      );
   }
}

Slider.propTypes = {
   animationColorOne: PropTypes.string,
   animationColorTwo: PropTypes.string,
   isReadOnly: PropTypes.bool,
   onSliderChange: PropTypes.func,
   useDecimal: PropTypes.bool,
   value: PropTypes.number,
   size: PropTypes.number,
};
