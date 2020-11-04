import React, { useState, useRef, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { H1, Loader, ToolTip, HelpTip, Patent, Card, Icon } from '../../atoms';
import { WinkConfirmation } from '../../molecules';
import {
  answerTopMink,
  dismissChallengeForm,
  selectSelectedVenue,
  selectInsiderChallengeForm,
  tryAnswerMink,
  setSelectedMink,
  selectAnswerMinkStatus,
  setChallengeFormData,
} from '../../../store/venues';
import { Answer, SubmitButton, ChangeButton, QuestionForm, InputHelp, AnswerInput, Try } from './style';
import { Modal } from '../Modal';
import { normalizeAnswer } from '../Venue/normalizeAnswer';
import AcceptTerms from './AcceptTerms';
import { selectInDemo, getDefaultTopMink } from '../../../store/demo';
import { useOutsideClick, useTimeout } from '../../../utils';
import { palette, spacing, breakpoints, fontSize, font } from '../../../style';
import PrivateShareButton from '../Venue/PrivateShareButton';
import PrivateShare from '../Venue/PrivateShare';
import { ItemTitle, ItemTime } from '../Venue/tabStyle';
import { formatDateTime, formatRating } from '../../../utils/format';
import { Votes } from '../Venue/Votes';

const InlineFlex = styled.div`
  display: flex;

  ${Votes} span:last-child {
    line-height: 1;
  }
`;

const Push = styled.span`
  margin-left: auto;
`;

// TODO: move this to Venue?
const Heading = styled(H1).attrs(({ title }) => ({
  children: (
    <>
      <InlineFlex>
        {title}
        <Push />
        <PrivateShareButton type="mink" color={palette.offWhite} size={1.5} />
      </InlineFlex>
      <Patent />
    </>
  ),
}))`
  position: relative;

  ${Patent} {
    margin: ${spacing.xs} 0;
    color: ${palette.gray};
  }
`;

const PaddedSpan = styled.span`
  padding-left: ${({ left }) => spacing[left]};
`;

const AnswerStatusWrap = styled.div`
  padding-top: ${spacing.sm};
`;

const TopMinkContainer = styled.div`
  background-color: ${palette.primary};
  margin: ${spacing.xl} 0;
  color: ${palette.offWhite};

  ${Card} {
    background-color: ${palette.primary};
    margin-bottom: 0;

    > *:not(:last-child) {
      padding-bottom: ${spacing.md};
    }
  }
  ${Card}:first-child {
    padding: ${spacing.lg} ${spacing.xl};
  }
  ${Card}:last-child {
    padding: ${spacing.xxl} ${spacing.xxxl};

    ${InlineFlex} {
      align-items: baseline;

      ${PaddedSpan}:last-child {
        ${font.bold};
      }
    }
    ${ItemTime} {
      align-self: flex-start;
    }
  }
  ${ItemTitle} {
    color: ${palette.offWhite};
  }
`;

const TopMinkTitle = styled.div`
  display: flex;
  align-items: flex-end;
  text-transform: uppercase;
  font-size: ${fontSize.xs};

  ${Patent} {
    text-transform: lowercase;
    color: ${palette.gray};
  }
`;

const Subtitle = styled.div`
  font-size: ${fontSize.xs};
  color: ${palette.gray};
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

const Form = ({
  houseId,
  topMink,
  wrongAnswer,
  answerTopMink,
  inDemo,
  name,
  tryAnswerMink,
  answerStatus,
  setSelectedMink,
  setChallengeFormData,
}) => {
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

  const getTitleForShare = useCallback(() => name, []);
  const renderSharePreview = useCallback(() => {
    const [answer, setAnswer] = useState('');
    const minkId = topMink.id;
    const answeredCorrectly = answerStatus && !!answerStatus.isAnswerCorrect;

    useEffect(() => {
      setSelectedMink(minkId);
    }, []);

    useEffect(
      () => () => {
        if (answeredCorrectly) {
          answerTopMink(answer);
        }
      },
      [answeredCorrectly],
    );

    const tryAnswer = useCallback((e) => {
      const value = normalizeAnswer(e.currentTarget.value);
      setAnswer(value);
      tryAnswerMink(houseId, minkId, value);
    }, []);

    const renderInputIcon = (status, answeredCorrectly, answer) => {
      if (status && answer) {
        const { loading, isAnswerCorrect } = status;
        if (loading) return null;

        return <Icon icon={isAnswerCorrect ? 'winky-circle' : 'winky-circle-sad'} color="primaryLight" size={1.5} />;
      }

      if (answeredCorrectly) return <Icon icon="winky-circle" color="primaryLight" size={1.5} />;

      return null;
    };

    const AnswerStatus = ({ status }) => {
      if (status) {
        const { loading, isAnswerCorrect } = status;
        if (loading) return <Loader white />;

        return <div>{isAnswerCorrect ? 'correct answer!' : 'wrong answer'}</div>;
      }

      return null;
    };

    return (
      <TopMinkContainer>
        <Card>
          <TopMinkTitle>
            <span>top mink</span>
            <Push />
            <Patent />
          </TopMinkTitle>
          <Subtitle>the top mink at any time verifies insiders</Subtitle>
        </Card>

        <Card>
          <InlineFlex>
            <ItemTime>{formatDateTime(topMink.created)}</ItemTime>
            <Push />
            <InlineFlex>
              <Votes count={topMink.voteCount} inverse iconSize={0.6} />
              {topMink.voteCount ? (
                <span>
                  <PaddedSpan left="md">/</PaddedSpan>
                  <PaddedSpan left="md">{formatRating(topMink.voteRating)}</PaddedSpan>
                </span>
              ) : (
                <PaddedSpan left="sm">Insiders</PaddedSpan>
              )}
            </InlineFlex>
          </InlineFlex>
          <ItemTitle>{topMink.question}</ItemTitle>
          <Answer onSubmit={(e) => e.preventDefault()}>
            <AnswerInput
              placeholder="one word / no spaces"
              autocomplete="off"
              spellcheck="false"
              value={answer}
              onChange={tryAnswer}
              readOnly={answeredCorrectly}
              icon={renderInputIcon(answerStatus, answeredCorrectly, answer)}
            />
            {answer && (
              <AnswerStatusWrap>
                <AnswerStatus status={answerStatus} />
              </AnswerStatusWrap>
            )}
          </Answer>
        </Card>
      </TopMinkContainer>
    );
  }, [answerStatus]);

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
      <PrivateShare type="mink" renderItem={renderSharePreview} getItemTitle={getTitleForShare} />
    </>
  );
};

const InsiderChallenge = ({
  venue: { name, topMink, id: houseId, answerMinkStatus: answerStatus, industry: { lite }},
  challengeFormData,
  dismissForm,
  answerTopMink,
  inDemo,
  tryAnswerMink,
  setSelectedMink,
  setChallengeFormData,
}) => {
  if (!challengeFormData || !topMink) {
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
      <QuestionForm>
        {isAnswerCorrect ? (
          <WinkConfirmation />
        ) : (
          <>
            {blocked && <p>Too many attempts. Please come back later</p>}
            {!blocked && (
              <Form
                houseId={houseId}
                topMink={topMink}
                wrongAnswer={wrongAnswer}
                answerTopMink={answerTopMink}
                inDemo={inDemo}
                name={name}
                tryAnswerMink={tryAnswerMink}
                answerStatus={answerStatus}
                setSelectedMink={setSelectedMink}
                setChallengeFormData={setChallengeFormData}
              />
            )}
            <HelpTip tip="create or vote for another MINK you think will better verify your team" placement="top">
              <ChangeButton icon="arrow-right" onClick={() => dismissForm(true, name, lite)}>
                choose better question?
              </ChangeButton>
            </HelpTip>
          </>
        )}
      </QuestionForm>
    </Modal>
  );
};

const mapState = createStructuredSelector({
  venue: selectSelectedVenue,
  challengeFormData: selectInsiderChallengeForm,
  inDemo: selectInDemo,
  answerStatus: selectAnswerMinkStatus,
});

const mapDispatch = {
  answerTopMink,
  dismissForm: dismissChallengeForm,
  tryAnswerMink,
  setSelectedMink,
  setChallengeFormData,
};

export default connect(mapState, mapDispatch)(InsiderChallenge);
