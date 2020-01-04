import React from 'react';
import styled, { css } from 'styled-components';

import { appBackground, fontSize, fontWeight, palette, spacing, calcRem } from '../../../style';
import { ClearButton, H1, Break } from '../../atoms';
import { Dial } from '../../molecules';

export const ItemDate = styled.div`
  color: ${palette.gray};
  margin-bottom: ${spacing.sm};
`;

export const ItemTitle = styled(H1)`
  // keep space for 'you rated'
  margin-bottom: ${({ keepSpace }) => (keepSpace ? '3.25rem' : spacing.sm)};
`;

export const ItemText = styled.div`
  color: ${palette.darkGray};
`;

export const VoteButton = styled(ClearButton)`
  color: ${palette.primary};
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
    color: ${palette.darkGray};
    font-weight: ${fontWeight.bold};
  `;

export const FlagButton = styled(ClearButton)`
  color: ${palette.gray};
  font-size: ${fontSize.md};
  ${flagText};
  > span:last-of-type {
    margin-left: ${spacing.lg};
  }
`;

export const Layout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: ${spacing.xl};

  ${Break} {
    margin: ${spacing.sm} 0 ${spacing.lg};
    width: ${calcRem('80px')};
    height: ${calcRem('3px')};
  }

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
  margin: ${spacing.xxl} 0;
`;
