import React from 'react';
import Link from 'next/link';

import { Page } from '../components/templates';
import { Button, Container, Heading, Strong } from '../components/atoms';
import { LandingLayout } from '../components/organisms';

const Index = () => (
  <Page>
    <Container>
      <LandingLayout>
        <Heading>change everything?</Heading>

        <p>when everyone in your organization can vote safely, equally & anonymously</p>

        <p>on everything</p>

        <p>
          <Strong>how will your life change?</Strong>
        </p>
        <Link href="/how-it-works">
          <Button>see how it works</Button>
        </Link>
      </LandingLayout>
    </Container>
  </Page>
);

export default Index;
