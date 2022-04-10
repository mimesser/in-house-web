import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

import {
  NumberedSectionBlock,
  HorizontallyCenteredContainer,
  FlexContainer,
  BottomSectionWrapper,
} from '../components/organisms/Pages/components';
import { Page } from '../components/organisms';

import Button, { CTAButton } from '../components/atoms/Button/_index';
import Text from '../components/atoms/text/_index';
import Icon from '../components/atoms/Icon';
import { appColors, desktopWidth, device, mobileWidth } from '../style';
import { Footer } from '../components/organisms/Footer';
import { imageMargins } from './tech';
import { PercentSection } from './frontline';

const howItWorks = [
  {
    header: 'be that hero boss',
    description: React.createElement(
      'span',
      {},
      <>
        <Link href={`/contact-us`}>schedule a demo</Link> to see how simple it is to let your team
        tell you everything safely and prove that you celebrate transparency
      </>,
    ),
  },
  {
    header: 'show them how it works',
    description:
      'invite us in to show the product to your team so they understand how they can control everything and how you are the one who wants to empower them',
  },
  {
    header: 'become clairvoyant',
    description:
      'listen to what your team is saying in real time via consensus voting on everything and act with swift and thoughtful solutions',
    share: true,
  },
  {
    header: 'lead a real team',
    description:
      'org 2.0 begins when trust, transparency, and consensus decision-making become an everyday reality',
  },
  {
    header: 'become a real leader',
    description: React.createElement(
      'span',
      {},
      <>
        <Link href={`/contact-us`}>our first 50 legend organizations</Link> will be forever
        celebrated on our platform as the first to usher in a brave new era of transparency and
        stand firmly with your employees on the right side of history
      </>,
    ),
  },
];

const percents = [
  {
    percent: '85%',
    subtitle: 'of consumers',
    description: 'only want to support sustainable companies but don’t know which is which',
    note: '*(Business Wire, 2021)',
  },
  {
    percent: '86%',
    subtitle: 'of investors',
    description:
      '(and 95% of millennial investors) believe sustainable companies are more profitable',
    note: '*(Morgan Stanley, 2020)',
  },
];

