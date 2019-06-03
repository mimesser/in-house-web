import styled from 'styled-components';

import { Button, Heading } from '../atoms';
import { spacing } from '../../theme';

export const NotifyLayout = styled.div`
   padding: 0 ${spacing.medium};

   ${Button} {
      margin: 9rem auto 0;
   }

   p {
      margin-bottom: 2rem;
   }
`;
