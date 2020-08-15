import React from 'react';
import styled from 'styled-components';

import { CircleSlider } from '../../atoms';
import { Dial } from '../../molecules';
import { Votes } from './Votes';
import { spacing, calcRem, fontSize, appColors } from '../../../style';

// TODO: move to venue list styles

const SmallCircle = styled(CircleSlider)`
  margin: 0;
  padding: 0;
  margin-top: 11px;
`;

const PieWrapper = styled.div`
  width: 14px;
  margin-left: auto;
  margin-right: -26px;
  margin-top: -110px;
  margin-bottom: -10px;
`;

const DialWrapper = styled.div`
  height: 72px;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;
export const ScoreAndVoters = styled(
  ({ voteRating, voteCount, sliderSize, className, categories, categoryRatings }) => (
    <div className={className}>
      <DialWrapper>
        <Dial size={sliderSize} readonly value={voteRating} />
        <Votes count={voteCount} iconSize={0.5} />

        <PieWrapper>
          {categoryRatings &&
            categoryRatings.map((category, i) => (
              <SmallCircle
                key={category.id}
                initialValue={category.rating}
                readonly
                size={20}
                progressColor={appColors[category.color]}
              />
            ))}
        </PieWrapper>
      </DialWrapper>
    </div>
  ),
)`
  display: block;
  position: relative;
  width: ${calcRem('104px')};
  margin: 16px;

  ${Votes} {
    display: block;
    position: relative;
    justify-content: center;
    text-align: center;
    width: 72px;
    height: 10px;
    margin: 0;
    top: -17px;
    left:-3px;
    font-size: ${fontSize.xs};
  }

  ${Dial} {
    justify: center;
    text-align: center;
    width: 72px;
  }
`;
