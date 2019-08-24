import styled from 'styled-components';

import { Button } from '../../../atoms';
import { fontSize, spacing, palette } from '../../../../style';

export const Layout = styled.div`
   display: flex;
   flex-direction: column;
   padding: 0 ${spacing.xxxLarge};
`;

export const SubmitButton = styled(Button).attrs({
   type: 'submit',
})`
   transition: opacity 0.5s;
   margin: ${spacing.xxxLarge} auto 0 auto;
`;

export const SendAnonymous = styled.div`
   font-size: ${fontSize.large};
   margin: 0 0 ${spacing.large} 0;

   span {
      margin: 0 ${spacing.medium} ${spacing.large} 0;
   }
`;

export const Tip = styled.div`
   margin: ${spacing.tiny} 0 ${spacing.nano};
   color: ${palette.textLight};
   font-size: ${fontSize.tiny};
`;
