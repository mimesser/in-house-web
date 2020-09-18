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
import { Votes } from '../Votes';
import { Address, ClearButton, H1, Icon, Industry, NumberLarge, Card } from '../../../atoms';
import { Header } from './style';
import { Main, ItemText, ItemTitle } from '../tabStyle';

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
    industry: { name: industry } = {},
    name,
    venueInfo: { address, city, state, zipCode, imageUrl },
    votesCount,
    rating,
  },
  inDemo,
  showHelp,
  venueType = 'houses',
}) => {
  const ratingParts = typeof rating === 'number' && rating.toFixed(1).split('.');
  const href = inDemo ? `/` : `/${venueType}`;
  const getTitleForShare = useCallback(() => name, []);
  const renderSharePreview = useCallback(
    () => (
      <Card>
        <Main>
          <ItemTitle>{name}</ItemTitle>
          <ItemText>{address}</ItemText>
          <ItemText>
            {city}, {state}
          </ItemText>
          <ItemText>{zipCode}</ItemText>
        </Main>
      </Card>
    ),
    [],
  );

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
          <PrivateShareButton type="venue" color={palette.offWhite} />
        </RightSide>
      </div>
      <div>
        <div>
          <Industry>{industry}</Industry>
          <H1>{name}</H1>
        </div>
        <Push />
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
      </div>
      <div>
        <Claim> OWNER CLAIMED</Claim>
      </div>
      <div>
        <Address>
          {address}
          <br />
          {city}, {zipCode}
        </Address>
        <Push />
        <Votes count={votesCount} inverse />
      </div>
      <PrivateShare type="venue" renderItem={renderSharePreview} getItemTitle={getTitleForShare} />
    </Header>
  );
};

const mapState = createStructuredSelector({
  inDemo: selectInDemo,
  showHelp: selectShowHelp,
});

export default connect(mapState)(Banner);