const SpacingContainerStyling = styled.div`
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : null)};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : null)};
  background: ${({ background }) => background};
  padding: ${({ padding }) => padding};
  display: flex;
  flex-direction: column;
  row-gap: ${({ rowGap }) => (rowGap ? rowGap : '60px')};
  align-items: ${({ alignment }) => alignment};
  z-index: 1;
`;
const SpacingContainer = ({ children, ...props }) => (
  <SpacingContainerStyling {...props}>{children}</SpacingContainerStyling>
);
const PositionContainer = styled.div`
  position: relative;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
  bottom: ${({ bottom }) => `${bottom}px`};
  left: ${({ left }) => `${left}px`};
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

const HeaderImageBgCss = css`
  background: linear-gradient(180.68deg, rgba(17, 17, 17, 0.15) 31.47%, #111111 99.41%),
    url(static/Custom-Landing-Page–Header-Image-4.webp) no-repeat;

  @media ${device.iPhoneX} {
    background-image: url(static/Custom-Landing-Page–Header-Image-4.webp);
  }
  @media ${device.iPhone8Plus} {
    background-image: url(static/Custom-Landing-Page–Header-Image-4.webp);
  }
  @media ${device.iPad} {
    background-image: url(static/Custom-Landing-Page–Header-Image-4.webp);
  }
  @media ${device.web} {
    background-image: url(static/Custom-Landing-Page–Header-Image-4.webp);
  }
  @media ${device.laptop} {
    background-image: url(static/Custom-Landing-Page–Header-Image-4.webp);
  }
  @media ${device.desktop} {
    background-image: url(static/Custom-Landing-Page–Header-Image-4.webp);
  }
  @media ${device.macbook} {
    background-image: url(static/Custom-Landing-Page–Header-Image-4.webp);
  }
  background-size: cover;
  background-position-x: left;
  background-position-y: top;
  margin-top: -70px;
`;

const CtaDiv = styled.div`
  max-width: 351px;
  margin: auto;
`;
const HeaderImage = styled.div`
  ${HeaderImageBgCss}
  position: relative;
  margin-left: -12px;
  margin-right: -12px;
  padding-left: 12px;
  padding-right: 12px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  ${imageMargins}
`;

const BottomImageBgCss = css`
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: left;
  background-position-y: center;
  background-image: url(static/workplace.webp);
  @media ${device.iPhoneX} {
    background-image: url(static/workplace.webp);
  }
  @media ${device.iPhone8Plus} {
    background-image: url(static/workplace.webp);
  }
  @media ${device.iPad} {
    background-image: url(static/workplace.webp);
  }
  @media ${device.web} {
    background-image: url(static/workplace.webp);
  }
  @media ${device.laptop} {
    background-image: url(static/workplace.webp);
  }
  @media ${device.desktop} {
    background-image: url(static/workplace.webp);
  }
  @media ${device.macbook} {
    background-image: url(static/workplace.webp);
  }
`;

const BottomImage = styled.div`
  ${BottomImageBgCss}
  height: 450px;
  position: relative;
  ${imageMargins}
`;

const HorizontalBar = styled.div`
  background: ${appColors.gray100};
  width: 128px;
  height: 8px;
`;

const ResponsiveText = styled(Text)`
  font-size: ${({ size }) => `${size}px` || '36px'};
  line-height: ${({ size }) => `${size + 9}px` || '44px'};
  text-align: ${({ textAlign }) => textAlign};
  @media (min-width: ${desktopWidth.sm}) {
    font-size: ${({ size }) => `${size + 18}px` || '54px'};
    line-height: ${({ size }) => `${size + 30}px` || '66px'};
  }
`;

const HeroesLanding = () => (
  <Page
    noPadd
    title="in-house | Speak as a Team | Remain Untraceable"
    // variant="dark"
    whiteHead
    noOverflow={true}
    style={{ backgroundColor: '#111' }}
  >
    <HeaderImage>
      <PositionContainer maxWidth="740">
        <Text
          text="are you org 2.0?"
          color={appColors.gray100}
          variant="light"
          size={36}
          smSize={45}
          md-size={54}
          weight="bold"
          family="helvetica"
        />
        <HorizontalBar />

        <Text
          text="progressive = transparent"
          variant="light"
          color={appColors.gray100}
          weight="bold"
          family="helvetica"
          size={24}
          smSize={45}
          mdSize={54}
        />
        <Text
          text="let your team speak and get on the right side of history"
          variant="dark"
          color={appColors.gray300}
          weight="bold"
          family="helvetica"
          size={24}
          smSize={45}
          mdSize={54}
        />
        <SpacingContainer>
          <Text variant="light" color={appColors.gray300} size={16} lineHeight={19} weight="reg">
            allow your entire team to tell you what really matters to them without fear of exposure
            <br />
            <br />
            encourage them to share everything in complete anonymity and show the public that you
            practice what you preach
          </Text>
        </SpacingContainer>
      </PositionContainer>
    </HeaderImage>

    {/* section 2 */}
    <SpacingContainer padding="60px 0">
      <FlexContainer>
        {howItWorks.map((section, index) => {
          const { header, source, description, note, share } = section;
          return (
            <NumberedSectionBlock
              key={index}
              header={header}
              description={description}
              source={source}
              note={note}
              index={index}
              share={share}
            />
          );
        })}
      </FlexContainer>
      <CtaDiv>
        <Link href={`/contact-us`}>
          <CTAButton text="become one of 50 legendary leaders" />
        </Link>
      </CtaDiv>
    </SpacingContainer>

    {/* section 3 */}
    <SpacingContainer padding="60px 0">
      <ResponsiveText
        text="sustainable is the new black"
        variant="light"
        color={appColors.gray300}
        weight="bold"
        family="helvetica"
        size={36}
        textAlign="center"
      />
      <FlexContainer>
        {percents.map((section, index) => {
          const { percent, subtitle, description, note } = section;
          return (
            <PercentSection
              key={index}
              percent={percent}
              subtitle={subtitle}
              description={description}
              note={note}
            />
          );
        })}
      </FlexContainer>
    </SpacingContainer>

    <SpacingContainer padding="60px 0">
      <ResponsiveText
        text="we will be able to list ~50 workplaces during our beta trial"
        variant="light"
        color={appColors.gray300}
        weight="bold"
        family="helvetica"
        size={36}
        alignment="center"
      />
    </SpacingContainer>
    <BottomSectionWrapper>
      <BottomImage />
    </BottomSectionWrapper>

    <SpacingContainer padding="60px 0 120px" alignment="center" id="getNotification" rowGap="30px">
      <Link href={`/contact-us`}>
        <CTAButton text="become one of our first 50 pioneers" />
      </Link>
      <Link href={`/contact-us`}>
        <CTAButton text="schedule a demo" />
      </Link>
      <Link href={`/contact-us`}>
        <Button
          variant="light"
          outlined
          text="notify me when live"
          noSuffix
          style={{ maxWidth: '351px' }}
        />
      </Link>
    </SpacingContainer>
    <Footer showScrollIndicator variant="darkest" />
  </Page>
);
export default HeroesLanding;
