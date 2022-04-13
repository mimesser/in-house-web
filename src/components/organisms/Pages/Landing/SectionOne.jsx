import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import {
  NumberedSectionBlock,
  HorizontallyCenteredContainer,
  FlexContainer,
  SpacingContainer,
  imageOffset,
  ResponsiveText,
} from '../components';
import Text from '../../../atoms/text/_index';
import { appColors, desktopWidth, device, mobileWidth } from '../../../../style';

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
  background: linear-gradient(180.68deg, rgba(17, 17, 17, 0.15) 31.47%, #111111 99.41%);
  posiition: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: -65px;
  height: 100vh;
  ${imageOffset}
`;

const HorizontalBar = styled.div`
  background: ${appColors.gray100};
  width: 128px;
  height: 8px;
`;

const TextContainer = styled.div`
  @media (min-width: ${mobileWidth.lg}) {
    max-width: 437px;
  }
  @media (min-width: ${desktopWidth.sm}) {
    max-width: 535px;
  }
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
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
        smSize={45}
        mdSize={54}
        lineHeight={44}
        smLineHeight={55}
        mdLineHeight={66}
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
        smSize={45}
        mdSize={54}
        lineHeight={39}
        smLineHeight={55}
        mdLineHeight={66}
        
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
        color={appColors.gray300}
        weight="reg"
        family="helvetica"
        size={16}
        mdSize={20}
        lineHeight={19}
        mdLineHeight={24}
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
        <Link href={`/request-join`}>
          <CTAButton text="join us" />
        </Link>
      </div>
    </SpacingContainer>
  </>
);

export default SectionOne;
