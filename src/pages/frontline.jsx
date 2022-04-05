import React from 'react';
import styled, { css } from 'styled-components';
import ReactPlayer from 'react-player/youtube';
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
import { appColors, device } from '../style';
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
	  note: '*(Business Wire, 2021)'
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
  ]
const SpacingContainerStyling = styled.div`
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : null)};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : null)};
  background: ${({ background }) => background};
  padding: ${({ padding }) => padding};
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

const PlayerWrapper = styled.div`
	min-height: 239px;
	display: flex;
	justify-content: center;
	align-items: stretch;	
    position: relative;
	@media ${device.mobile} {
		min-height: 239px;
	}
	@media ${device.tab} {
		min-height: 460px;
	}
	@media ${device.web} {
		min-height: 787px;
	}
	@media ${device.laptop} {
		min-height: 787px;
	}
	@media ${device.desktop} {
		min-height: 787px;
		padding-left: 277px;
		padding-right: 277px;
	}
	> div {
		height: initial !important;
	}
` 

const HeaderImageBgCss = css`
  background: linear-gradient(356deg,#111,transparent), url(static/Custom-Landing-Page–Header-Image-1.webp) no-repeat;
  background-size: cover;
  background-position-x: left;
  background-position-y: top;
`;

const HeaderImage = styled.div`
  ${HeaderImageBgCss}
  position: relative;
  padding: 248px 12px 12px 12px;
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
`;

const HorizontalBar = styled.div`
  background: #cbccd0;
  width: 128px;
  height: 8px;
  margin: 30px 0;
`;

const ResponsiveText = styled(Text)`
	font-size: ${({ size }) => `${size}px` || '36px'};
	line-height: ${({ size }) => `${size + 9}px` || '44px'};

	@media ${device.mobile} {
		font-size: ${({ size }) => `${size}px` || '36px'};
		line-height: ${({ size }) => `${size + 7}px` || '44px'};
	}
	@media ${device.tab} {
		font-size: ${({ size }) => `${size + 9}px` || '45px'};
		line-height: ${({ size }) => `${size + 18}px` || '54px'};
	}
	@media ${device.web} {
		font-size: ${({ size }) => `${size + 18}px` || '54px'};
		line-height: ${({ size }) => `${size + 30}px` || '66px'};
	}
	@media ${device.laptop} {
		font-size: ${({ size }) => `${size + 18}px` || '54px'};
		line-height: ${({ size }) => `${size + 30}px` || '66px'};
	}
	@media ${device.desktop} {
		font-size: ${({ size }) => `${size + 18}px` || '54px'};
		line-height: ${({ size }) => `${size + 30}px` || '66px'};
	}
`
const PercentSectionContainer = styled.div`
  width: 355px;
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

const FrontlineLanding = () => (
	<Page
		noPadd
		title="in-house | Speak as a Team | Remain Untraceable"
		whiteHead
		imageBack
		noOverflow={true}		
		headerImageBgCss={HeaderImageBgCss}
	>
		<div
			style={{
				background: appColors.secondaryBlack,
				position: 'absolute',
				top: '0',
				left: '0',
				right: '0',
			}}
		>
			<HeaderImage>
				<PositionContainer maxWidth='740'>
					<ResponsiveText
						text="you have power"
						color={appColors.gray200}
						variant="light"
						size={36}
						weight="bold"
						family="helvetica"
					/>
					<ResponsiveText
						text="in your numbers"
						color={appColors.gray200}
						variant="light"
						weight="bold"
						family="helvetica"
						size={36}
					/>

					<HorizontalBar />

					<ResponsiveText
						text="voice everything"
						variant="light"
						color={appColors.gray200}
						weight="bold"
						family="helvetica"
						size={27}
					/>
					<ResponsiveText
						text="(remain untraceable)"
						variant="dark"
						color={appColors.gray400}
						weight="bold"
						family="helvetica"
						size={27}
					/>
					<SpacingContainer marginTop="30" marginBottom="60">
						<Text variant="light" color={appColors.gray300} size={16} lineHeight={22} weight="reg">
							for the first time ever there is a tool that allows you and your team to speak truth to
							power in unified anonymous consensus without fear of retaliation
						</Text>
					</SpacingContainer>
					<div style={{ paddingBottom: '60px'}}>
						<Link href={`/request-join`}>
							<CTAButton text="bring democracy to my job" />
						</Link>
					</div>
				</PositionContainer>
			</HeaderImage>

			{/* section 2 */}
			<SpacingContainer padding="127px 12px 0">
				<HorizontallyCenteredContainer style={{ marginBottom: '60px' }}>
					<Text
						variant="light"
						color={appColors.gray300}
						weight="bold"
						family="helvetica"
						size={36}
						style={{ textAlign: 'center' }}
					>
						make them listen
					</Text>
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
				<div style={{ textAlign: 'center', paddingBottom: '60px'}}> 
					<Link href={`/request-join`}>
						<CTAButton text="hold my workplace accountable" />
					</Link>
				</div>
			</SpacingContainer>

			{/* section 3 */}
			
			<PlayerWrapper>
				<ReactPlayer
					url="https://youtu.be/6rMaaxouNTA"
					light
					controls
					width="100%" 
				/>
			</PlayerWrapper>
			<div style={{ textAlign: 'center', paddingTop: '60px', paddingBottom: '60px'}}>
				<ResponsiveText
					text="the world literally wants to know"
					variant="light"
					color={appColors.gray300}
					weight="bold"
					family="helvetica"
					size={36}
					textAlign="center"
				/>
				<SpacingContainer padding='2% 15% 2% 15%'>
					<Text
						variant="light"
						color={appColors.gray400}
						weight="reg"
						family="helvetica"
						size={16}
					>
						the pandemic has reminded everyone who & how important esssential workers really are   
					</Text>
					<br />
					<Text
						variant="light"
						color={appColors.gray400}
						weight="reg"
						family="helvetica"
						size={16}
					>
						don't believe for a second that your employer and the public is not interested in what you have to say   
					</Text>
				</SpacingContainer>
			</div>

			<SpacingContainer padding="0px 35px">
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
			
			<div style={{ textAlign: 'center', paddingTop: '60px', paddingBottom: '60px'}}>
				<ResponsiveText
					text="we will be able to list ~50 workplaces during our beta trial"
					variant="light"
					color={appColors.gray300}
					weight="bold"
					family="helvetica"
					size={36}
				/>
			</div>
			<BottomSectionWrapper>					
				<BottomImage />
			</BottomSectionWrapper>

			<SpacingContainer padding="30px 12px 30px">
				<div style={{ textAlign:"center"}}>
					
					<div style={{marginTop: "30px", marginBottom: "30px"}}>
						<Link href={`/request-join`}>
							<CTAButton text="request to list my job" />
						</Link>
					</div>
					<div style={{marginTop: "30px", marginBottom: "30px"}}>
						<Link href={`/contact-us`} style={{paddingTop: "30px", paddingBottom: "30px"}}>
							<CTAButton text="schedule a demo" />
						</Link>
					</div>
					<div style={{marginTop: "30px", marginBottom: "30px"}}>
						<Link href={`/contact-us`}>
							<Button variant="light" outlined text="notify me when live" noSuffix style={{maxWidth: "351px"}}/>
						</Link>
					</div>
				</div>
			</SpacingContainer>
			<Footer showScrollIndicator variant="darkest" />
		</div>
	</Page>
);

export default FrontlineLanding;
