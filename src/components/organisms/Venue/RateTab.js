import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import isNil from 'lodash/isNil';

import { Loader } from '../../atoms';
import { Dial } from '../../molecules';
import { setSelectedTag, loadRates } from '../../../store/venues';
import { Votes } from './Votes';
import { ItemCard, TabLayout, Main, ItemTitle, TabTitle } from './tabStyle';
import { ScoreAndVoters } from './ScoreAndVoters';
import RateTag from './RateTag';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { calcRem, spacing } from '../../../style';

const RateCard = styled(ItemCard)`
   min-height: ${({ preview }) => !preview && calcRem('150px')};

   ${Main} {
      margin-top: ${spacing.large};
   }
`;

const getTeamRateIfRated = (userRate, voteRating) => (isNil(userRate) ? undefined : voteRating);

const Tag = ({ name, definitionId, userRate, voteCount, voteRating, setSelectedTag }) => {
   const open = useCallback(() => setSelectedTag(definitionId), [definitionId]);

   return (
      <RateCard large onClick={open}>
         <ScoreAndVoters voteCount={voteCount} voteRating={getTeamRateIfRated(userRate, voteRating)} sliderSize={80} />
         <Main>
            <ItemTitle>{name}</ItemTitle>
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
               <Dial size={100} readonly value={getTeamRateIfRated(userRate, voteRating)} />
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
