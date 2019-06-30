import React from 'react';
import { storiesOf } from '@storybook/react';
import { Input, Select, Textarea } from '.';

storiesOf('Input', module)
   .add('default', () => <Input />)
   .add('height', () => <Input height={100} />)
   .add('invalid', () => <Input invalid />)
   .add('type textarea', () => <Textarea />)
   .add('type checkbox', () => <Input type="checkbox" />)
   .add('type radio', () => <Input type="radio" />)
   .add('type select', () => (
      <Select>
         <option>Option 1</option>
         <option>Option 2</option>
         <option>Option 3</option>
      </Select>
   ));
