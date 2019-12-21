import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';

import { formatDate } from '../../../utils/format';
import { loadPosts, selectSelectedPost, setSelectedPost } from '../../../store/venues';
import { Loader, Button, HelpTip } from '../../atoms';
import { ItemCard, ItemText, ItemTitle, ItemTime, Main, TabLayout, TabTitle } from './tabStyle';
import VotePost from './VotePost';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { ScoreAndVoters } from './ScoreAndVoters';
import { spacing } from '../../../style';
import { SharePreviewCard } from './sharePreviewStyle';

const PostCard = styled(ItemCard)`
  ${ScoreAndVoters} {
    margin-top: ${spacing.lg};
  }

  ${ItemTitle} {
    width: 80%;
  }
`;

const Post = ({
  post: { id, created, title, text, voteCount, voteRating, myVote },
  large,
  setSelectedPost,
  withHelp,
}) => {
  const open = useCallback(() => setSelectedPost(id), [id]);

  const card = (
    <PostCard large={large} onClick={open}>
      <ScoreAndVoters
        voteCount={voteCount}
        voteRating={myVote && voteRating}
        sliderSize={large ? 80 : 65}
        large={large}
      />
      <Main>
        <ItemTime dateTime={created}>{formatDate(created)}</ItemTime>
        <ItemTitle>{title}</ItemTitle>
        <ItemText>{text}</ItemText>
      </Main>
      <PrivateShareButton id={id} />
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

const renderSection = (title, posts, setSelectedPost, large) =>
  posts.length > 0 && (
    <>
      <TabTitle>{title}</TabTitle>
      {posts.map((p, i) => (
        <Post post={p} key={p.id} large={large} setSelectedPost={setSelectedPost} withHelp={i === 0} />
      ))}
    </>
  );

const renderPosts = (posts, setSelectedPost, selectedPost) =>
  !selectedPost && (
    <>
      {renderSection('Top 5 posts', posts.slice(0, 5), setSelectedPost, true)}
      {renderSection('Chatter', posts.slice(5), setSelectedPost)}
    </>
  );

const findPost = (id, posts) => {
  const post = posts.find(t => t.id === id);
  if (!post) {
    throw new Error(`Can't find post ${id}`);
  }
  return post;
};

const PostTab = ({ venue: { id, posts }, loadPosts, setSelectedPost, selectedPost }) => {
  useEffect(() => {
    loadPosts();
  }, []);

  const renderSharePreview = useCallback(
    id => {
      const { title, text, voteCount, voteRating, myVote } = findPost(id, posts);

      return (
        <SharePreviewCard>
          <ScoreAndVoters voteCount={voteCount} voteRating={myVote && voteRating} sliderSize={70} />
          <Main>
            <ItemTitle>{title}</ItemTitle>
            <ItemText>{text}</ItemText>
          </Main>
        </SharePreviewCard>
      );
    },
    [posts],
  );
  const getTitleForShare = useCallback(id => findPost(id, posts).title, [posts]);

  return (
    <TabLayout>
      {posts ? renderPosts(posts, setSelectedPost, selectedPost) : <Loader big />}
      <Link href={`/houses?id=${id}&tab=post&new`} as={`/houses/${id}/post/new`} passHref>
        <Button>new post</Button>
      </Link>
      <VotePost />
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
};

export default connect(
  mapState,
  mapDispatch,
)(PostTab);
