import React from 'react';
import Link from 'next/link';

import { Page } from '../components/templates';
import { Button, Heading, Strong } from '../components/atoms';
import { LandingLayout } from '../components/organisms';
import { DEMO_VENUES_ID } from '../store/demo/data';

const Index = () => (
  <Page>
    <LandingLayout>
      <Heading>change everything?</Heading>

      <p>when everyone in your organization can vote safely, equally & anonymously</p>

      <p>on everything</p>

      <p>
        <Strong>how will your life change?</Strong>
      </p>
      <Link href={`/houses/${DEMO_VENUES_ID}`}>
        <Button>try it</Button>
      </Link>
    </LandingLayout>
  </Page>
);

export default Index;
