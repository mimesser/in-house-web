import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import isNil from 'lodash/isNil';

import { Loader, HelpTip, Card, Break } from '../../atoms';
import {
  setSelectedTag,
  loadRates,
  selectSelectedTag,
  setSelectedTagTargetRate,
  rateTag,
  selectSelectedRateInProgeress,
} from '../../../store/venues';
import { TabLayout, Main, ItemTitle } from './tabStyle';

import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { Dial, RateSlider, PokeButton } from '../../molecules';
import { Votes } from './Votes';

const RateCard = styled(Card)`
  min-height: 120px;
`;

const getTeamRateIfRated = (userRate, voteRating) => (isNil(userRate) ? undefined : voteRating);

const ShareLayout = styled.div`
  position: relative;
  float: right;
  margin-top: -87px;
  right: 30px;
  width: 32px;
  height: 97px;
  z-index: 9;
  color: #d0d0d0;
  ${PokeButton} {
    color: #d0d0d0;
  }
`;

const CellWrapper = styled.div`
  overflow: hidden;
`;

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
  setSelectedTagTargetRate,
  withHelp,
  expanded,
  rateTag,
  rateInProgress,
}) => {
  const [rateValue, setRateValue] = useState(userRate);
  const open = useCallback(
    (e) => {
      console.log('# open:', { definitionId, e });
      setSelectedTag(definitionId);
    },
    [definitionId],
  );
  const card = (
    <CellWrapper onClick={open}>
      <RateSlider
        title={name}
        onChange={(value) => {
          setRateValue(value);
          setSelectedTagTargetRate(value);
        }}
        onSlideStart={(value) => {
          console.log('Slide START :', { definitionId, userRate });
          setSelectedTag(definitionId);
        }}
        onSlideEnd={(value) => {
          console.log('Slide END :', { definitionId, userRate });
          rateTag(definitionId);
        }}
        value={getTeamRateIfRated(userRate, voteRating)}
        userRate={userRate}
        voteCount={voteCount}
        expanded={expanded}
      >
        {expanded && rateInProgress === definitionId ? <StyledLoader black /> : null}
      </RateSlider>
      {!expanded && (
        <ShareLayout>
          <PrivateShareButton id={definitionId} type="rate" />
        </ShareLayout>
      )}
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

const RateTab = ({
  venue: { rates: tags },
  setSelectedTag,
  setSelectedTagTargetRate,
  loadRates,
  selectedTag,
  rateTag,
  rateInProgress,
}) => {
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

  return (
    <TabLayout>
      {tags ? (
        tags.map((t, i) => (
          <Tag
            {...t}
            key={t.definitionId}
            definitionId={t.definitionId}
            setSelectedTag={setSelectedTag}
            setSelectedTagTargetRate={setSelectedTagTargetRate}
            rateTag={rateTag}
            userRate={t.userRate ? t.userRate : null}
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
  rateInProgress: selectSelectedRateInProgeress,
});

const mapDispatch = {
  setSelectedTag,
  setSelectedTagTargetRate,
  loadRates,
  rateTag,
};

export default connect(mapState, mapDispatch)(RateTab);
