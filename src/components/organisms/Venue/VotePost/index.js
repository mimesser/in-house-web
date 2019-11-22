import React, { useCallback } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { HelpTip, Icon } from '../../../atoms';

import {
  downvotePost,
  selectSelectedPost,
  selectSelectedVenue,
  selectVotePostConfirmation,
  setSelectedPost,
  togglePostFlag,
  upvotePost,
} from '../../../../store/venues';
import { Modal } from '../../Modal';
import { RateConfirmation } from '../RateConfirmation';
import { ItemDate, ItemTitle, Layout, VoteButton, VoteRow } from '../openCardStyle';
import { formatDate } from '../../../../utils/format';
import { FlagItem } from '../FlagItem';

const VoteWrap = styled.div`
  display: inline-flex;
`;

const VotePost = ({
  post: { created, title, text, myVote, wasFlaggedByMe },
  upvotePost,
  downvotePost,
  togglePostFlag,
}) => {
  const downvoted = myVote === -1;
  return (
    <Layout>
      <div>
        <ItemDate dateTime={created}>{formatDate(created)}</ItemDate>
        <ItemTitle>{title}</ItemTitle>
        {text}
      </div>
      <VoteRow>
        <HelpTip placement="top" tip="agree or disagree">
          <VoteWrap>
            <VoteButton onClick={upvotePost} selected={myVote === 1}>
              <Icon size={4} icon="arrow-up-circle" />
            </VoteButton>
            <VoteButton onClick={downvotePost} selected={downvoted}>
              <Icon size={4} icon="arrow-down-circle" />
            </VoteButton>
          </VoteWrap>
        </HelpTip>
        <FlagItem flagged={wasFlaggedByMe} toggleFlag={togglePostFlag} />
      </VoteRow>
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
  togglePostFlag,
};
export default connect(
  mapState,
  mapDispatch,
)(ModalWrapper);
