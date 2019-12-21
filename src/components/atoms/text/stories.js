import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import * as textComponents from '.';

const Container = styled.div`
  > * {
    margin: 2rem;
    display: block;
  }
`;

storiesOf('Typography', module).add('Text styles', () => (
  <Container>
    {Object.entries(textComponents).map(([name, Component]) => (
      <Component key={name}>{name}</Component>
    ))}
  </Container>
));
