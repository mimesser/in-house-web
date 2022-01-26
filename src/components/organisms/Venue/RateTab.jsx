import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { debounce, isNil } from 'lodash';

import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';

import { Loader, HelpTip, Button } from '../../atoms';
import {
  setSelectedTag,
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
import { appColors, themeColors } from '../../../style';
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

/* eslint-disable indent */
const CellWrapper = styled.div.attrs(({ animateInDelay }) => ({
  style: {
    transition: `opacity 0.8s ease-in ${animateInDelay}s, blur 0.8s`,
  },
}))`
  overflow: hidden;
  opacity: ${({ selectedTag, isSelected, visible }) => {
    if (visible) {
      return isSelected || !selectedTag ? '1' : '0.5';
    }

    return '0';
  }};
`;
/* eslint-enable indent */

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
const NewRateButton = styled(Button)`
  margin: 0 !important;
  width: 100%;
  border: solid 2px white;
  position: sticky;
  z-index: 100;
  top: 46px;
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
    listIndex,
  }) => {
    const [rateValue, setRateValue] = useState(userRate);
    const [visible, setVisible] = useState(false);
    const inProgress = rateInProgress === definitionId;
    const isSelected = selectedTag && selectedTag.definitionId === definitionId;
    const isScrolling = useRef(false);
    const selectedRef = useRef();
    const handleScroll = () => {
      isScrolling.current = true;
    };
    const open = useCallback((e) => {
      const rate = getRate(e);
      changeRate(rate);
      setSelectedTag(definitionId);
    }, []);
    const handleTouchStart = useCallback((e) => {
      e.persist();
      document.addEventListener('scroll', handleScroll);
      setTimeout(() => {
        if (!isScrolling.current) {
          open(e);
        }
        document.removeEventListener('scroll', handleScroll);
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
    useEffect(() => {
      let visibilityTimeoutId = setTimeout(() => {
        visibilityTimeoutId = null;

        setVisible(true);
      }, 250);

      return () => {
        setVisible(false);
        if (visibilityTimeoutId) {
          clearTimeout(visibilityTimeoutId);
        }
      };
    }, []);
    useEffect(() => () => document.removeEventListener('scroll', handleScroll), []);

    const card = (
      <CellWrapper
        onMouseDown={rateInProgress && selectedTag ? undefined : open}
        onTouchStart={rateInProgress && selectedTag ? undefined : handleTouchStart}
        onContextMenu={(e) => e.preventDefault()}
        selectedTag={selectedTag}
        isSelected={isSelected}
        ref={selectedRef}
        animateInDelay={listIndex * 0.1}
        visible={visible}
      >
        <RateSlider
          title={name}
          onChange={(value) => changeRate(value)}
          onSlideStart={() => setSelectedTag(definitionId)}
          onSlideEnd={rateTag}
          value={getTeamRateIfRated(userRate, voteRating)}
          userRate={userRate}
          voteCount={voteCount}
          expanded={expanded}
          fillColor={category ? appColors[category.color] : themeColors.darkGray}
          selectedTag={selectedTag}
          inProgress={inProgress}
          rateInProgress={rateInProgress}
          targetRate={rateValue}
          voteRating={voteRating}
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
  rateTags,
  filteredTags,
  setVenueRates,
  setSelectedCategory,
  setSelectedTag,
  setSelectedTagTargetRate,
  selectedTag,
  rateTag,
  rateInProgress,
  categories,
  selectedCategory,
  categoryRatings,
  loading,
}) => {
  const [cancelSortRateTagsId, setCancelSortRateTagsId] = useState(null);
  const [tags, setTags] = useState(rateTags);

  const renderSharePreview = useCallback(
    (id) => {
      const t = findTag(id, rateTags);
      return (
        <SharePreviewWrap>
          <Tag {...t} category={selectedCategory} />
        </SharePreviewWrap>
      );
    },
    [rateTags, selectedCategory],
  );
  const getTitleForShare = useCallback((id) => findTag(id, rateTags).name, [rateTags]);

  const rateAndLocallyUpdateStore = useCallback(
    (userValue) => {
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
          (
            { voteCount: a1, userRate: a2, voteRating: a3 },
            { voteCount: b1, userRate: b2, voteRating: b3 },
          ) => {
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
      const throttleId = setTimeout(() => setSortedVenueRates(_tags), 3000);
      setCancelSortRateTagsId(throttleId);
    },
    [cancelSortRateTagsId, rateTags, selectedTag],
  );

  useEffect(() => {
    if (filteredTags) {
      setTags(filteredTags);
    } else {
      setTags(rateTags);
    }

    return () => setTags(null);
  }, [rateTags, filteredTags]);

  return (
    <TabLayout>
      {categories
        ? categories.map((category) => (
            <RateCategory
              key={category.id}
              category={category}
              value={findCategoryRating(category.id, categoryRatings)}
              expanded={selectedCategory && selectedCategory.id === category.id}
              onClick={() => {
                if (selectedCategory && selectedCategory.id === category.id) {
                  setSelectedCategory(null);
                } else {
                  setSelectedCategory(category);
                }
                setSelectedTag(null);
              }}
            />
          ))
        : null}
      <Link href="/feedback" passHref>
        <NewRateButton icon="arrow-right">new Rate</NewRateButton>
      </Link>
      {tags && !loading ? (
        tags.map((t, i) => (
          <Tag
            {...t}
            key={`${t.definitionId}-${selectedCategory?.name || 'all'}`}
            definitionId={t.definitionId}
            setSelectedTag={setSelectedTag}
            setSelectedTagTargetRate={setSelectedTagTargetRate}
            rateTag={rateAndLocallyUpdateStore}
            userRate={!isNil(t.userRate) ? t.userRate : null}
            withHelp={i === 0}
            rateInProgress={rateInProgress}
            expanded={selectedTag && selectedTag.definitionId === t.definitionId}
            category={selectedCategory}
            selectedTag={selectedTag}
            listIndex={i}
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
  rateTag,
};

export default connect(mapState, mapDispatch)(RateTab);
