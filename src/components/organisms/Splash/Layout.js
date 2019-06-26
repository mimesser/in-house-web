import styled from 'styled-components';

import { Button, Heading } from '../../atoms';
import { spacing } from '../../../style';

export const SplashLayout = styled.div`
   display: flex;
   flex-direction: column;
   flex: auto;
   padding: 0 ${spacing.medium};

   p {
      margin: 0 0 ${spacing.xLarge} 0;
   }

   ${Heading} {
      margin-bottom: 3rem;
   }
`;

export const LandingLayout = styled(SplashLayout)`
   ${Heading} {
      margin-bottom: 4.5rem;
   }

   ${Button} {
      margin: auto;
   }
`;
