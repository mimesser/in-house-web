import React from 'react';
import styled from 'styled-components';

import { spacing, palette } from '../../../style';
import { H1 } from '../../atoms';

export const Name = styled.div`
  text-transform: uppercase;
  color: ${palette.textDark};
  margin-bottom: ${spacing.medium};
`;

export const Title = ({ houseName, action }) => (
  <>
    <Name>{houseName}</Name>
    <H1>{action}</H1>
  </>
);
