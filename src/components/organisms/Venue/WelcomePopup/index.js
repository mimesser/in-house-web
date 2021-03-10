import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { HelpTip, Card } from '../../../atoms';
import { spacing, palette } from '../../../../style';
import { dismissWelcomeForm, selectSkipWelcome, selectSelectedVenue } from '../../../../store/venues';
import { DrawerMenu } from '../../DrawerMenu';
import PrivateShare from '../PrivateShare';
import PrivateShareButton from '../PrivateShareButton';
import { selectEsgCategories } from '../../../../store/aggregate';
import { findCategoryRating } from '../../VenueList';
import { VenueCard } from '../../VenueList/VenueCard';

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
  margin-left: ${spacing.xl};
`;

const PrivateShareButtonLayout = styled.div`
  margin-left: auto;
  margin-right: ${spacing.xl};
`;

const FlexWrap = styled.div`
  display: flex;
`;

export const WelcomePopup = ({ skipWelcome, dismissWelcomeForm, venue, categories }) => {
  const [dontShow, setDontShow] = useState(skipWelcome);
  const handleChange = () => setDontShow(!dontShow);
  const handleOk = () => {
    setOpened(false);
    dismissWelcomeForm();
  };
  const [show, setShow] = useState(!skipWelcome);
  const [opened, setOpened] = useState(null);

  useEffect(() => {
    setTimeout(() => setOpened(!skipWelcome), 2000);
  }, []);

  const renderVenueSharePreview = useCallback(() => {
    const venueCategories =
      categories &&
      categories.map((category) => {
        return { ...category, rating: findCategoryRating(category.id, venue.rateTagCategories) };
      });

    return <VenueCard venue={venue} categoryRatings={venueCategories} />;
  }, [venue.id]);

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
                  <PrivateShareButton
                    id={venue.id}
                    type="venue"
                    onOpenSharePopup={() => handleOk()}
                    circleColor={palette.mediumGray}
                  />
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
  categories: selectEsgCategories,
});

const mapDispatch = {
  dismissWelcomeForm,
};
export default connect(mapState, mapDispatch)(WelcomePopup);
