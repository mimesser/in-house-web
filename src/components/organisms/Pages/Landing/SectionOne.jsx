import React from 'react';
import styled from 'styled-components';

import { NumberedSectionBlock, HorizontallyCenteredContainer } from '../components';
import Text from '../../../atoms/text/_index';
import { appColors } from '../../../../style';

import { CTAButton } from '../../../atoms/Button/_index';

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
      'our anonymous share feature allows you to invite people in your team without revealing your identity',
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
	background: linear-gradient(356deg, black, transparent);
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
    <Text
			variant="light"
			color="gray200"
			weight="bold"
			family="helvetica"
			size={36}
		>
      voice
    </Text>
    <Text
			variant="light"
			color="gray200"
			weight="bold"
			family="helvetica"
			size={36}
		>
      everything
    </Text>

    <SpacingContainer marginTop={30} marginBottom={30}>
      <HorizontalBar />
    </SpacingContainer>

    <Text
			variant="dark"
			color={appColors.gray200}
			weight="bold"
			family="helvetica"
			size={32}
		>
      (remain untraceable)
    </Text>
    <SpacingContainer marginTop={34}>
      <CTAButton text="make my workplace transparent" />
    </SpacingContainer>
    <TextContainer>
      <Text
				variant="light"
				color="gray300"
				weight="reg"
				family="helvetica"
				size={16}
			>
        now there is a tool allowing your entire team to speak truth to power in unified consensus
        —without fear of retaliation
      </Text>

      <Text
				variant="light"
				color="gray300"
				weight="reg"
				family="helvetica"
				size={16}
			>
        grade your company’s ESG/sustainability metrics and show the public how it treats people,
        the planet, and its profits
      </Text>
    </TextContainer>
  </TopSectionContainer>
);

const SpacingContainerStyling = styled.div`
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
  background: ${({ background }) => background};
  padding: ${({ padding }) => padding};
`;

const SpacingContainer = ({ children, ...props }) => (
  <SpacingContainerStyling {...props}>{children}</SpacingContainerStyling>
);

const SectionOne = () => (
  <>
    <TopSection />
    <div style={{ background: '#111' }}>
      <SpacingContainer padding="142px 12px 60px 12px">
        <HorizontallyCenteredContainer style={{ marginBottom: '60px' }}>
          <Text
            variant="light"
            color="gray300"
            weight="bold"
            family="helvetica"
            size={36}
            style={{ textAlign: 'center' }}
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
							headerMaxWidth="306px"
							descriptionMaxWidth="306px"
            />
          );
        })}
      </SpacingContainer>
    </div>
  </>
);

export default SectionOne;
