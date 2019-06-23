import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';

import { loadPosts, setSelectedPost } from '../../../store/venues';
import { fontSize, spacing } from '../../../theme';
import { Loader, Card, Flex, Button } from '../../atoms';
import { Votes } from './Votes';
import { Patent, Slider } from '../../molecules';
import { TabLayout } from './commonStyle';
import VotePost from './VotePost';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';

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
         <Slider readonly value={voteRating} />
         <Flex column justifyAround>
            <p>{title}</p>
            <p>{text}</p>
            <Votes count={voteCount} />
         </Flex>
         <PrivateShareButton id={id} />
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

const findPost = (id, posts) => {
   const post = posts.find(t => t.id === id);
   if (!post) {
      throw new Error(`Can't find post ${id}`);
   }
   return post;
};

const PostTab = ({ venue: { id, posts }, loadPosts, setSelectedPost }) => {
   useEffect(() => {
      loadPosts();
   }, []);

   const renderSharePreview = useCallback(
      id => {
         const { title, text, voteCount, voteRating } = findPost(id, posts);

         return (
            <PostCard>
               <Slider readonly value={voteRating} />
               <Flex column justifyAround>
                  <p>{title}</p>
                  <p>{text}</p>
                  <Votes count={voteCount} />
               </Flex>
            </PostCard>
         );
      },
      [posts],
   );
   const getTitleForShare = useCallback(id => findPost(id, posts).title, [posts]);

   return (
      <Tab>
         {posts ? renderPosts(posts, setSelectedPost) : <Loader big />}
         <Link href={`/houses?id=${id}&tab=post&new`} as={`/houses/${id}/post/new`} passHref>
            <Button>new post</Button>
         </Link>
         <VotePost />
         <PrivateShare type="post" renderItem={renderSharePreview} getItemTitle={getTitleForShare} />
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
