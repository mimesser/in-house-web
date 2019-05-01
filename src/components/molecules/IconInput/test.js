import React from 'react';
import { mount, shallow } from 'enzyme';
import { IconInput } from '.';

const wrap = (props = {}) => shallow(<IconInput icon="close" {...props} />);

it('mounts with different combination of props', () => {
   mount(<IconInput icon="close" />);
   mount(<IconInput icon="close" right />);
   mount(<IconInput icon="close" responsive />);
   mount(<IconInput icon="close" right responsive />);
});

it('renders props when passed in', () => {
   const wrapper = wrap({ id: 'foo' });
   expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
});

it('passes height to icon', () => {
   const wrapper = wrap({ height: 20 });
   expect(wrapper.find({ height: 20 / 2.5 })).toHaveLength(1);
});
