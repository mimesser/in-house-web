import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Check } from 'styled-icons/evil';

import { Button, IconButton } from '.';

const Container = styled.div`
  > * {
    margin-bottom: 1rem;
    display: block;
  }
`;

storiesOf('Button', module).add('Button', () => (
  <Container>
    <Button>Primary</Button>
    <Button disabled>Disabled</Button>
    <Button secondary>Secondary</Button>
    <Button secondary disabled>
      Secondary disabled
    </Button>
    <div>
      <Button loading>Loading</Button> loading indicator
    </div>
    <div>
      <IconButton>
        <Check size={48} />
      </IconButton>{' '}
      icon button
    </div>
  </Container>
));
