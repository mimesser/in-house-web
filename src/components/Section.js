import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import baseComponent from './base-component';

const BaseComponent = baseComponent('section');

const Wrapper = BaseComponent.extend`
   overflow: hidden;
   ${props => props.flex && css`
      display: flex;
      align-items: center;
      justify-content: center;
   `};
   ${props => (props.container ? css`
      padding: 40px 20px;
   ` : css`
      padding: 30px 20px;
   `)};
   ${props => props.backgroundImage && css`
      height: 600px;
      background-image: url(${props.backgroundImage});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
   `};
`;

const Content = styled.div`
   width: 100%;
   max-width: ${props => (props.maxWidth || 1024)}px;
   margin: 0 auto;
   text-align: ${props => (props.centerAlign ? 'center' : 'left')};
`;

export default function Section({
   children, maxWidth, centerAlign, ...props
}) {
   if (!props.container) {
      return <Wrapper {...props}>{children}</Wrapper>;
   }

   return (
      <Wrapper {...props}>
         <Content maxWidth={maxWidth} centerAlign={centerAlign}>{children}</Content>
      </Wrapper>
   );
}

Section.propTypes = {
   children: PropTypes.node,
   maxWidth: PropTypes.number,
   container: PropTypes.bool,
   centerAlign: PropTypes.bool,
};

Section.defaultProps = {
   maxWidth: 1024,
};
