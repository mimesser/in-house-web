import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';

import { loadPosts, setSelectedPost } from '../../../store/venues';
import { fontSize, spacing } from '../../../theme';
import { Loader, Card, Flex, Button } from '../../atoms';
import { Votes } from './Votes';
import { PokeButton, Patent } from '../../molecules';
import { Score, TabLayout } from './commonStyle';
import { formatDate } from '../../../utils/format';
import VotePost from './VotePost';

// TODO: styling in general + "large" support for a top post
const PostCard = styled(Card)`
   p {
      font-size: ${fontSize.large};
      margin: ${spacing.small} 0;
   }
   time {
      font-size: ${fontSize.tiny};
   }
`;

const Tab = styled(TabLayout)`
   > p {
      text-transform: uppercase;
   }
   ${Patent} {
      font-size: ${fontSize.tiny};
   }
   ${Button} {
      margin: auto;
   }
   ${PostCard}:last-of-type {
      margin-bottom: ${spacing.large};
   }
`;

const Post = ({ post: { id, title, text, voteCount, voteRating }, large, setSelectedPost }) => {
   const open = useCallback(() => setSelectedPost(id), [id]);

   return (
      <PostCard large={large} onClick={open}>
         <Score>{voteRating}</Score>
         <Flex column justifyAround>
            <p>{title}</p>
            <p>{text}</p>
            <Votes count={voteCount} />
         </Flex>
         <PokeButton
            onClick={e => {
               e.stopPropagation();
               console.log('share');
            }}
         />
      </PostCard>
   );
};

const renderSection = (title, posts, setSelectedPost, large) =>
   posts.length > 0 && (
      <>
         <p>{title}</p>
         {posts.map(p => (
            <Post post={p} key={p.id} large={large} setSelectedPost={setSelectedPost} />
         ))}
      </>
   );

const renderPosts = (posts, setSelectedPost) => (
   <>
      {renderSection('Top 5 posts', posts.slice(0, 5), setSelectedPost, true)}
      {renderSection('Chatter', posts.slice(5), setSelectedPost)}
   </>
);

const PostTab = ({ venue: { id, posts }, loadPosts, setSelectedPost }) => {
   useEffect(() => {
      loadPosts();
   }, []);

   return (
      <Tab>
         {posts ? renderPosts(posts, setSelectedPost) : <Loader big />}
         <Link href={`/houses?id=${id}&tab=post&new`} as={`/houses/${id}/post/new`} passHref>
            <Button>new post</Button>
         </Link>
         <VotePost />
      </Tab>
   );
};

const mapDispatch = {
   loadPosts,
   setSelectedPost,
};

export default connect(
   undefined,
   mapDispatch,
)(PostTab);
