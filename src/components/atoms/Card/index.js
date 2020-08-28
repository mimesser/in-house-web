import React from 'react';
import styled from 'styled-components';

import { palette } from '../../../style';

export const Card = styled.section`
  // to prevent blue highlighting of elements 
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  display: flex;
  flex-direction: column;
  background-color: ${palette.white};
  cursor: pointer;

  > div {
    display: flex;
    flex-direction: row;
    flex: 1;
  }
`;
