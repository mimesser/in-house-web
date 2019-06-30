import React from 'react';
import { storiesOf } from '@storybook/react';

import { Heading } from '..';
import { Container } from '.';

storiesOf('Container', module)
   .add('default', () => (
      <Container style={{ backgroundColor: '#F5B700' }}>
         <div style={{ height: 300, backgroundColor: '#F9D773' }}>
            <Heading h2>Default Container</Heading>
         </div>
      </Container>
   ))
   .add('fullVertical', () => (
      <Container fullVertical style={{ backgroundColor: '#008BF8' }}>
         <div style={{ height: 300, backgroundColor: '#5CB5FA' }}>
            <Heading h2>Full Vertical Container</Heading>
         </div>
      </Container>
   ))
   .add('Full Small', () => (
      <Container full small style={{ backgroundColor: '#71CF00' }}>
         <div style={{ height: 300, backgroundColor: '#D4FDA2' }}>
            <Heading h2>Full Small Container</Heading>
         </div>
      </Container>
   ));
