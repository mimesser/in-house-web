import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import baseComponent from './base-component';

const Wrapper = baseComponent(
   'i',
   css`
      font-size: ${props => props.size}px;
   `,
);


export default function Icon({ children, ...props }) {
   return <Wrapper className="material-icons" {...props}>{children}</Wrapper>;
}

Icon.propTypes = {
   children: PropTypes.node.isRequired,
   size: PropTypes.number,
};

Icon.defaultProps = {
   size: 20,
};
