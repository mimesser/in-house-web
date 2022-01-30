import React, { useCallback } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { spacing, palette, fontSize } from '../../../../style';
import PrivateShareButton from '../PrivateShareButton';
import PrivateShare from '../PrivateShare';

import { selectInDemo } from '../../../../store/demo';
import { selectShowHelp } from '../../../../store/help';
import { IconBadge } from '../IconBadge';
import { Address, ClearButton, H1, Icon, Industry, NumberLarge } from '../../../atoms';
import { Header } from './style';
import { VenueCard } from '../../VenueList/VenueCard';
import { findCategoryRating } from '../../VenueList';
import { selectEsgCategories } from '../../../../store/aggregate';

const LeftSide = styled.div`
  display: flex;

  ${Icon}:last-child {
    padding-left: ${spacing.md};
  }
`;

const Push = styled.span`
  margin-left: auto;
`;

const RightSide = styled.div`
  color: ${palette.white};
`;

const Claim = styled.span`
  ::before {
    content: '\\1F441 \\00a0';
    font-size: ${fontSize.md};
  }
  display: flex;
  align-items: center;
  padding: ${spacing.sm};
  background-color: ${palette.primary};
  text-transform: uppercase;
  font-size: ${fontSize.xs};
  margin-bottom: ${spacing.sm};
  display: none;
`;

const Banner = ({
  venue: {
    industry: { name: industry, lite } = {},
    name,
    venueInfo: { address, city, zipCode, imageUrl },
    insidersCount,
    rating,
  },
  venue,
  inDemo,
  showHelp,
  venueType = 'houses',
  categories,
}) => {
  const ratingParts = typeof rating === 'number' && rating.toFixed(1).split('.');
  const href = inDemo ? `/` : `/${venueType}`;
  const getTitleForShare = useCallback(() => name, []);
  const renderSharePreview = useCallback(() => {
    const venueCategories =
      categories &&
      categories.map((category) => {
        return { ...category, rating: findCategoryRating(category.id, venue.rateTagCategories) };
      });

    return <VenueCard venue={venue} categoryRatings={venueCategories} />;
  }, [venue.id]);

  return (
    <Header imageUrl={imageUrl} showHelp={showHelp}>
      <div>
        <LeftSide>
          <Link href={href}>
            <ClearButton>
              <Icon icon="arrow-left" size={1.5} />
              <Icon icon="logo" size={1.8} />
            </ClearButton>
          </Link>
        </LeftSide>
        <Push />
        <RightSide>
          <PrivateShareButton id={venue.id} type="venue" color={palette.offWhite} />
        </RightSide>
      </div>
      <div>
        <div>
          <Industry>{industry}</Industry>
          <H1>{name}</H1>
        </div>
        <Push />
        {!lite && (
          <NumberLarge>
            {ratingParts ? (
              <>
                {ratingParts[0]}
                <sup>.{ratingParts[1]}</sup>
              </>
            ) : (
              '—'
            )}
          </NumberLarge>
        )}
      </div>
      <div>
        <Claim> OWNER CLAIMED</Claim>
      </div>
      <div>
        {!lite && (
          <Address>
            {address}
            <br />
            {city}, {zipCode}
          </Address>
        )}
        <Push />
        <IconBadge count={insidersCount} inverse />
      </div>
      <PrivateShare type="venue" renderItem={renderSharePreview} getItemTitle={getTitleForShare} />
    </Header>
  );
};

const mapState = createStructuredSelector({
  inDemo: selectInDemo,
  showHelp: selectShowHelp,
  categories: selectEsgCategories,
});

export default connect(mapState)(Banner);
