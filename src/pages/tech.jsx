import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

import {
  NumberedSectionBlock,
  HorizontallyCenteredContainer,
  FlexContainer,
  BottomSectionWrapper,
  SpacingContainer,
  imageOffset,
  imageMargins,
  ResponsiveText,
} from '../components/organisms/Pages/components';
import { Page } from '../components/organisms';

import Button, { CTAButton } from '../components/atoms/Button/_index';
import {
  appColors,
  device,
  mobileWidth,
  desktopWidth,
} from '../style';
import { Footer } from '../components/organisms/Footer';

const howItWorks = [
  {
    header: 'list your job',
    description:
      'anyone can request to list their workplace allowing your team to post & vote on any issue that affects you — 100% anonymously',
  },
  {
    header: 'create a team password question',
    source: '*US PATENT NO: 8,904,502',
    description:
      'filter out who can speak using common workplace knowledge to verify team members anonymously without emails, logins or personal metadata ever',
    note: 'no emails or logins ever',
  },
  {
    header: 'share like a ghost',
    share: true,
    description:
      'our anonymous share feature allows you to invite your coworkers to participate without anyone knowing it was you',
  },
  {
    header: 'address everything as a team',
    description:
      'let the power of your numbers and democratic consensus ring loudly through the ranks of leadership for the first time ever',
  },
  {
    header: 'hold your company accountable',
    description:
      'your feedback creates universal sustainability scores letting the world know how your company treats its people, the planet, and its profits',
  },
];

const HeaderImageBgCss = css`
  background: linear-gradient(180.68deg, rgba(17, 17, 17, 0.15) 31.47%, #111111 99.41%),
    url('https://in-house.azureedge.net/webstatic/landing_main/tech-hero-375.jpg') no-repeat;
  @media ${device.iPhoneX} {
    background: linear-gradient(180.68deg, rgba(17, 17, 17, 0.15) 31.47%, #111111 99.41%),
      url('https://in-house.azureedge.net/webstatic/landing_main/tech-hero-375.jpg') no-repeat;  
  }
  @media ${device.iPhone8Plus} {
    background: linear-gradient(180.68deg, rgba(17, 17, 17, 0.15) 31.47%, #111111 99.41%),
      url('https://in-house.azureedge.net/webstatic/landing_main/tech-hero-414.jpg') no-repeat;
  }
  @media ${device.iPad} {
    background: linear-gradient(180.68deg, rgba(17, 17, 17, 0.15) 31.47%, #111111 99.41%),
      url(https://in-house.azureedge.net/webstatic/landing_main/tech-hero-768.jpg) no-repeat;
  }
  @media ${device.web} {
    background: linear-gradient(180.68deg, rgba(17, 17, 17, 0.15) 31.47%, #111111 99.41%),
      url(https://in-house.azureedge.net/webstatic/landing_main/tech-hero-1280.jpg) no-repeat;
  }
  @media ${device.laptop} {
    background: linear-gradient(180.68deg, rgba(17, 17, 17, 0.15) 31.47%, #111111 99.41%),
      url(https://in-house.azureedge.net/webstatic/landing_main/tech-hero-1366.jpg) no-repeat;
  }
  @media ${device.desktop} {
    background: linear-gradient(180.68deg, rgba(17, 17, 17, 0.15) 31.47%, #111111 99.41%),
      url(https://in-house.azureedge.net/webstatic/landing_main/tech-hero-1920.jpg) no-repeat;
  }
  @media ${device.macbook} {
    background: linear-gradient(180.68deg, rgba(17, 17, 17, 0.15) 31.47%, #111111 99.41%),
      url(https://in-house.azureedge.net/webstatic/landing_main/tech-hero-1920.jpg) no-repeat;
  }
  background-size: cover;
  background-position-x: left;
  background-position-y: top;
  margin-top: -64px;
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
  justify-content: flex-end;
	padding-bottom: calc(60px + 5%);
  ${imageOffset}
  @media (min-width: ${mobileWidth.lg}) {
		justify-content: center;
		padding-bottom: 0;
	}

`;

const PositionContainer = styled.div`
  position: relative;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
  bottom: ${({ bottom }) => `${bottom}px`};
  left: ${({ left }) => `${left}px`};
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  @media (min-width: ${mobileWidth.lg}) {
    max-width: ${({ smMaxWidth }) => `${smMaxWidth}px`};
  }
  @media (min-width: ${desktopWidth.sm}) {
    max-width: ${({ mdMaxWidth }) => `${mdMaxWidth}px`};
  }
`;

