import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

import {
	NumberedSectionBlock,
	HorizontallyCenteredContainer,
	FlexContainer,
	BottomSectionWrapper
} from '../components/organisms/Pages/components';
import { Page } from '../components/organisms'

import Button, { CTAButton } from '../components/atoms/Button/_index';
import Text from '../components/atoms/text/_index';
import Icon from '../components/atoms/Icon';
import { appColors, device } from '../style';
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
    description: 'invite us in to show the product to your team so they understand how they can control everything and how you are the one who wants to empower them',
  },
  {
    header: 'become clairvoyant',
    description: 'listen to what your team is saying in real time via consensus voting on everything and act with swift and thoughtful solutions',
	share: true
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
  position: relative;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
  bottom: ${({ bottom }) => `${bottom}px`};
  left: ${({ left }) => `${left}px`};
  @media ${device.laptop} {
	margin-left: 80px;
  }
  @media ${device.desktop} {
	margin-left: 277px;
  }
`;

const HeaderImageBgCss = css`
  background-image: url(static/Custom-Landing-Page–Header-Image-4.webp);

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
`;

const CtaDiv = styled.div`
  margin: auto;
  padding-top : 30px;
  max-width: 351px;
`
const HeaderImage = styled.div`
  background: linear-gradient(356deg,#111,transparent);
  position: relative;
  padding: 248px 12px 12px 12px;
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
	padding-left: 277px;
	padding-right: 277px;
  }
  @media ${device.macbook} {
    background-image: url(static/workplace.webp);
  }
`;

const BottomImage = styled.div`
  ${BottomImageBgCss}
  height: 450px;
  position: relative;
`;

const HorizontalBar = styled.div`
  background: #cbccd0;
  width: 128px;
  height: 8px;
  margin: 30px 0;
`;

const PercentSectionContainer = styled.div`
  width: 355px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const ResponsiveText = styled(Text)`
	font-size: 36px;
  	line-height: initial;
	@media ${device.mobile} {
		font-size: 36px;
	}
	@media ${device.tab} {
		font-size: 45px;
	}
	@media ${device.web} {
		font-size: 54px;
	}
	@media ${device.laptop} {
		font-size: 54px;
	}
	@media ${device.desktop} {
		font-size: 54px;
	}

`

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
		// variant="dark"
		whiteHead
		imageBack
		noOverflow={true}
		
		headerImageBgCss={HeaderImageBgCss}
	>
		<div style={{ zIndex: 1}}>
			<HeaderImage>
				<PositionContainer maxWidth='740'>
					<ResponsiveText
						text="are you org 2.0?"
						color={appColors.gray200}
						variant="light"
						size={36}
						weight="bold"
						family="helvetica"
					/>
					<HorizontalBar />
					
					
					<ResponsiveText
						text="progressive = transparent"
						variant="light"
						color={appColors.gray200}
						weight="bold"
						family="helvetica"
						size={24}
						margin="15px"
					/>
					<ResponsiveText
						text="let your team speak and get on the right side of history"
						variant="dark"
						color={appColors.gray400}
						weight="bold"
						family="helvetica"
						size={24}
					/>
					<SpacingContainer marginTop="30">
						<Text variant="light" color={appColors.gray300} size={16} lineHeight={22} weight="reg" opacity={0.7}>
							allow your entire team to tell you what really matters to them without fear of exposure
							<br />
							<br /> 
							encourage them to share everything in complete anonymity and show the public that you practice what you preach
						</Text>
					</SpacingContainer>
				</PositionContainer>
				
			</HeaderImage>

			{/* section 2 */}
			<SpacingContainer padding="117px 12px 0" background="#111">
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
			<SpacingContainer padding="90px 34px 40px"  background="#111">
				<div style={{ textAlign: 'center' }}>
					<Text variant="light" color={appColors.gray4} weight="bold" family="helvetica" size={32}>
						sustainable is the new black
					</Text>
				</div>
			</SpacingContainer>
			<SpacingContainer padding="0px 35px"  background="#111">
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

			<SpacingContainer padding="0px 44px"  background="#111">
				<div style={{
					textAlign: 'center',
					margin: 'auto',
					paddingTop: '120px',
					paddingBottom: '60px'
				}}>
					<Text variant="light" color={appColors.gray300} weight="bold" family="Helvetica Neue" size={36} align="center">
						we will be able to list ~50 workplaces during our beta
					</Text>
				</div>

			</SpacingContainer>
			<BottomSectionWrapper>
				<BottomImage />
			</BottomSectionWrapper>

			<SpacingContainer padding="60px 12px 130px" id='getNotification'  background="#111">
				<div className="button-group" style={{maxWidth: '351px', margin: 'auto'}}>
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
			<Footer showScrollIndicator variant="darkest" />
		</div>
	</Page>
);
export default HeroesLanding;

