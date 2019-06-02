import React from 'react';

import { Page } from '../components/templates';
import { Container } from '../components/atoms';
import { VenueLoader } from '../components/organisms';

const Houses = ({ id }) => {
   return (
      <Page title="Houses">
         <Container>
            <VenueLoader id={id} />
         </Container>
      </Page>
   );
};

Houses.getInitialProps = ({ ctx: { query: { id } = {} } }) => ({ id });

export default Houses;
