import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.span`
   display: inline-block;
   color: currentcolor;
   width: ${({ size }) => size}rem;
   height: ${({ size }) => size}rem;
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
   size: PropTypes.number,
};
