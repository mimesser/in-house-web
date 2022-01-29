import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { isNil } from "lodash";

import {
  NumberLarge,
  NumberSmall,
  Icon,
  Slider,
  SlidingValue,
	Loader,
	RateSlider
} from "../atoms";
import { PokeButton } from "../organisms/Venue";
import PrivateShareButton from "../organisms/Venue/PrivateShareButton";
import { fontSize, font, palette, theme } from "../../style";
import { formatRating, pluralFormatRatings } from "../../utils/format";

const FONT_RATIO = 3.6;

const Dot = styled(({ size, padd, ...rest }) => (
  <NumberLarge {...rest}>.</NumberLarge>
))`
  ${font.light};
  color: ${({ color }) => color};
  margin-left: -1em;
  font-size: ${({ size, padd }) => (size - padd) / FONT_RATIO}px;
  ${font.bold};
`;

const Title = styled.div`
  height: 17px;
  font-weight: 900;
  font-size: 14px;
  color: ${palette.grey600};
  font-family: Helvetica Neue;

  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
`;

const Wrapper = styled.div`
  background: ${palette.grey100};
  // box-shadow: inset 0px 0.5px 0px #f1f2f4, inset 0px -0.5px 0px #f1f2f4;
  // box-shadow: inset 0px -0.5px 0px #cbccd0;
  padding: 16px 12px;
  height: 90px;
  width: 100%;
  border-bottom: 1px solid #cbccd0;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  height: 17px;
  width: 100%;
`;

const SvgContainer = styled.div`
  width: 17px;
  margin-right: 3.25px;
`;

const Container = styled.div`
  display: flex;
  margin-right: 51px;
  font-size: ${({ selectedTag, definitionId }) => {
    if (selectedTag?.definitionId === definitionId) {
      return "21px";
    }
  }};
  font-weight: ${({ selectedTag, definitionId }) => {
    if (selectedTag?.definitionId === definitionId) {
      return 900;
    }
  }};
  justify-content: flex-end;
`;

const StyledLoader = styled(Loader)`
  position: absolute;
  display: block;
  height: 50px;
  width: 40px;
  left: 50%;
`;

const VotesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
  padding-left: 1px;
  padding-right: 1px;
`;

const Votes = styled.span`
  margin-left: 7px;
  letter-spacing: 1px;
`;

const VotesDetailsContainer = styled(
  ({
    count,
    iconSize = 1,
    userRate,
    pluralFormat,
    voteRating,
    padd, // remove
    valueColor,
    title,
    definitionId,
    selectedTag,
    userValue,
    ...rest
  }) => {
    const renderVotesRating = () => {
      if (selectedTag?.definitionId === definitionId) {
        return <span>{Math.trunc(userValue)}</span>;
      }
      return (
        <>
          <SvgContainer>
            <Icon icon="users-updated" size={iconSize} />
          </SvgContainer>

          <VotesContainer>
            <Votes>{count || 0}</Votes>
            {userRate ? (
              <>
                <Votes>/</Votes>
                <Votes>{userValue}</Votes>
              </>
            ) : null}

            <ShareLayout
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <PrivateShareButton
                id={definitionId}
                type="rate"
                color="#88898E"
              />
            </ShareLayout>
          </VotesContainer>
        </>
      );
    };
    return (
      <Container selectedTag={selectedTag} definitionId={definitionId}>
        {renderVotesRating()}
      </Container>
    );
  }
)`
  height: 17px;
  font-weight: 400; /* normal */
  color: ${palette.grey600};
`;

VotesDetailsContainer.defaultProps = () => ({
  pluralFormat: pluralFormatRatings,
});

// use or remove
const SlidingValueWrapper = styled.div`
  width: 70px;
  height: 54px;
  pointer-events: none;
  // margin-top: ${({ expanded }) => (expanded === true ? "-16px" : "4px")};
  margin-left: auto;
  z-index: 11;
  padding-top: 4px;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  align-items: baseline;
  //  ${({ expanded }) =>
    expanded === true ? "display: flex; margin-right:24px;" : ""}
}
`;

const ShareLayout = styled.div`
  position: absolute;
  right: 30px;
  width: 32px;
  z-index: 2;
  color: #d0d0d0;
  ${PokeButton} {
    color: ${palette.grey400};
  }
  right: 12px;
`;

const Indicator = styled(({ count, iconSize = "1", className }) => (
  <span className={className}>
    <Icon icon="dot" size={iconSize} />
  </span>
))`
  display: flex;
  justify-content: center;
  svg {
    padding: 0 3px 0 0;
  }
  padding: 0 !important;
  position: absolute;
  height: 100%;

  left: ${(props) => `${props.percentage}%`};
`;

const BaseRateSlider = ({
  value: initialValue = null,
  voteCount,
  voteRating,
  valueColor,
  title = "rate & appreciation",
  userRate = null,
  onChange,
  onSlideStart,
  onSlideEnd, // not used
  selectedTag,
  inProgress,
  targetRate,
  rateTagCategoryId,
  definitionId,
  ...sliderProps
}) => {
  const { padd, fillColor = palette.darkGray } = sliderProps; // fillcolor
  const [value, setValue] = useState(initialValue);
  const [userValue, setUserValue] = useState(userRate);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setUserValue(targetRate);
  }, [targetRate]);

  return (
    <>
      <Wrapper>
        <StyledRow>
          <Title>{title}</Title>

          <VotesDetailsContainer
            count={voteCount}
            userRate={userRate}
            userValue={userValue}
            pluralFormat={pluralFormatRatings}
            voteRating={voteRating}
            padd={padd}
            valueColor={valueColor}
            title={title}
            definitionId={definitionId}
            selectedTag={selectedTag}
          />
        </StyledRow>

        <br />
        <div
          style={{
            position: "relative",
          }}
        >
          {!isNil(userValue) && selectedTag?.definitionId !== definitionId && (
            <Indicator iconSize="0.5" percentage={voteRating * 10} />
          )}
          {inProgress && <StyledLoader black />}
          <RateSlider
            rateTagCategoryId={rateTagCategoryId}
            userValue={userValue}
            setUserValue={setUserValue}
            voteRating={voteRating}
            onSlideEnd={onChange}
            onSlideStart={onSlideStart}
            inProgress={inProgress}
            title={title} // remove
          />
        </div>
      </Wrapper>
      {sliderProps.children}
    </>
  );
};

BaseRateSlider.defaultProps = {
  size: 300,
  // padd: 0,
};

export const RateSliderContainer = styled(BaseRateSlider)``;
