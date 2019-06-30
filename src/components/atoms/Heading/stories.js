import React from 'react';
import { storiesOf } from '@storybook/react';

import { Heading, HeadingTwo, HeadingThree, HeadingFour, HeadingFive } from '.';

storiesOf('Heading', module)
   .add('Heading', () => <Heading>h1 - Heading 1</Heading>)
   .add('HeadingTwo', () => <HeadingTwo>h2 - Heading 2</HeadingTwo>)
   .add('HeadingThree', () => <HeadingThree>h3 - Heading 3</HeadingThree>)
   .add('HeadingFour', () => <HeadingFour>h4 - Heading 4</HeadingFour>)
   .add('HeadingFive', () => <HeadingFive>h5 - Heading 5</HeadingFive>);
