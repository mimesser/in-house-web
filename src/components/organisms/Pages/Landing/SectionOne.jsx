import React from 'react';
import styled from 'styled-components';

import Text from '../../../atoms/text/_index';
import { Icon } from '../../../atoms';
import { CTAButton } from '../../../atoms/Button/_index';
import  { appColors } from '../../../../style';


const howItWorks = [
	{
		header: 'list your workplace (anonymously)',
		description:
			'as long as we have started hosting your industry, you can request to list your organization 100% anonymously without anyone knowing it was you',
	},
	{
		header: 'create a team password question',
		description:
			'our patented team passwords allow team members to verify each other with common knowledge only. no logins, emails or personal data required',
	},
	{
		header: 'alert your team (anonymously)',
		description:
			'our anonymous share feature⋟allows you to invite people in your team without revealing your identity',
	},
	{
		header: 'address everything (safely)',
		description:
			'speak your mind freely & anonymously for the first time in history without fear of retribution AND see your coworkers’ opinions in democratic consensus',
	},
	{
		header: 'make your workplace accountable',
		description:
			'your team’s private ratings create public “ESG” scores — informing the public how your company treats people, the planet, and its profits',
	},
];

const TopSectionContainer = styled.div`
	padding: 20px 12px 0;
	background: transparent;
`;

const HorizontalBar = styled.div`
	background: #cbccd0;
	width: 128px;
	height: 8px;
`;

const TextContainer = styled.div`
	height: 154px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-top: 26px;
`;

const TopSection = () => (
	<TopSectionContainer>
		<Text variant="light" color={appColors.gray200} weight="bold" family="helvetica" size={36}>
			voice
		</Text>
		<Text variant="light" color={appColors.gray200} weight="bold" family="helvetica" size={36}>
			everything
		</Text>

		<SpacingContainer marginTop={30} marginBottom={30}>
			<HorizontalBar />
		</SpacingContainer>

		<Text variant="dark" color={appColors.gray200} weight="bold" family="helvetica" size={32}>
			(remain untraceable)
		</Text>
		<SpacingContainer marginTop={34}>
			<CTAButton text="make my workplace transparent" />
		</SpacingContainer>
		<TextContainer>
			<Text variant="light" color={appColors.gray300} weight="reg" family="helvetica" size={16}>
				now there is a tool allowing your entire team to speak truth to power in unified consensus
				—without fear of retaliation
			</Text>

			<Text variant="light" color={appColors.gray300} weight="reg" family="helvetica" size={16}>
				grade your company’s ESG/sustainability metrics and show the public how it treats people,
				the planet, and its profits
			</Text>
		</TextContainer>
	</TopSectionContainer>
);

const HorizontallyCenteredContainer = styled.div`
	display: flex;
	justify-content: center;
	// max-width: 332px;
	max-width: 304px;
	margin: auto;
	text-align: ${({ align }) => (align ? 'center' : null)};
`;

const NumberedSectionBlockContainer = styled.div`
	width: 100%;
	margin-top: 60px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
`;

const SpacingContainerStyling = styled.div`
	margin-top: ${({ marginTop }) => `${marginTop}px`};
	margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
	background: ${({ background }) => background};
	padding: ${({ padding }) => padding};
`;

const SpacingContainer = ({ children, ...props }) => (
	<SpacingContainerStyling {...props}>{children}</SpacingContainerStyling>
);

const NumberedSectionBlock = ({ index, header, description }) => (
	<NumberedSectionBlockContainer>

		<HorizontallyCenteredContainer style={{ marginBottom: '8px' }}>
			<Icon icon={`number-disc-${index + 1}`} size={6} />
		</HorizontallyCenteredContainer>

		<HorizontallyCenteredContainer style={{ marginBottom: '16px' }}>
			<Text
				text={header}
				color={appColors.gray300}
				variant="light"
				weight="bold"
				family="helvetica"
				size={32}
			/>
		</HorizontallyCenteredContainer>

		<HorizontallyCenteredContainer>
			<Text
				text={description}
				color={appColors.gray400}
				variant="dark"
				weight="reg"
				family="helvetica"
				size={16}
			/>
		</HorizontallyCenteredContainer>
	</NumberedSectionBlockContainer>
);

const SectionOne = () => (
	<>
		<TopSection />
		<div style={{ background: '#000' }}>
			<SpacingContainer padding="142px 12px 60px 12px">
				<HorizontallyCenteredContainer>
					<Text
						variant="light"
						color={appColors.gray300}
						weight="bold"
						family="helvetica"
						size={36}
					>
						how it works
					</Text>
				</HorizontallyCenteredContainer>
				{howItWorks.map((section, index) => {
					const { header, description } = section;

					return (
						<NumberedSectionBlock
							header={header}
							description={description}
							index={index}
							key={index}
						/>
					);
				})}
			</SpacingContainer>
		</div>
	</>
)

export default SectionOne;
