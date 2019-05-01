import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '.';

const wrap = (props = {}) => shallow(<Input {...props} />).dive();

it('renders props when passed in', () => {
   const wrapper = wrap({ type: 'text' });
   expect(wrapper.find({ type: 'text' })).toHaveLength(1);
});

it('renders input by default', () => {
   const wrapper = wrap();

   expect(wrapper.find({ type: 'text' })).toHaveLength(1);
});

it('renders select when type is select', () => {
   const wrapper = wrap({ type: 'select' });
   expect(wrapper.find({ type: 'select' })).toHaveLength(1);
});

it('renders textarea when type is textarea', () => {
   const wrapper = wrap({ type: 'textarea' });
   expect(wrapper.find({ type: 'textarea' })).toHaveLength(1);
});
