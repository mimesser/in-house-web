import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { Page } from '../components/templates';
import { Button, H1, H2, Break } from '../components/atoms';
import { LandingHelp } from '../components/organisms';
import { DEMO_VENUES_ID } from '../store/demo/data';
import { spacing, palette, lineHeight, fontSize, cover, breakpoints } from '../style';

const LandingPage = styled(Page)`
  @media screen and (max-width: ${breakpoints.sm}) {
    background-image: url(https://in-house.azureedge.net/webstatic/unsplash.png);
  }
  @media screen and (min-width: ${breakpoints.sm}) {
    background-image: url(https://in-house.azureedge.net/webstatic/unsplash-big.png);
  }
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  :before {
    ${cover()};
    content: '';
    background-color: ${palette.black};
    opacity: 0.7;
  }

  > *:not(:first-child) {
    position: relative;
    color: ${palette.offWhite};
  }

  > div:last-of-type {
    padding: ${spacing.xxl};
    display: flex;
    flex-direction: column;

    ${H1} {
      margin-top: ${spacing.xxl};
    }
    ${H2} {
      line-height: ${lineHeight.md};
      margin-bottom: ${spacing.xxl};
    }
  }
`;

const Links = styled.div`
  margin-top: auto;

  a {
    :first-of-type {
      color: ${palette.primary};
      margin-top: ${spacing.sm};
    }
    :last-of-type {
      background: none;
      font-size: ${fontSize.sm};
      padding-left: 0;
      margin-top: ${spacing.xxxl};
    }
  }
`;

const Landing = () => (
  <LandingPage>
    <H1>this is a safe place</H1>
    <Break />
    <H2>
      where the truths about your org can be shared through a consensus of real insiders only — 100% safely &
      anonymously
    </H2>
    <Links>
      <div>no login. no emails. no personal data</div>
      <Link href="/houses" passHref>
        <Button outline wide icon="arrow-right">
          ok
        </Button>
      </Link>
      <Link href={`/houses/${DEMO_VENUES_ID}`} passHref>
        <Button icon="arrow-right">how it works</Button>
      </Link>
    </Links>
    <LandingHelp />
  </LandingPage>
);

export default Landing;
