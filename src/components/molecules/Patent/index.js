import styled from 'styled-components';

import { fontWeight } from '../../../theme';

export const Patent = styled(({ className }) => <span className={className}>U.S. patent no. 8,904,502</span>)`
   display: block;
   opacity: 0.5;
   text-transform: lowercase;
   font-family: ${({ theme: { fonts } }) => fonts.primary};
   font-weight: ${fontWeight.primary};
`;
