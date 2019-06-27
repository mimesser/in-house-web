import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fontSize } from '../../../style';
import { Loader, Card, Flex } from '../../atoms';
import { Slider } from '../../molecules';
import { setSelectedTag, loadRates } from '../../../store/venues';
import { Votes } from './Votes';
import { TabLayout } from './tabStyle';
import RateTag from './RateTag';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';

const TagCard = styled(Card)`
   p {
      font-size: ${fontSize.large};
      margin: 0;
   }
`;

const Tag = ({ name, definitionId, voteCount, voteRating, setSelectedTag }) => {
   const open = useCallback(() => setSelectedTag(definitionId), [definitionId]);

   return (
      <TagCard onClick={open}>
         <Slider readonly value={voteRating} />
         <Flex column justifyAround>
            <p>{name}</p>
            <Votes count={voteCount} />
         </Flex>
         <PrivateShareButton id={definitionId} />
      </TagCard>
   );
};

const findTag = (id, tags) => {
   const tag = tags.find(t => t.definitionId === id);
   if (!tag) {
      throw new Error(`Can't find tag ${id}`);
   }
   return tag;
};

const RateTab = ({ venue: { rates: tags }, setSelectedTag, loadRates }) => {
   useEffect(() => {
      loadRates();
   }, []);
   const renderSharePreview = useCallback(
      id => {
         const { name, voteCount, voteRating } = findTag(id, tags);

         return (
            <TagCard>
               <Slider readonly value={voteRating} />
               <Flex column justifyAround>
                  <p>{name}</p>
                  <Votes count={voteCount} />
               </Flex>
            </TagCard>
         );
      },
      [tags],
   );
   const getTitleForShare = useCallback(id => findTag(id, tags).name, [tags]);

   return (
      <TabLayout>
         <p>Industry top 10</p>
         {tags ? tags.map(t => <Tag {...t} key={t.definitionId} setSelectedTag={setSelectedTag} />) : <Loader big />}
         <RateTag />
         <PrivateShare type="rate" renderItem={renderSharePreview} getItemTitle={getTitleForShare} />
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
