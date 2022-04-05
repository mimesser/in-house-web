import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { NumberedSectionBlock, HorizontallyCenteredContainer } from '../components';
import Text from '../../../atoms/text/_index';
import { appColors, device } from '../../../../style';

import { CTAButton } from '../../../atoms/Button/_index';
import { padding } from 'polished';

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
    share: true,
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
	background: transparent;
  @media ${device.mobile} {
		padding-left: 20px;
    padding-top: 215px;
    padding-bottom: 212px;
	}
	@media ${device.tab} {
		padding-left: 40px;
    padding-top: 420px;
    padding-bottom: 420px;
    max-width: 482px;
	}
	@media ${device.web} {
		padding-left: 80px;
    padding-top: 290px;
    max-width: 615px;
    padding-bottom: 290px;
	}
	@media ${device.laptop} {
		padding-left: 80px;
    padding-top: 290px;
    max-width: 615px;
    padding-bottom: 290px;
	}
	@media ${device.desktop} {
		padding-left: 277px;
    padding-top: 290px;
    max-width: 810px;
    padding-bottom: 290px;
	}
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
const TopSection = () => (
  <TopSectionContainer>
      <ResponsiveText
				variant="light"
				color="gray200"
				weight="bold"
				family="helvetica"
				size={36}
			>
				voice everything
			</ResponsiveText>
    <SpacingContainer marginTop={30} marginBottom={30}>
      <HorizontalBar />
    </SpacingContainer>

    <ResponsiveText
      variant="light"
      color={appColors.gray200}
      weight="bold"
      family="helvetica"
      size={32}
    >
      (remain untraceable)
    </ResponsiveText>
    <SpacingContainer marginTop={34}>
      <Link href={`/request-join`}>
        <CTAButton text="make my workplace transparent" />
      </Link>
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

const FlexContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: start;
	flex-wrap: wrap;
`;

const SectionOne = () => (
  <>
    <TopSection style = {{background: 'linear-gradient(356deg, #111, transparent)'}}/>
    <div style={{ background: '#111' }}>
      <SpacingContainer padding="60px 12px 60px 12px">
        <HorizontallyCenteredContainer>
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
        <FlexContainer>
          {howItWorks.map((section, index) => {
            const { header, description, share } = section;

            return (
              <NumberedSectionBlock
                header={header}
                description={description}
                index={index}
                key={index}
                headerMaxWidth="306px"
                descriptionMaxWidth="306px"
								share={share}
              />
            );
          })}
        </FlexContainer>  
        <div style={{ textAlign: 'center'}}>
          <Link href={`/join-us`}>
            <CTAButton text="join us" />
          </Link>
        </div>
      </SpacingContainer>    
    </div>
  </>
);

export default SectionOne;
