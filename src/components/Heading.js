import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import baseComponent from './base-component';

export default function Heading({ component = 'h1', ...props }) {
   const Wrapper = baseComponent(
      component,
      css`
         margin: 0.5em 0;
         line-height: 1.4em;
      `,
   );

   return <Wrapper {...props} />;
}

Heading.propTypes = {
   component: PropTypes.string,
};

Heading.defaultProps = {
   component: 'h1',
};
