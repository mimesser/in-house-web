import React, { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';

import { loadMinks, setSelectedMink, setAddedMinkId } from '../../../store/venues';
import { fontSize, spacing, font } from '../../../style';
import { Loader, Button } from '../../atoms';
import { Patent } from '../../molecules';
import { TabLayout, ItemCard, Main, ItemTitle, TabTitle } from './tabStyle';
import { formatDate } from '../../../utils/format';
import VoteMink from './VoteMink';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { ScoreAndVoters } from './ScoreAndVoters';

const questionSize = ({ large }) => !large && `font-size: ${fontSize.primary}`;
const MinkCard = styled(ItemCard)`
   time {
      font-size: ${fontSize.tiny};
      font-family: ${font.number};
      margin-top: ${spacing.large};
   }

   ${ItemTitle} {
      margin-top: ${spacing.tiny};
      ${questionSize};
   }
`;

const Mink = ({
   mink: { id, created, question, voteCount, voteRating, myVote },
   isNew,
   large,
   setSelectedMink,
   setAddedMinkId,
}) => {
   const open = useCallback(() => setSelectedMink(id), [id]);
   const ref = useRef(null);
   useEffect(() => {
      if (isNew) {
         ref.current.scrollIntoView();
         setAddedMinkId(undefined);
      }
   }, [isNew, setAddedMinkId]);

   return (
      <MinkCard large={large} onClick={open} ref={ref}>
         <ScoreAndVoters voteCount={voteCount} voteRating={myVote && voteRating} sliderSize={large ? 100 : 80} />
         <Main>
            <time dateTime={created}>{formatDate(created)}</time>
            <ItemTitle>{question}</ItemTitle>
         </Main>
         <PrivateShareButton id={id} />
      </MinkCard>
   );
};

const renderMinks = (minks, setSelectedMink, addedMinkId, setAddedMinkId) => (
   <>
      {minks.length > 0 && (
         <>
            <TabTitle>
               Top MINK<sup>©</sup>
               <Patent />
            </TabTitle>
            <Mink mink={minks[0]} large setSelectedMink={setSelectedMink} />
         </>
      )}
      {minks.length > 1 && (
         <>
            <TabTitle>Runners up:</TabTitle>
            {minks.slice(1).map(m => (
               <Mink
                  mink={m}
                  key={m.id}
                  setSelectedMink={setSelectedMink}
                  isNew={m.id === addedMinkId}
                  setAddedMinkId={setAddedMinkId}
               />
            ))}
         </>
      )}
   </>
);

const findMink = (id, minks) => {
   const mink = minks.find(t => t.id === id);
   if (!mink) {
      throw new Error(`Can't find mink ${id}`);
   }
   return mink;
};

const MinkTab = ({ venue: { id, minks, addedMinkId }, loadMinks, setSelectedMink, setAddedMinkId }) => {
   useEffect(() => {
      loadMinks();
   }, []);
   const renderSharePreview = useCallback(
      id => {
         const { created, question, voteCount, voteRating, myVote } = findMink(id, minks);

         return (
            <MinkCard preview>
               <ScoreAndVoters voteCount={voteCount} voteRating={myVote && voteRating} sliderSize={80} />
               <Main>
                  <time dateTime={created}>{formatDate(created)}</time>
                  <ItemTitle>{question}</ItemTitle>
               </Main>
            </MinkCard>
         );
      },
      [minks],
   );
   const getTitleForShare = useCallback(id => findMink(id, minks).question, [minks]);

   return (
      <TabLayout>
         {minks ? renderMinks(minks, setSelectedMink, addedMinkId, setAddedMinkId) : <Loader big />}
         <Link href={`/houses?id=${id}&tab=mink&new`} as={`/houses/${id}/mink/new`} passHref>
            <Button>new mink</Button>
         </Link>
         <VoteMink />
         <PrivateShare type="mink" renderItem={renderSharePreview} getItemTitle={getTitleForShare} />
      </TabLayout>
   );
};

const mapDispatch = {
   loadMinks,
   setSelectedMink,
   setAddedMinkId,
};

export default connect(
   undefined,
   mapDispatch,
)(MinkTab);
