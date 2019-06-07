import React from 'react';
import styled from 'styled-components';

import { fontSize } from '../../../theme';
import { Loader, Card, Flex } from '../../atoms';
import { Votes } from './Votes';
import { PokeButton } from '../../molecules';
import { TabLayout, CARD_MIN_HEIGHT } from './commonStyle';

const TagCard = styled(Card)`
   p {
      font-size: ${fontSize.large};
      margin: 0;
   }
`;

const Score = styled.div`
   min-width: 6rem;
`;

const renderTags = rateTags =>
   rateTags ? (
      rateTags.map(({ name, definitionId, voteCount, voteRating }) => (
         <TagCard key={definitionId}>
            <Score />
            <Flex column justifyAround>
               <p>{name}</p>
               <Votes count={voteCount} />
            </Flex>
            <PokeButton onClick={() => console.log('share')} />
         </TagCard>
      ))
   ) : (
      <Loader big />
   );

export const RateTab = ({ venue: { rates: rateTags } }) => (
   <TabLayout>
      <p>Industry top 10</p>
      {renderTags(rateTags)}
   </TabLayout>
);
