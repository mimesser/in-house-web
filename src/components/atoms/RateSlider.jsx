import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { appColors } from "../../style";

const getEsgType = (rateTagCategoryId) => {
  switch (rateTagCategoryId) {
    case "7cbf2716-87ad-42dc-4ed1-08d9ab04f553":
      return "environment";
    case "6b3de25b-6e0c-495f-4ed2-08d9ab04f553":
      return "social";
    case "6d48dd8c-abcf-4c69-4ed3-08d9ab04f553":
      return "governance";
    default:
      return null;
  }
};

const options = {
  environment: {
    rating: appColors.greenDark,
    rated: appColors.greenFaded,
    default: "#F0F1F3",
  },
  social: {
    rating: appColors.wineDark,
    rated: appColors.wineFaded,
    default: "#F0F1F3",
  },
  governance: {
    rating: appColors.blueDark,
    rated: appColors.blueFaded,
    default: "#F0F1F3",
  },
};

export const Indicator = styled(({ count, iconSize = 0.75, ...rest }) => (
  <Icon {...rest} icon="radio-marked" size={iconSize} />
))`
  display: flex;
  justify-content: center;
  color: ${appColors.black};
  svg {
    padding: 0 3px 0 0;
  }
  padding: 0 !important;
  position: relative;
  display: block;
  width: 20px;
  height: 100%;
  top: 5px;

  left: ${(props) => `${props.percentage}%`};
`;

export const RateSlider = ({
  minSliderLength = 0,
  maxSliderLength = 10,
  rateTagCategoryId,
  userValue,
  setUserValue,
  onSlideEnd,
  onSlideStart,
  inProgress,
}) => {
  const [userRated, setUserRated] = useState(!!userValue);
  const [active, setActive] = useState(false);
  const timeoutRef = useRef(null);

  const rateCurrentTag = (e) => {
    timeoutRef.current = setTimeout(() => {
      onSlideEnd(e.target.value);
    }, 100);
  };

  const editCurrentTag = () => {
    if (timeoutRef.current && !inProgress) {
      clearTimeout(timeoutRef.current);
    }
  };

  const percentage = (userValue / maxSliderLength) * 100;

  const handleProgressChange = ({ target: { value } }) => {
    setUserRated(true);
    setUserValue(value);
  };

  const handleSlideStart = () => {
    onSlideStart();
    setActive(true);
    editCurrentTag();
  };

  const handleSlideEnd = (e) => {
    setActive(false);
    rateCurrentTag(e);
  };

  return (
    <>
      <InputTrack
        active={active}
        userRated={userRated}
        type="range"
        percentage={percentage}
        rateTagCategoryId={rateTagCategoryId}
        step="0.1"
        min={minSliderLength}
        max={maxSliderLength}
        value={userValue ? userValue : maxSliderLength / 2}
        onChange={handleProgressChange}
        onTouchMove={handleProgressChange}
        onMouseDown={() => {
          if (!inProgress) {
            handleSlideStart();
          }
        }}
        onTouchStart={() => {
          if (!inProgress) {
            handleSlideStart();
          }
        }}
        onMouseUp={(e) => {
          if (!inProgress) {
            handleSlideEnd(e);
          }
        }}
        onTouchEnd={(e) => {
          if (!inProgress) {
            handleSlideEnd(e);
          }
        }}
        disabled={inProgress}
      />
    </>
  );
};

const baseStyling = css`
  background: ${(props) => {
    const { userRated, active, rateTagCategoryId, percentage } = props;

    const getTrackColour = (currentActivity) => {
      return (
        `linear-gradient(to right, ${
          options[getEsgType(rateTagCategoryId)][currentActivity]
        } 0%, ${options[getEsgType(rateTagCategoryId)][currentActivity]} ` +
        percentage +
        `%, ${options[getEsgType(rateTagCategoryId)].default} ` +
        percentage +
        `%, ${options[getEsgType(rateTagCategoryId)].default} 100%)`
      );
    };

    if (!userRated && !active) {
      return `${appColors.grey200}`;
    } else if (!active && userRated) {
      return getTrackColour("rated");
    } else {
      return getTrackColour("rating");
    }
  }};
`;

const InputTrack = styled.input`
  height: 16px;
  border-radius: 10px;

  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  &::-ms-track {
    width: 100%;
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  /* thumb */
  /* Special styling for WebKit/Blink */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;

    border: ${({ active }) =>
      active ? `1px solid ${appColors.grey600}` : "1px solid #BCBCBC"};
    height: ${({ active }) => (active ? "27px" : "22px")};
    width: ${({ active }) => (active ? "27px" : "22px")};

    visibility: ${({ active, userRated }) => {
      if (!active && userRated) {
        return "hidden";
      } else if (active) {
        return "visible";
      } else if (!active && !userRated) {
        return "visible";
      }
    }};

    box-shadow: 1px 2px 3px rgba(162, 157, 157, 0.6);
    border-radius: 50%;
    background: ${({ active }) =>
      active ? `${appColors.white}` : `${appColors.grey100}`};
    cursor: pointer;
    margin-top: ${({ active }) =>
      active
        ? "-7px"
        : "-3px"}; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
  }

  /* All the same stuff for Firefox */
  &::-moz-range-thumb {
    border: ${({ active }) =>
      active ? `1px solid ${appColors.grey600}` : "1px solid #BCBCBC"};
    height: ${({ active }) => (active ? "27px" : "22px")};
    width: ${({ active }) => (active ? "27px" : "22px")};

    visibility: ${({ active, userRated }) => {
      if (!active && userRated) {
        return "hidden";
      } else if (active) {
        return "visible";
      } else if (!active && !userRated) {
        return "visible";
      }
    }};

    box-shadow: 1px 2px 3px rgba(162, 157, 157, 0.6);
    border-radius: 50%;
    background: ${({ active }) =>
      active ? `${appColors.white}` : `${appColors.grey100}`};
    cursor: pointer;
  }

  /* All the same stuff for IE */
  &::-ms-thumb {
    border: ${({ active }) =>
      active ? `1px solid ${appColors.grey600}` : "1px solid #BCBCBC"};
    height: ${({ active }) => (active ? "27px" : "22px")};
    width: ${({ active }) => (active ? "27px" : "22px")};

    visibility: ${({ active, userRated }) => {
      if (!active && userRated) {
        return "hidden";
      } else if (active) {
        return "visible";
      } else if (!active && !userRated) {
        return "visible";
      }
    }};

    box-shadow: 1px 2px 3px rgba(162, 157, 157, 0.6);
    border-radius: 50%;
    background: ${({ active }) =>
      active ? `${appColors.white}` : `${appColors.grey100}`};
    cursor: pointer;
  }

  /* track */

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 16px;
    cursor: pointer;
  }

  &:focus::-webkit-slider-runnable-track {
    outline: none;
  }

  &::-moz-range-track {
    width: 100%;
    height: 16px;
    cursor: pointer;
  }

  &::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
  }

  &::-ms-fill-lower {
  }

  &:focus::-ms-fill-lower {
    outline: none;
  }

  &::-ms-fill-upper {
  }

  &:focus::-ms-fill-upper {
    outline: none;
  }

  ${baseStyling};
`;
