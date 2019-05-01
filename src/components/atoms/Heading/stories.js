import React from 'react';
import { storiesOf } from '@storybook/react';

import { Heading } from '.';

storiesOf('Container', module)
   .add('h1', () => <Heading>h1 - Heading 1</Heading>)
   .add('h2', () => <Heading h2>h2 - Heading 2</Heading>)
   .add('h3', () => <Heading h3>h3 - Heading 3</Heading>)
   .add('h4', () => <Heading h4>h4 - Heading 4</Heading>)
   .add('h5', () => <Heading h5>h5 - Heading 5</Heading>);
