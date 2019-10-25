import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import isNil from 'lodash/isNil';

import { Loader, HelpTip } from '../../atoms';
import { setSelectedTag, loadRates, selectSelectedTag } from '../../../store/venues';
import { ItemCard, TabLayout, Main, ItemTitle, TabTitle } from './tabStyle';
import { ScoreAndVoters } from './ScoreAndVoters';
import RateTag from './RateTag';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { calcRem, spacing } from '../../../style';
import { SharePreviewCard } from './sharePreviewStyle';

const RateCard = styled(ItemCard)`
  min-height: ${({ preview }) => !preview && calcRem('150px')};

  ${Main} {
    margin-top: ${spacing.large};
  }
`;

const getTeamRateIfRated = (userRate, voteRating) => (isNil(userRate) ? undefined : voteRating);

const Tag = ({ name, definitionId, userRate, voteCount, voteRating, setSelectedTag, withHelp }) => {
  const open = useCallback(() => setSelectedTag(definitionId), [definitionId]);
  const card = (
    <RateCard large onClick={open}>
      <ScoreAndVoters voteCount={voteCount} voteRating={getTeamRateIfRated(userRate, voteRating)} sliderSize={70} />
      <Main>
        <ItemTitle>{name}</ItemTitle>
      </Main>
      <PrivateShareButton id={definitionId} />
    </RateCard>
  );

  return withHelp ? <HelpTip tip="see how everyone feels at a glance">{card}</HelpTip> : card;
};

const findTag = (id, tags) => {
  const tag = tags.find(t => t.definitionId === id);
  if (!tag) {
    throw new Error(`Can't find tag ${id}`);
  }
  return tag;
};

const RateTab = ({ venue: { rates: tags }, setSelectedTag, loadRates, selectedTag }) => {
  useEffect(() => {
    loadRates();
  }, []);
  const renderSharePreview = useCallback(
    id => {
      const { name, voteCount, userRate, voteRating } = findTag(id, tags);

      return (
        <SharePreviewCard>
          <ScoreAndVoters voteCount={voteCount} voteRating={getTeamRateIfRated(userRate, voteRating)} sliderSize={70} />
          <Main>
            <ItemTitle>{name}</ItemTitle>
          </Main>
        </SharePreviewCard>
      );
    },
    [tags],
  );
  const getTitleForShare = useCallback(id => findTag(id, tags).name, [tags]);

  return (
    <TabLayout>
      <TabTitle>Industry top 10</TabTitle>
      {tags ? (
        !selectedTag &&
        tags.map((t, i) => <Tag {...t} key={t.definitionId} setSelectedTag={setSelectedTag} withHelp={i === 0} />)
      ) : (
        <Loader big />
      )}
      <RateTag />
      <PrivateShare type="rate" renderItem={renderSharePreview} getItemTitle={getTitleForShare} />
    </TabLayout>
  );
};

const mapState = createStructuredSelector({
  selectedTag: selectSelectedTag,
});

const mapDispatch = {
  setSelectedTag,
  loadRates,
};

export default connect(
  mapState,
  mapDispatch,
)(RateTab);
