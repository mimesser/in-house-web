import React, { useEffect, useCallback, useState, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { debounce } from 'lodash';
import {
  loadPosts,
  selectSelectedPost,
  setSelectedPost,
  upvotePost,
  downvotePost,
  togglePostFlag,
  upvoteMink,
} from '../../../store/venues';
import { Loader, Button, HelpTip, Break, Card, Icon, NumberLarge, NumberSmall } from '../../atoms';
import { formatDateTime, formatMovementURL, formatRating } from '../../../utils/format';
import { ItemText, ItemTitle, ItemTime, Main, TabLayout, TabTitle } from './tabStyle';
import { appBackground, spacing, appColors, palette, calcRem, font, fontSize } from '../../../style';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { Dial, PokeButton } from '../../molecules';
import { Votes } from '../../molecules/RateSlider';
import { FlagItem } from './FlagItem';
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
  ${VoteColumn} ${VoteButton}:active {
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

const PostImage = styled.div.attrs(({ imageUrl }) => imageUrl && { style: { backgroundImage: `url(${imageUrl})` } })`
  min-height: 100px;
  max-width: 200px;
  min-width: 100px;
  margin-top: 10px;
  margin-right: 50px;

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

  ${Icon} {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
`;

const SelectedIndicator = styled(({ show, count, ...rest }) => <Icon {...rest} icon="radio-marked" size={0.3} />)`
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
  setSelectedPost,
  withHelp,
  errorMessage,
  selectedPost,
  togglePostFlag,
  upvotePost,
  downvotePost,
  isShare,
}) => {
  const [currentVote, setCurrentVote] = useState(myVote);
  const upvoted = currentVote === 1;
  const downvoted = currentVote === -1;
  const size = upvoted || downvoted ? 1.7 : 2.2;
  const selected = selectedPost && selectedPost.id === id;
  const [showFullImage, setShowFullImage] = useState(false);
  const [optimisticVoteRating, setOptimisticVoteRating] = useState(voteRating);

  const close = useCallback(() => setShowFullImage(false));
  const open = useCallback(() => setShowFullImage(true));
  const select = useCallback(() => setSelectedPost(id), [id]);
  const deselect = useCallback(() => setSelectedPost(undefined), [id]);

  const votePost = useCallback((e, id, vote) => {
    setCurrentVote(vote);
    if (vote === 1) {
      const curAverage = downvoted
        ? (voteRating * voteCount + 10) / voteCount
        : (voteRating * voteCount + 10) / (voteCount + 1);

      setOptimisticVoteRating(curAverage);
      upvotePost(id);
    } else {
      const curAverage = upvoted
        ? (voteRating * voteCount - 10) / voteCount
        : (voteRating * voteCount) / (voteCount + 1);

      setOptimisticVoteRating(curAverage);
      downvotePost(id);
    }
  }, []);

  const card = (
    <PostCard onClick={selected ? deselect : select} selected={selected}>
      <div>
        <VoteColumn>
          <HelpTip placement="top" tip="agree or disagree">
            <VoteWrap>
              <VoteButton
                onClick={(e) => {
                  votePost(e, id, 1);
                }}
                selected={upvoted}
              >
                <SelectedIndicator show={upvoted} />
                <Icon size={size} icon="arrow-up-circle" />
              </VoteButton>
              <VoteButton
                onClick={(e) => {
                  votePost(e, id, -1);
                }}
                selected={downvoted}
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
              {!selected && <Votes count={voteCount} userRate={upvoted || downvoted} />}
              {(upvoted || downvoted) && <NumberLarge>{formatRating(optimisticVoteRating)}</NumberLarge>}
              {!selected && <PrivateShareButton id={id} type="post" color={appColors.gray6} />}
            </ShareWrap>
          </CellHeader>
          <ItemTitle>{title}</ItemTitle>
          <PostText>{text}</PostText>
          <Footer>
            {imageUrl && <PostImage imageUrl={imageUrl} alt="post image" onClick={open} />}
            {!isShare && !selected && <FlagItem flagged={wasFlaggedByMe} toggleFlag={togglePostFlag} />}
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

export const NewPostButton = styled(Button)`
  width: 100%;
  min-height: ${calcRem('38px')};
  border: 1px solid ${appColors.gray5};
  ${font.light};
  font-size: ${fontSize.sm};
  color: ${appColors.gray4};
  padding: ${spacing.sm};
`;

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

const NewPostSection = styled.div`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  flex-shrink: 0; // safari
  top: 46px;
  padding: ${spacing.sm} ${spacing.md} ${spacing.sm} ${spacing.md};
  background-color: ${appColors.offWhite};
  z-index: 1;
  animation: ${({ sticky }) => (sticky ? SlideIn : SlideOut)} linear ${({ duration }) => `${duration}s`};
  animation-fill-mode: forwards;
`;

const SharePreviewWrap = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: ${spacing.md} ${spacing.sm};
`;

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
  venue: {
    id,
    posts,
    name,
    industry: { lite },
  },
  loadPosts,
  setSelectedPost,
  selectedPost,
  upvotePost,
  downvotePost,
  togglePostFlag,
}) => {
  useEffect(() => {
    loadPosts();
  }, []);

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

  const handleScroll = useCallback((e) => {
    console.log('# handle scroll', window.document.scrollTop, e);
  });

  const [scrolled, setScrolled] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(true);

  const scrollRef = useRef();
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll],
    false,
    false,
    300,
  );
  useScrollPosition(
    ({ currPos }) => {
      const scrolledEnough = currPos.y < 60;
      if (scrolledEnough !== scrolled) setScrolled(scrolledEnough);
    },
    [scrolled],
    scrollRef,
    false,
    300,
  );
  return (
    <>
      <NewPostSection sticky={hideOnScroll || !scrolled} duration={1} ref={scrollRef}>
        <Link
          href={`/houses?id=${id}&tab=post&new`}
          as={lite ? `/movement/${formatMovementURL(name)}/post/new` : `/houses/${id}/post/new`}
          passHref
        >
          <NewPostButton icon="plus" wide outline>
            what's in your mind?
          </NewPostButton>
        </Link>
      </NewPostSection>

      <TabLayout onScroll={handleScroll}>
        {posts ? (
          renderPosts(posts, setSelectedPost, selectedPost, upvotePost, downvotePost, togglePostFlag)
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
});

const mapDispatch = {
  loadPosts,
  setSelectedPost,
  togglePostFlag,
  upvotePost,
  downvotePost,
};

export default connect(mapState, mapDispatch)(PostTab);
