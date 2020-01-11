import styled from 'styled-components';

import { Button, Card, FormGroup } from '../../../atoms';
import { spacing } from '../../../../style';
import { cardStyle } from '../tabStyle';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${Card} {
    ${cardStyle};
    background: transparent;
    margin: 0 -${spacing.xxl} ${spacing.xl} -${spacing.xxl};
  }

  ${FormGroup}:last-of-type {
    margin-bottom: ${spacing.xxxl};
  }
`;

export const SubmitButton = styled(Button).attrs({
  type: 'submit',
  wide: true,
  icon: 'arrow-right',
})`
  margin-top: auto;
`;
