import React, { useState } from 'react';
import styled from 'styled-components';
import Text from '../atoms/text/_index';
import { appColors } from '../../style';
import { Icon } from '../atoms';
import { BackButton, IconButton } from '../atoms/Button/_index';

const RateVenueLayout = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState('rate');

  const handleClick = (e) => {
    setActiveTab(e.target.id);
  };

  const goBack = () => {};
  const message = () => {};

  if (!tabs || typeof tabs !== 'object')
    throw new Error('tab component is missing { rate: Component, ... }');

  return (
    <HousesLayoutStyling>
      <div className="rate-revenue__hero">
        <div className="rate-revenue--header">
          <BackButton style={{ color: appColors.gray300 }} onClick={goBack}>
            <Icon icon="ih" color="inherit" size={1} />
          </BackButton>
          <IconButton icon="paper-plane" color={appColors.gray400} size={2} onClick={message} />
        </div>
        <section className="rate-revenue--content">
          <Text.Heading transform="uppercase" color="gray300" size={12} text="industry" />
          <div className="rate-revenue--content__name-rating">
            <Text.Heading
              level={2}
              color="white"
              weight={700}
              size={32}
              transform="capitalize"
              text="house name"
            />
            <div>
              <Text variant="light" weight={300} color="gray100" size={80} family="roboto">
                8<sup style={{ fontWeight: 300, fontSize: 40 }}>.4</sup>
              </Text>
            </div>
          </div>
          <div className="rate-revenue--content__address-insiders">
            <address>
              <Text
                truncate
                title="150 55th st, brooklyn new york, 11200 USA"
                size={12}
                color="gray300"
                text="150 55th st, brooklyn new york, 11200 USA"
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
              <Icon size={1} icon="users2" /><span style={{ marginLeft: 7 }}>340</span>
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
      <>{tabs[activeTab]}</>
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
      padding: 25px 12px 0;
      background-image: linear-gradient(transparent, transparent, transparent, #00000063 100%),
        url(static/org_card_header.png);
      width: 100%;
      height: auto;
      background-repeat: no-repeat !important;
      background-size: cover !important;
      background-position: center !important;
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
