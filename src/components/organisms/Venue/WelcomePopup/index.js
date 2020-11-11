import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { HelpTip, Card } from '../../../atoms';
import { spacing, palette } from '../../../../style';
import { dismissWelcomeForm, selectSkipWelcome, selectSelectedVenue } from '../../../../store/venues';
import { DrawerMenu } from '../../DrawerMenu';
import PrivateShare from '../PrivateShare';
import PrivateShareButton from '../PrivateShareButton';
import { Main, ItemText, ItemTitle } from '../tabStyle';

const VenueCard = styled(Card)`
  min-height: 120px;
`;

const LightMessage = styled.p`
  white-space: normal;
  margin: ${spacing.xs} ${spacing.xl} ${spacing.xxxl} 0;
  color: ${palette.lightGray};
  font-size: 16px;
`;

const GreyMessage = styled(LightMessage)`
  color: ${palette.mediumGray};
  margin: 0;
`;

const HelpWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6.5rem;
`;

const PrivateShareButtonLayout = styled.div`
  margin-left: auto;
`;

const FlexWrap = styled.div`
  display: flex;
`;

export const WelcomePopup = ({ skipWelcome, dismissWelcomeForm, venue }) => {
  const [dontShow, setDontShow] = useState(skipWelcome);
  const handleChange = () => setDontShow(!dontShow);
  const handleOk = () => {
    setOpened(false);
    dismissWelcomeForm();
  };
  const [show, setShow] = useState(!skipWelcome);
  const [opened, setOpened] = useState(!skipWelcome);

  const renderVenueSharePreview = useCallback(
    (id) => {
      const {
        name,
        venueInfo: { address, city, state, zipCode },
      } = venue;

      return (
        <VenueCard>
          <Main>
            <ItemTitle>{name}</ItemTitle>
            <ItemText>{address}</ItemText>
            <ItemText>
              {city}, {state}
            </ItemText>
            <ItemText>{zipCode}</ItemText>
          </Main>
        </VenueCard>
      );
    },
    [venue],
  );

  const getVenueTitleForShare = useCallback((id) => venue.name, [venue]);
  return (
    <>
      <PrivateShare
        type="venue"
        renderItem={renderVenueSharePreview}
        getItemTitle={getVenueTitleForShare}
        getVenue={venue}
      />
      {show && (
        <DrawerMenu isOpen={opened} closeMenu={() => handleOk()}>
          <HelpTip tip="don’t be a jerk">
            <HelpWrap>
              <FlexWrap>
                <LightMessage>we will alert your leadership after +15% of your team starts talking</LightMessage>
                <PrivateShareButtonLayout>
                  <PrivateShareButton id={venue.id} type="venue" onOpenSharePopup={() => handleOk()} circleColor={palette.mediumGray} />
                </PrivateShareButtonLayout>
              </FlexWrap>
              <GreyMessage>(speak as a team - remain untraceable)</GreyMessage>
            </HelpWrap>
          </HelpTip>
        </DrawerMenu>
      )}
    </>
  );
};
const mapState = createStructuredSelector({
  skipWelcome: selectSkipWelcome,
  venue: selectSelectedVenue,
});

const mapDispatch = {
  dismissWelcomeForm,
};
export default connect(mapState, mapDispatch)(WelcomePopup);