const BottomImageBgCss = css`
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: center;

  background-image: url('https://in-house.azureedge.net/webstatic/landing_main/tech-product-375.jpg');

  @media ${device.iPhoneX} {
    background-image: url('https://in-house.azureedge.net/webstatic/landing_main/tech-product-375.jpg');
  }
  @media ${device.iPhone8Plus} {
    background-image: url('https://in-house.azureedge.net/webstatic/landing_main/tech-product-414.jpg');
  }
  @media ${device.iPad} {
    background-image: url('https://in-house.azureedge.net/webstatic/landing_main/tech-product-768.jpg');
  }
  @media ${device.web} {
    background-image: url('https://in-house.azureedge.net/webstatic/landing_main/tech-product-1280.jpg');
  }
  @media ${device.laptop} {
    background-image: url('https://in-house.azureedge.net/webstatic/landing_main/tech-product-1366.jpg');
  }
  @media ${device.desktop} {
    background-image: url('https://in-house.azureedge.net/webstatic/landing_main/tech-product-1920.jpg');
  }
  @media ${device.macbook} {
    background-image: url('https://in-house.azureedge.net/webstatic/landing_main/tech-product-1920.jpg');
  }
`;

const BottomImage = styled.div`
  ${BottomImageBgCss}
  height: 450px;
  position: relative;
  ${imageMargins}
`;

const HorizontalBar = styled.div`
  background: #cbccd0;
  width: 128px;
  height: 8px;
`;

const HowItWorksContainer = styled(SpacingContainer)`
	margin-top: -1px;
	padding: 61px 0 60px;
	background-color: #111;
	${imageOffset}
`

const TechUserLandingPage = () => (
  <Page
    noPadd
    title="in-house | Speak as a Team | Remain Untraceable"
    whiteHead
    noOverflow={true}
    style={{ backgroundColor: '#111', height: 'auto' }}
  >
    <HeaderImage>
      <PositionContainer smMaxWidth={421} mdMaxWidth={545}>
        <ResponsiveText
          text="time to speak?"
          color={appColors.gray200}
          variant="light"
          size={36}
          smSize={45}
          mdSize={54}
          lineHeight={44}
          smLineHeight={55}
          mdLineHeight={66}
          weight="bold"
          family="helvetica"
        />
        <HorizontalBar />
        <SpacingContainer rowGap="15px">
          <ResponsiveText
            text="voice everything"
            variant="light"
            color={appColors.gray200}
            weight="bold"
            family="helvetica"
            size={24}
            smSize={36}
            mdSize={54}
            lineHeight={29}
            smLineHeight={44}
            mdLineHeight={66}
          />
          <ResponsiveText
            text="(remain untraceable)"
            variant="dark"
            color={appColors.gray400}
            weight="bold"
            family="helvetica"
            size={24}
            smSize={36}
            mdSize={54}
            lineHeight={29}
            smLineHeight={44}
            mdLineHeight={66}
          />
        </SpacingContainer>

        <SpacingContainer>
          <ResponsiveText
            variant="light"
            color={appColors.gray300}
            size={16}
            lineHeight={19}
            weight="reg"
            xlSize={20}
            xlLineHeight={24}
          >
            for the first time ever there is a tool that allows you and your team to speak truth to
            power in unified anonymous consensus without fear of retaliation
          </ResponsiveText>
        </SpacingContainer>
        <Link href={`/request-join`}>
          <CTAButton text="bring democracy to my workplace" />
        </Link>
      </PositionContainer>
    </HeaderImage>
    {/* section 2 */}

    <HowItWorksContainer>
      <HorizontallyCenteredContainer style={{ maxWidth: '740px' }}>
        <ResponsiveText
          text="finally address everything"
          color={appColors.gray300}
          variant="light"
          size={36}
          lineHeight={44}
          weight="bold"
          family="helvetica"
          mdSize={54}
          mdLineHeight={66}
          style={{ textAlign: 'center' }}
        />
      </HorizontallyCenteredContainer>
      <FlexContainer>
        {howItWorks.map((section, index) => {
          const {
            header,
            source,
            description,
            note,
            share,
            startLink,
            startLinkText,
            middleLink,
            middleLinkText,
            startText,
          } = section;
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
      <div style={{ textAlign: 'center' }}>
        <Link href={`/request-join`}>
          <CTAButton text="join us" />
        </Link>
      </div>
    </HowItWorksContainer>

    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <ResponsiveText
        text="we will be able to list ~50 workplaces during our beta trial"
        variant="light"
        color={appColors.gray300}
        weight="bold"
        family="helvetica"
        size={32}
        lineHeight={39}
        smSize={36}
        smLineHeight={44}
        mdSize={54}
        mdLineHeight={66}
      />
    </div>
    <BottomSectionWrapper>
      <BottomImage />
    </BottomSectionWrapper>

    <SpacingContainer padding="60px 0 120px" alignment="center" rowGap="30px">
      <Link href={`/request-join`}>
        <CTAButton text="request to list my job" />
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

export default TechUserLandingPage;
