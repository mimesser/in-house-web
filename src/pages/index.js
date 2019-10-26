import React from 'react';
import Link from 'next/link';

import { Page } from '../components/templates';
import { Button, Heading, Strong } from '../components/atoms';
import { LandingLayout, LandingHelp } from '../components/organisms';
import { DEMO_VENUES_ID } from '../store/demo/data';

const Index = () => (
  <Page>
    <LandingLayout>
      <Heading>if nothing ever changes</Heading>
      <Heading>what’s the point?</Heading>
      <Strong>private / anonymous / collective team feedback</Strong>
      <p>raise issues without fear</p>
      <p>challenge favoritism & politics</p>
      <p>promote the best people & ideas</p>
      <p>rate every issue democratically</p>
      <p>empower consensus</p>
      <Strong>remain untraceable</Strong>
      <div>
        <Link href={`/houses/${DEMO_VENUES_ID}`}>
          <Button secondary>see how it works</Button>
        </Link>
        <Link href="/quick-list">
          <Button>list your house</Button>
        </Link>
      </div>
    </LandingLayout>
    <LandingHelp />
  </Page>
);

export default Index;
