import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ArrowRight } from 'styled-icons/evil/ArrowRight';

import { Input, Heading, Paragraph, Loader, IconButton } from '../../atoms';
import { Patent } from '../../molecules';
import { answerMink, selectSelectedVenue, selectMinkAnswerStatus } from '../../../store/venues';
import { Answer, ChangeButton, HouseTitle, Question, QuestionForm, ValidationError, Confirmation } from './style';

function InsiderQuestionChallenge({ venue: { name, topMink }, answerStatus = {}, answerMink }) {
   const [answer, setAnswer] = useState('');

   const { blocked, isAnswerCorrect } = answerStatus;
   const wrongAnswer = isAnswerCorrect === false;

   return topMink ? (
      <QuestionForm>
         <HouseTitle>{name}</HouseTitle>
         {isAnswerCorrect ? (
            <Confirmation>,)</Confirmation>
         ) : (
            <>
               <Heading noMargin>insider?</Heading>
               <Paragraph spaceAbove noMargin>
                  prove it by this #1 <strong>MINK</strong>
               </Paragraph>
               <Patent />
               {/* TODO error text and styling */}
               {blocked && <p>Too many attempts. Please come back later</p>}
               {!blocked && (
                  <>
                     <Question>{topMink.question}</Question>
                     <Answer>
                        <Input
                           autocomplete="off"
                           spellcheck="false"
                           placeholder="One word / no spaces"
                           value={answer}
                           onChange={evt => setAnswer(evt.target.value.toLowerCase())}
                        />
                        {answer.length ? (
                           <IconButton onClick={() => answerMink(answer)}>
                              <ArrowRight size={44} />
                           </IconButton>
                        ) : null}
                     </Answer>
                     {wrongAnswer && <ValidationError>Wrong answer</ValidationError>}
                  </>
               )}
               <ChangeButton>change this question</ChangeButton>
            </>
         )}
      </QuestionForm>
   ) : (
      <Loader white big />
   );
}

const mapState = createStructuredSelector({
   venue: selectSelectedVenue,
   answerStatus: selectMinkAnswerStatus,
});
const mapDispatch = {
   answerMink,
};

export default connect(
   mapState,
   mapDispatch,
)(InsiderQuestionChallenge);
