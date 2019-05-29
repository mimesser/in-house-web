import React from 'react';

import { Page } from '../components/templates';
import { Container } from '../components/atoms';
import { VenueList } from '../components/organisms';

const Home = () => (
   <Page title="Home Page">
      <Container>
         <VenueList />
      </Container>
   </Page>
);

export default Home;
