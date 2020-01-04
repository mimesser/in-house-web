import React from 'react';
import styled from 'styled-components';

import { palette } from '../../../style';

export const Card = styled.section`
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
