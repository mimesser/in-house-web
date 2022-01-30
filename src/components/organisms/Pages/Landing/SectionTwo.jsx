import React from 'react';
import styled, { css } from 'styled-components';

import { CTAButton } from '../../../atoms/Button/_index';
import Text from '../../../atoms/text/_index';
import  { appColors } from '../../../../style';


const stats = [
	{
		header: '85%',
		subHeader: 'of consumers',
		description: 'want to support sustainable companies but don’t know which is which',
		source: '*(business wire, 2021)',
	},
	{
		header: '86%',
		subHeader: 'of investors',
		description:
			'(& 95% of millennial investors) beleive sustainable companies yield greater profits',
		source: '*(morgan stanley, 2020)',
	},
	{
		header: '93%',
		subHeader: 'of leadership',
		description: 'want to hear the honest truth but can’t get their teams to talk',
		source: '*(internal surveys, 2019)',
	},
	{
		header: '98%',
		subHeader: 'of workers',
		description: 'want to address problems and know what their co-workers think',
		source: '*(internal surveys, 2019)',
	},
];

const PortraitImageBgCss = css`
	background-repeat: no-repeat;
	background-size: cover;
	background-image: url(static/dude_glasses.webp);
`;

const PortraitImage = styled.div`
	${PortraitImageBgCss}
	height: 658px;
	position: relative;
`;

const HorizontallyCenteredContainer = styled.div`
	display: flex;
	justify-content: center;
	max-width: 288px;
	margin: auto;
	text-align: ${({ align }) => (align ? 'center' : null)};
`;

const StatSectionContainer = styled.div`
	width: 100%;
	margin-bottom: 60px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
	// border: 1px dotted red;
`;

const StatSection = ({ header, subHeader, description, source }) => (
	<StatSectionContainer>
		<HorizontallyCenteredContainer>
			<Text
				text={header}
				variant="light"
				color={appColors.gray300}
				weight="reg"
				family="helvetica"
				size={72}
			/>
		</HorizontallyCenteredContainer>

		<HorizontallyCenteredContainer style={{ marginBottom: '6px' }}>
			<Text
				text={subHeader}
				variant="light"
				color={appColors.gray300}
				weight="bold"
				family="helvetica"
				size={32}
			/>
		</HorizontallyCenteredContainer>

		<HorizontallyCenteredContainer style={{ marginBottom: '12px' }}>
			<Text
				text={description}
				variant="dark"
				color={appColors.gray400}
				weight="reg"
				family="helvetica"
				size={16}
				text={description}
			/>
		</HorizontallyCenteredContainer>

		<HorizontallyCenteredContainer>
			<Text
				text={description}
				variant="dark"
				color={appColors.gray400}
				weight="reg"
				family="helvetica"
				size={14}
				text={source}
			/>
		</HorizontallyCenteredContainer>
	</StatSectionContainer>
);

const SectionTwo = () => (
	<>
		<PortraitImage>
			<div style={{ margin: '0 12px' }}>
				<CTAButton text="join us" />
			</div>
			<div
				style={{
					position: 'absolute',
					bottom: '26px',
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					textAlign: 'center',
				}}
			>
				<Text
					family="helvetica"
					color={appColors.gray300}
					weight="bold"
					size={36}
					variant="light"
				>
					the world literally wants to know
				</Text>
			</div>
		</PortraitImage>

		<div style={{ background: '#000', paddingTop: '34px' }}>
			{stats.map((section, index) => (
				<StatSection
					header={section.header}
					subHeader={section.subHeader}
					description={section.description}
					source={section.source}
					key={index}
				/>
			))}
			<div style={{ margin: '0 12px' }}>
				<CTAButton text="join us" />
			</div>
		</div>
	</>
);

export default SectionTwo;
