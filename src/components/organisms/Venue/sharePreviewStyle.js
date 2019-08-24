import styled from 'styled-components';

import { ItemCard } from './tabStyle';
import { spacing, palette, calcRem } from '../../../style';

// TODO: consider importing the values individually for safety
// 64px = Modal's `Content` Horizontal Padding + Private Share's `Layout` Horizontal Padding;
const parentsHorizontalPadding = calcRem('64px');

export const SharePreviewCard = styled(ItemCard)`
  margin: ${spacing.xxLarge} -${parentsHorizontalPadding};
  background-color: ${palette.secondaryLight};
  padding: ${spacing.large} ${spacing.xLarge};
`;
