import React from 'react';
import { connect } from 'react-redux';

import { Container } from '../atoms';
import { Header } from '../organisms';

function PageTemplate({ children }) {
   return (
      <Container full fullVertical fullHeight>
         <Header />
         {children}
      </Container>
   );
}

export const Page = connect(state => state)(PageTemplate);
