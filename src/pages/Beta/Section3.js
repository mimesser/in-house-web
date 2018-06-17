import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const MinkAnswerContainer = styled.div`
   color: ${props => props.theme.A_5};
   display: inline-flex;
   align-items: center;
   height: 50px;
   i {
      font-size: 40px;
   }
`;

const MinkAnswer = styled.div`
   ${props => props.theme.P1}
   background-color: ${props => props.theme.A_5};
   display: flex;
   align-items: center;
   padding: 0 30px;
   margin-left: 10px;
   height: 100%;
`;

const RatingContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   color: ${props => props.theme.A_4};
   margin: 30px 0 20px;
   i {
      font-size: 40px;
   }
`;

const PeopleContainer = styled.div`
   margin: 0 20px;
`;

const Percentage = styled.div`
   ${props => props.theme.P2};
`;

const People = styled.div`
   font-size: 10pt;
   font-weight: bold;
   display: flex;
   align-items: center;
   i {
      font-size: 12pt;
   }
`;

export default function Section3() {
   return (
      <Card centerAlign color="A_6" maxWidth={400}>
         <h4 className="P1">#1 MINK:</h4>
         <h3 className="V2">
            Who is there a picture of in the employee bathroom?
         </h3>
         <MinkAnswerContainer>
            <i className="material-icons">lock</i>
            <MinkAnswer>
               (one word / no spaces)
            </MinkAnswer>
         </MinkAnswerContainer>
         <RatingContainer>
            <i className="material-icons">thumb_up</i>
            <PeopleContainer>
               <Percentage>+89%</Percentage>
               <People>
                  (<i className="material-icons">person</i> 32)
               </People>
            </PeopleContainer>
            <i className="material-icons">thumb_down</i>
         </RatingContainer>
         <div className="S1">U.S. PATENT NO. 8,904,502</div>
      </Card>
   );
}
