import React from 'react';
import Link from 'next/link';

import { Page } from '../components/templates';
import { Button, HeadingTwo, Strong } from '../components/atoms';
import { LandingLayout } from '../components/organisms';
import { DEMO_VENUES_ID } from '../store/demo/data';

const Index = () => (
  <Page>
    <LandingLayout>
      <HeadingTwo noMargin>if nothing ever changes</HeadingTwo>
      <div>what’s the fucking point?</div>
      <Strong>private / anonymous / collective team feedback</Strong>
      <p>raise issues without fear</p>
      <p>challenge favoritism & politics</p>
      <p>promote the best people & ideas</p>
      <p>rate every issue democratically</p>
      <p>empower consensus</p>
      <Strong>remain untraceable</Strong>
      <Link href={`/houses/${DEMO_VENUES_ID}`}>
        <Button>try it</Button>
      </Link>
    </LandingLayout>
  </Page>
);

export default Index;
