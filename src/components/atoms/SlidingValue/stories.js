import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import SplitFlapDisplay from './index';
import Text from './Text';
import SlidingCharacter from './Character';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const currChars = '15';
const v = '5';
const idx = 1;
const step = 200;
const textColor = '#ccc';

storiesOf('RateSlidingValue', module)
  .add('text', () => (
    <Container>
      <Text color="black"> 123</Text>
    </Container>
  ))
  .add('slidingCharacter', () => (
    <Container>
      <SlidingCharacter
        key={`sliding-${idx}`}
        prevValue={v === ' ' ? '\u2007' : v}
        step={step}
        textColor={textColor}
        value={currChars[idx] === ' ' ? '\u2007' : currChars[idx]}
      />
    </Container>
  ))
  .add('SlidingValue', () => (
    <Container>
      <SplitFlapDisplay value="93" />
    </Container>
  ));
