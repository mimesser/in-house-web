import React, { memo, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';

import { Loader, HelpTip } from '../../atoms';
import {
  setSelectedTag,
  loadRates,
  selectSelectedTag,
  setSelectedTagTargetRate,
  rateTag,
  selectSelectedRateInProgeress,
  selectSelectedCategory,
  setSelectedCategory,
  selectFilteredTags,
  selectCategoryRatings,
} from '../../../store/venues';
import { selectEsgCategories } from '../../../store/aggregate';
import { TabLayout } from './tabStyle';
import { appColors } from '../../../style';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { RateSlider, PokeButton } from '../../molecules';
import { RateCategory } from '../../molecules/RateCategory';
import { debounce, isNil } from 'lodash';

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
  transition: opacity 0.8s, blur 0.8s;
  opacity: ${({ selectedTag, isSelected }) => isSelected || !selectedTag ? '1' : '0.5'};
  // filter: ${({ selectedTag, isSelected }) => selectedTag && !isSelected ? 'blur(1px)' : 'none'};
`;

const StyledLoader = styled(Loader)`
  position: relative;
  display: block;
  height: 50px;
  width: 40px;

  margin: auto;
  margin-top: -50px;
`;

const SharePreviewWrap = styled.div`
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

  ${CellWrapper} > div:first-child {
    border-bottom: 0;
  }
`;

const Tag = memo(({
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
  category,
  selectedTag,
}) => {
  // const [rateValue, setRateValue] = useState(userRate);
  const inProgress = rateInProgress === definitionId;
  const isSelected = selectedTag && selectedTag.definitionId === definitionId; 
  const open = useCallback(
    () => setSelectedTag(definitionId),
    []
  );
  const changeRate = useCallback(
    debounce(value => {
      // setRateValue(value);
      setSelectedTagTargetRate(Math.round(value));
    }, 300),
    [],
  );
  const card = (
    <CellWrapper
      onMouseDown={rateInProgress && selectedTag ? undefined : open}
      onTouchStart={rateInProgress && selectedTag ? undefined : open}
      selectedTag={selectedTag}
      isSelected={isSelected}
    >
      <RateSlider
        title={name}
        onChange={value => changeRate(value)}
        onSlideStart={() => setSelectedTag(definitionId)}
        onSlideEnd={rateTag}
        value={getTeamRateIfRated(userRate, voteRating)}
        userRate={userRate}
        voteCount={voteCount}
        expanded={expanded}
        fillColor={category && appColors[category.color]}
        selectedTag={selectedTag}
        inProgress={inProgress}
        rateInProgress={rateInProgress}
      >
        {expanded && inProgress ? <StyledLoader black /> : null}
      </RateSlider>
      {!expanded && (
        <ShareLayout
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <PrivateShareButton id={definitionId} type="rate" />
        </ShareLayout>
      )}
    </CellWrapper>
  );

  return withHelp ? <HelpTip tip="see how everyone feels at a glance">{card}</HelpTip> : card;
});

const findTag = (id, tags) => {
  const tag = tags.find((t) => t.definitionId === id);
  if (!tag) {
    throw new Error(`Can't find tag ${id}`);
  }
  return tag;
};

const findCategoryRating = (id, categoryRatings) => {
  const cat = categoryRatings && categoryRatings.find((c) => c.id === id);
  return cat && cat.rating;
};

const RateTab = ({
  venue: { rates: tags },
  filteredTags,
  setSelectedCategory,
  setSelectedTag,
  setSelectedTagTargetRate,
  loadRates,
  selectedTag,
  rateTag,
  rateInProgress,
  categories,
  selectedCategory,
  categoryRatings,
}) => {
  useEffect(() => {
    loadRates();
  }, []);

  const renderSharePreview = useCallback(
    (id) => {
      const t = findTag(id, tags);

      return (
        <SharePreviewWrap>
          <Tag {...t} category={selectedCategory} />
        </SharePreviewWrap>
      );
    },
    [tags, selectedCategory],
  );
  const getTitleForShare = useCallback((id) => findTag(id, tags).name, [tags]);

  const rateTags = filteredTags || tags;
  return (
    <TabLayout>
      {categories
        ? categories.map((category, i) => (
            <RateCategory
              key={category.id}
              category={category}
              value={findCategoryRating(category.id, categoryRatings)}
              expanded={selectedCategory && selectedCategory.id === category.id}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedTag(null);
              }}
            />
          ))
        : null}
      {tags ? (
        rateTags
          // .filter((t) => (selectedCategory && selectedCategory.id === t.rateTagCategoryId) || !selectedCategory)
          // .filter(t => selectedTag ? t.definitionId === selectedTag.definitionId : t)
          .map((t, i) => (
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
              category={selectedCategory}
              selectedTag={selectedTag}
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
  categories: selectEsgCategories,
  categoryRatings: selectCategoryRatings,
  selectedTag: selectSelectedTag,
  rateInProgress: selectSelectedRateInProgeress,
  selectedCategory: selectSelectedCategory,
  filteredTags: selectFilteredTags,
});

const mapDispatch = {
  setSelectedCategory,
  setSelectedTag,
  setSelectedTagTargetRate,
  loadRates,
  rateTag,
};

export default connect(mapState, mapDispatch)(RateTab);
