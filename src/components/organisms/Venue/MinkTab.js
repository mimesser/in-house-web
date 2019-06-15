import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import differenceBy from 'lodash/differenceBy';

import { loadMinks, setSelectedMink } from '../../../store/venues';
import { fontSize, spacing } from '../../../theme';
import { Loader, Card, Flex, Button } from '../../atoms';
import { Votes } from './Votes';
import { PokeButton, Patent } from '../../molecules';
import { Score, TabLayout } from './commonStyle';
import { formatDate } from '../../../utils/format';
import VoteMink from './VoteMink';

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
         <Score>{myVote ? voteRating : 'Please rate'}</Score>
         <Flex column justifyAround>
            <time dateTime={created}>{formatDate(created)}</time>
            <p>{question}</p>
            <Votes count={voteCount} />
         </Flex>
         <PokeButton
            onClick={e => {
               e.stopPropagation();
               console.log('share');
            }}
         />
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

const MinkTab = ({ venue: { id, minks, newMinks }, loadMinks, setSelectedMink }) => {
   useEffect(() => {
      loadMinks(id);
   }, []);

   const exceptNew = differenceBy(minks, newMinks, m => m.id);

   return (
      <Tab>
         {minks ? renderMinks(exceptNew, newMinks, setSelectedMink) : <Loader big />}
         <Link href={`/houses?id=${id}&tab=mink&new`} as={`/houses/${id}/mink/new`} passHref>
            <Button>Add mink</Button>
         </Link>
         <VoteMink />
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
