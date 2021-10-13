import styled from 'styled-components';
import { readableColor } from 'polished';
import { storiesOf } from '@storybook/react';
import { themeColors } from './colors';

const Color = styled.div`
  background-color: ${({ color }) => color};
  width: 8rem;
  height: 8rem;
  display: inline-block;
  margin: 1rem;
  :after {
    content: "${({ name, color }) => `${name}\\a${color}`}";
    color: ${({ color }) => readableColor(color)};
    white-space: pre;
  }
`;

storiesOf('Colors', module).add('Palette', () => (
  <div>
    {Object.entries(themeColors).map(([name, color]) => (
      <Color key={name} name={name} color={color} />
    ))}
  </div>
));
