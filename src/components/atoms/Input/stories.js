import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Input, Textarea } from '.';

const Container = styled.div`
   > * {
      margin-bottom: 1rem;
   }
`;

storiesOf('Input controls', module)
   .add('Input', () => (
      <Container>
         <Input />
         <Input placeholder="placeholder" />
         <Input value="some value" />
         <Input value="disabled" disabled />
         <Input value="strike wrong" strike />
         <Input value="error" error />
      </Container>
   ))
   .add('Textarea', () => <Textarea />);
