import React from 'react';
import styled from 'styled-components';
import { Typography, Icon, Section } from 'components';

const MinkAnswerContainer = styled.div`
   color: ${props => props.theme.A_5};
   display: inline-flex;
   align-items: center;
   height: 50px;
   margin-top: 20px;
`;

const MinkAnswer = styled(Typography)`
   padding: 0 30px;
   margin-left: 20px;
   height: 100%;
`;

const PeopleContainer = styled.div`
   margin: 0 20px;
   text-align: center;
`;

export default function Section3() {
   return (
      <Section centerAlign B_6 container maxWidth={400}>
         <Typography P1>#1 MINK:</Typography>
         <Typography V2>
            Who is there a picture of in the employee bathroom?
         </Typography>
         <MinkAnswerContainer>
            <Icon size={40}>lock</Icon>
            <MinkAnswer P1 B_5 flex>
               (one word / no spaces)
            </MinkAnswer>
         </MinkAnswerContainer>
         <Section P3 flex>
            <Icon size={40} I_4>thumb_up</Icon>
            <PeopleContainer>
               <Typography P2>+89%</Typography>
               <Typography flex bold fontSize="12px">
                  (<Icon I_4 size={20}>person</Icon> 32)
               </Typography>
            </PeopleContainer>
            <Icon I_4 size={40}>thumb_down</Icon>
         </Section>
         <Typography S1>U.S. PATENT NO. 8,904,502</Typography>
      </Section>
   );
}
