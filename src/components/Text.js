import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import baseComponent from './base-component';

const Wrapper = baseComponent(
   'span',
   css`
      line-height: 1.4em;
      font-size: ${props => props.fontSize};
      ${p => p.flex && css`
         display: flex;
         align-items: center;
         justify-content: center;
      `};
      ${p => p.bold && css`
         font-weight: bold;
      `}
   `,
);


export default function Text(props) {
   return <Wrapper {...props} />;
}

Text.propTypes = {
   fontSize: PropTypes.string,
};

Text.defaultProps = {
   fontSize: 'inherit',
};
