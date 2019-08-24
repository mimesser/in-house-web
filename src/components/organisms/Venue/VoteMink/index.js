import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  downvoteMink,
  selectAnswerMinkStatus,
  selectSelectedMink,
  selectSelectedVenue,
  selectVoteMinkConfirmation,
  setSelectedMink,
  tryAnswerMink,
  upvoteMink,
} from '../../../../store/venues';
import { Modal } from '../../Modal';
import { Icon, Loader } from '../../../atoms';
import { IconInput } from '../../../molecules';
import { formatDate } from '../../../../utils/format';
import { RateConfirmation } from '../RateConfirmation';
import { normalizeAnswer } from '../normalizeAnswer';
import { ItemDate, ItemTitle, Layout, VoteButton } from '../openCardStyle';
import { Status, InputGroup } from './style';

const AnswerStatus = ({ status, previouslyAnsweredCorrectly }) => {
  if (!status) {
    return previouslyAnsweredCorrectly ? <Status>previously answered</Status> : null;
  }

  const { loading, isAnswerCorrect } = status;
  if (loading) {
    return null;
  }
  return <Status>{isAnswerCorrect ? 'correct answer!' : 'wrong answer'}</Status>;
};

const renderInputIcon = (answerStatus, previouslyAnsweredCorrectly) =>
  (!answerStatus && previouslyAnsweredCorrectly) || (answerStatus && answerStatus.isAnswerCorrect) ? (
    <Icon icon="winky" color="primaryLight" size={1.5} />
  ) : null;

const renderStatusIcon = answerStatus => {
  if (!answerStatus) {
    return null;
  }
  const { loading, isAnswerCorrect } = answerStatus;
  if (loading) {
    return <Loader />;
  }
  return <Icon size={1.5} icon={isAnswerCorrect ? 'check' : 'close'} />;
};

const VoteMink = ({
  mink: { created, question, myCorrectAnswer, myVote, id: minkId },
  venue: { id: venueId },
  answerStatus,
  tryAnswerMink,
  upvoteMink,
  downvoteMink,
}) => {
  const [answer, setAnswer] = useState(myCorrectAnswer || '');
  const [answerAttemptMade, setAnswerAttemptMade] = useState(false);
  const tryAnswer = useCallback(e => {
    const value = normalizeAnswer(e.currentTarget.value);
    setAnswer(value);
    tryAnswerMink(venueId, minkId, value);
  }, []);
  useEffect(() => {
    if (answerAttemptMade || !answerStatus || typeof answerStatus.isAnswerCorrect !== 'boolean') {
      return;
    }
    setAnswerAttemptMade(true);
  }, [answerStatus, answerAttemptMade]);

  const canVote = !!myCorrectAnswer || answerAttemptMade || typeof myVote === 'number';
  const previouslyAnsweredCorrectly = !!myCorrectAnswer;

  return (
    <Layout>
      <ItemDate dateTime={created}>{formatDate(created)}</ItemDate>
      <ItemTitle>{question}</ItemTitle>
      <InputGroup>
        <div>
          <IconInput
            placeholder="try answer"
            autocomplete="off"
            spellcheck="false"
            value={answer}
            onChange={tryAnswer}
            icon={renderInputIcon(answerStatus, previouslyAnsweredCorrectly)}
          />
          {renderStatusIcon(answerStatus)}
        </div>
        <AnswerStatus status={answerStatus} previouslyAnsweredCorrectly={previouslyAnsweredCorrectly} />
      </InputGroup>
      <div>
        <VoteButton disabled={!canVote} onClick={upvoteMink} selected={myVote === 1}>
          <Icon size={4} icon="arrow-up-circle" />
        </VoteButton>
        <VoteButton disabled={!canVote} onClick={downvoteMink} selected={myVote === -1}>
          <Icon size={4} icon="arrow-down-circle" />
        </VoteButton>
      </div>
    </Layout>
  );
};

const ModalWrapper = props => {
  const { mink, confirmation, setSelectedMink, venue } = props;
  const close = useCallback(() => {
    setSelectedMink(undefined);
  }, []);

  return (
    <Modal
      open={!!mink}
      closeModal={close}
      canClose={!confirmation}
      canDismiss={!confirmation}
      inverse={mink && confirmation}
      title={venue.name}
    >
      {mink && !confirmation ? <VoteMink {...props} /> : null}
      {mink && confirmation ? <RateConfirmation title={mink.question} {...confirmation} /> : null}
    </Modal>
  );
};

const mapState = createStructuredSelector({
  venue: selectSelectedVenue,
  mink: selectSelectedMink,
  confirmation: selectVoteMinkConfirmation,
  answerStatus: selectAnswerMinkStatus,
});
const mapDispatch = {
  setSelectedMink,
  upvoteMink,
  downvoteMink,
  tryAnswerMink,
};
export default connect(
  mapState,
  mapDispatch,
)(ModalWrapper);
