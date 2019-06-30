import React from 'react';
import styled from 'styled-components';

import { breakpoints, spacing } from '../../../style';

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   flex: auto;

   padding-left: ${props => {
      if (props.full) return 0;
      return `calc((100vw - ${breakpoints.sm}) / 2)`;
   }};

   padding-right: ${props => {
      if (props.full) return 0;
      return `calc((100vw - ${breakpoints.sm}) / 2)`;
   }};

   padding-top: ${props => {
      if (props.fullVertical) return 0;
      if (props.small) return spacing.medium;
      return spacing.large;
   }};

   padding-bottom: ${props => {
      if (props.fullVertical) return 0;
      if (props.small) return spacing.medium;
      return spacing.large;
   }};

   min-height: ${props => {
      if (props.fullHeight) return '100vh';
      return undefined;
   }};
`;
