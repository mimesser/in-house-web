import styled from 'styled-components';

import { Button, Heading } from '../../atoms';
import { spacing } from '../../../theme';

export const SplashLayout = styled.div`
   display: flex;
   flex-direction: column;
   flex: auto;
   padding: 0 ${spacing.medium};
`;

export const LandingLayout = styled(SplashLayout)`
   ${Heading} {
      margin-bottom: 4rem;
   }

   p {
      margin: 0 0 3rem 0;
   }

   ${Button} {
      margin: 9rem auto 0;
   }
`;
