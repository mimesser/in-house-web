import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import differenceBy from 'lodash/differenceBy';

import { loadMinks, setSelectedMink } from '../../../store/venues';
import { fontSize, palette, spacing, font } from '../../../style';
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

const Mink = ({ mink: { id, created, question, voteCount, voteRating, myVote }, large, setSelectedMink }) => {
   const open = useCallback(() => setSelectedMink(id), [id]);

   return (
      <MinkCard large={large} onClick={open}>
         <ScoreAndVoters voteCount={voteCount} voteRating={myVote && voteRating} sliderSize={large ? 100 : 80} />
         <Main>
            <time dateTime={created}>{formatDate(created)}</time>
            <ItemTitle>{question}</ItemTitle>
         </Main>
         <PrivateShareButton id={id} />
      </MinkCard>
   );
};

const renderMink = (mink, setSelectedMink, large) => (
   <Mink mink={mink} key={mink.id} large={large} setSelectedMink={setSelectedMink} />
);

const renderMinks = (minks, newMinks, setSelectedMink) => (
   <>
      {newMinks && newMinks.length > 0 && (
         <>
            <TabTitle>New:</TabTitle>
            {newMinks.map(m => renderMink(m, setSelectedMink))}
         </>
      )}
      {minks.length > 0 && (
         <>
            <TabTitle>
               Top MINK<sup>©</sup>
               <Patent />
            </TabTitle>
            {renderMink(minks[0], setSelectedMink, true)}
         </>
      )}
      {minks.length > 1 && (
         <>
            <TabTitle>Runners up:</TabTitle>
            {minks.slice(1).map(m => renderMink(m, setSelectedMink))}
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

const MinkTab = ({ venue: { id, minks, newMinks }, loadMinks, setSelectedMink }) => {
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

   const exceptNew = differenceBy(minks, newMinks, m => m.id);

   return (
      <TabLayout>
         {minks ? renderMinks(exceptNew, newMinks, setSelectedMink) : <Loader big />}
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
};

export default connect(
   undefined,
   mapDispatch,
)(MinkTab);
