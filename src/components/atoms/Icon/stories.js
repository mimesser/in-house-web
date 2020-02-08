import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Icon } from '.';

const svgs = require.context('./icons', true, /\.svg$/);
const Sample = styled.div.attrs(({ icon }) => ({
  children: (
    <>
      <Icon size={3} icon={icon} />
      <span>{icon}</span>
    </>
  ),
}))`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  // to easily identify hardcoded backgrounds
  background: aliceblue;
  > * {
    :first-child {
      margin-bottom: 0.5rem;
    }
  }
`;

storiesOf('Icon', module)
  .add('all', () =>
    svgs
      .keys()
      .map(path => path.match(/\.\/([^.]+)\.svg$/)[1])
      .map(key => <Sample icon={key} key={key} />),
  )
  .add('color', () => <Icon icon="close" color="lightGray" size={5} />)
  .add('size', () => <Icon icon="close" size={10} />);
