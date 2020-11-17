import React, { useEffect, useCallback, useState, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
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
import VotePost from './VotePost';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { Dial, PokeButton } from '../../molecules';
import { Votes } from '../../molecules/RateSlider';
import { FlagItem } from './FlagItem';
import { VoteButton, Layout } from './openCardStyle';

import { Modal } from '../Modal';
import { Dialog } from '../Modal/style';
import { debounce } from 'lodash';
const transition = {
  in: '0.25s',
  out: '0.2s',
};

const VoteColumn = styled.div`
  display: block;

  width: 36px;
  height: 92px;
  margin-right: ${spacing.lg};
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
  ${defaultVoteAnimation}
  ${activeVoteAnimation}
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
  ${VoteButton} {
    margin: 0;
    padding-bottom: 20px;
  }
`;

const CellHeader = styled.div`
  position: relative;
  padding: 0 ${spacing.xxxl} ${spacing.lg} 60px;
  height: 16px;
  max-height: 16px;
  margin-bottom: 10px;

  ${PokeButton} {
    position: relative;
    margin-top: 0px;
    width: 22px;
    height: auto;
    top: -10px !important;
    right: 0px !important;
    color: ${appColors.gray4};
    &:active {
      color: white;
    }
  }
  ${Votes} {
    position: relative;
    width: 80px;
    margin-right: 10px;
    margin-left: auto;
    font-size: 13px;
    top: 16px;
    text-align: right;
    align-items: right;
    display: flex;
    justify-content: flex-end;

    height: 16px;
    vertical-align: bottom;

    color: ${({ color }) => color};
    ${Icon} {
      position: relative;
      width: 13px;
      height: 13px;
      top: -2px;
    }
  }
  ${NumberLarge} {
    position: relative;
    top: -2px;
    font-size: 18px;
    font-weight: bold;

    height: 18px;
    vertical-align: bottom;

    span {
      vertical-align: bottom;
    }
  }
  ${NumberSmall} {
    position: relative;
    height: 16px;
    vertical-align: bottom;
    align-self: flex-end;
    span {
      position: relative;
      vertical-align: baseline;
      top: -4x;
      align-self: flex-end;
    }
  }
`;

const StyledShareButton = styled(PrivateShareButton)`
  width: 22px;
  height: auto;
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
  display: block;
  justify-content: center;
  color: ${appColors.black};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};

  svg {
    padding: 0 0px 3px 0;
  }
  left: -10px;
  margin-right: -5px;
  padding: 0 !important;
  position: relative;
  display: block;
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
  const [currentVote, setCurrentVote] = useState(myVote);
  const upvoted = currentVote === 1;
  const downvoted = currentVote === -1;
  const size = upvoted || downvoted ? 1.7 : 2.2;
  const selected = selectedPost && selectedPost.id === id;
  const [showFullImage, setShowFullImage] = useState(false);

  const close = useCallback(() => setShowFullImage(false));
  const open = useCallback(() => setShowFullImage(true));
  const select = useCallback(() => setSelectedPost(id), [id]);
  const deselect = useCallback(() => setSelectedPost(undefined), [id]);

  const votePost = useCallback(
    debounce((e, id, vote) => {
      setCurrentVote(vote);
      if (vote == 1) {
        upvotePost(id);
      } else {
        downvotePost(id);
      }
    }, 500),
    [],
  );
  const card = (
    <PostCard onClick={selected ? deselect : select} selected={selected}>
      <CellHeader color={upvoted || downvoted ? appColors.gray4 : appColors.gray6}>
        <ItemTime dateTime={created}>{formatDateTime(created)}</ItemTime>
        {!selected && (
          <>
            <Votes count={voteCount} userRate={upvoted || downvoted} />
            {(upvoted || downvoted) && <NumberLarge>{formatRating(voteRating)}</NumberLarge>}
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
          <ItemTitle>{title}</ItemTitle>
          <PostText>{text}</PostText>
          <Footer>
            {imageUrl && <PostImage imageUrl={imageUrl} alt="post image" onClick={open} />}
            {!selected && <FlagItem flagged={wasFlaggedByMe} toggleFlag={togglePostFlag} />}
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
  venue: { id, posts, name, industry: { lite }},
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
        <Post
          post={p}
          upvotePost={upvotePost}
          downvotePost={downvotePost}
        />
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
