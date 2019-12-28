import React from 'react';
import styled, { css } from 'styled-components';

import { appBackground, fontSize, fontWeight, palette, spacing } from '../../../style';
import { Button, ClearButton } from '../../atoms';
import { Dial } from '../../molecules';

export const ItemDate = styled.div`
  color: ${palette.lightGray};
  font-size: ${fontSize.sm};
  margin-bottom: ${spacing.sm};
`;

export const ItemTitle = styled.div`
  text-transform: lowercase;
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.normal};
  // keep space for 'you rated'
  margin-bottom: ${({ keepSpace }) => (keepSpace ? '3.25rem' : spacing.sm)};
`;

export const VoteButton = styled(ClearButton)`
  color: ${({ selected }) => (selected ? palette.primary : palette.lightGray)};
  &[disabled] {
    color: ${palette.lightGray};
  }
  &:last-child {
    margin-left: ${spacing.lg};
  }
`;

const flagText = ({ flagged }) =>
  flagged &&
  css`
    color: ${palette.lightGray};
  `;

export const FlagButton = styled(Button).attrs(() => ({
  secondary: true,
}))`
  margin: 0 auto;
  padding: ${spacing.tiny} ${spacing.lg} ${spacing.tiny} ${spacing.sm};
  display: flex;
  align-items: center;
  > span {
    margin-left: ${spacing.sm};
    ${flagText};
  }
`;

export const Layout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: ${spacing.xxl};

  ${Dial} {
    margin-top: -100px;
    margin-left: -100px;
  }
`;

export const SubTitle = styled.div`
   font-size: ${fontSize.lg};
   font-weight: ${fontWeight.bold}
   color: ${palette.lightGray};
   margin-bottom: ${spacing.lg};
`;

export const VoteRow = styled.div`
  z-index: 1000;
  background: ${appBackground};
  display: flex;
  align-items: center;
  margin-top: ${spacing.xxxl};
`;
