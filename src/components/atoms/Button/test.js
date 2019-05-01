import React from 'react';
import { shallow } from 'enzyme';

import { Loader } from '../Loader';
import { Button } from '.';

const wrap = (props = {}) => shallow(<Button {...props} />).dive();

it('renders input by default', () => {
   const wrapper = wrap({ loading: true });
   expect(wrapper.find({ children: <Loader small white /> })).toHaveLength(1);
});

it('renders select when type is select', () => {
   const wrapper = wrap({ children: <span /> });
   expect(wrapper.find({ children: <span /> })).toHaveLength(1);
});
