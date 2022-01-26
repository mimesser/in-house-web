import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { debounce, isNil } from 'lodash';

import PrivateShare from './PrivateShare';

import { Loader, HelpTip, Button } from '../../atoms';
import {
  rateTag,
  setSelectedTag,
  setSelectedTagTargetRate,
  setVenueRates,
  setSelectedCategory,
  selectSelectedTag,
  selectSelectedRateInProgeress,
  selectSelectedCategory,
  selectFilteredTags,
  selectAllVenueTags,
  selectCategoryRatings,
} from '../../../store/venues';
import { selectEsgCategories } from '../../../store/aggregate';
import { TabLayout } from './tabStyle';
import { appColors, themeColors } from '../../../style';
import { RateSliderContainer } from '../../molecules';
import { RateCategory } from '../../molecules/RateCategory';

const getTeamRateIfRated = (userRate, voteRating) => (isNil(userRate) ? undefined : voteRating);

const CellWrapper = styled.div``;

const SharePreviewWrap = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  ${CellWrapper} > div:first-child {
    border-bottom: 0;
  }
`;

// to be re-introduced later
const NewRateButton = styled(Button)`
  margin: 0 !important;
  width: 100%;
  border: solid 2px white;
  position: sticky;
  z-index: 100;
  top: 46px;
`;

const RateCategoryWrapper = styled.div`
	background: #111111;
	padding: 30px 4px;
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
    // expanded,
    rateTag,
    rateInProgress,
    category,
    selectedTag,
		listIndex,
		rateTagCategoryId
  }) => {
		const [rateValue, setRateValue] = useState(userRate);
    const inProgress = rateInProgress === definitionId;

    const changeRate = useCallback(
      debounce((value) => {
        setRateValue(value);
				setSelectedTagTargetRate(Math.round(value));

				rateTag(Math.round(value))
      }, 200),
      [rateTag],
		);

    const card = (
      <CellWrapper>
        <RateSliderContainer
          title={name}
					onChange={(value) => changeRate(value)}
          onSlideStart={() => {
						setSelectedTag(definitionId)
					}}
          onSlideEnd={rateTag}
          value={getTeamRateIfRated(userRate, voteRating)}
          userRate={userRate}
          voteCount={voteCount}
          selectedTag={selectedTag}
          inProgress={inProgress}
          rateInProgress={rateInProgress}
          targetRate={rateValue}
					voteRating={voteRating}
					rateTagCategoryId={rateTagCategoryId}
					definitionId={definitionId}
        />
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
			if (!selectedTag) return;
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
			<RateCategoryWrapper>
				{categories
					? categories.map((category) => (
							<RateCategory
								key={category.id}
								category={category}
								value={findCategoryRating(category.id, categoryRatings)}
								selectedTag={selectedTag}
								active={selectedCategory && selectedCategory.id === category.id}
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
				</RateCategoryWrapper>
			{/* to be re-introduced later ? */}
      {/* <Link href="/feedback" passHref>
        <NewRateButton icon="arrow-right">new rate</NewRateButton>
      </Link> */}
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
