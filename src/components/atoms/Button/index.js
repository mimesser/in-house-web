import React from 'react';
import styled, { css } from 'styled-components';

import { Loader } from '../Loader';

const StyledButton = styled.button`
   border-radius: 5px;
   background-color: ${props => (props.secondary ? 'white' : 'black')};
   color: ${props => (props.secondary ? 'black' : 'white')};
   padding: 10px 15px;
   font-size: ${props => {
      if (props.big) return '20px';
      return '16px';
   }};
   outline: none;
   border: none;
   cursor: pointer;
   margin: 15px;
   border: 2px solid ${props => (props.secondary ? 'black' : 'white')};

   ${props => {
      return (
         props.inverse &&
         css`
            background-color: #fff;
            color: #a1cdf1;
         `
      );
   }}
`;

export const Button = ({ secondary, big, inverse, loading, children, ...props }) => {
   return (
      <StyledButton secondary={secondary} big={big} inverse={inverse} {...props}>
         {loading ? <Loader small white /> : children}
      </StyledButton>
   );
};
