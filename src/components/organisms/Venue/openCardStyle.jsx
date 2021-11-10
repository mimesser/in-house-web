import React from 'react';
import styled, { css } from 'styled-components';

import {
  appBackground,
  fontSize,
  font,
  palette,
  spacing,
  calcRem,
  appColors,
} from '../../../style';
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
  margin-bottom: ${spacing.md};
  &[disabled] {
    color: ${palette.lightGray};
    cursor: not-allowed;
  }
  &:hover: ${appColors.offWhite};
  // color: ${({ highlight }) => (highlight ? appColors.offWhite : palette.mediumGray)};
`;

const flagText = ({ flagged }) =>
  flagged &&
  css`
    color: ${palette.darkGray};
    ${font.bold};
  `;

export const FlagButton = styled(ClearButton)`
  color: ${palette.gray};
  font-size: ${fontSize.xs};
  ${flagText};
  > span:last-of-type {
    margin-left: ${spacing.lg};
  }
`;

export const Layout = styled.div`
  flex: 1;
  z-index: 11;
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
    margin: 0 auto;
  }
`;

export const VoteRow = styled.div`
  z-index: 1000;
  background: ${appBackground};
  display: flex;
  align-items: center;
  margin: ${spacing.xxl} 0;
`;
