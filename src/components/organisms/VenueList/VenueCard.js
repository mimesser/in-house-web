import React, { useCallback } from 'react';

import styled from 'styled-components';
import { spacing, palette, calcRem, fontSize } from '../../../style';
import { Address, HelpTip, HouseNameLarge, Break } from '../../atoms';
import { PokeButton } from '../../molecules';
import { ScoreAndInsiders } from '../Venue/ScoreAndInsiders';
import { VenueContainer, Main, Industry } from './style';

import PrivateShareButton from '../Venue/PrivateShareButton';
import PrivateShare from '../Venue/PrivateShare';
import { ItemText, ItemTitle } from '../Venue/tabStyle';

const helpTip = (
  <>
    <div>select your house to see inside</div>
    <div>HOUSE (n): any business or organization</div>
  </>
);

const BoldBreak = styled(Break)`
  width: 58px;
  height: ${calcRem('18px')};
`;

const Wrapper = styled.div`
  ${Industry} {
    font-size: ${fontSize.xs};
  }
  ${Address} {
    font-size: ${fontSize.xs};
  }
  ${HouseNameLarge} {
    font-size: ${fontSize.sm};
  }
  display: block;
`;

const PrivateShareButtonLayout = styled.div`
  display: block;
  position: relative;
  height: 20px;
  width: 20px;
  margin: 0;
  margin-left: auto;
  top: -8px;
  margin-top: -20px;
  > ${PokeButton} {
    color: ${palette.lightGray};
    width: 20px;
  }
`;

export const VenueCard = ({ venue = {}, showVenue, withHelp, categoryRatings }) => {
  const handleClick = useCallback(() => showVenue(venue), [venue]);
  const { insidersCount, industry, name, rating, venueInfo: { imageUrl, address, city, state, zipCode } = {} } = venue;

  const addressBlock = venue.isPoll ? (
    <>
      <BoldBreak />
      <Address>{address}</Address>
    </>
  ) : (
    <>
      <Break />
      <Address>
        {address},
        <br />
        {city} {zipCode}
      </Address>
    </>
  );

  const card = (
    // TODO: this should be a link
    <Wrapper>
      <VenueContainer onClick={handleClick}>
        <div>
          <ScoreAndInsiders
            insidersCount={insidersCount}
            voteRating={rating}
            sliderSize={72}
            categoryRatings={categoryRatings}
          />
          <Main imageUrl={imageUrl}>
            <Industry>{industry && industry.name}</Industry>
            <PrivateShareButtonLayout>
              <PrivateShareButton id={venue.id} type="venue" />
            </PrivateShareButtonLayout>
            <HouseNameLarge>{name}</HouseNameLarge>

            {addressBlock}
          </Main>
        </div>
      </VenueContainer>
    </Wrapper>
  );

  return withHelp ? <HelpTip tip={helpTip}>{card}</HelpTip> : card;
};
