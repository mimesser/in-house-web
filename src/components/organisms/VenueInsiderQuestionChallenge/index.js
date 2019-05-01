import React, { useState, Suspense } from 'react';
import styled from 'styled-components';

import postVenuesTopMinkAnswer from './post-venues-top-mink-answer';
import fetchVenuesTopMink from './fetch-venues-top-mink';
import { Input, Container } from '../../atoms';

export const StyledSection = styled(Container)`
   background-color: black;
   color: white;
   min-height: 99vh;
   min-width: 99vw;
   padding: 2em;

   h1,
   h2,
   h3 {
      color: white;
   }
`;

export const StyledSpan = styled.span`
   border: 3px solid white;
   border-radius: 50px;
   color: white;
   background: black;
   font-size: 1.25em;
   padding: 0.5em 1em;
   margin-left: 1em;
`;

export const StyledButtonWithBorder = styled.button`
   border: 3px solid white;
   border-radius: 50px;
   color: white;
   background: black;
   padding: 1em 3em;
`;

export const StyledButtonWithoutBorder = styled.button`
   border: 0;
   color: white;
   background: black;
   padding: 1em 3em;
`;

const cache = {};

function InsiderMink({ venueId }) {
   const topMink = cache[venueId];
   let minkId = null;

   if (topMink === undefined) {
      const promise = fetchVenuesTopMink(venueId).then(
         p => (cache[venueId] = p), // eslint-disable-line
      );
      throw promise;
   }
   minkId = topMink.id;

   return <span>{topMink.question || 'Unknown'}</span>;
}

export function VenueInsiderQuestionChallenge({ venue }) {
   if (!venue) {
      return false;
   }
   const [minkAnswer, setMinkAnswer] = useState('');
   const [answerAttempts, setAnswerAttempts] = useState(0);

   return (
      <StyledSection>
         <section className="container">
            <Suspense fallback={<div>loading...</div>}>
               <div className="row">
                  <h2>{venue.name}</h2>
               </div>
               <div className="row">
                  <h1>insider?</h1>
               </div>
               <div className="row">
                  <h3>prove it by answering this #1 MINK.</h3>
               </div>
               <div className="row">U.S. patent no. 8,904,502</div>
               <div className="row">
                  <h1>
                     <InsiderMink venueId={venue.id} />
                  </h1>
               </div>
               <div
                  className="row"
                  style={{
                     display: answerAttempts === 5 ? 'none' : 'flex',
                  }}
               >
                  <Input
                     className="col-lg-10"
                     style={{
                        color: 'black',
                     }}
                     placeholder="One word / no spaces"
                     value={minkAnswer}
                     onChange={evt => setMinkAnswer(evt.target.value)}
                  />
                  <StyledSpan
                     className="col"
                     onClick={() => {
                        postVenuesTopMinkAnswer(minkAnswer);
                        setAnswerAttempts(answerAttempts + 1);
                     }}
                  >
                     ?
                  </StyledSpan>
               </div>
               <div className="row" style={{ marginTop: '3em' }}>
                  <StyledButtonWithBorder>vote better MINK</StyledButtonWithBorder>
                  <StyledButtonWithoutBorder>owner?</StyledButtonWithoutBorder>
               </div>
            </Suspense>
         </section>
      </StyledSection>
   );
}
