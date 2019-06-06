import React from 'react';
import styled from 'styled-components';
import { PaperPlane } from 'styled-icons/fa-solid/PaperPlane';

import { calcRem, spacing, fontSize } from '../../../theme';
import { Loader, Card, Flex, IconButton } from '../../atoms';
import { Votes } from './Votes';

const SCORE_MIN_WIDTH = calcRem('125px');
const TagCard = styled(Card)`
   position: relative;
   min-height: ${SCORE_MIN_WIDTH};
   padding: ${spacing.medium};
   p {
      font-size: ${fontSize.large};
      margin: 0;
   }
`;

const Tab = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   padding: 0 ${spacing.medium} ${spacing.medium} ${spacing.medium};
   
   ${TagCard} + ${TagCard} {
      margin-top: ${spacing.medium};
   }
`;

const Score = styled.div`
   min-width: ${SCORE_MIN_WIDTH};
`;

const ShareIcon = styled(PaperPlane).attrs({ size: 16 })`
   transform: rotate(28deg);
`;

const Share = styled(IconButton)`
   position: absolute;
   top: ${spacing.medium};
   right: ${spacing.medium};
   color: ${({ theme: { palette } }) => palette.grayscale[2]};
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
            <Share onClick={() => console.log('share')}>
               <ShareIcon />
            </Share>
         </TagCard>
      ))
   ) : (
      <Loader big />
   );

export const RateTab = ({ venue: { rates: rateTags } }) => (
   <Tab>
      <p>Industry top 10</p>
      {renderTags(rateTags)}
   </Tab>
);
