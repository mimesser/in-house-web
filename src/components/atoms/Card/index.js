import React from 'react';
import styled from 'styled-components';

import { calcRem, panelBoxShadow, palette } from '../../../style';

export const Card = styled.section`
  display: flex;
  border-radius: ${calcRem('2px')};
  background-color: ${palette.white};
  ${panelBoxShadow};
  cursor: pointer;
`;
