import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { appColors, calcRem } from '../../../style';

const getFontWeight = (weight) => {
  if (typeof weight === 'number') {
    const w = { 700: 'bold', 500: 'med', 400: 'reg', 300: 'lighter' };
    return w[weight] || 'inherit';
  }
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

const getVariant = (variant, color) => {
  const shade = color?.split('gray');
  const isShadeValid = shade && !shade[0] && typeof +shade[1] === 'number';

  if (variant === 'light') {
    // apply  shade only less than 500 -- light variant
    const textColor = isShadeValid && +shade[1] <= 400;
    return textColor ? appColors[color] : (shade && shade[0]) || appColors.gray100 || 'gray';
  }
  // apply shade only greater than 300 -- dark variant
  const textColor = isShadeValid && +shade[1] >= 400;
  return textColor
    ? appColors[color]
    : (shade && shade[0] && appColors[shade[0]]) ||
        (shade && shade[0]) ||
        (shade && !shade[0] && 'gray') ||
        appColors.gray600;
};

const textTruncate = (level) => {
  const _level = typeof level === 'boolean' || typeof level !== 'number' ? 1 : level;
  return `
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: ${_level};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  `;
};

const TextStyling = styled.p`
  color: ${({ color, variant }) => getVariant(variant, color)};
  text-transform: ${({ transform }) => transform};
  font-size: ${({ size }) => size && calcRem(size)};
  font-weight: ${({ weight }) => getFontWeight(weight)};
  font-family: ${({ family }) => getFontFamily(family)};
  margin: 0;
  ${({ truncate }) =>
  truncate &&
    css`
      ${textTruncate(truncate)}
    `}
`;

const Text = ({ children, text, ...props }) => {
  return <TextStyling {...props}>{text || children}</TextStyling>;
};

const TextHeading = ({ level = 1, children, text, ...props }) => {
  return React.createElement(TextStyling, { as: `h${level}`, ...props }, text || children);
};

Text.Heading = TextHeading;

const baseProps = {
  text: PropTypes.string,
  truncate: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  variant: PropTypes.oneOf(['light', 'dark']),
  family: PropTypes.oneOf(['helvetica', 'roboto']),
  weight: PropTypes.oneOf(['light', 'reg', 'med', 'bold']),
  size: PropTypes.oneOf([10, 12, 14, 16, 18, 20, 22, 24, 26, 32, 36, 38, 40, 72, 80, 96]),
  // // flexible typechecking with any color
  // const color = PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(appColors))]);
  color: PropTypes.oneOf(Object.keys(appColors)), // colors are tied to our palette
};

Text.propTypes = {
  ...baseProps,
};

TextHeading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  ...baseProps,
};

export default Text;
