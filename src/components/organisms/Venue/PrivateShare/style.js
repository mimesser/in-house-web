import styled from 'styled-components';

import { Button } from '../../../atoms';
import { fontSize, spacing, palette } from '../../../../style';

export const Layout = styled.div`
   display: flex;
   flex-direction: column;
   padding: ${spacing.xxLarge} ${spacing.large};
`;

export const SubmitButton = styled(Button).attrs({
   type: 'submit',
})`
   transition: opacity 0.5s;
   opacity: ${({ visible }) => (visible ? 1 : 0)};
   margin: ${spacing.large} auto 0 auto;
`;

export const SendAnonymous = styled.div`
   font-size: ${fontSize.large};
   margin: ${spacing.large} 0;
`;

export const Tip = styled.div`
   margin: ${spacing.tiny} 0 ${spacing.xLarge};
   color: ${palette.textLight};
   font-size: ${fontSize.tiny};
`;
