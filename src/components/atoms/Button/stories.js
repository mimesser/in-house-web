import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '.';

storiesOf('Button', module)
   .add('default', () => <Button>Primary Button</Button>)
   .add('secondary', () => <Button secondary>Secondary Button</Button>)
   .add('inverse', () => <Button inverse>Inverse Button</Button>)
   .add('big', () => <Button big>Big Primary Button</Button>)
   .add('loading', () => <Button loading>Primary Loading Button</Button>);
