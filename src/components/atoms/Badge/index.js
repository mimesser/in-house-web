import styled from 'styled-components';

import { spacing } from '../../../theme';

export const Badge = styled.span`
   display: inline-block;
   color: ${({ theme: { palette } }) => palette.white};
   background-color: ${({ theme: { palette } }) => palette.black};
   padding: ${spacing.tiny};
   ${({ wide }) => wide && `width: 100%`}
`;
