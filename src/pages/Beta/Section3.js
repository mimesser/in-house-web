import React from 'react';
import styled from 'styled-components';
import { Heading, Icon, Section, Text } from 'components';

const MinkAnswerContainer = styled.div`
   color: ${props => props.theme.A_5};
   display: inline-flex;
   align-items: center;
   height: 50px;
   margin-top: 20px;
`;

const MinkAnswer = styled(Text)`
   padding: 0 30px;
   margin-left: 20px;
   height: 100%;
`;

const PeopleContainer = styled.div`
   margin: 0 20px;
`;

export default function Section3() {
   return (
      <Section centerAlign B_6 container maxWidth={400}>
         <Heading P1>#1 MINK:</Heading>
         <Heading V2>
            Who is there a picture of in the employee bathroom?
         </Heading>
         <MinkAnswerContainer>
            <Icon size={40}>lock</Icon>
            <MinkAnswer P1 B_5 flex>
               (one word / no spaces)
            </MinkAnswer>
         </MinkAnswerContainer>
         <Section P3 flex>
            <Icon size={40}>thumb_up</Icon>
            <PeopleContainer>
               <Text P2>+89%</Text>
               <Text flex bold fontSize="12px">
                  (<Icon size={20}>person</Icon> 32)
               </Text>
            </PeopleContainer>
            <Icon size={40}>thumb_down</Icon>
         </Section>
         <Text S1>U.S. PATENT NO. 8,904,502</Text>
      </Section>
   );
}
