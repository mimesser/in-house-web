import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const Content = styled.div`
   .L1 {
      margin-bottom: 30px;
   }
`;

export default function Sectio4() {
   return (
      <Card maxWidth={600}>
         <Content>
            <h2 className="L5">
               totally safe
            </h2>

            <h4 className="L2">
               Will my boss know it's me?
            </h4>
            <div className="L1">
               No. We don't take names or even emails.
            </div>

            <h4 className="L2">
               How can I know it's just me & my team talking?
            </h4>
            <div className="L1">
               Because we use <em>"minks"</em> - patented insider password
               questions using your shared knowledge to verify you.
            </div>

            <h4 className="L2">
               Can everyone see our feedback?
            </h4>
            <div className="L1">
               No. Only bosses & <em>"insiders"</em> (who can answer your
               job's 'mink') can get access so opinions stay IN-HOUSE.
            </div>

            <h4 className="L2">
               Does my boss control this?
            </h4>
            <div className="L1">
               No. Organizations can't control or dictate anything.
               They're only given access after insiders start talking.
            </div>
         </Content>
      </Card>
   );
}
