import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { Button, IconButton } from '.';
import { Icon } from '../Icon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > * {
    margin-bottom: 1rem;
  }
`;

storiesOf('Button', module).add('Button', () => (
  <Container>
    <Button>primary</Button>
    <Button disabled>disabled</Button>
    <Button wide>wide</Button>
    <Button outline>outline</Button>
    <Button outline disabled>
      outline disabled
    </Button>
    <Button dashed>dashed</Button>
    <Button loading>loading</Button>
    <IconButton>
      <Icon icon="arrow-right" />
    </IconButton>
    <Button>
      with, icon <Icon icon="arrow-right" />
    </Button>
  </Container>
));
