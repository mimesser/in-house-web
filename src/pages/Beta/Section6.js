import React from 'react';
import styled from 'styled-components';
import { Typography, Section, Button } from 'components';

const Heading = styled(Typography)`
   padding-top: 30px;
`;

const B = styled(Button)`
   margin-top: 280px;
`;

export default function Sectio6() {
   return (
      <Section container centerAlign backgroundImage={require('assets/images/workplace.jpg')}>
         <Heading L5>workplace democracy</Heading>
         <B I_2>Notify me when live</B>
      </Section>
   );
}
