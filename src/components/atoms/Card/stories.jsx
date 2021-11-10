import React from 'react';
import { storiesOf } from '@storybook/react';

import { H1 } from '../text';
import { Card } from '.';

storiesOf('Card', module).add('default', () => (
  <Card>
    <H1>Plain Card</H1>
    <p>
      Nullam quis risus eget urna mollis ornare vel eu leo. Donec id elit non mi porta gravida at
      eget metus. Donec sed odio dui.
    </p>
  </Card>
));
