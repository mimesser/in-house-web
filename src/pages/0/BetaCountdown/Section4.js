import React from 'react';
import styled from 'styled-components';
import { Section, Typography } from 'components';

const Content = styled(Typography)`
   margin-bottom: 30px;
   display: block;
`;
const Heading = styled(Typography)`
   text-align: center;
   margin-bottom: 30px;
`;

export default function Sectio4() {
   return (
      <Section container maxWidth={600}>
         <Heading L5>
            totally safe
         </Heading>

         <Typography L2>
            Will my boss know it's me?
         </Typography>
         <Content L1>
            No. We don't take names or even emails.
         </Content>

         <Typography L2>
            How can I know it's just me & my team talking?
         </Typography>
         <Content L1>
            Because we use <em>"minks"</em> - patented insider password
            questions using your shared knowledge to verify you.
         </Content>

         <Typography L2>
            Can everyone see our feedback?
         </Typography>
         <Content L1>
            No. Only bosses & <em>"insiders"</em> (who can answer your
            job's 'mink') can get access so opinions stay IN-HOUSE.
         </Content>

         <Typography L2>
            Does my boss control this?
         </Typography>
         <Content L1>
            No. Organizations can't control or dictate anything.
            They're only given access after insiders start talking.
         </Content>
      </Section>
   );
}
