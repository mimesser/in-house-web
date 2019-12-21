import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Icon } from '.';

const svgs = require.context('./icons', true, /\.svg$/);
const DemoIcon = styled(Icon)`
  margin: 2rem;
`;

storiesOf('Icon', module)
  .add('all', () =>
    svgs
      .keys()
      .map(path => path.match(/\.\/([^.]+)\.svg$/)[1])
      .map(key => <DemoIcon icon={key} key={key} size={3} />),
  )
  .add('color', () => <Icon icon="close" color="lightGray" />)
  .add('size', () => <Icon icon="close" size={5} />);
