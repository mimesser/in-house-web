import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '.';

const wrap = (props = {}) => shallow(<Input {...props} />);

it('renders props when passed in', () => {
  const wrapper = wrap({ type: 'text' });
  expect(wrapper.find({ type: 'text' })).toHaveLength(1);
});
