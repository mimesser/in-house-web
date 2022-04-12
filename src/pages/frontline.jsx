import React from 'react';
import styled, { css } from 'styled-components';
import ReactPlayer from 'react-player/youtube';
import Link from 'next/link';

import {
  NumberedSectionBlock,
  HorizontallyCenteredContainer,
  FlexContainer,
  BottomSectionWrapper,
  SpacingContainer,
  PercentSection,
  imageOffset,
  imageMargins,
	ResponsiveText,
} from '../components/organisms/Pages/components';
import { Page } from '../components/organisms';

import Button, { CTAButton } from '../components/atoms/Button/_index';
import Text from '../components/atoms/text/_index';
import { appColors, desktopWidth, device, mobileWidth } from '../style';
import { Footer } from '../components/organisms/Footer';

const howItWorks = [
  {
    header: 'list your job',
    description:
      'as soon as your workplace goes live, only you and your co-workers will be able to post & vote on any issue that affects you - 100% anonymously',
  },
  {
    header: 'create a team security question',
    source: '*US PATENT NO: 8,904,502',
    description: 'filter out who can speak using common workplace knowledge',
    note: 'no emails or logins ever',
  },
  {
    header: 'share like a ghost',
    description:
      'our anonymous share feature⋟allows you to invite your coworkers without anyone knowing it was you',
    share: true,
  },
  {
    header: 'address everything safely in real time',
    description:
      'let the power of your anonymous numbers ring loudly through the ranks of leadership for the first time ever',
  },
  {
    header: 'hold your workplace accountable',
    description:
      "your teams' opinions create scores that tell the public how your company treats its people, the planet, and its profits",
  },
];
const percents = [
  {
    percent: '85%',
    subtitle: 'of consumers',
    description: 'want to support sustainable companies but don’t know which is which',
    note: '*(Business Wire, 2021)',
  },
  {
    percent: '93%',
    subtitle: 'of leadership',
    description: 'want to hear the honest truth but can’t get their teams to talk',
    note: '*(internal surveys, 2019)',
  },
  {
    percent: '98%',
    subtitle: 'of workers',
    description: 'want to address problems and know what their co-workers think',
    note: '*(internal surveys, 2019)',
  },
];

const PositionContainer = styled.div`
  position: relative;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
  bottom: ${({ bottom }) => `${bottom}px`};
  left: ${({ left }) => `${left}px`};
  display: flex;
  flex-direction: column;
  row-gap: 30px;
	@media (min-width: ${desktopWidth.sm}) {
    max-width: ${({ smMaxWidth }) => `${smMaxWidth}px`};
  }
	@media (min-width: ${desktopWidth.sm}) {
    max-width: ${({ mdMaxWidth }) => `${mdMaxWidth}px`};
  }
`;

const PlayerWrapper = styled.div`
  width: 320px;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  row-gap: 30px;
  position: relative;
  > div {
    height: 240px !important;
  }
  @media (min-width: ${mobileWidth.lg}) {
    width: 560px;
    > div {
      height: 315px !important;
    }
  }
  @media (min-width: ${desktopWidth.sm}) {
    width: 853px;
    > div {
      height: 480px !important;
    }
  }
`;

const HeaderImageBgCss = css`
  background: linear-gradient(180.68deg, rgba(17, 17, 17, 0.15) 31.47%, #111111 99.41%),
    url(static/Custom-Landing-Page–Header-Image-1.webp) no-repeat;
  background-size: cover;
  background-position-x: left;
  background-position-y: top;
  margin-top: -70px;
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
	@media (min-width: ${desktopWidth.sm}) {
		justify-content: center;
		padding-bottom: 0;
	}
`;

const BottomImageBgCss = css`
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: center;

  background-image: url(static/Custom-Landing-Page–Header-Image-2.webp);

  @media ${device.iPhoneX} {
    background-image: url(static/Custom-Landing-Page–Header-Image-2.webp);
  }
  @media ${device.iPhone8Plus} {
    background-image: url(static/Custom-Landing-Page–Header-Image-2.webp);
  }
  @media ${device.iPad} {
    background-image: url(static/Custom-Landing-Page–Header-Image-2.webp);
  }
  @media ${device.web} {
    background-image: url(static/Custom-Landing-Page–Header-Image-2.webp);
  }
  @media ${device.laptop} {
    background-image: url(static/Custom-Landing-Page–Header-Image-2.webp);
  }
  @media ${device.desktop} {
    background-image: url(static/Custom-Landing-Page–Header-Image-2.webp);
  }
  @media ${device.macbook} {
    background-image: url(static/Custom-Landing-Page–Header-Image-2.webp);
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

const FrontlineLanding = () => (
  <Page
    noPadd
    title="in-house | Speak as a Team | Remain Untraceable"
    whiteHead
    noOverflow={true}
    style={{ backgroundColor: '#111' }}
  >
    <HeaderImage>
      <PositionContainer smMaxWidth={680} mdMaxWidth={550}>
        <ResponsiveText
          text="you have power in your numbers"
          color={appColors.gray100}
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
        <SpacingContainer>
          <Text variant="light" color={appColors.gray300} size={16} lineHeight={19} weight="reg">
            for the first time ever there is a tool that allows you and your team to speak truth to
            power in unified anonymous consensus without fear of retaliation
          </Text>
        </SpacingContainer>
        <Link href={`/request-join`}>
          <CTAButton text="bring democracy to my job" />
        </Link>
      </PositionContainer>
    </HeaderImage>

    {/* section 2 */}
    <SpacingContainer padding="60px 0">
      <HorizontallyCenteredContainer>
        <ResponsiveText
          text="make them listen"
          variant="light"
          color={appColors.gray200}
          weight="bold"
          family="helvetica"
          size={36}
					lineHeight={44}
					mdSize={54}
					mdLineHeight={66}
        />
      </HorizontallyCenteredContainer>
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
      <div style={{ textAlign: 'center' }}>
        <Link href={`/request-join`}>
          <CTAButton text="hold my workplace accountable" />
        </Link>
      </div>
    </SpacingContainer>

    {/* section 3 */}

    <SpacingContainer padding="60px 0" alignment="center">
      <ResponsiveText
        text="the world literally wants to know"
        variant="light"
        color={appColors.gray200}
        weight="bold"
        family="helvetica"
				size={36}
				lineHeight={44}
				mdSize={54}
				mdLineHeight={66}
        textAlign="center"
      />
      <PlayerWrapper>
        <ReactPlayer url="https://youtu.be/6rMaaxouNTA" light controls width="100%" />
        <Text
          variant="light"
          color={appColors.gray400}
          weight="reg"
          family="helvetica"
          size={16}
          mdSize={20}
          alignment="center"
        >
          the pandemic has reminded everyone who &amp; how important esssential workers really are
        </Text>
        <Text
          variant="light"
          color={appColors.gray400}
          weight="reg"
          family="helvetica"
          size={16}
          mdSize={20}
          alignment="center"
        >
          don't believe for a second that your employer and the public is not interested in what you
          have to say
        </Text>
      </PlayerWrapper>
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

    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <ResponsiveText
        text="we will be able to list ~50 workplaces during our beta trial"
        variant="light"
        color={appColors.gray200}
        weight="bold"
        family="helvetica"
				size={36}
				lineHeight={44}
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

export default FrontlineLanding;
