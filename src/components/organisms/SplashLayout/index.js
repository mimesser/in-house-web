import styled from 'styled-components';

import { Flex, Button } from '../../atoms';
import { spacing } from '../../../theme';

export const SplashLayout = styled(Flex).attrs({
   column: true,
})`
   padding: 0 ${spacing.medium};

   p {
      margin: 0 0 3rem 0;
   }

   ${Button} {
      margin: 9rem auto 0;
   }
`;
