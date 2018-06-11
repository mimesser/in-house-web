import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const Content = styled.div`
   .L5 {
      padding-top: 30px;
   }
   .I-2 {
      margin-top: 280px;
   }
`;

export default function Sectio6() {
   return (
      <Card centerAlign backgroundImage={require('assets/images/workplace.jpg')}>
         <Content>
            <h2 className="L5">
               workplace democracy
            </h2>
            <button className="I-2">Notify me when live</button>
         </Content>
      </Card>
   );
}
