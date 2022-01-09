import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { appColors, calcRem } from '../../../style';

const getFontWeight = (weight) => {
  switch (weight) {
    case 'light':
      return 300;
    case 'reg':
      return 400;
    case 'med':
      return 500;
    case 'bold':
      return 700;
    default:
      return 'inherit';
  }
};

const getFontFamily = (fam) => {
  switch (fam) {
    case 'helvetica':
      return "'Helvetica Neue', sans-serif";
    case 'roboto':
      return "'Roboto', sans-serif";
    default:
      return 'inherit';
  }
};

const TextStyling = styled.p`
  color: ${({ variant }) => (variant === 'light' ? appColors.white : appColors.gray600)};
  text-transform: ${({ transform }) => transform};
  font-size: ${({ size }) => size && calcRem(size)};
  font-weight: ${({ weight }) => getFontWeight(weight)};
  font-family: ${({ family }) => getFontFamily(family)};
  margin: 0;
`;

const Text = ({ children, text, ...props }) => {
  return <TextStyling {...props}>{text || children}</TextStyling>;
};

const TextHeading = ({ level = 1, children, text, ...props }) => {
  return React.createElement(TextStyling, { as: `h${level}`, ...props }, text || children);
};

Text.Heading = TextHeading;

const size = PropTypes.oneOf([10, 12, 14, 16, 18, 20, 22, 24, 32, 36, 38, 40, 72, 80, 96]);
const weight = PropTypes.oneOf(['light', 'reg', 'med', 'bold']);
const family = PropTypes.oneOf(['helvetica', 'roboto']);

Text.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(['light', 'dark']),
  size,
  weight,
  family,
};

TextHeading.propTypes = {
  text: PropTypes.string,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  size,
  weight,
  family,
};

export default Text;
