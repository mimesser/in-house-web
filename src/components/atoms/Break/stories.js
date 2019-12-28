import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { Break } from '.';
import { H1 } from '../text';

const Container = styled.div`
  padding: 3rem;
`;

storiesOf('Break', module).add('Break', () => (
  <Container>
    <H1>lorem ipsum dolor sit amet</H1>
    <Break step={1} totalSteps={5} />
    <div>asd fasdfasdfasdf asdfasd fasdf asdfasdf as</div>
  </Container>
));
