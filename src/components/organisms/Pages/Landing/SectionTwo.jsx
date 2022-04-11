import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

import {
  FlexContainer,
  HorizontallyCenteredContainer,
  imageMargins,
  imageOffset,
  PercentSection,
} from '../components';
import { CTAButton } from '../../../atoms/Button/_index';
import Text from '../../../atoms/text/_index';
import { appColors, desktopWidth, device, mobileWidth } from '../../../../style';

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

// Take media query here
const PortraitImageBgCss = css`
  background: linear-gradient(
    181.06deg,
    #111111 3.86%,
    rgba(17, 17, 17, 0.25) 46.74%,
    rgba(17, 17, 17, 0) 91.67%,
    #111111 99.6%
  );
  background-repeat: no-repeat;
  background-position-y: top;
  background-position-x: center;
  background-size: contain;
  background-image: url(static/dude_glasses.webp);
  @media ${device.mobile} {
    background-image: url(https://in-house.azureedge.net/webstatic/landing_main/dude_glasses-375.jpg);
  }
  @media ${device.tab} {
    background-image: url(static/dude_glasses.webp);
  }
  @media ${device.web} {
    background-image: url(static/dude_glasses.webp);
  }
  @media ${device.laptop} {
    background-image: url(static/dude_glasses.webp);
  }
  @media ${device.desktop} {
    background-image: url(https://in-house.azureedge.net/webstatic/landing_main/dude_glasses-1920.jpg);
  }
`;

const PortraitImage = styled.div`
  ${PortraitImageBgCss};
  position: relative;
  min-height: 1833px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  row-gap: 60px;
  padding-bottom: 60px;
  ${imageOffset}

  @media (min-width: ${mobileWidth.md}) {
    min-height: 1814px;
  }

  @media (min-width: ${mobileWidth.lg}) {
    min-height: 1316px;
  }

  @media (min-width: ${mobileWidth.xl}) {
    min-height: 1280px;
  }

  @media (min-width: ${desktopWidth.sm}) {
    min-height: 1260px;
  }
`;

const ResponsiveText = styled(Text)`
  font-size: 36px;

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

const SectionTwo = () => (
  <>
    <PortraitImage>
      <HorizontallyCenteredContainer style={{ margin: 0 }}>
        <ResponsiveText
          family="helvetica"
          color={appColors.gray100}
          weight="bold"
          size={36}
          variant="light"
          style={{ textAlign: 'center' }}
        >
          the world literally wants to know
        </ResponsiveText>
      </HorizontallyCenteredContainer>

      <FlexContainer mdColumnGap={110} lgColumnGap={80}>
        {stats.map((section, index) => (
          <PercentSection
            key={index}
            percent={section.header}
            subtitle={section.subHeader}
            description={section.description}
            note={section.source}
            lgCols={4}
            mdColumnGap={110}
            lgColumnGap={80}
          />
        ))}
      </FlexContainer>
      <HorizontallyCenteredContainer style={{ margin: 0, alignItems: 'center' }}>
        <Link href={`/join-us`}>
          <CTAButton text="join us" />
        </Link>
      </HorizontallyCenteredContainer>
    </PortraitImage>
  </>
);

export default SectionTwo;
