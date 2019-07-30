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
import { Loader, Icon } from '../../../atoms';
import { IconInput } from '../../../molecules';
import { spacing, fontSize, font } from '../../../../style';
import { formatDate } from '../../../../utils/format';
import { RateConfirmation } from '../RateConfirmation';
import { normalizeAnswer } from '../normalizeAnswer';
import { ItemTitle, Layout, VenueTitle, VoteArea, VoteButton } from '../openCardStyle';

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
      margin-top: ${spacing.xxLarge};
   }

   time {
      font-size: ${fontSize.tiny};
      font-family: ${font.number};
      margin: ${spacing.large} 0;
      display: block;
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
         <VenueTitle>{venueName}</VenueTitle>
         <VoteArea>
            <div>
               <VoteButton disabled={!canVote} onClick={upvoteMink} selected={myVote === 1}>
                  <Check size={48} />
               </VoteButton>
               <VoteButton disabled={!canVote} onClick={downvoteMink} selected={myVote === -1}>
                  <CloseO size={48} />
               </VoteButton>
            </div>
            <div>
               <ItemTitle>{question}</ItemTitle>
               <time dateTime={created}>{formatDate(created)}</time>
               <IconInput
                  placeholder="try answer"
                  autocomplete="off"
                  spellcheck="false"
                  value={inputValue}
                  onChange={tryAnswer}
                  icon={
                     answerStatus && answerStatus.isAnswerCorrect ? (
                        <Icon icon="winky" color="textDark" size={1.5} />
                     ) : (
                        undefined
                     )
                  }
               />
               <div>
                  <AnswerStatus status={answerStatus} />
               </div>
            </div>
         </VoteArea>
      </VoteMinkLayout>
   );
};

const ModalWrapper = props => {
   const { mink, confirmation, setSelectedMink, venue } = props;
   const close = useCallback(() => setSelectedMink(undefined), []);

   return (
      <Modal
         open={!!mink}
         closeModal={close}
         canClose={!confirmation}
         canDismiss={!confirmation}
         inverse={mink && confirmation}
      >
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
