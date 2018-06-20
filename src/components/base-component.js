import styled from 'styled-components';
import { pick } from 'ramda';

/* eslint-disable indent */
export default function baseComponent(component, css) {
   return styled[component]`
      ${css};

      ${(props) => {
         const propKeys = Object.keys(props);
         const elements = pick(propKeys, props.theme);

         const x = Object.keys(elements).reduce((res, tag) => (
            [...res, ...elements[tag]]
         ), []);
         return x;
      }};
   `;
}
