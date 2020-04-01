import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { Page, HowItWorks } from '../components/organisms';
import { Button, H1, H3, Break, Icon, TransparentLinkStyle } from '../components/atoms';
import { spacing, palette, breakpoints } from '../style';

const Main = styled.div`
  position: relative;
  color: ${palette.offWhite};

  padding: ${spacing.xxl};
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: ${breakpoints.sm};

  ${H1} {
    margin-top: ${spacing.xl};
  }
  ${Break} {
    margin: ${spacing.xxl} 0;
  }
  ${H3} {
    margin-bottom: ${spacing.xxl};
    font-family: inherit;
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
      margin-top: ${spacing.lg};
    }
  }

  > div {
    margin-top: ${spacing.xxl};
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
      <H3 as="p">
        allowing only anonymous team members to share consensus truths about their organization *without any required
        logins, emails or identifying personal data*
      </H3>
      <Links>
        <HowItWorks />
        <Link href="/about" passHref>
          <Button icon="mission">our mission</Button>
        </Link>
        <div>
          {socialLinks.map(link => (
            <SocialLink {...link} key={link.icon} />
          ))}
        </div>
      </Links>
    </Main>
  </Page>
);

export default Landing;
