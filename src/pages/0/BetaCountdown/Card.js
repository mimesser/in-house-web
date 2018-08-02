import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Wrapper = styled.section`
   padding: 30px 20px;
   overflow: hidden;
   background-color: ${props => props.color && props.theme[props.color]};
   ${props => props.backgroundImage && css`
      height: 600px;
      background-image: url(${props.backgroundImage});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
   `}
`;

const Content = styled.div`
   width: 100%;
   max-width: ${props => (props.maxWidth || 1024)}px;
   margin: 0 auto;
   ${props => props.flex && css`
      display: flex;
   `}
   text-align: ${props => (props.centerAlign ? 'center' : 'left')};
   padding-top: ${props => (props.paddingTop ? `${props.paddingTop}px` : null)};
   padding-bottom: ${props => (props.paddingBottom ? `${props.paddingBottom}px` : null)};
`;

export default function Card({ children, ...props }) {
   return (
      <Wrapper {...props}>
         <Content {...props}>{children}</Content>
      </Wrapper>
   );
}

Card.propTypes = {
   children: PropTypes.node,
};
