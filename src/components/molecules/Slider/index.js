/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { CircleSlider } from 'react-circle-slider';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import isNumber from 'lodash/isNumber';
import { font } from '../../../style';

const FONT_RATIO = 4.5;

const Container = styled.div`
   position: relative;
   display: flex;
   width: ${({ size }) => size}px;
   height: ${({ size }) => size}px;
   flex-shrink: 0;
   font-family: ${font.number};

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

class BaseSlider extends React.Component {
   static defaultProps = {
      progressColor: '#002633',
      knobColor: '#002633',
      circleColor: '#e4e4e4',
      readonly: false,
      size: 180,
      defaultIfEmpty: '?',
      onChange: () => {},
   };

   constructor(props) {
      super(props);
      const { value, size, readonly } = props;
      this.fontSize = `${size / FONT_RATIO}px`;

      this.state = Slider.determineInitialRenderState({
         readonly,
         value,
      });
   }

   componentDidMount() {
      const { value, readonly } = this.props;
      if (!isNumber(value) && !readonly) {
         this.animate();
      }
   }

   componentWillUnmount() {
      this.stopAnimation();
      this.reportChange.cancel();
   }

   componentDidUpdate({ value: prevValue }) {
      if (prevValue === this.props.value) {
         return;
      }

      const { value, readonly } = this.props;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
         Slider.determineInitialRenderState({
            readonly,
            value,
         }),
      );
   }

   static determineInitialRenderState({ readonly, value }) {
      if (readonly || isNumber(value)) {
         return Slider.createValueDrivenState({
            value,
            readonly,
         });
      }

      return {
         value,
         showTooltip: false,
         stepSize: 0.1,
      };
   }

   // This belongs somewhere other than the control, obv
   static roundToPrecision(value, precision) {
      return parseFloat(value.toFixed(precision));
   }

   static createValueDrivenState({ value, readonly }) {
      return {
         value: readonly && isNumber(value) ? Slider.roundToPrecision(value, 1) : value,
         showTooltip: true,
         stepSize: 1,
      };
   }

   animate() {
      this.initialAnimationInterval = setInterval(() => {
         this.setState(({ value }) => {
            const roundedValue = Math.floor(value);
            const newValue = roundedValue === 10 ? 0 : value + 0.05;
            return {
               value: newValue,
            };
         });
      }, 20);
   }

   stopAnimation = () => {
      clearInterval(this.initialAnimationInterval);
      this.initialAnimationInterval = undefined;
   };

   handleChange = rawValue => {
      this.stopAnimation();
      const value = Math.round(rawValue);
      this.setState(
         Slider.createValueDrivenState({
            value,
            readonly: this.props.readonly,
         }),
      );
      this.reportChange(value);
   };

   reportChange = debounce(this.props.onChange, 700);

   renderValue = () => {
      const { defaultIfEmpty, readonly: useDecimal } = this.props;
      const { value } = this.state;
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
   };

   render() {
      const { readonly, circleColor, size, progressColor, knobColor, className } = this.props;
      const { showTooltip, stepSize, value } = this.state;
      return (
         <Container size={size} className={className}>
            <CircleSlider
               value={value}
               progressColor={this.initialAnimationInterval ? circleColor : progressColor}
               circleColor={circleColor}
               showTooltip={false}
               knobRadius={10}
               knobColor={knobColor}
               circleWidth={1}
               progressWidth={1}
               stepSize={stepSize}
               min={0}
               max={10}
               disabled={readonly}
               onChange={this.handleChange}
               size={size}
            />
            <RealSliderTooltip showTooltip={showTooltip} fontSize={this.fontSize}>
               {this.renderValue()}
            </RealSliderTooltip>
         </Container>
      );
   }
}

export const Slider = styled(BaseSlider)``;
