import React, { useCallback } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Check } from 'styled-icons/evil/Check';
import { CloseO } from 'styled-icons/evil/CloseO';

import {
   selectSelectedVenue,
   selectSelectedPost,
   selectVotePostConfirmation,
   setSelectedPost,
   upvotePost,
   downvotePost,
} from '../../../../store/venues';
import { Modal } from '../../Modal';
import { Heading, IconButton, Input } from '../../../atoms';
import { spacing } from '../../../../theme';
import { formatDate } from '../../../../utils/format';
import { RateConfirmation } from '../RateConfirmation';

// TODO TODO TODO

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

const VoteMink = ({ post: { created, title, text, myVote }, venue: { id: venueId }, upvotePost, downvotePost }) => {
   return (
      <Layout>
         <div>
            <VoteButton onClick={upvotePost} selected={myVote === 1}>
               <Check size={48} />
            </VoteButton>
            <VoteButton onClick={downvotePost} selected={myVote === -1}>
               <CloseO size={48} />
            </VoteButton>
         </div>
         <div>
            <div>{formatDate(created)}</div>
            <Heading noMargin>{title}</Heading>
            <p>{text}</p>
         </div>
      </Layout>
   );
};

const ModalWrapper = props => {
   const { post, confirmation, setSelectedPost, venue } = props;
   const close = useCallback(() => setSelectedPost(undefined), []);

   return (
      <Modal open={!!post} closeModal={close} canClose={!confirmation} canDismiss={false}>
         {post && !confirmation ? <VoteMink {...props} /> : null}
         {post && confirmation ? (
            <RateConfirmation venueName={venue.name} title={post.title} {...confirmation} />
         ) : null}
      </Modal>
   );
};

const mapState = createStructuredSelector({
   venue: selectSelectedVenue,
   post: selectSelectedPost,
   confirmation: selectVotePostConfirmation,
});
const mapDispatch = {
   setSelectedPost,
   upvotePost,
   downvotePost,
};
export default connect(
   mapState,
   mapDispatch,
)(ModalWrapper);
