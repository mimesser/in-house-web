import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { Dropdown } from '.';

const Container = styled.div`
  padding: 1rem;
  > * {
    margin-bottom: 1rem;
  }
`;

const options = [{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }, { label: 'C', value: 'C' }];

storiesOf('Dropdown', module).add('Dropdown', () => (
  <Container>
    <Dropdown options={options} />
    <Dropdown placeholder="placeholder" options={options} />
    <Dropdown placeholder="disabled" isDisabled options={options} />
    <Dropdown placeholder="open programmatically" options={options} menuIsOpen />
  </Container>
));
