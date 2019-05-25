import styled from 'styled-components';
import { spacing } from '../../../theme/spacing';

export const Paragraph = styled.p`
   margin: 0 0 ${spacing.medium} 0;
   padding-top: ${({ spaceAbove }) => (spaceAbove ? spacing.medium : 0)};
`;
