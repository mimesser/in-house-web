import React from 'react';
import styled from 'styled-components';
import { Heading, Section, Button } from 'components';

const H = styled(Heading)`
   padding-top: 30px;
`;

const B = styled(Button)`
   margin-top: 280px !important;
`;

export default function Sectio6() {
   return (
      <Section container centerAlign backgroundImage={require('assets/images/workplace.jpg')}>
         <H L5>workplace democracy</H>
         <B I_2>Notify me when live</B>
      </Section>
   );
}
