import React from 'react';
import styled, { css } from 'styled-components';

import { NumberedSectionBlock, HorizontallyCenteredContainer } from '../components/organisms/Pages/components';
import { Page } from '../components/organisms'

import Button, { CTAButton } from '../components/atoms/Button/_index';
import Text from '../components/atoms/text/_index';
import { appColors } from '../style';
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
	background: linear-gradient(transparent, black), url(static/Custom-Landing-Page–Header-Image-3.webp) no-repeat;

  background-size: cover;
  background-position-x: left;
  background-position-y: top;
`;

const HeaderImage = styled.div`
  ${HeaderImageBgCss}
  height: 529px;
  position: relative;
  margin-bottom: 12px;
`;

const PositionContainer = styled.div`
  position: absolute;
  bottom: ${({ bottom }) => `${bottom}px`};
  left: ${({ left }) => `${left}px`};
`;

const BottomImageBgCss = css`
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: left;
  background-position-y: top;

  background-image: url(static/Custom-Landing-Page–Header-Image-2.webp);
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

const TechUserLandingPage = () => (
	<Page
		noPadd
		title="in-house | tech"
		variant="dark"
	>
		<div style={{ background: '#000', margin: '0' }}>
			<div>
				<HeaderImage>
					<PositionContainer left="12" bottom="12">
						<Text
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
						<Text
							text="voice everything"
							variant="light"
							color={appColors.gray200}
							weight="bold"
							family="helvetica"
							size={24}
						/>
						<br />

						<Text
							text="(remain untraceable)"
							variant="dark"
							color={appColors.gray400}
							weight="bold"
							family="helvetica"
							size={24}
						/>
						<SpacingContainer marginTop="35">
							<HorizontallyCenteredContainer style={{ maxWidth: '350px'}}>
								<Text
									variant="dark"
									color={appColors.gray300}
									size={16}
									lineHeight={22}
									weight="reg"
									style={{ opacity: '0.7' }}
								>
									for the first time ever there is a tool that allows you and your team to speak truth
									to power in unified anonymous consensus without fear of retaliation
								</Text>
							</HorizontallyCenteredContainer>
						</SpacingContainer>
					</PositionContainer>
				</HeaderImage>
				<div style={{ padding: '0 12px' }}>
					<CTAButton
						text="bring democracy to my workplace"
						style={{ marginTop: '36px', marginBottom: '70px' }}
					/>
				</div>
				{/* <SpacingContainer padding="0 12px">
					<div style={{ textAlign: 'center' }}>
						<Icon icon="angle-down" size={2} color="#88898E" />
					</div>
				</SpacingContainer> */}
			</div>
			{/* section 2 */}

			<SpacingContainer padding="80px 12px 0">
				<Text
					variant="light"
					color={appColors.gray300}
					weight="bold"
					family="helvetica"
					size={36}
					style={{ textAlign: 'center', marginBottom: '51px' }}
				>
					finally address everything
				</Text>
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
			</SpacingContainer>
			<BottomImage />
			<Text
				variant="light"
				color={appColors.gray300}
				weight="reg"
				family="helvetica"
				size={16}
				style={{ textAlign: 'center', maxWidth: '286px', margin: '0 auto' }}
			>
				be one of the first ~50 workplaces listed in our beta trial
			</Text>
			<SpacingContainer padding="0 12px 120px">
				<div className="button-group">
					<CTAButton text="request to list my job" />
					<CTAButton text="schedule a demo" />
					<Button variant="light" outlined text="notify me when open to public" noSuffix />
				</div>
			</SpacingContainer>
			<Footer showScrollIndicator variant="dark" />
		</div>
	</Page>
);

export default TechUserLandingPage;
