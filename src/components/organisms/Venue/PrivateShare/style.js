import styled from 'styled-components';

import { Button, Card } from '../../../atoms';
import { fontSize, spacing, palette } from '../../../../style';
import { cardStyle } from '../tabStyle';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  ${Card} {
    ${cardStyle};
  }
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
