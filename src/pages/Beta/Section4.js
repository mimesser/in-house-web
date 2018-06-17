import React from 'react';
import styled from 'styled-components';
import { Heading, Section, Text } from 'components';

const Content = styled(Text)`
   margin-bottom: 30px;
   display: block;
`;

export default function Sectio4() {
   return (
      <Section container maxWidth={600}>
         <Heading L5>
            totally safe
         </Heading>

         <Heading L2>
            Will my boss know it's me?
         </Heading>
         <Content L1>
            No. We don't take names or even emails.
         </Content>

         <Heading L2>
            How can I know it's just me & my team talking?
         </Heading>
         <Content L1>
            Because we use <em>"minks"</em> - patented insider password
            questions using your shared knowledge to verify you.
         </Content>

         <Heading L2>
            Can everyone see our feedback?
         </Heading>
         <Content L1>
            No. Only bosses & <em>"insiders"</em> (who can answer your
            job's 'mink') can get access so opinions stay IN-HOUSE.
         </Content>

         <Heading L2>
            Does my boss control this?
         </Heading>
         <Content L1>
            No. Organizations can't control or dictate anything.
            They're only given access after insiders start talking.
         </Content>
      </Section>
   );
}
