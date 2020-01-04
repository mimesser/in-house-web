import styled from 'styled-components';

import { fontSize, fontWeight, lineHeight } from '../../../style';

// TODO: remove not used / not generic

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

export const Industry = styled.span`
  display: inline-block;
  font-size: ${fontSize.sm};
  text-transform: uppercase;
`;

export const Address = styled.address`
  font-size: ${fontSize.sm};
  font-style: normal;
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
`;

export const HouseNameLarge = styled.span`
  font-size: ${fontSize.md};
  font-weight: ${fontWeight.bold};
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
  sup {
    font-size: 50%;
    top: -1.5rem;
    left: -0.5rem;
  }
`;

export const NumberSmall = styled.span`
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.light};
`;
