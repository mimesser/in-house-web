import styled from 'styled-components';

import { fontWeight, font, fontSize } from '../../../style';

export const Patent = styled.span.attrs({
   children: 'U.S. patent no. 8,904,502',
})`
   display: block;
   text-transform: lowercase;
   font-family: ${font.primary};
   font-weight: ${fontWeight.primary};
   font-size: ${fontSize.tiny};
`;
