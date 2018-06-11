import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const Content = styled.div`
   li {
      display: flex;
      margin-bottom: 30px;
   }
`;

const Number = styled.div`
   ${props => props.theme.L5};
   line-height: 1em;
   margin-right: 20px;
`;

export default function Sectio5() {
   return (
      <Card maxWidth={600}>
         <Content>
            <h2 className="L5">
               how it works
            </h2>

            <ol>
               <li>
                  <Number>1.</Number>
                  <div>
                     <span className="L2">List your job</span>
                     <span className="L1">
                        - including a password question that only you
                        & your team will know the answer to
                     </span>
                  </div>
               </li>

               <li>
                  <Number>2.</Number>
                  <div>
                     <span className="L2">Alert your team</span>
                     <span className="L1">
                        - so only insiders who can answer the most
                        popular password question can rate your workplace.
                     </span>
                  </div>
               </li>

               <li>
                  <Number>3.</Number>
                  <div>
                     <span className="L2">Rate & post</span>
                     <span className="L1">
                        - what bosses & teammates need to know with 100%
                        anonymity.
                     </span>
                  </div>
               </li>
            </ol>
         </Content>
      </Card>
   );
}
