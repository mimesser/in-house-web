import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import isNil from 'lodash/isNil';

import { Loader, HelpTip, Card, Break } from '../../atoms';
import { setSelectedTag, loadRates, selectSelectedTag, rateTag } from '../../../store/venues';
import { TabLayout, Main, ItemTitle } from './tabStyle';

import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { Dial, RateSlider } from '../../molecules';
import { Votes } from './Votes';

const RateCard = styled(Card)``;

const getTeamRateIfRated = (userRate, voteRating) => (isNil(userRate) ? undefined : voteRating);

const ShareLayout = styled.div`
  position: relative;
  margin-top: -97px;
  right: 30px;
  width: 32px;
  height: 97px;
  z-index: 9;
`;

const CellWrapper = styled.div``;

const StyledLoader = styled(Loader)`
  position: relative;
  display: block;
  height: 50px;
  width: 40px;

  margin: auto;
  margin-top: -50px;
`;

const Tag = ({
  name,
  definitionId,
  userRate,
  voteCount,
  voteRating,
  setSelectedTag,
  withHelp,
  expanded,
  rateTag,
  rateInProgress,
}) => {
  const [rateValue, setRateValue] = useState(userRate);
  const open = useCallback(() => {
    rateTag(rateValue, definitionId);
  }, [definitionId]);
  const card = (
    <CellWrapper onClick={open}>
      <RateSlider
        title={name}
        onChange={setRateValue}
        value={getTeamRateIfRated(userRate, voteRating)}
        userRate={userRate}
        voteCount={voteCount}
        expanded={expanded}
      >
        {expanded && rateInProgress === definitionId ? <StyledLoader black /> : null}
      </RateSlider>
      <ShareLayout>
        <PrivateShareButton id={setSelectedTag} />
      </ShareLayout>
    </CellWrapper>
  );

  return withHelp ? <HelpTip tip="see how everyone feels at a glance">{card}</HelpTip> : card;
};

const findTag = (id, tags) => {
  const tag = tags.find((t) => t.definitionId === id);
  if (!tag) {
    throw new Error(`Can't find tag ${id}`);
  }
  return tag;
};

const RateTab = ({ venue: { rates: tags }, setSelectedTag, loadRates, selectedTag, rateTag }) => {
  useEffect(() => {
    loadRates();
  }, []);
  const renderSharePreview = useCallback(
    (id) => {
      const { name, voteCount, userRate, voteRating } = findTag(id, tags);

      return (
        <RateCard>
          <div>
            <Dial size={65} readonly value={getTeamRateIfRated(userRate, voteRating)} />
            <Main>
              <ItemTitle>{name}</ItemTitle>
              <Break />
              <div>
                <Votes count={voteCount} />
              </div>
            </Main>
          </div>
        </RateCard>
      );
    },
    [tags],
  );
  const getTitleForShare = useCallback((id) => findTag(id, tags).name, [tags]);
  const [rateInProgress, setRateInProgress] = useState(null);
  console.log('# updating selected tag:', selectedTag);
  if (!selectedTag && rateInProgress) {
    setRateInProgress(null);
  }
  return (
    <TabLayout>
      {tags ? (
        tags.map((t, i) => (
          <Tag
            {...t}
            key={t.definitionId}
            setSelectedTag={setSelectedTag}
            rateTag={(rate, tag) => {
              if (selectedTag) setRateInProgress(selectedTag.definitionId);
              if (rate !== t.userRate) rateTag(rate, tag);
            }}
            withHelp={i === 0}
            rateInProgress={rateInProgress}
            expanded={selectedTag && selectedTag.definitionId === t.definitionId}
          />
        ))
      ) : (
        <Loader big />
      )}
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
  rateTag,
};

export default connect(mapState, mapDispatch)(RateTab);
