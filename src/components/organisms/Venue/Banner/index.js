import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { spacing } from '../../../../style';

import { selectInDemo } from '../../../../store/demo';
import { selectShowHelp } from '../../../../store/help';
import { Votes } from '../Votes';
import { Address, ClearButton, H1, Icon, Industry, NumberLarge } from '../../../atoms';
import { Header, Ratings } from './style';

const LeftSide = styled.div`
  width: 50%;
  float: left;
`;
const RightSide = styled.div`
  width: 100%;
  spacing: ${spacing.md}
  float: right;
  margin-left: 50%;
  margin-right:0;

  span {
    margin-left:4px;
    margin-right: 0
  }
`;

const Banner = ({
  venue: {
    industry: { name: industry } = {},
    name,
    venueInfo: { address, city, zipCode, imageUrl },
    votesCount,
    rating,
  },
  inDemo,
  showHelp,
  venueType = 'houses',
  shareLinks = undefined,
}) => {
  const ratingParts = typeof rating === 'number' && rating.toFixed(1).split('.');
  const href = inDemo ? `/` : `/${venueType}`;

  return (
    <Header imageUrl={imageUrl} showHelp={showHelp}>
      <div>
        <LeftSide>
          <Link href={href}>
            <ClearButton>
              <Icon icon="arrow-left" size={1.5} />
            </ClearButton>
          </Link>
        </LeftSide>
        <RightSide>{shareLinks}</RightSide>
      </div>
      <div>
        <div>
          <Industry>{industry}</Industry>
          <H1>{name}</H1>
          <Address>
            {address}
            <br />
            {city}, {zipCode}
          </Address>
        </div>
        <Ratings>
          <NumberLarge>
            {ratingParts ? (
              <>
                {ratingParts[0]}.<sup>{ratingParts[1]}</sup>
              </>
            ) : (
              '—'
            )}
          </NumberLarge>
          <Votes count={votesCount} inverse />
        </Ratings>
      </div>
    </Header>
  );
};

const mapState = createStructuredSelector({
  inDemo: selectInDemo,
  showHelp: selectShowHelp,
});

export default connect(mapState)(Banner);
