import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectInDemo } from '../../../../store/demo';
import { selectShowHelp } from '../../../../store/help';
import { Votes } from '../Votes';
import { Address, HouseNameLarge, Icon } from '../../../atoms';
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
  showHelp,
}) => {
  const ratingParts = typeof rating === 'number' && rating.toFixed(1).split('.');
  const href = inDemo ? `/` : '/houses';

  return (
    <Header imageUrl={imageUrl} showHelp={showHelp}>
      <Link href={href}>
        <Back>
          <Icon icon="arrow-left" size={1.5} />
        </Back>
      </Link>
      <div>
        <About>
          <Industry>{industry}</Industry>
          <HouseNameLarge>{name}</HouseNameLarge>
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
  showHelp: selectShowHelp,
});

export default connect(mapState)(Banner);
