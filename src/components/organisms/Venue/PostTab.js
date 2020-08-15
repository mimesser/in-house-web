import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';

import {
  loadPosts,
  selectSelectedPost,
  setSelectedPost,
  upvotePost,
  downvotePost,
  togglePostFlag,
  upvoteMink,
} from '../../../store/venues';
import { Loader, Button, HelpTip, Break, Card, Icon } from '../../atoms';
import { formatDate } from '../../../utils/format';
import { ItemText, ItemTitle, ItemTime, Main, TabLayout, TabTitle } from './tabStyle';
import { appBackground, spacing, calcRem, appColors } from '../../../style';
import VotePost from './VotePost';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { Dial, PokeButton } from '../../molecules';
import { Votes } from './Votes';
import { FlagItem } from './FlagItem';
import { VoteButton, Layout } from './openCardStyle';

import { Modal } from '../Modal';
import { Dialog } from '../Modal/style';
const PostCard = styled(Card)`
  min-height: 190px;
  background: ${({ selected }) => (selected ? appColors.gray5 : appColors.white)};
`;

const StyledModal = styled(Modal)`
  ${Dialog} {
    padding-left: 0px;

    padding-right: 0px;
    > header {
      padding-right: 30px;
    }
  }
`;

const PostImage = styled.div.attrs(({ imageUrl }) => imageUrl && { style: { backgroundImage: `url(${imageUrl})` } })`
  min-height: 100px;
  max-width: 200px;
  min-width: 100px;
  // margin-left: auto;
  margin-top: 10px;
  margin-right: 70px;

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

const PostText = styled(ItemText)`
  margin-right: 39px;
`;

export const VoteColumn = styled.div`
display:block;
  // background: ${appBackground};

  width: 36px;
  height: 92px;
  margin-right: ${spacing.xl};
`;

const VoteWrap = styled.div`
  display: block;
  width: 36px;
  height: 100%;
  ${VoteButton} {
    margin: 0;
    // margin-left: 5px;

    padding-bottom: 20px;
  }
`;

const CellHeader = styled.div`
  padding: 0 ${spacing.xxxl} ${spacing.lg} 60px;
  ${PokeButton} {
    margin-top: 8px;
    width: 22px;
    height: 9px;
    color: ${appColors.grey6};
  }
`;

const StyledShareButton = styled(PrivateShareButton)`
  width: 22px;
  height: 9px;
