import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Loader } from '../../atoms';
import { Slider } from '../../molecules';
import { setSelectedTag, loadRates } from '../../../store/venues';
import { Votes } from './Votes';
import { ItemCard, TabLayout, Main, ItemTitle, TabTitle } from './tabStyle';
import RateTag from './RateTag';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { calcRem, spacing } from '../../../style';

const RateCard = styled(ItemCard)`
   min-height: ${({ preview }) => !preview && calcRem('150px')};

   ${Main} {
      margin: 0 ${spacing.medium};
   }

   ${ItemTitle} {
      margin: ${spacing.small} 0;
   }
   ${Votes} {
      margin: auto 0 ${spacing.small} 0;
   }
`;

const Tag = ({ name, definitionId, userRate, voteCount, voteRating, setSelectedTag }) => {
   const open = useCallback(() => setSelectedTag(definitionId), [definitionId]);

   return (
      <RateCard onClick={open}>
         <Slider size={100} readonly value={userRate && voteRating} />
         <Main>
            <ItemTitle>{name}</ItemTitle>
            <Votes count={voteCount} />
         </Main>
         <PrivateShareButton id={definitionId} />
      </RateCard>
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
         const { name, voteCount, userRate, voteRating } = findTag(id, tags);

         return (
            <RateCard preview>
               <Slider size={100} readonly value={userRate && voteRating} />
               <Main>
                  <ItemTitle>{name}</ItemTitle>
                  <Votes count={voteCount} />
               </Main>
            </RateCard>
         );
      },
      [tags],
   );
   const getTitleForShare = useCallback(id => findTag(id, tags).name, [tags]);

   return (
      <TabLayout>
         <TabTitle>Industry top 10</TabTitle>
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
