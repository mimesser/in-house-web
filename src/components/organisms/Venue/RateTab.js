import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fontSize } from '../../../theme';
import { Loader, Card, Flex } from '../../atoms';
import { Votes } from './Votes';
import { PokeButton, Slider } from '../../molecules';
import { TabLayout } from './commonStyle';
import RateTag from './RateTag';
import { setSelectedTag, loadRates } from '../../../store/venues';

const TagCard = styled(Card)`
   p {
      font-size: ${fontSize.large};
      margin: 0;
   }
`;

const Tag = ({ name, definitionId, voteCount, voteRating, setSelectedTag }) => {
   const open = useCallback(() => {
      setSelectedTag(definitionId);
   }, [definitionId]);

   return (
      <TagCard onClick={open}>
         <Slider readonly value={voteRating} />
         <Flex column justifyAround>
            <p>{name}</p>
            <Votes count={voteCount} />
         </Flex>
         <PokeButton
            onClick={e => {
               e.stopPropagation();
               console.log('share');
            }}
         />
      </TagCard>
   );
};

const RateTab = ({ venue: { rates: tags }, setSelectedTag, loadRates }) => {
   useEffect(() => {
      loadRates();
   }, []);

   return (
      <TabLayout>
         <p>Industry top 10</p>
         {tags ? tags.map(t => <Tag {...t} key={t.definitionId} setSelectedTag={setSelectedTag} />) : <Loader big />}
         <RateTag />
      </TabLayout>
   );
};

const mapDispatch = {
   setSelectedTag,
   loadRates,
};

export default connect(
   undefined,
   mapDispatch,
)(RateTab);
