import React, { useCallback } from 'react';
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
import { RateConfirmation } from '../RateConfirmation';
import { Layout, ItemDate, ItemTitle, VoteArea, VoteButton } from '../openCardStyle';
import { formatDate } from '../../../../utils/format';

const VotePost = ({ post: { created, title, text, myVote }, venue: { name: venueName }, upvotePost, downvotePost }) => {
   return (
      <Layout>
         <ItemDate>{formatDate(created)}</ItemDate>
         <ItemTitle>{title}</ItemTitle>
         <VoteArea>
            <div>
               <VoteButton onClick={upvotePost} selected={myVote === 1}>
                  <Check size={48} />
               </VoteButton>
               <VoteButton onClick={downvotePost} selected={myVote === -1}>
                  <CloseO size={48} />
               </VoteButton>
            </div>
            <div>{text}</div>
         </VoteArea>
      </Layout>
   );
};

const ModalWrapper = props => {
   const { post, confirmation, setSelectedPost, venue } = props;
   const close = useCallback(() => setSelectedPost(undefined), []);

   return (
      <Modal
         open={!!post}
         closeModal={close}
         canClose={!confirmation}
         canDismiss={!confirmation}
         title={venue && venue.name}
         inverse={post && confirmation}
      >
         {post && !confirmation ? <VotePost {...props} /> : null}
         {post && confirmation ? <RateConfirmation title={post.title} date={post.created} {...confirmation} /> : null}
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
