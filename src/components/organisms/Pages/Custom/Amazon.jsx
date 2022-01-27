import React from 'react';
import styled, { css } from 'styled-components';
import ReactPlayer from 'react-player/youtube';

import Button, { CTAButton } from '../../../atoms/Button/_index';
import Text from '../../../atoms/text/_index';
import  { appColors } from '../../../../style';
import { Icon } from '../../../atoms';

const howItWorks = [
	{
		header: 'list your job',
		description: 'as soon as your workplace goes live, only you and your co-workers will be able to post & vote on any issue that affects you - 100% anonymously',
	},
	{
		header: 'create a team security question',
		source: '*US PATENT NO: 8,904,502',
		description: 'filter out who can speak using common workplace knowledge',
		note: 'no emails or logins ever'
	},
	{
		header: 'share like a ghost',
		description: 'our anonymous share feature⋟allows you to invite your coworkers without anyone knowing it was you',
		share: true,
	},
	{
		header: 'address everything safely in real time',
		description: 'let the power of your anonymous numbers ring loudly through the ranks of leadership for the first time ever',
	},
	{
		header: 'hold your workplace accountable',
		description: 'your teams\' opinions create scores that tell the public how your company treats its people, the planet, and its profits',
	},
];

const SpacingContainerStyling = styled.div`
	margin-top: ${({ marginTop }) => marginTop ? `${marginTop}px`: null};
	margin-bottom:
		${({ marginBottom }) => marginBottom ? `${marginBottom}px`: null};
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
	background-repeat: no-repeat;
	background-size: cover;
	background-position-x: left;
	background-position-y: top;

	background-image: url(static/Custom-Landing-Page–Header-Image-1.webp);
`;

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

	background-image: url(static/Custom-Landing-Page–Header-Image-2.webp);
`;

const BottomImage = styled.div`
	${BottomImageBgCss}
	height: 450px;
	position: relative;
	margin-bottom: 12px;
`;

// const NumberedDisc = styled.div`
// 	width: 96px;
// 	height: 96px;
// 	border-radius: 50%;
// 	position: relative;
// 	// 64 - 19
// `;

// const Number = styled.div`
// 	height: 46px;
// 	width: 28px;
// 	position: absolute;
// `;

// text-align: center;
//     max-width: 286px;
//     border: 1px dotted;
//     margin: auto;

const HorizontallyCenteredContainer = styled.div`
	display: flex;
	justify-content: center;
	// max-width: ${({ maxWidth }) => maxWidth ? maxWidth : '308px' };
	margin: auto;
	text-align: ${({ align }) => (align ? 'center' : null)};
`;

const HorizontalBar = styled.div`
	background: #cbccd0;
	width: 128px;
	height: 8px;
`;

const NumberedSectionBlockContainer = styled.div`
	width: 100%;
	// margin-top: 60px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
	// border: 1px dotted red;

	& div > p:last-child {
		color: green;
		margin-bottom: 60px;
		border: 1px dotted red;
	}
`;

const NumberedSectionBlock = ({ index, header, source, description, note, share }) => (
	<NumberedSectionBlockContainer>
		{/* <HorizontallyCenteredContainer style={{ marginBottom: '6px', marginTop: '60px' }}> */}
		<HorizontallyCenteredContainer style={{ marginBottom: '6px' }}>
			<Icon icon={`number-disc-${index + 1}`} size={6} />
		</HorizontallyCenteredContainer>

		<HorizontallyCenteredContainer style={{ marginBottom: '12px' }}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					marginBottom: '12px',
				}}
			>
				<Text
					text={header}
					color={appColors.gray300}
					variant="light"
					weight="bold"
					family="helvetica"
					size={32}
				/>
				{
					source && <Text
						text={source}
						color={appColors.gray400}
						variant="light"
						weight="reg"
						family="helvetica"
						size={16}
					/>
				}
				<div>
					{share && <HorizontallyCenteredContainer
						style={{ marginBottom: '4px', marginTop: '4px' }}
					>
						<Icon icon="paper-plane" size={3} />
					</HorizontallyCenteredContainer>}
				</div>
			</div>
		</HorizontallyCenteredContainer>

		<HorizontallyCenteredContainer style={{ maxWidth: "334px" }}>
			<Text
				text={description}
				color={appColors.gray400}
				variant="dark"
				weight="reg"
				family="helvetica"
				size={16}
			/>
		</HorizontallyCenteredContainer>

		{note && <HorizontallyCenteredContainer>
			<Text
				text={note}
				color={appColors.gray300}
				variant="dark"
				weight="reg"
				family="helvetica"
				size={16}
			/>
		</HorizontallyCenteredContainer>}

	</NumberedSectionBlockContainer>
);

