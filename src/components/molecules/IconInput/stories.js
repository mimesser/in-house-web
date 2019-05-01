import React from 'react';
import { storiesOf } from '@storybook/react';
import { IconInput } from '.';

storiesOf('IconInput', module)
   .add('default', () => <IconInput icon="close" />)
   .add('with icon on right', () => <IconInput icon="close" right />)
   .add('responsive with breakpoint', () => <IconInput icon="close" breakpoint={300} responsive />)
   .add('height', () => <IconInput icon="close" height={100} />);
