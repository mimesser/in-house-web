import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { Dial } from '.';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const log = value => console.log(value);

storiesOf('Dial', module)
  .add('default', () => (
    <Container>
      <Dial onChange={log} value={9.3} />
    </Container>
  ))
  .add('no value (animate)', () => (
    <Container>
      <Dial onChange={log} value={undefined} />
    </Container>
  ))
  .add('readonly', () => (
    <Container>
      <Dial onChange={log} value={5.4} readonly />
    </Container>
  ))
  .add('readonly no value', () => (
    <Container>
      <Dial onChange={log} value={null} readonly />
    </Container>
  ));
