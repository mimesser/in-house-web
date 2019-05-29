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

            <p>when everyone has a safe, equal & anonymous voice at the table, the entirety of your organization will change forever</p>

            <Strong>how will your world change?</Strong>
            <Link href="/intro">
               <Button>see how it works</Button>
            </Link>
         </LandingLayout>
      </Container>
   </Page>
);

export default Index;
