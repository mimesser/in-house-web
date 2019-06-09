import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { loadMinks } from '../../../store/venues';
import { fontSize, spacing } from '../../../theme';
import { Loader, Card, Flex } from '../../atoms';
import { Votes } from './Votes';
import { PokeButton, Patent } from '../../molecules';
import { TabLayout } from './commonStyle';

const Tab = styled(TabLayout)`
   > p {
      text-transform: uppercase;
   }
   ${Patent} {
      font-size: ${fontSize.tiny};
   }
`;

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

const Score = styled.div`
   min-width: 6rem;
`;

const Mink = ({ mink: { id, question, voteCount, voteRating }, large }) => (
   <MinkCard key={id} large>
      <Score />
      <Flex column justifyAround>
         {/* TODO real date */}
         <time dateTime="2001-05-15T19:00">01/21/2019</time>
         <p>{question}</p>
         <Votes count={voteCount} />
      </Flex>
      <PokeButton onClick={() => console.log('share')} />
   </MinkCard>
);

const renderMinks = minks =>
   minks ? (
      <>
         {minks.length > 0 && <Mink mink={minks[0]} large />}
         {minks.length > 1 && (
            <>
               <p>Runners up:</p>
               {minks.slice(1).map(m => (
                  <Mink mink={m} />
               ))}
            </>
         )}
      </>
   ) : (
      <Loader big />
   );

const MinkTab = ({ venue: { id, minks }, loadMinks }) => {
   useEffect(() => {
      loadMinks(id);
   }, []);

   return (
      <Tab>
         <p>
            Top MINK<sup>©</sup>
            <Patent />
         </p>
         {renderMinks(minks)}
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
