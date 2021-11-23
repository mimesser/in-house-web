import React, { useEffect, useCallback, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Link from 'next/link';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useDebounce, useFreshRef } from 'rooks';

import {
  selectSelectedPost,
  selectVotePostConfirmation,
  selectPostFlagError,
  setSelectedPost,
  setVenuePosts,
  upvotePost,
  downvotePost,
  togglePostFlag,
} from '../../../store/venues';
import { Loader, Button, HelpTip, Card, Icon, NumberLarge, NumberSmall } from '../../atoms';
import {
  formatDateTime,
  formatMovementURL,
  formatRating,
  pluralFormatVote,
} from '../../../utils/format';
import { ItemText, ItemTitle, ItemTime, Main, TabLayout } from './tabStyle';
import { spacing, appColors, palette } from '../../../style';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { PokeButton } from '../../molecules';
import { Votes } from '../../molecules/RateSlider';
import { FlagItem } from './FlagItem';
import { RateConfirmation } from './RateConfirmation';
import { VoteButton, Layout, FlagButton } from './openCardStyle';

import { Modal } from '../Modal';
import { Dialog } from '../Modal/style';

const transition = {
  in: '0.25s',
  out: '0.2s',
};

const VoteColumn = styled.div`
  display: block;
  width: 36px;
  height: 92px;
  margin-right: ${spacing.xl};
  margin-top: ${spacing.xxl};
`;

const defaultVoteAnimation = css`
  ${VoteColumn} ${VoteButton} {
    span:last-child > svg {
      transition: transform ${transition.out} ease-in;

      circle {
        transition: ${transition.out} ease-in;
      }
      path:nth-child(2) {
        transition: ${transition.out} ease-in;
        opacity: 1;
      }
      path:nth-child(3) {
        transition: ${transition.out} ease-in;
      }
    }
  }
`;

const activeVoteAnimation = css`
  ${VoteColumn} ${VoteButton}:active:not([disabled]) {
    span:last-child > svg {
      transition: transform ${transition.in} ease-out;
      transform: scale(3);

      circle {
        transition: ${transition.in} ease-out;
        fill: ${palette.gray};
        opacity: 0.7;
      }
      path:nth-child(2) {
        transition: ${transition.in} ease-out;
        opacity: 0;
      }
      path:nth-child(3) {
        transition: ${transition.in} ease-out;
        transform: translate(25%, 25%) scale(0.5);
        stroke: ${palette.primary};
        stroke-width: 5;
      }
    }
  }
`;

const PostCard = styled(Card)`
  user-select: none;
  cursor: default;
  ${defaultVoteAnimation}
  ${activeVoteAnimation}
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

const PostImage = styled.div.attrs(
  ({ imageUrl }) => imageUrl && { style: { backgroundImage: `url(${imageUrl})` } },
)`
  min-height: 100px;
  max-width: 200px;
  min-width: 100px;
  margin-top: 10px;
  margin-right: 50px;

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const FullImage = styled.div.attrs(
  ({ imageUrl }) => imageUrl && { style: { backgroundImage: `url(${imageUrl})` } },
)`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const PostText = styled(ItemText)`
  margin-right: 39px;
  min-height: 50px;
`;

const VoteWrap = styled.div`
  display: block;
  width: 36px;
  height: 100%;
