import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ArrowRight } from 'styled-icons/feather/ArrowRight';

import { Heading, Loader } from '../../atoms';
import { Patent, WinkConfirmation } from '../../molecules';
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
  Question,
  QuestionForm,
  InputHelp,
  ExplainMink,
  AnswerInput,
} from './style';
import { Modal } from '../Modal';
import { normalizeAnswer } from '../Venue/normalizeAnswer';
import AcceptTerms from './AcceptTerms';

// TODO: move this to Venue?

const Form = ({ topMink, wrongAnswer, answerTopMink }) => {
  const [answer, setAnswer] = useState('');
  const [showError, setShowError] = useState(false);
  const answerRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (answer) {
      answerTopMink(answer);
      setShowError(true);
      answerRef.current.focus();
    }
  };

  const handleChange = e => {
    setAnswer(normalizeAnswer(e.target.value));
    setShowError(false);
  };

  const highlightError = wrongAnswer && showError;

  return topMink ? (
    <>
      <Question>{topMink.question}</Question>
      <Answer onSubmit={handleSubmit}>
        <div>
          <AnswerInput
            autocomplete="off"
            spellcheck="false"
            value={answer}
            onChange={handleChange}
            strike={highlightError}
            ref={answerRef}
          />
          <SubmitButton visible={!!answer.length}>
            {showError && !wrongAnswer ? <Loader white /> : !highlightError && <ArrowRight size={44} />}
          </SubmitButton>
        </div>
        <InputHelp highlight={highlightError}>{highlightError ? 'wrong answer' : 'one word / no spaces'}</InputHelp>
      </Answer>
    </>
  ) : (
    <Loader white big />
  );
};

const renderSubview = (name, isAnswerCorrect, blocked, topMink, wrongAnswer, answerTopMink, dismissForm, showTerms) =>
  showTerms ? (
    <AcceptTerms />
  ) : (
    <QuestionForm>
      {isAnswerCorrect ? (
        <WinkConfirmation />
      ) : (
        <>
          <Heading>insider?</Heading>
          <ExplainMink>
            answer the #1 MINK<sup>©</sup>
            <Patent />
          </ExplainMink>
          {blocked && <p>Too many attempts. Please come back later</p>}
          {!blocked && <Form topMink={topMink} wrongAnswer={wrongAnswer} answerTopMink={answerTopMink} />}
          <ChangeButton onClick={() => dismissForm(true)}>change this question</ChangeButton>
        </>
      )}
    </QuestionForm>
  );

const InsiderQuestionChallenge = ({ venue: { name, topMink }, challengeFormData, dismissForm, answerTopMink }) => {
  const { blocked, isAnswerCorrect, showTerms } = challengeFormData || {};
  const wrongAnswer = isAnswerCorrect === false;
  const accessGranted = challengeFormData && challengeFormData.isAnswerCorrect;

  return (
    <Modal
      inverse={!showTerms}
      open={!!challengeFormData}
      closeModal={dismissForm}
      canDismiss={!accessGranted && !showTerms}
      canClose={!!challengeFormData && !accessGranted && !showTerms}
      title={showTerms ? undefined : name}
    >
      {challengeFormData
        ? renderSubview(name, isAnswerCorrect, blocked, topMink, wrongAnswer, answerTopMink, dismissForm, showTerms)
        : null}
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
