import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
   position: fixed;
   top: 0;
   background: #ff000057;
   padding: 6px 36px;
   color: #fff;
   white-space: nowrap;
   right: 0;
`;

export default function NoConnection() {
   return (
      <Container>
         No API connection
      </Container>
   );
}
