import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

import { NumberedSectionBlock, HorizontallyCenteredContainer, FlexContainer, BottomSectionWrapper } from '../components/organisms/Pages/components';
import { Page } from '../components/organisms'

import Button, { CTAButton } from '../components/atoms/Button/_index';
import Text from '../components/atoms/text/_index';
import { appColors, device } from '../style';
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

const HeaderImageBgCss = css`
	background: linear-gradient(356deg,#111,transparent), url(static/Custom-Landing-Page–Header-Image-3.webp) no-repeat;
	background-size: cover;
	background-position-x: left;
	background-position-y: top;
`;

const HeaderImage = styled.div`
  ${HeaderImageBgCss}
  position: relative;
  padding: 248px 12px 12px 12px;
`;

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
  margin-bottom: 12px;
`;

const HorizontalBar = styled.div`
  background: #cbccd0;
  width: 128px;
  height: 8px;
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

const TechUserLandingPage = () => (
	<Page
		noPadd
		title="in-house | Speak as a Team | Remain Untraceable"
		whiteHead
		imageBack
		noOverflow={true}		
		headerImageBgCss={HeaderImageBgCss}
	>
		<div style={{ 
				background: appColors.secondaryBlack, 
				position: 'absolute',
				top: '0',
				left: '0',
				right: '0', }}>
			<HeaderImage>
				<PositionContainer maxWidth='740'>
					<ResponsiveText
						text="time to speak?"
						color={appColors.gray200}
						variant="light"
						size={36}
						weight="bold"
						family="helvetica"
					/>
					<div style={{ margin: '30px 0' }}>
						<HorizontalBar />
					</div>
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
							<CTAButton text="bring democracy to my workplace" />
						</Link>
					</div>
				</PositionContainer>
			</HeaderImage>
			{/* section 2 */}

			<SpacingContainer padding="80px 12px 0">
				<HorizontallyCenteredContainer style={{ marginBottom: '60px', maxWidth: '740px' }}>
					<ResponsiveText
						text="finally address everything"
						color={appColors.gray300}
						variant="light"
						size={36}
						weight="bold"
						family="helvetica"
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
				<div style={{ textAlign: 'center', paddingBottom: '60px'}}> 
					<Link href={`/join-us`}>
						<CTAButton text="join us" />
					</Link>
				</div>
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

export default TechUserLandingPage;
