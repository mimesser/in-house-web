import styled from 'styled-components';

import { spacing } from '../../../theme';

export const Badge = styled.span`
   display: inline-block;
   font-family: ${({ theme: { fonts } }) => fonts.emphasis};
   color: ${({ theme: { palette } }) => palette.white};
   background-color: ${({ theme: { palette } }) => palette.black};
   padding: ${spacing.small};
   ${({ wide }) => wide && `width: 100%`}
`;
