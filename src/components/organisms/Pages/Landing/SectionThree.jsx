import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import {
  BottomSectionWrapper,
  HorizontallyCenteredContainer,
  imageMargins,
  SpacingContainer,
} from '../components';
import { CTAButton } from '../../../atoms/Button/_index';
import Text from '../../../atoms/text/_index';
import { appColors, desktopWidth, device, mobileWidth } from '../../../../style';

const features = [
  {
    header: 'control the top ‘mink’',
    description:
      'a motivated team can out-vote everyone else to select the question that everyone else must be able to answer to be verified as an insider. just create and vote-up questions that only your teammates will know',
    image: "url('static/image1.webp')",
  },
  {
    header: 'address everything safely',
    description:
      'speak and vote in consensus on every issue so everyone in your team can see what matters and by how much. the result is a comprehensive digital nervous system connecting everyone in real time around the real issues that matter.',
    image: "url('static/image2.webp')",
  },
  {
    header: 'promote accountability',
    description:
      'rate individual subjects with one tap to generate universal E.S.G. scores and show the world how your company treats people, the planet, and its profits.',
    image: "url('static/image3.webp')",
  },
];

const FeatureBlockContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 60px;
  justify-content: flex-end;

  @media (min-width: ${mobileWidth.lg}) {
    column-gap: 40px;
    flex-direction: ${({order}) => order ? 'row-reverse' : 'row'};
  }
  @media (min-width: ${desktopWidth.sm}) {
    column-gap: 80px;
  }
`;

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  jusify-content: center;
  flex-basis: 99%;
  flex-grow: 0;
  padding: 0 40px;

  @media (min-width: ${mobileWidth.lg}) {
    padding: 0;
    flex-basis: 33%;
  }
`;

const ImageContainer = styled.div`
  height: 536px;
  background-image: ${({ image }) => image || 'none'};
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: center;
  flex-grow: 0;
  flex-basis: 99%;
  @media (min-width: ${mobileWidth.md}) {
    height: 637px;
  }
  @media (min-width: ${mobileWidth.lg}) {
    flex-basis: calc(67% - 80px);
    height: 547px;
  }
  @media (min-width: ${desktopWidth.sm}) {
    flex-basis: calc(67% - 160px);
    height: 640px;
  }
  @media (min-width: ${desktopWidth.lg}) {
    flex-basis: calc(67% - 357px);
    height: 640px;
  }
`;

const FeatureBlock = ({ header, description, image, order }) => (
  <FeatureBlockContainer order={order}>
    <FeatureText>
      <Text
        color={appColors.gray300}
        family="helvetica"
        weight="bold"
        size={24}
        smSize={32}
        mdSize={45}
        variant="light"
        style={{ textAlign: 'center' }}
      >
        {header}
      </Text>
      <Text
        color={appColors.gray400}
        family="helvetica"
        weight="reg"
        size={16}
        mdSize={20}
        variant="dark"
      >
        {description}
      </Text>
    </FeatureText>

    <ImageContainer image={image} />
  </FeatureBlockContainer>
);

const ResponsiveText = styled(Text)`
  font-size: 36px;

  @media ${desktopWidth.sm} {
    font-size: 54px;
  }
`;

const SectionThreeContainer = styled(SpacingContainer)`
  ${imageMargins}
`;

const SectionThree = () => (
  <SectionThreeContainer padding="60px 0 120px">
    <HorizontallyCenteredContainer align="center">
      <ResponsiveText
        text="your team runs the show"
        color={appColors.gray100}
        variant="light"
        weight="bold"
        family="helvetica"
        maxWidth="1000px"
        size={36}
      />
    </HorizontallyCenteredContainer>
    <BottomSectionWrapper>
      {features.map(({ header, description, image }, index) => (
        <FeatureBlock
          header={header}
          description={description}
          key={index}
          order={index % 2}
          image={image}
        />
      ))}
    </BottomSectionWrapper>
    <div style={{ textAlign: 'center' }}>
      <Link href={`/join-us`}>
        <CTAButton text="join us" />
      </Link>
    </div>
  </SectionThreeContainer>
);

export default SectionThree;
