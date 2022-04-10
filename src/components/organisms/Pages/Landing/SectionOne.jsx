import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { NumberedSectionBlock, HorizontallyCenteredContainer, FlexContainer } from '../components';
import Text from '../../../atoms/text/_index';
import { appColors, desktopHeight, device, mobileHeight } from '../../../../style';

import { CTAButton } from '../../../atoms/Button/_index';
import { padding } from 'polished';
import { imageMargins } from '../../../../pages/tech';

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
  background: linear-gradient(180.68deg, rgba(17, 17, 17, 0.15) 31.47%, #111111 99.41%);
  posiition: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: -65px;
  height: 100vh;
  ${imageMargins}
`;

const HorizontalBar = styled.div`
  background: #cbccd0;
  width: 128px;
  height: 8px;
`;

const TextContainer = styled.div`
  @media ${device.tab} {
    max-width: 482px;
  }
  @media ${device.web} {
    max-width: 615px;
  }
  @media ${device.laptop} {
    max-width: 615px;
  }
  @media ${device.desktop} {
    max-width: 810px;
  }
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
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
`;
const TopSection = () => (
  <TopSectionContainer>
    <TextContainer>
      <ResponsiveText
        variant="light"
        color={appColors.gray100}
        weight="bold"
        family="helvetica"
        size={36}
      >
        voice everything
      </ResponsiveText>
      <SpacingContainer>
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
      <SpacingContainer>
        <Link href={`/request-join`}>
          <CTAButton text="make my workplace transparent" />
        </Link>
      </SpacingContainer>
      <Text
        variant="light"
        color="gray300"
        weight="reg"
        family="helvetica"
        size={16}
        mdSize={20}
        lineHeight={24}
      >
        now there is a tool allowing your entire team to speak truth to power in unified consensus
        —without fear of retaliation
        <br />
        <br />
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
  display: flex;
  flex-direction: column;
  row-gap: ${({ rowGap }) => (rowGap ? rowGap : '60px')};
  align-items: ${({ alignment }) => alignment};
  z-index: 1;
  ${imageMargins}
`;

const SpacingContainer = ({ children, ...props }) => (
  <SpacingContainerStyling {...props}>{children}</SpacingContainerStyling>
);

const SectionOne = () => (
  <>
    <TopSection />
    <SpacingContainer padding="60px 0 120px" marginTop="-1">
      <HorizontallyCenteredContainer>
        <Text
          variant="light"
          color="gray100"
          weight="bold"
          family="helvetica"
          size={36}
          mdSize={54}
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
      <div style={{ textAlign: 'center' }}>
        <Link href={`/join-us`}>
          <CTAButton text="join us" />
        </Link>
      </div>
    </SpacingContainer>
  </>
);

export default SectionOne;
