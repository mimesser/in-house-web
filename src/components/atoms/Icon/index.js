import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ifProp, palette } from '../../../utils';

const fontSize = ({ width, height }) => {
   const size = width || height;
   return size ? `${size / 16}rem` : '1.25em';
};

export const Wrapper = styled.span`
   display: block;
   font-size: ${fontSize};
   color: ${ifProp('palette', palette({ grayscale: 0 }, 1), 'currentcolor')};
   width: 2rem;
   height: 2rem;
   margin: 0.25rem;
   box-sizing: border-box;

   & > svg {
      width: 100%;
      height: 100%;
      fill: currentcolor;
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
   width: PropTypes.number,
   height: PropTypes.number,
   palette: PropTypes.string,
   reverse: PropTypes.bool,
};

Icon.defaultProps = {
   width: 16,
   height: 16,
   palette: '',
   reverse: false,
};
