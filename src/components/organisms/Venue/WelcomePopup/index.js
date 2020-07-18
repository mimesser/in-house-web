import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, HelpTip, H3, H1, H2, Checkbox, ClearButton, Card } from '../../../atoms';
import { PokeButton } from '../../../molecules';
import { spacing, appBackground, calcRem, palette } from '../../../../style';
import { Modal } from '../../Modal';
import { dismissWelcomeForm, selectSkipWelcome, selectSelectedVenue } from '../../../../store/venues';
import { DrawerMenu } from '../../DrawerMenu';
import { Container } from '../../../organisms/Modal/style';
import PrivateShare from '../PrivateShare';
import PrivateShareButton from '../PrivateShareButton';
import { Main, ItemText, ItemTitle } from '../tabStyle';

const LightMessage = styled.p`
  white-space: normal;
  margin-left: ${spacing.xl};
  margin-right: ${spacing.xl};
  margin-top: 0px;
  color: ${palette.lightGray};
  font-size: 16px;
`;

const GreyMessage = styled(LightMessage)`
  margin-top: 0px;
  color: ${palette.mediumGray};
`;

const Heading = styled(H2)`
  position: relative;
  margin-top: 131px;
  font-size: 18px;
  margin-left: ${spacing.xl};
  color: ${palette.lightGray};
`;
const HelpWrap = styled.div`
  margin-top: ${spacing.xl};
`;

const PrivateShareButtonLayout = styled.div`
  position: relative;

  margin-right: ${spacing.xl};
  > ${PokeButton} {
    color: ${palette.lightGray};
    position: absolute;
    top: -32px;
    right: -${spacing.sm};
  }
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
          <Heading>
            launch this house
            <PrivateShareButtonLayout>
              <PrivateShareButton id={venue.id} type="venue" onOpenSharePopup={() => handleOk()} />
            </PrivateShareButtonLayout>
          </Heading>
          <HelpTip tip="don’t be a jerk">
            <HelpWrap>
              <LightMessage>your boss will be notified when 15% of this team begins speaking</LightMessage>
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
