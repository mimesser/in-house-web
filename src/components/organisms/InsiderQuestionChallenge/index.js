import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ArrowRight } from 'styled-icons/evil/ArrowRight';

import Link from 'next/link';
import { Input, Heading, Loader, Button } from '../../atoms';
import { Patent } from '../../molecules';
import {
   answerMink,
   dismissChallengeForm,
   selectSelectedVenue,
   selectInsiderChallengeForm,
} from '../../../store/venues';
import {
   Answer,
   SubmitButton,
   ChangeButton,
   HouseTitle,
   Question,
   QuestionForm,
   ValidationError,
   Confirmation,
} from './style';
import { Modal } from '../Modal';

const Form = ({ topMink, wrongAnswer, answerMink }) => {
   const [answer, setAnswer] = useState('');
   const [showError, setShowError] = useState(false);

   const handleSubmit = e => {
      e.preventDefault();
      if (answer) {
         answerMink(answer);
         setShowError(true);
      }
   };

   const handleChange = e => {
      setAnswer(e.target.value.toLowerCase().trim());
      setShowError(false);
   };

   return topMink ? (
      <>
         <Question>{topMink.question}</Question>
         <Answer onSubmit={handleSubmit}>
            <div>
               <Input
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="One word / no spaces"
                  value={answer}
                  onChange={handleChange}
               />
               <SubmitButton visible={!!answer.length}>
                  {showError && !wrongAnswer ? <Loader white /> : <ArrowRight size={44} />}
               </SubmitButton>
            </div>
            {wrongAnswer && showError && <ValidationError>Wrong answer</ValidationError>}
         </Answer>
      </>
   ) : (
      <Loader white big />
   );
};

const InsiderQuestionChallenge = ({ venue: { id, name, topMink }, challengeFormData, dismissForm, answerMink }) => {
   const { blocked, isAnswerCorrect } = challengeFormData || {};
   const wrongAnswer = isAnswerCorrect === false;
   const accessGranted = challengeFormData && challengeFormData.isAnswerCorrect;

   return (
      <Modal
         open={!!challengeFormData}
         closeModal={dismissForm}
         canDismiss={!accessGranted}
         canClose={!!challengeFormData && !accessGranted}
      >
         {challengeFormData ? (
            <QuestionForm>
               <HouseTitle>{name}</HouseTitle>
               {isAnswerCorrect ? (
                  <Confirmation>,)</Confirmation>
               ) : (
                  <>
                     <Heading>insider?</Heading>
                     <p>
                        prove it by this #1 <strong>MINK</strong>
                        <Patent />
                     </p>
                     {/* TODO error text and styling */}
                     {blocked && <p>Too many attempts. Please come back later</p>}
                     {!blocked && <Form topMink={topMink} wrongAnswer={wrongAnswer} answerMink={answerMink} />}
                     <ChangeButton onClick={dismissForm}>change this question</ChangeButton>
                  </>
               )}
            </QuestionForm>
         ) : null}
      </Modal>
   );
};

const mapState = createStructuredSelector({
   venue: selectSelectedVenue,
   challengeFormData: selectInsiderChallengeForm,
});
const mapDispatch = {
   answerMink,
   dismissForm: dismissChallengeForm,
};

export default connect(
   mapState,
   mapDispatch,
)(InsiderQuestionChallenge);