const AmazonLanding = () => (
	<div style={{ background: "#000" }}>
		<HeaderImage>
			<PositionContainer left="12" bottom="54">
				<Text
					text="you have power"
					color={appColors.gray200}
					variant="light"
					size={36}
					weight="bold"
					family="helvetica"
				/>
				<Text
					text="in your numbers"
					color={appColors.gray300}
					variant="light"
					weight="bold"
					family="helvetica"
					size={32}
				/>
			</PositionContainer>

			<PositionContainer left="12" bottom="16">
				<HorizontalBar />
			</PositionContainer>
		</HeaderImage>

		<SpacingContainer padding="0 12px">

			<Text
				text="voice everything"
				variant="light"
				color={appColors.gray200}
				weight="bold"
				family="helvetica"
				size={24}
			/>

			<Text
				text="(remain untraceable)"
				variant="dark"
				color={appColors.gray400}
				weight="bold"
				family="helvetica"
				size={24}
			/>

			<SpacingContainer marginTop="30" marginBottom="60">
				<Text
					variant="dark"
					color={appColors.gray300}
					size={16}
					lineHeight={22}
					weight="reg"
				>
					for the first time ever there is a tool that allows you and your team to speak truth to power in unified anonymous consensus without fear of retaliation
				</Text>
			</SpacingContainer>


			<CTAButton text="bring democracy to my job" />
		</SpacingContainer>


			{/* section 2 */}
		<SpacingContainer padding="210px 12px 0">
			<HorizontallyCenteredContainer>
				<Text
					variant="light"
					color={appColors.gray300}
					weight="bold"
					family="helvetica"
					size={36}
				>
					make them listen
				</Text>
			</HorizontallyCenteredContainer>

			{howItWorks.map((section, index) => {
				const { header, source, description, note, share } = section;
					return(
						<NumberedSectionBlock
							key={index}
							header={header}
							description={description}
							source={source}
							note={note}
							index={index}
							share={share}
						/>
					)
				})
			}
			<CTAButton text="hold my workplace accountable" />
		</SpacingContainer>

		{/* section 3 */}
		<SpacingContainer padding="100px 12px 60px">

				<Text
					variant="light"
					color={appColors.gray4}
					weight="bold"
					family="helvetica"
					size={32}
				>
						the world literally wants to know
				</Text>

		</SpacingContainer>

		<div className='player-wrapper'>
			<ReactPlayer
				url='https://youtu.be/6rMaaxouNTA'
				light={true}
				controls={true}
				width='100%'
				height='217px'
				className='react-player'
			/>
		</div>

		<BottomImage />

		<Text
			variant="light"
			color={appColors.gray300}
			weight="reg"
			family="helvetica"
			size={16}
		>
			be one of the first ~50 workplaces listed in our beta trial 
		</Text>
		<SpacingContainer padding="0 12px 120px">

			<div className="button-group">
				<CTAButton text="request to list my job" />
				<CTAButton text="schedule a demo" />
				<Button variant="light" outlined text="notify me when live" noSuffix />
			</div>

		</SpacingContainer>

	</div>
);

export default AmazonLanding;
