import React, { useCallback, useState, useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
import { DEMO_VENUE_ID } from '../../../../store/demo/data';
import { Modal } from '../../Modal';
import { Loader, Icon } from '../../../atoms';
import { IconInput } from '../../../molecules';
import { spacing, fontSize, font } from '../../../../style';
import { formatDate } from '../../../../utils/format';
import { RateConfirmation } from '../RateConfirmation';
import { normalizeAnswer } from '../normalizeAnswer';
import { ItemTitle, ItemDate, Layout, VoteArea, VoteButton } from '../openCardStyle';

const AnswerStatus = styled(({ status, className }) => {
   if (!status) {
      return null;
   }

   const { loading, isAnswerCorrect } = status;
   if (loading) {
      return <Loader />;
   }
   return <span className={className}>{isAnswerCorrect ? 'correct answer' : 'wrong answer'}</span>;
})`
   font-size: ${fontSize.tiny};
`;

const VoteMinkLayout = styled(Layout)`
   ${VoteArea} {
      margin-top: ${spacing.small};
   }
`;

const VoteMink = ({
   mink: { created, question, myCorrectAnswer, myVote, id: minkId },
   venue: { id: venueId, name: venueName },
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
      <VoteMinkLayout>
         <VoteArea>
            <div>
               <ItemDate dateTime={created}>{formatDate(created)}</ItemDate>
               <ItemTitle>{question}</ItemTitle>
               <IconInput
                  placeholder="try answer"
                  autocomplete="off"
                  spellcheck="false"
                  value={inputValue}
                  onChange={tryAnswer}
                  icon={
                     answerStatus && answerStatus.isAnswerCorrect ? (
                        <Icon icon="winky" color="primaryLight" size={1.5} />
                     ) : (
                        undefined
                     )
                  }
               />
               <div>
                  <AnswerStatus status={answerStatus} />
               </div>
            </div>
            <div>
               <VoteButton disabled={!canVote} onClick={upvoteMink} selected={myVote === 1}>
                  <Icon size={4} icon="arrow-up-circle" />
               </VoteButton>
               <VoteButton disabled={!canVote} onClick={downvoteMink} selected={myVote === -1}>
                  <Icon size={4} icon="arrow-down-circle" />
               </VoteButton>
            </div>
         </VoteArea>
      </VoteMinkLayout>
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
