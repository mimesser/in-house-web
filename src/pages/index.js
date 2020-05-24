import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { Page, HowItWorks } from '../components/organisms';
import { Button, H1, H2, Break, Icon, TransparentLinkStyle } from '../components/atoms';
import { spacing, palette, breakpoints } from '../style';
import BetaChallenge from '../components/organisms/BetaChallange';

const Main = styled.div`
  position: relative;
  color: ${palette.offWhite};

  padding: ${spacing.xxl};
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

  /*
    anything that's not really small
    TODO: page should be designed properly, and no hard-coded '400px'
  */
  @media screen and (min-width: 400px) {
    ${H1} {
      margin-top: ${spacing.xl};
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

const Links = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > a {
    ${TransparentLinkStyle};

    :last-of-type {
      margin-top: ${spacing.sm};
    }
    /*
      anything that's not really small
      TODO: page should be designed properly, and no hard-coded '400px'
    */
    @media screen and (min-width: 400px) {
      :last-of-type {
        margin-top: ${spacing.lg};
      }
    }
  }

  > div {
    margin-top: ${spacing.xl};
    /*
      anything that's not really small
      TODO: page should be designed properly, and no hard-coded '400px'
    */
    @media screen and (min-width: 400px) {
      margin-top: ${spacing.xxxl};
      :last-of-type {
        margin-top: 80px;
      }
    }
    > a {
      margin-right: ${spacing.lg};
    }
  }
`;

const SocialLink = ({ href, icon }) => (
  <a href={href} rel="noopener noreferrer" target="_blank">
    <Icon icon={icon} size={1.5} />
  </a>
);

const socialLinks = [
  {
    icon: 'facebook',
    href: 'https://www.facebook.com/inhouse.movement',
  },
  {
    icon: 'twitter',
    href: 'https://twitter.com/inhousemovement',
  },
  {
    icon: 'linkedin',
    href: 'https://www.linkedin.com/company/in-house6',
  },
];

const Landing = () => (
  <Page whiteHead videoBack>
    <Main>
      <H1>a tool for people who can’t speak safely</H1>
      <Break />
      <H2 as="p">share truths about your organization with 100% anonymous team voting (on everything)</H2>
      <Links>
        <HowItWorks />
        <Link href="/about" passHref>
          <Button icon="mission">our mission</Button>
        </Link>

        <BetaChallenge />
        <div>
          {socialLinks.map((link) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <SocialLink {...link} key={link.icon} />
          ))}
        </div>
      </Links>
    </Main>
  </Page>
);

export default Landing;
