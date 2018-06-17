import React from 'react';
import { css } from 'styled-components';
import baseComponent from './base-component';

const Wrapper = baseComponent(
   'button',
   css`
      border: none;
      outline: none;
      background: none;
      font: inherit;
      text-transform: uppercase;
      cursor: pointer;
      margin: 1.4em;
      padding: 16px 20px;
   `,
);

export default function Button(props) {
   return <Wrapper {...props} />;
}
