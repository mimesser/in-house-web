import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import isNil from 'lodash/isNil';

import { Loader, HelpTip, Card, Break } from '../../atoms';
import { setSelectedTag, loadRates, selectSelectedTag } from '../../../store/venues';
import { TabLayout, Main, ItemTitle } from './tabStyle';
import RateTag from './RateTag';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { Dial, RateSlider } from '../../molecules';
import { Votes } from './Votes';

const RateCard = styled(Card)``;

const getTeamRateIfRated = (userRate, voteRating) => (isNil(userRate) ? undefined : voteRating);

const log = (value) => console.log(value);

const ShareLayout = styled.div`
  position: relative;
  margin-top: -97px;
  right: 30px;
  width: 32px;
  height: 97px;
  z-index: 9;
`;

const CellWrapper = styled.div``;
const Tag = ({ name, definitionId, userRate, voteCount, voteRating, setSelectedTag, withHelp, expanded }) => {
  const open = useCallback(() => {
    setSelectedTag(definitionId);
  }, [definitionId]);
  const card = (
    <CellWrapper onClick={open}>
      <RateSlider
        title={name}
        onChange={log}
        value={getTeamRateIfRated(userRate, voteRating)}
        userRate={userRate}
        voteCount={voteCount}
        expanded={expanded}
      />
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

const RateTab = ({ venue: { rates: tags }, setSelectedTag, loadRates, selectedTag }) => {
  const [selected, setSelected] = useState(null);
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
            setSelectedTag={(definitionId) => {
              setSelected(definitionId);
              // selectSelectedTag(definitionId);
            }}
            withHelp={i === 0}
            expanded={selected === t.definitionId}
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
};

export default connect(mapState, mapDispatch)(RateTab);
