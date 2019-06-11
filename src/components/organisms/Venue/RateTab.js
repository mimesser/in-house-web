import React from 'react';
import styled from 'styled-components';

import { fontSize, spacing } from '../../../theme';
import { Loader, Card, Flex } from '../../atoms';
import { Votes } from './Votes';
import { PokeButton } from '../../molecules';
import { TabLayout } from './commonStyle';

const TagCard = styled(Card)`
   p {
      font-size: ${fontSize.large};
      margin: 0;
   }
`;

// TODO: this placeholder for dial control
const Score = styled.div`
   flex-shrink: 0;
   width: 6rem;
   height: 6rem;
   border: 4px solid;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-right: ${spacing.medium};
`;

const renderTags = rateTags =>
   rateTags ? (
      rateTags.map(({ name, definitionId, voteCount, voteRating }) => (
         <TagCard key={definitionId}>
            <Score>{typeof voteRating === 'number' ? voteRating : 'Please rate'}</Score>
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
