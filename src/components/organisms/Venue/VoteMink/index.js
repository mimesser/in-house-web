import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  downvoteMink,
  selectAnswerMinkStatus,
  selectSelectedMink,
  selectSelectedVenue,
  selectVoteMinkConfirmation,
  selectIsActiveInsider,
  setSelectedMink,
  tryAnswerMink,
  upvoteMink,
  toggleMinkFlag,
} from '../../../../store/venues';
import { Modal } from '../../Modal';
import { Icon, Loader } from '../../../atoms';
import { IconInput } from '../../../molecules';
import { formatDate } from '../../../../utils/format';
import { RateConfirmation } from '../RateConfirmation';
import { normalizeAnswer } from '../normalizeAnswer';
import { ItemDate, ItemTitle, Layout, VoteButton, VoteRow } from '../openCardStyle';
import { Status, InputGroup } from './style';
import { FlagItem } from '../FlagItem';

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
  mink: { created, question, myCorrectAnswer, myVote, id: minkId, wasFlaggedByMe },
  venue: { id: venueId },
  isActiveInsider,
  answerStatus,
  tryAnswerMink,
  upvoteMink,
  downvoteMink,
  toggleMinkFlag,
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
  const downvoted = myVote === -1;

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
            readOnly={previouslyAnsweredCorrectly}
            icon={renderInputIcon(answerStatus, previouslyAnsweredCorrectly)}
          />
          {renderStatusIcon(answerStatus)}
        </div>
        <AnswerStatus status={answerStatus} previouslyAnsweredCorrectly={previouslyAnsweredCorrectly} />
      </InputGroup>
      <VoteRow>
        <VoteButton disabled={!canVote} onClick={myVote !== 1 ? upvoteMink : undefined} selected={myVote === 1}>
          <Icon size={4} icon="arrow-up-circle" />
        </VoteButton>
        <VoteButton disabled={!canVote} onClick={myVote !== -1 ? downvoteMink : undefined} selected={downvoted}>
          <Icon size={4} icon="arrow-down-circle" />
        </VoteButton>
        <FlagItem disabled={!isActiveInsider} flagged={wasFlaggedByMe} toggleFlag={toggleMinkFlag} />
      </VoteRow>
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
  isActiveInsider: selectIsActiveInsider,
});
const mapDispatch = {
  setSelectedMink,
  upvoteMink,
  downvoteMink,
  tryAnswerMink,
  toggleMinkFlag,
};
export default connect(
  mapState,
  mapDispatch,
)(ModalWrapper);
