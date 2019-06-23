import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import differenceBy from 'lodash/differenceBy';

import { loadMinks, setSelectedMink } from '../../../store/venues';
import { fontSize, spacing } from '../../../theme';
import { Loader, Card, Flex, Button } from '../../atoms';
import { Votes } from './Votes';
import { PokeButton, Patent, Slider } from '../../molecules';
import { TabLayout } from './commonStyle';
import { formatDate } from '../../../utils/format';
import VoteMink from './VoteMink';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';

// TODO: styling in general + "large" support for a top mink
const MinkCard = styled(Card)`
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
   ${MinkCard}:last-of-type {
      margin-bottom: ${spacing.large};
   }
`;

const Mink = ({ mink: { id, created, question, voteCount, voteRating, myVote }, large, setSelectedMink }) => {
   const open = useCallback(() => setSelectedMink(id), [id]);

   return (
      <MinkCard large={large} onClick={open}>
         <Slider readonly value={myVote ? voteRating : undefined} />
         <Flex column justifyAround>
            <time dateTime={created}>{formatDate(created)}</time>
            <p>{question}</p>
            <Votes count={voteCount} />
         </Flex>
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
            <p>New:</p>
            {newMinks.map(m => renderMink(m, setSelectedMink))}
         </>
      )}
      {minks.length > 0 && (
         <>
            <p>
               Top MINK<sup>©</sup>
               <Patent />
            </p>
            {renderMink(minks[0], setSelectedMink, true)}
         </>
      )}
      {minks.length > 1 && (
         <>
            <p>Runners up:</p>
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
            <MinkCard>
               <Slider readonly value={myVote ? voteRating : undefined} />
               <Flex column justifyAround>
                  <time dateTime={created}>{formatDate(created)}</time>
                  <p>{question}</p>
                  <Votes count={voteCount} />
               </Flex>
            </MinkCard>
         );
      },
      [minks],
   );
   const getTitleForShare = useCallback(id => findMink(id, minks).question, [minks]);

   const exceptNew = differenceBy(minks, newMinks, m => m.id);

   return (
      <Tab>
         {minks ? renderMinks(exceptNew, newMinks, setSelectedMink) : <Loader big />}
         <Link href={`/houses?id=${id}&tab=mink&new`} as={`/houses/${id}/mink/new`} passHref>
            <Button>Add mink</Button>
         </Link>
         <VoteMink />
         <PrivateShare type="mink" renderItem={renderSharePreview} getItemTitle={getTitleForShare} />
      </Tab>
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
