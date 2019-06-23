import styled from 'styled-components';

import { fontSize, spacing } from '../../../theme';

export const Status = styled.div`
   margin-top: ${spacing.tiny};
   display: flex;
`;

export const CharLimit = styled.span`
   transition: color 0.5s;
   color: ${({ reached, theme: { palette, textColors } }) => (reached ? palette.danger[0] : textColors.primary)};
   font-size: ${fontSize.small};
   margin-left: auto;
`;

export const Error = styled.span`
   color: ${({ reached, theme: { palette } }) => palette.danger[0]};
   font-size: ${fontSize.small};
`;
