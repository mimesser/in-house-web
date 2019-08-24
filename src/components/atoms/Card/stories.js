import React from 'react';
import { storiesOf } from '@storybook/react';

import { Heading } from '..';
import { Card } from '.';

storiesOf('Card', module).add('default', () => (
  <Card>
    <Heading h3>Normal Card</Heading>
    <p>
      Nullam quis risus eget urna mollis ornare vel eu leo. Donec id elit non mi porta gravida at eget metus. Donec sed
      odio dui.
    </p>
  </Card>
));
