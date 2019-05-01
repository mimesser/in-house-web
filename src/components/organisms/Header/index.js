import React from 'react';
import styled from 'styled-components';

import { Container, Heading } from '../../atoms';

const StyledHeader = styled(Container)`
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 60px;
   padding: 0 20px;

   i {
      margin-left: auto;
   }
   h1 {
      font-weight: 300;
      font-size: 18px;
   }
   h1 strong {
      color: #9b9b9b;
   }
`;

export const Header = () => {
   return (
      <StyledHeader>
         <Heading>
            In<strong>House</strong>
         </Heading>

         <i className="material-icons">menu</i>
      </StyledHeader>
   );
};
