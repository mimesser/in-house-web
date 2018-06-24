import React from 'react';
import { css } from 'styled-components';
import baseComponent from './base-component';

const Wrapper = baseComponent(
   'button',
   css`
      text-transform: uppercase;
   `,
);

export default function Button(props) {
   return <Wrapper {...props} />;
}
