import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';

import { loadPosts, selectSelectedPost, setSelectedPost } from '../../../store/venues';
import { Loader, Button, HelpTip, Break, Card } from '../../atoms';
import { formatDate } from '../../../utils/format';
import { ItemText, ItemTitle, ItemTime, Main, TabLayout, TabTitle } from './tabStyle';
import VotePost from './VotePost';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { Dial } from '../../molecules';
import { Votes } from './Votes';

const PostCard = styled(Card)``;

const Post = ({ post: { id, created, title, text, voteCount, voteRating, myVote }, setSelectedPost, withHelp }) => {
  const open = useCallback(() => setSelectedPost(id), [id]);

  const card = (
    <PostCard onClick={open}>
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

const renderSection = (title, posts, setSelectedPost) =>
  posts.length > 0 && (
    <>
      <TabTitle>{title}</TabTitle>
      {posts.map((p, i) => (
        <Post post={p} key={p.id} setSelectedPost={setSelectedPost} withHelp={i === 0} />
      ))}
    </>
  );

const renderPosts = (posts, setSelectedPost, selectedPost) =>
  !selectedPost && <>{renderSection('Chatter', posts, setSelectedPost)}</>;

const findPost = (id, posts) => {
  const post = posts.find((t) => t.id === id);
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
      {posts ? renderPosts(posts, setSelectedPost, selectedPost) : <Loader big />}
      <Link href={`/houses?id=${id}&tab=post&new`} as={`/houses/${id}/post/new`} passHref>
        <Button icon="arrow-right">new</Button>
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

export default connect(mapState, mapDispatch)(PostTab);
