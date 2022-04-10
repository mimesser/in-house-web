import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { appColors, calcRem, device } from '../../../style';

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

const TextStyling = styled.p`
  color: ${({ color, variant }) => getVariant(variant, color)};
  text-transform: ${({ transform }) => transform};
  font-size: ${({ size }) => size && calcRem(size)};
  font-weight: ${({ weight }) => getFontWeight(weight)};
  font-family: ${({ family }) => getFontFamily(family)};
  margin: 0;
  text-align: ${({ alignment }) => alignment};

  @media ${device.tab} {
    ${({ smSize }) => smSize && `font-size: ${calcRem(smSize)}`}
  }
  @media ${device.web} {
    ${({ mdSize }) => mdSize && `font-size: ${calcRem(mdSize)}`}
  }
  @media ${device.laptop} {
    ${({ lgSize }) => lgSize && `font-size: ${calcRem(lgSize)}`}
  }
  @media ${device.desktop} {
    ${({ xlSize }) => xlSize && `font-size: ${calcRem(xlSize)}`}
  }
  
`;

const Text = ({ children, text, ...props }) => {
  return <TextStyling {...props}>{text || children}</TextStyling>;
};

const TextHeading = ({ level = 1, children, text, ...props }) => {
  return React.createElement(TextStyling, { as: `h${level}`, ...props }, text || children);
};

Text.Heading = TextHeading;

const fontSizes = [10, 12, 14, 16, 18, 20, 22, 24, 26, 32, 36, 38, 40, 72, 80, 96];

const size = PropTypes.oneOf(fontSizes);
const smSize = PropTypes.oneOf(fontSizes);
const mdSize = PropTypes.oneOf(fontSizes);
const lgSize = PropTypes.oneOf(fontSizes);
const xlSize = PropTypes.oneOf(fontSizes);
const weight = PropTypes.oneOf(['light', 'reg', 'med', 'bold']);
const family = PropTypes.oneOf(['helvetica', 'roboto']);
const variant = PropTypes.oneOf(['light', 'dark']);
const alignment = PropTypes.oneOf(['center', 'left', 'right', 'justify']);
// // flexible typechecking with any color
// const color = PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(appColors))]);
const color = PropTypes.oneOf(Object.keys(appColors)); // colors are tied to our palette

Text.propTypes = {
  text: PropTypes.string,
  color,
  size,
  variant,
  weight,
  family,
  smSize,
  mdSize,
  lgSize,
  xlSize,
  alignment,
};

TextHeading.propTypes = {
  text: PropTypes.string,
  color,
  variant,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  size,
  weight,
  family,
};

export default Text;
