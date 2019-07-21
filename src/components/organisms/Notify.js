import styled from 'styled-components';

import { Button, Heading } from '../atoms';
import { spacing, fontSize } from '../../style';

export const SubmitButton = styled(Button)`
   opacity: ${({ visible }) => (visible ? 1 : 0)};
   transition: opacity 0.7s;
`;

export const NotifyLayout = styled.div`
   padding: 0 ${spacing.medium};
   display: flex;
   flex-direction: column;

   ${Heading} {
      margin-bottom: ${spacing.medium};
   }

   ${Button} {
      margin: 9rem auto 0;
      min-width: 10rem;
   }

   p {
      margin: 0 0 ${spacing.large} 0;
      font-size: ${fontSize.small};
   }
`;
