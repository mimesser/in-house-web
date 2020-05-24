import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { H1, Loader, ToolTip, HelpTip, Patent } from '../../atoms';
import { WinkConfirmation } from '../../molecules';
import {
  answerTopMink,
  dismissChallengeForm,
  selectSelectedVenue,
  selectInsiderChallengeForm,
} from '../../../store/venues';
import { Answer, SubmitButton, ChangeButton, QuestionForm, InputHelp, AnswerInput, Try } from './style';
import { Modal } from '../Modal';
import { normalizeAnswer } from '../Venue/normalizeAnswer';
import AcceptTerms from './AcceptTerms';
import { selectInDemo, getDefaultTopMink } from '../../../store/demo';
import { useOutsideClick, useTimeout } from '../../../utils';
import { calcRem, palette } from '../../../style';

// TODO: move this to Venue?
const Heading = styled(H1).attrs(({ title }) => ({
  children: (
    <>
      {title}
      <Patent />
    </>
  ),
}))`
  position: relative;
  ${Patent} {
    position: absolute;
    right: 0;
    bottom: 0;
    color: ${palette.gray};
  }
`;

const TopMinkToolTip = () => {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef(null);

  useTimeout(1000, () => setOpen(true));
  useOutsideClick(tooltipRef, () => setOpen(false));

  return (
    <ToolTip ref={tooltipRef} open={open}>
      <Try>
        <b>try</b> {getDefaultTopMink().answer}
      </Try>
    </ToolTip>
  );
};

const Form = ({ topMink, wrongAnswer, answerTopMink, inDemo }) => {
  const [answer, setAnswer] = useState('');
  const [showError, setShowError] = useState(false);
  const answerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer) {
      answerTopMink(answer);
      setShowError(true);
      answerRef.current.focus();
    }
  };

  const handleChange = (e) => {
    setAnswer(normalizeAnswer(e.target.value));
    setShowError(false);
  };

  const highlightError = wrongAnswer && showError;

  if (!topMink) {
    return <Loader white big />;
  }

  return (
    <>
      <HelpTip tip="#1 MINK (n): the most popular team password question" placement="top">
        <Heading title={topMink.question} />
      </HelpTip>
      {inDemo && <TopMinkToolTip />}
      <Answer onSubmit={handleSubmit}>
        {/* TODO: use form group with sub text */}
        <AnswerInput
          autocomplete="off"
          spellcheck="false"
          value={answer}
          onChange={handleChange}
          ref={answerRef}
          icon={highlightError ? 'close' : undefined}
        />
        <InputHelp>{highlightError ? 'wrong answer!' : 'one word / no spaces'}</InputHelp>
        <SubmitButton disabled={!answer.length}>
          enter
          {showError && !wrongAnswer ? <Loader white /> : !highlightError}
        </SubmitButton>
      </Answer>
    </>
  );
};

const InsiderChallenge = ({ venue: { name, topMink }, challengeFormData, dismissForm, answerTopMink, inDemo }) => {
  if (!challengeFormData) {
    return null;
  }

  const { blocked, isAnswerCorrect, showTerms } = challengeFormData;
  const wrongAnswer = isAnswerCorrect === false;
  const accessGranted = isAnswerCorrect;

  return (
    <Modal
      inverse={!showTerms}
      closeModal={dismissForm}
      canDismiss={!accessGranted && !showTerms}
      canClose={!accessGranted && !showTerms}
      title={`${name} | #1 MINK`}
    >
      {showTerms ? (
        <AcceptTerms />
      ) : (
        <QuestionForm>
          {isAnswerCorrect ? (
            <WinkConfirmation />
          ) : (
            <>
              {blocked && <p>Too many attempts. Please come back later</p>}
              {!blocked && (
                <Form topMink={topMink} wrongAnswer={wrongAnswer} answerTopMink={answerTopMink} inDemo={inDemo} />
              )}
              <HelpTip tip="create or vote for another MINK you think will better verify your team" placement="top">
                <ChangeButton icon="arrow-right" onClick={() => dismissForm(true)}>
                  choose better question?
                </ChangeButton>
              </HelpTip>
            </>
          )}
        </QuestionForm>
      )}
    </Modal>
  );
};

const mapState = createStructuredSelector({
  venue: selectSelectedVenue,
  challengeFormData: selectInsiderChallengeForm,
  inDemo: selectInDemo,
});

const mapDispatch = {
  answerTopMink,
  dismissForm: dismissChallengeForm,
};

export default connect(mapState, mapDispatch)(InsiderChallenge);
