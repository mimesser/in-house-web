import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { debounce, isNil } from 'lodash';

import { Loader, HelpTip } from '../../atoms';
import {
  setSelectedTag,
  loadRates,
  selectSelectedTag,
  setSelectedTagTargetRate,
  setVenueRates,
  rateTag,
  selectSelectedRateInProgeress,
  selectSelectedCategory,
  setSelectedCategory,
  selectFilteredTags,
  selectAllVenueTags,
  selectCategoryRatings,
} from '../../../store/venues';
import { selectEsgCategories } from '../../../store/aggregate';
import { TabLayout } from './tabStyle';
import { appColors } from '../../../style';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { RateSlider, PokeButton } from '../../molecules';
import { RateCategory } from '../../molecules/RateCategory';
import { getClientPosition } from '../../atoms/Slider/utils';

const getTeamRateIfRated = (userRate, voteRating) => (isNil(userRate) ? undefined : voteRating);

const ShareLayout = styled.div`
  position: relative;
  float: right;
  margin-top: -87px;
  right: 30px;
  width: 32px;
  height: 97px;
  z-index: 2;
  color: #d0d0d0;
  ${PokeButton} {
    color: #d0d0d0;
  }
`;

const CellWrapper = styled.div`
  overflow: hidden;
  transition: opacity 0.8s, blur 0.8s;
  opacity: ${({ selectedTag, isSelected }) => (isSelected || !selectedTag ? '1' : '0.5')};
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
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  ${CellWrapper} > div:first-child {
    border-bottom: 0;
  }
`;

const Tag = memo(
  ({
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
    const [rateValue, setRateValue] = useState(userRate);
    const inProgress = false;
    const isSelected = selectedTag && selectedTag.definitionId === definitionId;
    const isScrolling = useRef(false);
    const selectedRef = useRef();
    const open = useCallback((e) => {
      const rate = getRate(e);
      changeRate(rate);
      setSelectedTag(definitionId);
    }, []);
    const handleTouchStart = useCallback((e) => {
      e.persist();
      document.addEventListener('scroll', () => {
        isScrolling.current = true;
      });

      setTimeout(() => {
        if (!isScrolling.current) open(e);

        document.removeEventListener('scroll', () => {
          isScrolling.current = true;
        });
        isScrolling.current = false;
      }, 200);
    }, []);
    const getRate = useCallback((e) => {
      const rect = selectedRef.current.getBoundingClientRect();
      const clientPos = getClientPosition(e);
      const rate = ((clientPos.x / rect.width) * 10).toFixed(1);

      return rate;
    }, []);
    const changeRate = useCallback(
      debounce((value) => {
        setRateValue(value);
        setSelectedTagTargetRate(Math.round(value));
      }, 200),
      [],
    );
    const card = (
      <CellWrapper
        onMouseDown={rateInProgress && selectedTag ? undefined : open}
        onTouchStart={rateInProgress && selectedTag ? undefined : handleTouchStart}
        onContextMenu={(e) => e.preventDefault()}
        selectedTag={selectedTag}
        isSelected={isSelected}
        ref={selectedRef}
      >
        <RateSlider
          title={name}
          onChange={(value) => changeRate(value)}
          onSlideStart={() => setSelectedTag(definitionId)}
          onSlideEnd={rateTag}
          value={getTeamRateIfRated(userRate, voteRating)}
          initialRating={voteRating}
          userRate={userRate}
          voteCount={voteCount}
          expanded={expanded}
          fillColor={category && appColors[category.color]}
          selectedTag={selectedTag}
          inProgress={inProgress}
          rateInProgress={rateInProgress}
          targetRate={rateValue}
        >
          {expanded && inProgress ? <StyledLoader black /> : null}
        </RateSlider>
        {!expanded && (
          <ShareLayout onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
            <PrivateShareButton id={definitionId} type="rate" />
          </ShareLayout>
        )}
      </CellWrapper>
    );

    return withHelp ? <HelpTip tip="see how everyone feels at a glance">{card}</HelpTip> : card;
  },
);

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
  venue,
  rateTags,
  filteredTags,
  setVenueRates,
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
  const [cancelSortRateTagsId, setCancelSortRateTagsId] = useState(null);

  useEffect(() => {
    setSelectedTag(undefined);
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

  const rateAndLocallyUpdateStore = (userValue) => {
    rateTag(+userValue, false);

    const _tags = rateTags.map((tag) => {
      if (tag.definitionId !== selectedTag.definitionId) {
        return { ...tag };
      }

      return {
        ...tag,
        voteCount: tag.userRate ? tag.voteCount : tag.voteCount + 1,
        userRate: +userValue,
        voteRating: tag.userRate
          ? (tag.voteRating * tag.voteCount - tag.userRate + +userValue) / tag.voteCount
          : (tag.voteRating * tag.voteCount + +userValue) / (tag.voteCount + 1),
      };
    });

    setVenueRates(_tags);

    const setSortedVenueRates = (__tags) => {
      const tagsSorted = __tags.sort(
        ({ voteCount: a1, userRate: a2, voteRating: a3 }, { voteCount: b1, userRate: b2, voteRating: b3 }) => {
          if (a1 < b1) {
            return 1;
          }

          if (a1 > b1) {
            return -1;
          }

          if (a2 < b2) {
            return 1;
          }

          if (a2 > b2) {
            return -1;
          }

          if (a3 < b3) {
            return 1;
          }

          if (a3 > b3) {
            return -1;
          }

          return 0;
        },
      );

      setVenueRates(tagsSorted);
    };

    if (cancelSortRateTagsId) {
      clearTimeout(cancelSortRateTagsId);
    }
    const throttleId = setTimeout(setSortedVenueRates.bind(null, _tags), 3000);
    setCancelSortRateTagsId(throttleId);
  };

  const tags = filteredTags || rateTags;

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
      {rateTags ? (
        tags.map((t, i) => (
          <Tag
            {...t}
            key={t.definitionId}
            definitionId={t.definitionId}
            setSelectedTag={setSelectedTag}
            setSelectedTagTargetRate={setSelectedTagTargetRate}
            rateTag={rateAndLocallyUpdateStore}
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
  rateTags: selectAllVenueTags,
});

const mapDispatch = {
  setSelectedCategory,
  setSelectedTag,
  setSelectedTagTargetRate,
  setVenueRates,
  loadRates,
  rateTag,
};

export default connect(mapState, mapDispatch)(RateTab);
