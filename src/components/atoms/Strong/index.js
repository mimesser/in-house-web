import styled from 'styled-components';

import { font } from '../../../utils';

export const Strong = styled.strong`
   font-size: ${({ theme: { fontSize } }) => fontSize.medium};
   font-weight: normal;
   font-family: ${font('emphasis')};
`;
