import React from 'react';
import styled from 'styled-components';

import { calcRem, panelBoxShadow } from '../../../theme';

export const Card = styled.section`
   display: flex;
   border-radius: ${calcRem('2px')};
   background-color: ${({ theme: { palette } }) => palette.white};
   ${panelBoxShadow};
   cursor: pointer;
`;
