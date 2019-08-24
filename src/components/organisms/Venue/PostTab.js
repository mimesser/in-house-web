import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Link from 'next/link';

import { formatDate } from '../../../utils/format';
import { loadPosts, setSelectedPost } from '../../../store/venues';
import { Loader, Button } from '../../atoms';
import { ItemCard, ItemText, ItemTitle, ItemTime, Main, TabLayout, TabTitle } from './tabStyle';
import VotePost from './VotePost';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { ScoreAndVoters } from './ScoreAndVoters';
import { spacing } from '../../../style';
import { SharePreviewCard } from './sharePreviewStyle';

const PostCard = styled(ItemCard)`
   ${ScoreAndVoters} {
      margin-top: ${spacing.large};
   }

   ${ItemTitle} {
      width: 80%;
   }
`;

const Post = ({ post: { id, created, title, text, voteCount, voteRating }, large, setSelectedPost }) => {
   const open = useCallback(() => setSelectedPost(id), [id]);

   return (
      <PostCard large={large} onClick={open}>
         <ScoreAndVoters voteCount={voteCount} voteRating={voteRating} sliderSize={large ? 80 : 65} large={large} />
         <Main>
            <ItemTime dateTime={created}>{formatDate(created)}</ItemTime>
            <ItemTitle>{title}</ItemTitle>
            <ItemText>{text}</ItemText>
         </Main>
         <PrivateShareButton id={id} />
      </PostCard>
   );
};

const renderSection = (title, posts, setSelectedPost, large) =>
   posts.length > 0 && (
      <>
         <TabTitle>{title}</TabTitle>
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
            <SharePreviewCard>
               <ScoreAndVoters voteCount={voteCount} voteRating={voteRating} sliderSize={70} />
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
         {posts ? renderPosts(posts, setSelectedPost) : <Loader big />}
         <Link href={`/houses?id=${id}&tab=post&new`} as={`/houses/${id}/post/new`} passHref>
            <Button>new post</Button>
         </Link>
         <VotePost />
         <PrivateShare type="post" renderItem={renderSharePreview} getItemTitle={getTitleForShare} />
      </TabLayout>
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
