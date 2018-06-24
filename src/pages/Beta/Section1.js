import React from 'react';
import { Typography, Section } from 'components';
import styled from 'styled-components';

const Content = styled.div`
   margin-bottom: 20px;
`;

export default function Section1() {
   return (
      <Section container centerAlign>
         <Content>
            <Typography L5>
               if your job could talk
            </Typography>
            <Typography L3>
               let team consensus guide your workplace
            </Typography>
         </Content>
      </Section>
   );
}
