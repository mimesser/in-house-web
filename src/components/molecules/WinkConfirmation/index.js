import React from 'react';
import styled from 'styled-components';

export const WinkConfirmation = styled.div.attrs({
   children: <span>,)</span>,
})`
   // TODO
   background-color: ${({ theme: { palette } }) => palette.black};
   flex: 1;
   display: flex;

   span {
      margin: auto;
      font-size: 12rem;
      font-family: 'Lato', sans-serif;
      color: ${({ theme: { palette } }) => palette.white};
      letter-spacing: 2rem;
      transform: rotate(90deg);
   }
`;