`;

const CellHeader = styled.div`
  height: 18px;
  margin-bottom: 10px;
  display: flex;

  ${ItemTime} {
    margin-top: ${spacing.xs};
  }

  ${PokeButton} {
    margin-left: ${spacing.lg};
    margin-top: ${spacing.sm};
    color: ${appColors.gray4};
    &:active {
      color: white;
    }
  }
  ${Votes} {
    font-size: 13px;
    position: static;
    line-height: 1;
    width: auto;

    color: ${({ color }) => color};
    ${Icon} {
      width: 13px;
      height: 13px;
    }
  }
  ${NumberSmall} {
    margin-top: ${spacing.sm};
  }
  ${NumberLarge} {
    font-size: 18px;
    font-weight: bold;
    margin-left: ${spacing.sm};
    margin-top: ${spacing.xxs};
    color: ${palette.darkGray};
    height: 18px;
    vertical-align: bottom;

    span {
      vertical-align: bottom;
    }
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const P = styled.p`
  display: inline-block;
  position: relative;
`;

const SelectedIndicator = styled(({ show, count, ...rest }) => (
  <Icon {...rest} icon="radio-marked" size={0.3} />
))`
  color: ${appColors.black};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  margin-right: 5px;
  height: 100%;

  svg {
    padding: 0 0px 3px 0;
  }
`;

const ShareWrap = styled.div`
  margin-left: auto;
  display: inline-flex;

  ${FlagButton} {
    display: none;
  }
`;

const Post = ({
  post: { id, created, title, text, voteCount, voteRating, myVote, imageUrl, wasFlaggedByMe },
  venueName,
  setSelectedPost,
  withHelp,
  errorMessage,
  confirmation,
  selectedPost,
  togglePostFlag,
  upvotePost,
  downvotePost,
  isShare,
  update,
}) => {
  const size = myVote ? 1.7 : 2.2;
  const upvoted = myVote === 1;
  const downvoted = myVote === -1;
  const [selected, setSelected] = useState(selectedPost && selectedPost.id === id);
  const [showFullImage, setShowFullImage] = useState(false);

  const debouncedUpdatePosts = useDebounce(()=>update, 3000, { trailing: true });

  const close = () => setShowFullImage(false);
  const open = () => setShowFullImage(true);

  const select = useCallback(() => setSelectedPost(id), [setSelectedPost, id]);
  const deselect = useCallback(() => setSelectedPost, [setSelectedPost]);
  const votePost = useCallback(
    (vote, skipConfirmation) => {
      if (+vote === 1) upvotePost(id);
      else downvotePost(id, !!skipConfirmation);

      debouncedUpdatePosts();
    },
    [id, upvotePost, downvotePost, debouncedUpdatePosts],
  );
  const toggleFlag = () => {
    select();
    togglePostFlag({ wasVotedByMe: upvoted || downvoted });
  };

  useEffect(() => setSelected(selectedPost?.id === id), [selectedPost, id]);
  useEffect(() => deselect, [setSelectedPost]);

  const card = (
    <PostCard selected={selected}>
      <div>
        <VoteColumn>
          <HelpTip placement="top" tip="agree or disagree">
            <VoteWrap>
              <VoteButton
                onClick={(e) => {
                  if (upvoted) {
                    e.stopPropagation();

                    return;
                  }
                  select();
                  votePost(1);
                }}
                selected={upvoted}
                disabled={upvoted || selected}
              >
                <SelectedIndicator show={upvoted} />
                <Icon size={size} icon="arrow-up-circle" />
              </VoteButton>
              <VoteButton
                onClick={(e) => {
                  if (downvoted) {
                    e.stopPropagation();

                    return;
                  }

                  select();
                  votePost(-1);
                }}
                selected={downvoted}
                disabled={downvoted || selected}
              >
                <SelectedIndicator show={downvoted} />
                <Icon size={size} icon="arrow-down-circle" />
              </VoteButton>
            </VoteWrap>
          </HelpTip>
        </VoteColumn>

        <Main>
          <CellHeader color={upvoted || downvoted ? appColors.gray4 : appColors.gray6}>
            <ItemTime dateTime={created}>{formatDateTime(created)}</ItemTime>
            <ShareWrap>
              {!selected && (
                <Votes
                  pluralFormat={pluralFormatVote}
                  count={voteCount}
                  userRate={upvoted || downvoted}
                />
              )}
              {(upvoted || downvoted) && <NumberLarge>{formatRating(voteRating)}</NumberLarge>}
              {!selected && <PrivateShareButton id={id} type="post" color={appColors.gray6} />}
            </ShareWrap>
          </CellHeader>
          <ItemTitle>{title}</ItemTitle>
          <PostText>{text}</PostText>
          <Footer>
            {imageUrl && <PostImage imageUrl={imageUrl} alt="post image" onClick={open} />}
            {!isShare && !selected && <FlagItem flagged={wasFlaggedByMe} toggleFlag={toggleFlag} />}
            {selected && <P>{errorMessage}</P>}
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
      {confirmation && (
        <Modal title={venueName} inverse>
          <RateConfirmation title={title} {...confirmation} />
        </Modal>
      )}
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

const SlideIn = keyframes`
  0% {
    transform: translateY(-70%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity:1;
  }
`;

const SlideOut = keyframes`
  0% {
    transform: translateY(0);
    opacity:1;
  }
  100% {
    transform: translateY(-70%);
    opacity: 0;
  }
`;

const SharePreviewWrap = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: ${spacing.md} ${spacing.sm};
`;

const NewPostButton = styled(Button)`
  margin: 0 !important;
  width: 100%;
  border: solid 2px white;
  position: sticky;
  z-index: 100;
  top: 46px;
`;

const findPost = (id, posts) => {
  const post = posts.find((t) => t.id === id);
  if (!post) {
    throw new Error(`Can't find post ${id}`);
  }
  return post;
};

const PostTab = ({
  venue: {
    id,
    posts,
    name,
    industry: { lite },
  },
  loading,
  setSelectedPost,
  setVenuePosts,
  selectedPost,
  selectedPostVoteConfirmation,
  selectedPostErrorMessage,
  upvotePost,
  downvotePost,
  togglePostFlag,
}) => {
  const [initialPostsRendering, setInitialPostsRendering] = useState(true);

  useEffect(() => setInitialPostsRendering(true), [loading]);
  useEffect(() => {
    if (posts && initialPostsRendering) {
      setVenuePosts(
        [...posts].sort((a, b) => {
          if (+a.voteCount > +b.voteCount) return -1;
          if (+a.voteCount < +b.voteCount) return 1;
          if (+a.myVote) {
            if (!b.myVote || +a.voteRating > +b.voteRating) return -1;
            if (+a.voteRating < +b.voteRating) return 1;
          } else if (b.myVote) return 1;

          return new Date(b.created).getTime() - new Date(a.created).getTime();
        }),
      );
      setInitialPostsRendering(false);
    }
  }, [posts]);

  const renderSharePreview = useCallback(
    (id) => {
      const p = findPost(id, posts);

      return (
        <SharePreviewWrap>
          <Post post={p} upvotePost={upvotePost} downvotePost={downvotePost} isShare />
        </SharePreviewWrap>
      );
    },
    [posts],
  );
  const getTitleForShare = useCallback((id) => findPost(id, posts).title, [posts]);
  const updatePosts = useFreshRef(() => {
    const sortedPosts = posts.sort((a, b) => {
      if (+a.voteCount > +b.voteCount) return -1;
      if (+a.voteCount < +b.voteCount) return 1;
      if (+a.myVote) {
        if (!b.myVote || +a.voteRating > +b.voteRating) return -1;
        if (+a.voteRating < +b.voteRating) return 1;
      } else if (b.myVote) return 1;

      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });
    setVenuePosts(sortedPosts);
  }, [posts, setVenuePosts]);

  return (
    <>
      <Link
        href={`/houses?id=${id}&tab=post&new`}
        as={lite ? `/movement/${formatMovementURL(name)}/post/new` : `/houses/${id}/post/new`}
        passHref
      >
        <NewPostButton icon="arrow-right">new post</NewPostButton>
      </Link>

      <TabLayout>
        {posts && !loading ? (
          <>
            {posts.map((p, i) => (
              <Post
                post={p}
                venueName={name}
                key={p.id}
                setSelectedPost={setSelectedPost}
                selectedPost={selectedPost}
                confirmation={selectedPost?.id === p.id && selectedPostVoteConfirmation}
                errorMessage={selectedPostErrorMessage}
                withHelp={i === 0}
                upvotePost={upvotePost}
                downvotePost={downvotePost}
                togglePostFlag={togglePostFlag}
                update={updatePosts.current}
              />
            ))}
          </>
        ) : (
          <Loader big />
        )}
        <PrivateShare type="post" renderItem={renderSharePreview} getItemTitle={getTitleForShare} />
      </TabLayout>
    </>
  );
};

const mapState = createStructuredSelector({
  selectedPost: selectSelectedPost,
  selectedPostVoteConfirmation: selectVotePostConfirmation,
  selectedPostErrorMessage: selectPostFlagError,
});

const mapDispatch = {
  setSelectedPost,
  setVenuePosts,
  togglePostFlag,
  upvotePost,
  downvotePost,
};

export default connect(mapState, mapDispatch)(PostTab);
