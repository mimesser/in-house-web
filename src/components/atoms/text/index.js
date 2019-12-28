import styled from 'styled-components';

import { fontSize, fontWeight, lineHeight } from '../../../style';

export const H1 = styled.h1`
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.lg};
`;

export const H2 = styled.h2`
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.md};
`;

export const H3 = styled.h3`
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.sm};
`;

export const UserCounter = styled.span`
  font-size: ${fontSize.sm};
`;

export const Category = styled.span`
  font-size: ${fontSize.sm};
  text-transform: uppercase;
`;

export const Address = styled.address`
  font-size: ${fontSize.sm};
  font-style: normal;
  text-transform: lowercase;
`;

export const SubTitle = styled.span`
  font-size: ${fontSize.sm};
  line-height: ${lineHeight.lg};
`;

export const Patent = styled.span.attrs(() => ({
  children: 'U.S. patent no. 8,904,502',
}))`
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.normal};
  text-transform: lowercase;
`;

export const HouseNameLarge = styled.span`
  font-size: ${fontSize.md};
  font-weight: ${fontWeight.bold};
  text-transform: lowercase;
`;

export const HeaderTitle = styled.span`
  font-size: ${fontSize.sm};
  text-transform: uppercase;
`;

export const FieldHint = styled.span`
  font-size: ${fontSize.md};
`;

export const NumberLarge = styled.span`
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.light};
`;

export const NumberSmall = styled.span`
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.light};
`;
