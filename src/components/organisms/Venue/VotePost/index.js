import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { HelpTip, Icon, Break } from '../../../atoms';

import {
  downvotePost,
  selectSelectedPost,
  selectSelectedVenue,
  selectVotePostConfirmation,
  setSelectedPost,
  selectPostFlagError,
  togglePostFlag,
  upvotePost,
} from '../../../../store/venues';
import { Modal } from '../../Modal';
import { RateConfirmation } from '../RateConfirmation';
import { ItemDate, ItemTitle, ItemText, Layout, VoteButton, VoteRow } from '../openCardStyle';
import { formatDate } from '../../../../utils/format';
import { FlagItem } from '../FlagItem';

const VoteWrap = styled.div`
  display: inline-flex;
`;

const PostImage = styled.div.attrs(({ imageUrl }) => imageUrl && { style: { backgroundImage: `url(${imageUrl})` } })`
  min-height: 140px;
  max-width: 140px;
  min-width: 140px;
  margin: 20px 20px 20px 0px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const FullImage = styled.div.attrs(({ imageUrl }) => imageUrl && { style: { backgroundImage: `url(${imageUrl})` } })`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const VotePost = ({
  post: { created, title, text, myVote, wasFlaggedByMe, imageUrl },
  upvotePost,
  downvotePost,
  togglePostFlag,
  errorMessage,
}) => {
  const upvoted = myVote === 1;
  const downvoted = myVote === -1;
  const [showFullImage, setShowFullImage] = useState(false);

  const close = useCallback(() => setShowFullImage(false));
  const open = useCallback(() => setShowFullImage(true));

  return (
    <>
      <Layout>
        <ItemDate dateTime={created}>{formatDate(created)}</ItemDate>
        <ItemTitle>{title}</ItemTitle>
        <Break />
        <PostImage imageUrl={imageUrl} alt="post image" onClick={open} />
        <ItemText>{text}</ItemText>
        <VoteRow>
          <HelpTip placement="top" tip="agree or disagree">
            <VoteWrap>
              <VoteButton onClick={upvotePost} selected={upvoted}>
                <Icon size={4} icon={upvoted ? 'arrow-up-circle-full' : 'arrow-up-circle'} />
              </VoteButton>
              <VoteButton onClick={downvotePost} selected={downvoted}>
                <Icon size={4} icon={downvoted ? 'arrow-down-circle-full' : 'arrow-down-circle'} />
              </VoteButton>
            </VoteWrap>
          </HelpTip>
        </VoteRow>
        <FlagItem flagged={wasFlaggedByMe} toggleFlag={togglePostFlag} />
        <p>{errorMessage}</p>
      </Layout>

      {showFullImage ? (
        <Modal closeModal={close} canClose canDismiss inverse>
          <Layout>
            <FullImage imageUrl={imageUrl} alt="post image" />
          </Layout>
        </Modal>
      ) : null}
    </>
  );
};

const ModalWrapper = (props) => {
  const { post, confirmation, setSelectedPost, venue } = props;
  const close = useCallback(() => setSelectedPost(undefined), []);

  if (!post) {
    return null;
  }

  return (
    <Modal
      closeModal={close}
      canClose={!confirmation}
      canDismiss={!confirmation}
      title={venue && venue.name}
      inverse={post && confirmation}
    >
      {confirmation ? <RateConfirmation title={post.title} {...confirmation} /> : <VotePost {...props} />}
    </Modal>
  );
};

const mapState = createStructuredSelector({
  venue: selectSelectedVenue,
  post: selectSelectedPost,
  confirmation: selectVotePostConfirmation,
  errorMessage: selectPostFlagError,
});
const mapDispatch = {
  setSelectedPost,
  upvotePost,
  downvotePost,
  togglePostFlag,
};
export default connect(mapState, mapDispatch)(ModalWrapper);
