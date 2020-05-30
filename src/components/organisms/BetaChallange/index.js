import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Router from 'next/router';
import { createStructuredSelector } from 'reselect';
import { Button, HelpTip, H1, ClearButton } from '../../atoms';
import {
  Answer,
  SubmitButton,
  ChangeButton,
  QuestionForm,
  InputHelp,
  AnswerInput,
  Try,
} from '../InsiderChallenge/style';
import { WinkConfirmation } from '../../molecules';
import { Modal } from '../Modal';
import { spacing, font } from '../../../style';
import { normalizeAnswer } from '../Venue/normalizeAnswer';

import {
  checkBetaAuth,
  selectBetaWrongAnswer,
  selectAuthorizedBetaUser,
  performBetaAuthRedirect,
} from '../../../store/aggregate';

export const BetaLink = styled(Button)`
  margin-top: ${spacing.sm};
  min-height: 42px;
  border: none;
`;

const BetaList = styled(BetaLink)`
  margin-top: ${spacing.xxxl};
  padding-left: 0;
  padding-right: 0;
  padding-top: ${spacing.md};
  text-align: left;
`;

export const BetaDesc = styled.div`
  mark {
    text-decoration: underline;
    background: none;
    color: currentColor;

    margin-top: 280px;
    ${font.bold};
  }
`;

const Heading = styled(H1).attrs(({ title }) => ({
  children: <>{title}</>,
}))`
  position: relative;
  margin-top: auto;
`;

export const ExitButton = styled(ClearButton).attrs({
  children: <BetaDesc>exit</BetaDesc>,
})`
  margin-right: auto;
  margin-bottom: ${spacing.md};
`;

const Form = ({ checkBetaAuth, wrongAnswer, ...props }) => {
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const answerRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password) {
      checkBetaAuth(password);
      setShowError(true);
      answerRef.current.focus();
    }
  };
  const handleChange = (e) => {
    setPassword(normalizeAnswer(e.target.value));
    setShowError(false);
  };

  return (
    <>
      <HelpTip tip="#1 MINK (n): the most popular team password question" placement="top">
        <Heading title="beta password" />
      </HelpTip>

      <Answer onSubmit={handleSubmit}>
        {/* TODO: use form group with sub text */}
        <AnswerInput
          autocomplete="off"
          spellcheck="false"
          value={password}
          onChange={handleChange}
          ref={answerRef}
          placeholder="password"
          type="password"
          icon={wrongAnswer ? 'close' : undefined}
        />
        <InputHelp>one word / no spaces</InputHelp>
        <SubmitButton disabled={!password.length}>{wrongAnswer && showError ? 'wrong answer' : 'enter'}</SubmitButton>
      </Answer>
    </>
  );
};
export const BetaChallange = ({
  checkBetaAuth,
  wrongAnswer,
  isAuthorizedBetaUser,
  performBetaAuthRedirect,
  showPopup = false,
  onClose,
  ...props
}) => {
  const [show, setShow] = useState(showPopup);
  const [accessGranted, setAccessGranted] = useState(wrongAnswer === false || isAuthorizedBetaUser);
  const open = useCallback(() => {
    setShow(true);
    setAccessGranted(!wrongAnswer || isAuthorizedBetaUser);
    if (accessGranted) {
      performBetaAuthRedirect();
    }
  }, []);
  const close = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      setShow(false);
    }
  }, []);

  return (
    <>
      {show && (
        <Modal inverse closeModal={close} canDismiss canClose={wrongAnswer !== false} title="">
          <QuestionForm>
            {wrongAnswer === false ? (
              <WinkConfirmation />
            ) : (
              <>
                <Form wrongAnswer={wrongAnswer} checkBetaAuth={checkBetaAuth} />
              </>
            )}

            <BetaList icon="arrow-right" href="/beta-list">
              request to list your workplace
            </BetaList>
          </QuestionForm>

          {wrongAnswer !== false ? <ExitButton onClick={close} /> : undefined}
        </Modal>
      )}
    </>
  );
};

const mapState = createStructuredSelector({
  wrongAnswer: selectBetaWrongAnswer,
  isAuthorizedBetaUser: selectAuthorizedBetaUser,
});

const mapDispatch = {
  checkBetaAuth,
  performBetaAuthRedirect,
};

export default connect(mapState, mapDispatch)(BetaChallange);
