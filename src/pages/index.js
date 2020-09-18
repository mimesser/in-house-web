import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { Page, HowItWorks } from '../components/organisms';
import { Button, H1, H2, Break, Icon, ClearButton } from '../components/atoms';
import { spacing, palette, breakpoints } from '../style';
import BetaChallange, { BetaLink, BetaDesc } from '../components/organisms/BetaChallange';
import { version } from '../../package.json';
import { Footer } from '../components/organisms/Footer';
const Main = styled.div`
  position: relative;
  color: ${palette.offWhite};

  padding: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: ${breakpoints.sm};

  ${Break} {
    margin: ${spacing.xl} 0;
  }
  ${H2} {
    margin-bottom: ${spacing.lg};
    font-family: inherit;
  }
  ${H1} {
    line-height: 1em;
  }

  @media screen and (min-width: ${breakpoints.xs}) {
    ${H1} {
      margin-top: 105.5px;
      line-height: inherit;
    }
    ${Break} {
      margin: ${spacing.xxl} 0;
    }
    ${H2} {
      margin-bottom: ${spacing.xxl};
    }
  }
`;

const MainSection = styled.section`
  padding: ${spacing.xxl};
  min-height: 740px;
  height: 667px;
  height: 100%;
  height: 100vh;
  scroll-snap-align: start;
`;

const HowToSection = styled.section`
  widht: 100vw;
  height: 100vh;
  scroll-snap-align: start;
`;

const VersionFooter = styled.footer`
  position: absolute;
  right: 20px;
  top: 90vh;
  text-align: right;
  color: ${palette.lightGray};
`;

const ScrollPage = styled(Page)`
  scroll-snap-type: y proximity;
  scroll-padding: 50%;
`;

const ScrollButton = styled(ClearButton)`
  position: absolute;
  width: auto;
  top: 90vh;
  margin-left: -45vw;
  width: 10vw;
  margin-right: 40vw;
  padding: 0;
`;

const CloseIcon = styled(Icon).attrs(() => ({
  icon: 'angle-down',
}))`
  width: 24px;
  height: 24px;
  :hover {
    color: ${palette.white};
  }
`;

const Landing = () => {
  const [videoReady, setVideoReady] = useState(false);
  const onVideoReady = () => {
    setVideoReady(true);
  };

  const scrollMenu = (id = 'howitworks') => {
    console.log('# scroll menu');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 0);
  };

  return (
    <ScrollPage whiteHead imageBack overlayBack>
      <Main>
        <MainSection>
          <H1>make your voice heard</H1>
          <Break />
          <H2 as="p">let management know how they're doing, without compromise</H2>
          <Link href="/houses" prefetch={false}>
            <BetaLink icon="arrow-right" wide outline>
              see houses
            </BetaLink>
          </Link>
          <VersionFooter>
            <p>
              v{version}
              {process.env.REACT_APP_GIT_SHA}
            </p>
          </VersionFooter>
          <ScrollButton onClick={() => scrollMenu()}>
            <CloseIcon />
          </ScrollButton>
        </MainSection>

        <HowToSection id="howitworks">
          <HowItWorks />
        </HowToSection>

        <Footer />
      </Main>
    </ScrollPage>
  );
};

export default Landing;
