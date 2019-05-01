import React from 'react';
import { storiesOf } from '@storybook/react';

import { Container } from '..';
import { Column, Flex } from '.';

storiesOf('Container', module)
   .add('justifyAround', () => (
      <Container style={{ backgroundColor: '#F5B700' }}>
         <Container small full style={{ backgroundColor: '#fff' }}>
            <Flex justifyAround>
               <div
                  style={{
                     height: 100,
                     width: 100,
                     borderRadius: 50,
                     backgroundColor: '#F9D773',
                  }}
               />
               <div
                  style={{
                     height: 100,
                     width: 100,
                     borderRadius: 50,
                     backgroundColor: '#F9D773',
                  }}
               />
               <div
                  style={{
                     height: 100,
                     width: 100,
                     borderRadius: 50,
                     backgroundColor: '#F9D773',
                  }}
               />
            </Flex>
         </Container>
      </Container>
   ))
   .add('noWrap', () => (
      <Container style={{ background: '#008BF8' }}>
         <Flex noWrap>
            <Column three style={{ height: 300, backgroundColor: '#5CB5FA' }} />
            <Column three style={{ height: 300, backgroundColor: '#B9DFFD' }} />
            <Column three style={{ height: 300, backgroundColor: '#5CB5FA' }} />
         </Flex>
      </Container>
   ))
   .add('noWrap justifyAround', () => (
      <Container style={{ background: '#73CE32' }}>
         <Container small full style={{ backgroundColor: '#fff' }}>
            <Flex noWrap justifyAround>
               <Column four style={{ height: 150, backgroundColor: '#D5FDA8' }} />
               <Column four style={{ height: 150, backgroundColor: '#D5FDA8' }} />
               <Column four style={{ height: 150, backgroundColor: '#D5FDA8' }} />
            </Flex>
         </Container>
      </Container>
   ));
