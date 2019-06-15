import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Check } from 'styled-icons/evil/Check';
import { CloseO } from 'styled-icons/evil/CloseO';

import {
   selectSelectedVenue,
   selectSelectedMink,
   selectVoteMinkConfirmation,
   selectAnswerMinkStatus,
   setSelectedMink,
   upvoteMink,
   downvoteMink,
   tryAnswerMink,
} from '../../../../store/venues';
import { Modal } from '../../Modal';
import { Heading, IconButton, Input, Loader } from '../../../atoms';
import { spacing } from '../../../../theme';
import { formatDate } from '../../../../utils/format';
import { RateConfirmation } from '../RateConfirmation';
import { normalizeAnswer } from '../normalizeAnswer';

const VoteButton = styled(IconButton)`
   color: ${({ selected, theme: { palette } }) => (selected ? palette.alert[2] : 'currentColor')};
   &[disabled] {
      color: gray;
   }
`;

const Layout = styled.div`
   width: 100%;
   padding: 10rem ${spacing.xLarge} ${spacing.medium} ${spacing.medium};

   display: flex;
   flex-direction: row;

   > div {
      display: flex;
      flex-direction: column;

      ${Input} {
         margin-top: ${spacing.large};
      }

      &:first-child {
         flex-grow: 0;
         margin-right: ${spacing.large};

         ${VoteButton} {
            &:last-child {
               margin-top: ${spacing.large};
            }
         }
      }
   }
`;

const AnswerStatus = ({ status }) => {
   if (!status) {
      return null;
   }

   const { loading, isAnswerCorrect } = status;
   if (loading) {
      return <Loader white />;
   }
   return isAnswerCorrect ? 'correct answer' : 'wrong answer';
};

const VoteMink = ({
   mink: { created, question, myCorrectAnswer, myVote, id: minkId },
   venue: { id: venueId },
   answerStatus,
   tryAnswerMink,
   upvoteMink,
   downvoteMink,
}) => {
   const [answer, setAnswer] = useState('');
   const [answerAttemptMade, setAnswerAttemptMade] = useState(false);
   const [dirty, setDirty] = useState(false);
   const tryAnswer = useCallback(e => {
      const value = normalizeAnswer(e.currentTarget.value);
      setAnswer(value);
      setDirty(true);
      tryAnswerMink(venueId, minkId, value);
   }, []);
   useEffect(() => {
      if (answerAttemptMade || !answerStatus || typeof answerStatus.isAnswerCorrect !== 'boolean') {
         return;
      }
      setAnswerAttemptMade(true);
   }, [answerStatus, answerAttemptMade]);

   const canVote = !!myCorrectAnswer || answerAttemptMade || typeof myVote === 'number';
   const inputValue = (dirty ? answer : myCorrectAnswer) || '';

   return (
      <Layout>
         <div>
            <VoteButton disabled={!canVote} onClick={upvoteMink} selected={myVote === 1}>
               <Check size={48} />
            </VoteButton>
            <VoteButton disabled={!canVote} onClick={downvoteMink} selected={myVote === -1}>
               <CloseO size={48} />
            </VoteButton>
         </div>
         <div>
            <Heading noMargin>{question}</Heading>
            <div>{formatDate(created)}</div>
            <Input
               placeholder="try answer"
               autocomplete="off"
               spellcheck="false"
               value={inputValue}
               onChange={tryAnswer}
            />
            <div>
               <AnswerStatus status={answerStatus} />
            </div>
         </div>
      </Layout>
   );
};

const ModalWrapper = props => {
   const { mink, confirmation, setSelectedMink, venue } = props;
   const close = useCallback(() => setSelectedMink(undefined), []);

   return (
      <Modal open={!!mink || !!confirmation} closeModal={close} canClose={!confirmation} canDismiss={false}>
         {mink && !confirmation ? <VoteMink {...props} /> : null}
         {mink && confirmation ? (
            <RateConfirmation venueName={venue.name} title={mink.question} {...confirmation} />
         ) : null}
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
