import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { Dropdown } from '.';

const Container = styled.div`
   > * {
      margin-bottom: 1rem;
   }
`;

storiesOf('Dropdown', module).add('default', () => (
   <Container>
      <Dropdown>
         <option>Option 1</option>
         <option>Option 2</option>
         <option>Option 3</option>
      </Dropdown>
   </Container>
));
