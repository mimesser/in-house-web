import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { H1, H3, Loader, ToolTip, HelpTip, Patent, Button, Icon } from '../../atoms';
import { WinkConfirmation } from '../../molecules';
import {
  answerTopMink,
  dismissChallengeForm,
  dismissPollChallengeForm,
  selectSelectedVenue,
  selectInsiderChallengeForm,
} from '../../../store/venues';
import { Answer, SubmitButton, QuestionForm, InputHelp, AnswerInput, Try } from './style';
import { ModalHeader } from '../Modal/style';
import { Modal } from '../Modal';
import { normalizeAnswer } from '../Venue/normalizeAnswer';
import AcceptTerms from './AcceptTerms';
import { selectInDemo, getDefaultTopMink } from '../../../store/demo';
import { useOutsideClick, useTimeout } from '../../../utils';
import { calcRem, palette, spacing, breakpoints } from '../../../style';

// TODO: move this to Venue?
const Heading = styled(H1).attrs(({ title }) => ({
  children: <>{title}</>,
}))`
  position: relative;
  margin: ${spacing.lg} 0;
  margin-bottom: ${spacing.md};
  baackground-color: blue;
  ${Patent} {
    margin: 0;
    color: ${palette.gray};
    display: block;
    @media screen and (min-width: ${breakpoints.lg}) {
      position: absolute;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }
`;

const StyledModalHeader = styled(H3)`
  margin-top: ${calcRem('100px')};
  margin-bottom: ${spacing.sm};
  padding: 0px;
  align-items: center;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: ${palette.gray};
`;

const StyledChangeButton = styled(Button)`
  padding-left: 0px;

  > ${Icon} {
    margin-left: ${spacing.xl};
  }
`;

export const StyledQuestionForm = styled(QuestionForm)`
  ${H1} {
    margin-top: ${spacing.md};
    margin-bottom: ${spacing.xl};
    color: ${palette.white};
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
        <Heading title="password" />
      </HelpTip>
      {inDemo && <TopMinkToolTip />}
      <Answer onSubmit={handleSubmit}>
        {/* TODO: use form group with sub text */}
        <AnswerInput
          autocomplete="off"
          spellcheck="false"
          value={answer}
          onChange={handleChange}
          type="password"
          ref={answerRef}
          icon={highlightError ? 'winky-circle-sad' : undefined}
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
      title=""
    >
      {showTerms ? (
        <AcceptTerms />
      ) : (
        <>
          <StyledQuestionForm>
            {isAnswerCorrect ? (
              <WinkConfirmation />
            ) : (
              <>
                <StyledModalHeader>{name}</StyledModalHeader>
                {blocked && <p>Too many attempts. Please come back later</p>}
                {!blocked && (
                  <Form topMink={topMink} wrongAnswer={wrongAnswer} answerTopMink={answerTopMink} inDemo={inDemo} />
                )}
                <HelpTip tip="create or vote for another MINK you think will better verify your team" placement="top">
                  <StyledChangeButton icon="arrow-right" onClick={() => dismissForm(true)} wide>
                    contact us for password
                  </StyledChangeButton>
                </HelpTip>
              </>
            )}
          </StyledQuestionForm>
        </>
      )}
    </Modal>
  );
};

const mapState = createStructuredSelector({
  venue: selectSelectedVenue,
  challengeFormData: selectInsiderChallengeForm,
  inDemo: selectInDemo,
});

const mapPollDispatch = {
  answerTopMink,
  dismissForm: dismissPollChallengeForm,
};

export default connect(mapState, mapPollDispatch)(InsiderChallenge);
