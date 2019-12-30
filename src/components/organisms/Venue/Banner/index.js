import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectInDemo } from '../../../../store/demo';
import { selectShowHelp } from '../../../../store/help';
import { Votes } from '../Votes';
import { Address, ClearButton, H1, Icon, Industry, NumberLarge } from '../../../atoms';
import { Header, Ratings } from './style';

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
}) => {
  const ratingParts = typeof rating === 'number' && rating.toFixed(1).split('.');
  const href = inDemo ? `/` : '/houses';

  return (
    <Header imageUrl={imageUrl} showHelp={showHelp}>
      <Link href={href}>
        <ClearButton>
          <Icon icon="arrow-left" size={1.5} />
        </ClearButton>
      </Link>
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
          <Votes count={votesCount} />
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
