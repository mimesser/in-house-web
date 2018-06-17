import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import baseComponent from './base-component';

export default function Text({ component, fontSize, ...props }) {
   const Wrapper = baseComponent(
      component,
      css`
         line-height: 1.4em;
         font-size: ${fontSize};
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

   return <Wrapper {...props} />;
}

Text.propTypes = {
   component: PropTypes.string,
   fontSize: PropTypes.string,
};

Text.defaultProps = {
   component: 'span',
   fontSize: 'inherit',
};
