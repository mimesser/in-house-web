import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

import {
	NumberedSectionBlock,
	HorizontallyCenteredContainer
} from '../components/organisms/Pages/components';
import { Page } from '../components/organisms'

import Button, { CTAButton } from '../components/atoms/Button/_index';
import Text from '../components/atoms/text/_index';
import Icon from '../components/atoms/Icon';
import { appColors } from '../style';
import { Footer } from '../components/organisms/Footer';

const howItWorks = [
  {
    header: 'be that hero boss',
    description: React.createElement("span", {}, <>
      <Link href={`/contact-us`}>schedule a demo</Link> to see how simple it is to let your team tell you everything safely and prove that you celebrate transparency
		</>)
  },
  {
    header: 'show them how it works',
    description: 'vite us in to show the product to your team so they understand how they can control everything and how you are the one who wants to empower them',
  },
  {
    header: 'become clairvoyant',
    description: 'listen to what your team is saying in real time via consensus voting on everything and act with swift and thoughtful solutions',
  },
  {
    header: 'lead a real team',
    description:
      'org 2.0 begins when trust, transparency, and consensus decision-making become an everyday reality',
  },
  {
    header: 'become a real leader',
    description: React.createElement("span", {}, <>
		<Link href={`/contact-us`}>our first 50 legend organizations</Link> will be forever celebrated on our platform as the first to usher in a brave new era of transparency and stand firmly with your employees on the right side of history
</>)
,
  },
];

const percents = [
  {
    percent: '85%',
    subtitle: 'of consumers',
    description: 'only want to support sustainable companies but don’t know which is which',
    note: '*(Business Wire, 2021)'
  },
  {
    percent: '86%',
    subtitle: 'of investors',
    description: '(and 95% of millennial investors) believe sustainable companies are more profitable',
    note: '*(Morgan Stanley, 2020)'
  }
]

const SpacingContainerStyling = styled.div`
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : null)};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : null)};
  background: ${({ background }) => background};
  padding: ${({ padding }) => padding};
  .button-group {
    & > button {
      margin-top: 30px;
    }
  }
`;
const SpacingContainer = ({ children, ...props }) => (
  <SpacingContainerStyling {...props}>{children}</SpacingContainerStyling>
);
const PositionContainer = styled.div`
  position: absolute;
  bottom: ${({ bottom }) => `${bottom}px`};
  left: ${({ left }) => `${left}px`};
`;

const HeaderImageBgCss = css`
	background: linear-gradient(transparent, black), url(static/Custom-Landing-Page–Header-Image-4.webp) no-repeat;
	background-size: cover;
  background-position-x: left;
  background-position-y: top;
`;

const CtaDiv = styled.div`
  margin-top : 30px;
`
const HeaderImage = styled.div`
  ${HeaderImageBgCss}
  height: 350px;
  position: relative;
  margin-bottom: 12px;
`;

const BottomImageBgCss = css`
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: left;
  background-position-y: top;
  background-image: url(static/workplace.webp);
`;

const BottomImage = styled.div`
  ${BottomImageBgCss}
  height: 450px;
  position: relative;
  margin-bottom: 12px;
`;

const HorizontalBar = styled.div`
  background: #cbccd0;
  width: 128px;
  height: 8px;
`;

const PercentSectionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const PercentSection = ({ percent, subtitle, description, note }) => (
  <PercentSectionContainer>
    <HorizontallyCenteredContainer style={{ marginBottom: '30px' }}>
      {/* <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      > */}
			{/* <HorizontallyCenteredContainer
			style={{
				marginBottom: '12px',
				maxWidth: descriptionMaxWidth
			}}></HorizontallyCenteredContainer> */}
        <Text text={percent} color={appColors.gray300} variant="light" weight="reg" family="helvetica" size={55} />
        <Text text={subtitle} color={appColors.gray200} variant="light" weight="bold" family="helvetica" size={20} margin="5px" />
        <Text text={description} color={appColors.gray400} variant="light" weight="reg" family="helvetica" size={16} />
        <Text text={note} color={appColors.gray400} variant="light" weight="reg" family="helvetica" size={16} opacity={0.7} />
      {/* </div> */}
    </HorizontallyCenteredContainer>
  </PercentSectionContainer>
);

const HeroesLanding = () => (
	<Page
		noPadd
		title="in-house | heroes"
		variant="dark"
	>
		<div style={{ background: '#000' }}>
			<HeaderImage>
				<PositionContainer left="12" bottom="54">
					<Text
						text="are you org 2.0?"
						color={appColors.gray200}
						variant="light"
						size={36}
						weight="bold"
						family="helvetica"
					/>
				</PositionContainer>
				<PositionContainer left="12" bottom="16">
					<HorizontalBar />
				</PositionContainer>
			</HeaderImage>
			<SpacingContainer padding="0 12px">
				<Text
					text="progressive = transparent"
					variant="light"
					color={appColors.gray200}
					weight="bold"
					family="helvetica"
					size={24}
					margin="15px"
				/>
				<Text
					text="let your team speak and get on the right side of history"
					variant="dark"
					color={appColors.gray400}
					weight="bold"
					family="helvetica"
					size={24}
				/>
				<SpacingContainer marginTop="30">
					<Text variant="dark" color={appColors.gray300} size={16} lineHeight={22} weight="reg" opacity={0.7}>
						allow your entire team to tell you what really matters to them without fear of exposure
						<br />
						<br /> 
						encourage them to share everything in complete anonymity and show the public that you practice what you preach
					</Text>
				</SpacingContainer>
			</SpacingContainer>

			{/* section 2 */}
			<SpacingContainer padding="117px 12px 0">
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
				<CtaDiv>
					<Link href={`/contact-us`}>
						<CTAButton text="become one of 50 legendary leaders" />
					</Link>
				</CtaDiv>
			</SpacingContainer>

			{/* section 3 */}
			<SpacingContainer padding="90px 34px 40px">
				<div style={{ textAlign: 'center' }}>
					<Text variant="light" color={appColors.gray4} weight="bold" family="helvetica" size={32}>
						sustainable is the new black
					</Text>
				</div>
			</SpacingContainer>
			<SpacingContainer padding="0px 35px">
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
			</SpacingContainer>

			<BottomImage />

			<SpacingContainer padding="0px 44px">
				<div style={{
					maxWidth: '286px',
					textAlign: 'center',
					margin: 'auto'
				}}>
					<Text variant="light" color={appColors.gray300} weight="reg" family="helvetica" size={16} align="center">
						we will be able to list ~50 workplaces during our beta
					</Text>
				</div>

			</SpacingContainer>
			<SpacingContainer padding="0 12px 192px" id='getNotification'>
				<div className="button-group">
					<Link href={`/contact-us`}>
						<CTAButton text="become one of our first 50 pioneers" />
					</Link>
					<Link href={`/contact-us`}>
						<CTAButton text="schedule a demo" />
					</Link>
					<Link href={`/contact-us`}>
						<Button variant="light" outlined text="notify me when live" noSuffix />
					</Link>
				</div>
			</SpacingContainer>
			<Footer showScrollIndicator variant="dark" />
		</div>
	</Page>
);
export default HeroesLanding;