`;

const Footer = styled.div`
  align-items: flex-end;

  ${Icon} {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
`;

const StyledVotes = styled(Votes)`
  margin-left: auto;
  margin-right: 20px;

  color: ${appColors.grey7};
  span:last-of-type {
    color: ${appColors.grey7};
  }
`;

const SelectedIndicator = styled(({ count, ...rest }) => <Icon {...rest} icon="radio-marked" size={calcRem(16)} />)`
  display: block;
  justify-content: center;
  color: ${appColors.black};

  svg {
    padding: 0 0px 3px 0;
  }
  left: -10px;
  margin-right: -5px;
  padding: 0 !important;
  position: relative;
  display: block;
  width: 20px;
  height: 100%;

  left: ${(props) => `${props.percentage}%`};
`;
const Post = ({
  post: { id, created, title, text, voteCount, voteRating, myVote, imageUrl, wasFlaggedByMe },
  setSelectedPost,
  withHelp,
  errorMessage,
  selectedPost,
  togglePostFlag,
  upvotePost,
  downvotePost,
}) => {
  const upvoted = myVote === 1;
  const downvoted = myVote === -1;
  const selected = selectedPost && selectedPost.id === id;
  const [showFullImage, setShowFullImage] = useState(false);

  const close = useCallback(() => setShowFullImage(false));
  const open = useCallback(() => setShowFullImage(true));
  const select = useCallback(() => setSelectedPost(id), [id]);

  const card = (
    <PostCard onClick={select} selected={selected}>
      <CellHeader>
        <ItemTime dateTime={created}>{formatDate(created)}</ItemTime>
        {!selected && (
          <>
            <StyledVotes count={voteCount} color={appColors.gray7} />
            <StyledShareButton id={id} type="post" color={appColors.gray6} />
          </>
        )}
      </CellHeader>
      <div>
        <VoteColumn>
          <HelpTip placement="top" tip="agree or disagree">
            <VoteWrap>
              <VoteButton
                onClick={(e) => {
                  upvotePost();
                  e.preventDefault();
                }}
                selected={upvoted}
                disabled={!selected}
              >
                {upvoted && <SelectedIndicator />}
                <Icon size={calcRem(36)} icon="arrow-up-circle" />
              </VoteButton>
              <VoteButton
                onClick={(e) => {
                  downvotePost();
                  e.preventDefault();
                }}
                selected={downvoted}
                disabled={!selected}
              >
                {downvoted && <SelectedIndicator />}
                <Icon size={calcRem(36)} icon="arrow-down-circle" />
              </VoteButton>
            </VoteWrap>
          </HelpTip>
        </VoteColumn>

        <Main>
          <ItemTitle>{title}</ItemTitle>
          <PostText>{text}</PostText>
          <Footer>
            {imageUrl && <PostImage imageUrl={imageUrl} alt="post image" onClick={open} />}
            {selected && <FlagItem flagged={wasFlaggedByMe} toggleFlag={togglePostFlag} />}
            <p>{errorMessage}</p>
          </Footer>
        </Main>
      </div>
      {showFullImage ? (
        <StyledModal closeModal={close} canClose canDismiss>
          <Layout>
            <FullImage imageUrl={imageUrl} alt="post image" />
          </Layout>
        </StyledModal>
      ) : null}
    </PostCard>
  );
  return withHelp ? (
    <HelpTip placement="top" tip="speak your mind and see how your team feels">
      {card}
    </HelpTip>
  ) : (
    card
  );
};

const renderSection = (title, posts, setSelectedPost, selectedPost, upvotePost, downvotePost, togglePostFlag) => {
  return (
    posts.length > 0 && (
      <>
        {posts.map((p, i) => (
          <Post
            post={p}
            key={p.id}
            setSelectedPost={setSelectedPost}
            selectedPost={selectedPost}
            withHelp={i === 0}
            upvotePost={upvotePost}
            downvotePost={downvotePost}
            togglePostFlag={togglePostFlag}
          />
        ))}
      </>
    )
  );
};

const renderPosts = (posts, setSelectedPost, selectedPost, upvotePost, downvotePost, togglePostFlag) => (
  <>{renderSection('Chatter', posts, setSelectedPost, selectedPost, upvotePost, downvotePost, togglePostFlag)}</>
);

const findPost = (id, posts) => {
  const post = posts.find((t) => t.id === id);
  if (!post) {
    throw new Error(`Can't find post ${id}`);
  }
  return post;
};

const PostTab = ({
  venue: { id, posts },
  loadPosts,
  setSelectedPost,
  selectedPost,
  upvotePost,
  downvotePost,
  togglePostFlag,
  venueType = 'houses',
}) => {
  useEffect(() => {
    loadPosts();
  }, []);

  const renderSharePreview = useCallback(
    (id) => {
      const { title, text, voteCount, voteRating, myVote, created } = findPost(id, posts);

      return (
        <PostCard>
          <div>
            <Dial size={65} readonly value={myVote && voteRating} />
            <Main>
              <ItemTitle>{title}</ItemTitle>
              <Break />
              <div>
                <Votes count={voteCount} />
                <ItemTime dateTime={created}>{formatDate(created)}</ItemTime>
              </div>
            </Main>
          </div>
          <ItemText>{text}</ItemText>
        </PostCard>
      );
    },
    [posts],
  );
  const getTitleForShare = useCallback((id) => findPost(id, posts).title, [posts]);

  return (
    <TabLayout>
      {posts ? (
        renderPosts(posts, setSelectedPost, selectedPost, upvotePost, downvotePost, togglePostFlag)
      ) : (
        <Loader big />
      )}
      <Link href={`/${venueType}?id=${id}&tab=post&new`} as={`/${venueType}/${id}/post/new`} passHref>
        <Button icon="arrow-right">new</Button>
      </Link>
      <PrivateShare type="post" renderItem={renderSharePreview} getItemTitle={getTitleForShare} />
    </TabLayout>
  );
};

const mapState = createStructuredSelector({
  selectedPost: selectSelectedPost,
});

const mapDispatch = {
  loadPosts,
  setSelectedPost,
  togglePostFlag,
  upvotePost,
  downvotePost,
};

export default connect(mapState, mapDispatch)(PostTab);
