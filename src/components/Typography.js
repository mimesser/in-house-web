import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import baseComponent from './base-component';

const Wrapper = baseComponent(
   'div',
   css`
      line-height: 1.4em;
      font-size: ${props => props.fontSize};
      ${props => props.inline && css`
         display: inline-block;
      `}
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


export default function Typography(props) {
   return <Wrapper {...props} />;
}

Typography.propTypes = {
   fontSize: PropTypes.string,
};

Typography.defaultProps = {
   fontSize: 'inherit',
};
