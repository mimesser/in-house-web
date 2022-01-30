import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Text from '../atoms/text/_index';
import { appColors, calcRem } from '../../style';
import { Icon } from '../atoms';
import { BackButton, IconButton } from '../atoms/Button/_index';

const RenderRating = ({ rating }) => {
  const [a, b] = rating ? rating.toFixed(1).split('.') : ['0', '0'];
  return (
    <Text
      variant="light"
      weight={300}
      style={{ wordBreak: 'keep-all' }}
      color="gray100"
      size={80}
      family="roboto"
    >
      {a}
      <sup style={{ fontWeight: 300, fontSize: 40, top: calcRem('-27.5px') }}>.{b}</sup>
    </Text>
  );
};

const RateVenueLayout = ({ tabs, ...props }) => {
  const [activeTab, setActiveTab] = useState('rate');
  const history = useRouter();

  const { selectedVenue } = useSelector((state) => state?.venues);

  const handleClick = (e) => {
    setActiveTab(e.target.id);
  };

  const goBack = () => {
    history.push('/houses');
  };

  const message = () => {};

  if (!tabs || typeof tabs !== 'object')
    throw new Error('tab component is missing { rate: Component, ... }');

  const Tabs = tabs[activeTab];

  return (
    <HousesLayoutStyling backgroundUrl={selectedVenue?.venueInfo?.imageUrl}>
      <div className="rate-revenue__hero">
        <div className="rate-revenue--header">
          <BackButton style={{ color: appColors.gray300 }} onClick={goBack}>
            <Icon icon="ih" color="inherit" size={1} />
          </BackButton>
          <IconButton icon="paper-plane" color={appColors.gray400} size={2} onClick={message} />
        </div>
        <section className="rate-revenue--content">
          <Text.Heading
            transform="uppercase"
            color="gray300"
            size={12}
            text={selectedVenue?.industry?.name || 'industry'}
          />
          <div className="rate-revenue--content__name-rating">
            <Text.Heading
              level={2}
              color="white"
              weight={700}
              size={32}
              transform="capitalize"
              text={selectedVenue?.name}
            />
            <div>
              <RenderRating rating={selectedVenue?.rating} />
            </div>
          </div>
          <div className="rate-revenue--content__address-insiders">
            <address>
              <Text
                truncate
                title={selectedVenue?.venueInfo?.address}
                size={12}
                color="gray300"
                text={selectedVenue?.venueInfo?.address}
              />
            </address>
            <Text
              weight={300}
              variant="light"
              color="gray100"
              size={14}
              style={{ display: 'flex' }}
              family="roboto"
            >
              <Icon size={1} icon="users2" />
              <span style={{ marginLeft: 7 }}>{selectedVenue?.insidersCount}</span>
            </Text>
          </div>
        </section>
        <div className="rate-revenue__tabs" onClick={handleClick}>
          {Object.keys(tabs).map((el) => (
            <div
              key={el}
              id={el}
              className={`tab-content ${activeTab === el ? 'tab-content--active' : ''}`.trim()}
            >
              <Text size={14} weight={700} transform="lowercase" text={el} />
            </div>
          ))}
        </div>
      </div>
      <>
        <Tabs {...props} />
      </>
    </HousesLayoutStyling>
  );
};

const spacer = ({ center }) => `
  display: flex;
  justify-content: ${center ? 'center' : 'space-between'};
  align-items: center;
`;

const HousesLayoutStyling = styled.div`
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 400;

  .rate-revenue {
    &__hero {
      position: relative;
      padding: 25px 12px 0;
      width: 100%;
      height: auto;
      background-color: ${appColors.gray600};
      background-image: linear-gradient(transparent 10%, #111111 104%),
        radial-gradient(#33333373 30%, #000000c7 70%, #111111 139%),
        ${({ backgroundUrl }) => `url(${backgroundUrl})`};
      background-repeat: no-repeat !important;
      background-size: cover !important;
      background-position: center !important;
      filter: grayscale(100%);
    }

    &--header {
      margin-bottom: 36px;
      ${spacer};
    }

    &--content {
      border-bottom: 1px solid ${appColors.gray400};
      margin-bottom: 7px;
      padding-bottom: 15px;

      > h1 {
        margin-bottom: 8px;
      }

      &__name-rating,
      &__address-insiders {
        ${spacer};
        gap: 10px;
      }

      &__name-rating {
        align-items: flex-start;
        min-height: 40px;
      }

      &__address-insiders {
        align-items: flex-end;
        > address {
          cursor: default;
          font-style: normal;
          max-width: 75%;
        }
      }
    }

    &__tabs {
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;

      .tab-content {
        cursor: pointer;
        ${spacer({ center: true })};
        position: relative;
        min-height: 52px;
        min-width: 100px;

        > p {
          color: ${appColors.gray500};
          pointer-events: none;
        }

        &--active > p {
          color: ${appColors.gray100};
        }

        &--active::after {
          content: '';
          z-index: 1;
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 5px;
          background-color: ${appColors.gray100};
        }
      }
    }
  }
`;

export default RateVenueLayout;
