import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import differenceBy from 'lodash/differenceBy';

import { loadMinks } from '../../../store/venues';
import { fontSize, spacing } from '../../../theme';
import { Loader, Card, Flex, Button } from '../../atoms';
import { Votes } from './Votes';
import { PokeButton, Patent } from '../../molecules';
import { TabLayout } from './commonStyle';
import { formatDate } from '../../../utils/format';

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

const Score = styled.div`
   min-width: 6rem;
`;

const Mink = ({ mink: { id, created, question, voteCount, voteRating }, large }) => (
   <MinkCard large={large}>
      <Score />
      <Flex column justifyAround>
         <time dateTime={created}>{formatDate(created)}</time>
         <p>{question}</p>
         <Votes count={voteCount} />
      </Flex>
      <PokeButton onClick={() => console.log('share')} />
   </MinkCard>
);

const renderMinks = (minks, newMinks) => (
   <>
      {newMinks && newMinks.length > 0 && (
         <>
            <p>New:</p>
            {newMinks.map(m => (
               <Mink mink={m} key={m.id} />
            ))}
         </>
      )}
      {minks.length > 0 && (
         <>
            <p>
               Top MINK<sup>©</sup>
               <Patent />
            </p>
            <Mink mink={minks[0]} key={minks[0].id} large />
         </>
      )}
      {minks.length > 1 && (
         <>
            <p>Runners up:</p>
            {minks.slice(1).map(m => (
               <Mink mink={m} key={m.id} />
            ))}
         </>
      )}
   </>
);

const MinkTab = ({ venue: { id, minks, newMinks }, loadMinks }) => {
   useEffect(() => {
      loadMinks(id);
   }, []);

   const exceptNew = differenceBy(minks, newMinks, m => m.id);

   return (
      <Tab>
         {minks ? renderMinks(exceptNew, newMinks) : <Loader big />}
         <Link href={`/houses?id=${id}&tab=mink&new`} as={`/houses/${id}/mink/new`} passHref>
            <Button>Add mink</Button>
         </Link>
      </Tab>
   );
};

const mapDispatch = {
   loadMinks,
};

export default connect(
   undefined,
   mapDispatch,
)(MinkTab);
