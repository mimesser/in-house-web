import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ArrowLeft } from 'styled-icons/feather/ArrowLeft';

import { selectInDemo } from '../../../../store/demo';
import { DEMO_VENUES_ID } from '../../../../store/demo/data';
import { Votes } from '../Votes';
import { Address, Title } from '../../../atoms';
import { About, Back, Header, Industry, Ratings, Score } from './style';

const Banner = ({
  venue: {
    industry: { name: industry } = {},
    name,
    venueInfo: { address, city, state, zipCode, imageUrl },
    votesCount,
    rating,
  },
  inDemo,
}) => {
  const ratingParts = typeof rating === 'number' && rating.toFixed(1).split('.');
  const href = inDemo ? `/houses/${DEMO_VENUES_ID}` : '/houses';

  return (
    <Header imageUrl={imageUrl}>
      <Link href={href}>
        <Back>
          <ArrowLeft size={32} />
        </Back>
      </Link>
      <div>
        <About>
          <Industry>{industry}</Industry>
          <Title>{name}</Title>
          <Address>
            {address}
            <br />
            {city}, {state} {zipCode}
          </Address>
        </About>
        <Ratings>
          <Score>
            {ratingParts ? (
              <>
                {ratingParts[0]}.<sup>{ratingParts[1]}</sup>
              </>
            ) : (
              '—'
            )}
          </Score>
          <Votes count={votesCount} />
        </Ratings>
      </div>
    </Header>
  );
};

const mapState = createStructuredSelector({
  inDemo: selectInDemo,
});

export default connect(mapState)(Banner);
