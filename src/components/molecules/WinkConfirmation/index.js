import React from 'react';
import styled from 'styled-components';

import { palette, font } from '../../../style';

export const WinkConfirmation = styled.div.attrs({
   children: <span>,)</span>,
})`
   // TODO
   background-color: ${palette.black};
   flex: 1;
   display: flex;

   // TODO: use icon
   span {
      margin: auto;
      font-size: 12rem;
      font-family: ${font.heading};
      color: ${palette.white};
      letter-spacing: 2rem;
      transform: rotate(90deg);
   }
`;
