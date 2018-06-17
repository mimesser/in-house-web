import React from 'react';
import { css } from 'styled-components';
import baseComponent from './base-component';

const Wrapper = baseComponent(
   'h1',
   css`
      margin: 0.5em 0;
      line-height: 1.4em;
   `,
);

export default function Heading(props) {
   return <Wrapper {...props} />;
}
