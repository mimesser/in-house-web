import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { palette } from '../../../style';

const getColor = ({ color }) => (color ? palette[color] : 'currentColor');

const Wrapper = styled.span`
  display: inline-block;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  box-sizing: border-box;
  color: ${getColor};
  transition: color 0.3s;

  & > svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    stroke: transparent;
  }
`;

export const Icon = ({ icon, ...props }) => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const svg = require(`!raw-loader!./icons/${icon}.svg`);
  return <Wrapper {...props} dangerouslySetInnerHTML={{ __html: svg.default || svg }} />;
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
};

Icon.defaultProps = {
  size: 1,
};
