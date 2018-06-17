import React from 'react';
import styled from 'styled-components';
import { Heading, Section, Text } from 'components';

const Li = styled.li`
   display: flex;
   margin-bottom: 30px;
`;

const Number = styled.div`
   ${props => props.theme.L5};
   line-height: 1em;
   margin-right: 20px;
`;

export default function Section5() {
   return (
      <Section container maxWidth={600}>
         <Heading L5>
            how it works
         </Heading>

         <ol>
            <Li>
               <Number>1.</Number>
               <div>
                  <Text L2>List your job</Text>
                  <Text L1>
                     - including a password question that only you
                     & your team will know the answer to
                  </Text>
               </div>
            </Li>

            <Li>
               <Number>2.</Number>
               <div>
                  <Text L2>Alert your team</Text>
                  <Text L1>
                     - so only insiders who can answer the most
                     popular password question can rate your workplace.
                  </Text>
               </div>
            </Li>

            <Li>
               <Number>3.</Number>
               <div>
                  <Text L2>Rate & post</Text>
                  <Text L1>
                     - what bosses & teammates need to know with 100%
                     anonymity.
                  </Text>
               </div>
            </Li>
         </ol>
      </Section>
   );
}
