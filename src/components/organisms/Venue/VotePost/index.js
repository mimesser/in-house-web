import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Icon } from '../../../atoms';

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
import { Layout, ItemDate, ItemTitle, VoteButton } from '../openCardStyle';
import { formatDate } from '../../../../utils/format';

const VotePost = ({ post: { created, title, text, myVote }, venue: { name: venueName }, upvotePost, downvotePost }) => {
  return (
    <Layout>
      <div>
        <ItemDate dateTime={created}>{formatDate(created)}</ItemDate>
        <ItemTitle>{title}</ItemTitle>
        {text}
      </div>
      <div>
        <VoteButton onClick={upvotePost} selected={myVote === 1}>
          <Icon size={4} icon="arrow-up-circle" />
        </VoteButton>
        <VoteButton onClick={downvotePost} selected={myVote === -1}>
          <Icon size={4} icon="arrow-down-circle" />
        </VoteButton>
      </div>
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
