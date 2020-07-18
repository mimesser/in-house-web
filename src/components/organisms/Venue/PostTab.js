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

const PostImage = styled.div.attrs(({ imageUrl }) => imageUrl && { style: { backgroundImage: `url(${imageUrl})` } })`
  min-height: 48px;
  max-width: 48px;
  min-width: 48px;
  margin-left: auto;
  margin-top: auto;
  float: right;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const PostText = styled(ItemText)`
  margin-right: 39px;
`;

const Post = ({
  post: { id, created, title, text, voteCount, voteRating, myVote, imageUrl },
  setSelectedPost,
  withHelp,
}) => {
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
      <div>
        <PostText>{text}</PostText>
        <PostImage imageUrl={imageUrl} alt="post image" />
      </div>
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

const PostTab = ({ venue: { id, posts }, loadPosts, setSelectedPost, selectedPost, venueType = 'houses' }) => {
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
      <Link href={`/${venueType}?id=${id}&tab=post&new`} as={`/${venueType}/${id}/post/new`} passHref>
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
