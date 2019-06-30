import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ArrowRight } from 'styled-icons/evil/ArrowRight';

import { Input, Heading, Loader } from '../../atoms';
import { Patent } from '../../molecules';
import {
   answerTopMink,
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
import { normalizeAnswer } from '../Venue/normalizeAnswer';

// TODO: move this form to Venue?

const Form = ({ topMink, wrongAnswer, answerTopMink }) => {
   const [answer, setAnswer] = useState('');
   const [showError, setShowError] = useState(false);

   const handleSubmit = e => {
      e.preventDefault();
      if (answer) {
         answerTopMink(answer);
         setShowError(true);
      }
   };

   const handleChange = e => {
      setAnswer(normalizeAnswer(e.target.value));
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

const InsiderQuestionChallenge = ({ venue: { name, topMink }, challengeFormData, dismissForm, answerTopMink }) => {
   const { blocked, isAnswerCorrect } = challengeFormData || {};
   const wrongAnswer = isAnswerCorrect === false;
   const accessGranted = challengeFormData && challengeFormData.isAnswerCorrect;

   return (
      <Modal
         inverse
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
                     {!blocked && <Form topMink={topMink} wrongAnswer={wrongAnswer} answerTopMink={answerTopMink} />}
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
   answerTopMink,
   dismissForm: dismissChallengeForm,
};

export default connect(
   mapState,
   mapDispatch,
)(InsiderQuestionChallenge);
