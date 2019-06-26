import styled from 'styled-components';

import { fontWeight, font } from '../../../style';

export const Patent = styled.span.attrs({
   children: 'U.S. patent no. 8,904,502',
})`
   display: block;
   opacity: 0.5;
   text-transform: lowercase;
   font-family: ${font.primary};
   font-weight: ${fontWeight.primary};
`;
