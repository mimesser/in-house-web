import styled from 'styled-components';

import { Button } from '../../../atoms';
import { fontSize, spacing, palette } from '../../../../style';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${spacing.xxxl};
`;

export const SubmitButton = styled(Button).attrs({
  type: 'submit',
})`
  transition: opacity 0.5s;
  margin: ${spacing.xxxl} auto 0 auto;
`;

export const SendAnonymous = styled.div`
  font-size: ${fontSize.lg};
  margin: 0 0 ${spacing.lg} 0;

  span {
    margin: 0 ${spacing.md} ${spacing.lg} 0;
  }
`;

export const Tip = styled.div`
  margin: ${spacing.xs} 0 ${spacing.xxs};
  color: ${palette.lightGray};
  font-size: ${fontSize.xs};
`;
