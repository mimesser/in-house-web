import styled from 'styled-components';

import { spacing, palette } from '../../../style';

export const Badge = styled.span`
   display: inline-block;
   color: ${palette.white};
   background-color: ${palette.black};
   padding: ${spacing.tiny};
   ${({ wide }) => wide && `width: 100%`}
`;
